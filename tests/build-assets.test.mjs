import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { buildAssets } from '../scripts/build-assets.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const Babel = createRequire(import.meta.url)('../public/js/babel.min.js');

function renderComponent(path, name) {
  let state = 0;
  const context = {
    window: {},
    React: {
      createElement: (type, props, ...children) => ({ type, props: { ...props, children } }),
      useState: () => [state, next => { state = next; }],
    },
    ...Object.fromEntries([
      'Navigation', 'Footer', 'Card', 'CardContent', 'Sparkles', 'Target', 'Lightbulb', 'Users',
    ].map(name => [name, name])),
  };
  const source = readFileSync(join(projectRoot, path), 'utf8');
  runInNewContext(Babel.transform(source, { presets: ['react'] }).code, context);
  return () => context.window[name]();
}

function elements(node) {
  if (Array.isArray(node)) return node.flatMap(elements);
  if (!node || typeof node !== 'object') return [];
  return [node, ...elements(node.props.children)];
}

function write(root, path, content = path) {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), content);
}

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'mif-assets-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  write(root, 'index.html', '<html>current site</html>');
  write(root, 'src/App.js', 'window.App = {};');
  write(root, 'public/site.css', '.current { color: teal; }');
  return root;
}

function files(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith('.')) return [];
    return entry.isDirectory()
      ? files(join(root, entry.name)).map(path => `${entry.name}/${path}`)
      : [entry.name];
  }).sort();
}

test('refreshes changed assets and removes stale pages on every build', t => {
  const root = fixture(t);
  write(root, '.cloudflare-assets/src/App.js', 'old app');
  write(root, '.cloudflare-assets/src/pages/RemovedPage.js');
  const output = buildAssets(root);
  assert.equal(readFileSync(join(output, 'src/App.js'), 'utf8'), 'window.App = {};');
  assert.equal(existsSync(join(output, 'src/pages/RemovedPage.js')), false);
  assert.equal(readFileSync(join(output, 'public/site.css'), 'utf8'), '.current { color: teal; }');

  rmSync(join(root, 'src/App.js'));
  write(root, 'src/pages/NewPage.js', 'new page');
  buildAssets(root);
  assert.equal(existsSync(join(output, 'src/App.js')), false);
  assert.equal(readFileSync(join(output, 'src/pages/NewPage.js'), 'utf8'), 'new page');
});

test('only uploads frontend assets, excluding private files, dependencies and symlinks', t => {
  const root = fixture(t);
  for (const path of [
    '.env', '.dev.vars', 'worker/index.js', 'package.json', 'graphify-out/graph.json',
    'src/.env.local', 'src/config.json', 'src/secrets.js',
    'src/node_modules/dependency.js', 'public/.DS_Store',
    'public/service-account-key.json', 'public/credentials.js',
    'public/private-key.pem', 'public/README.md',
  ]) write(root, path);
  symlinkSync(join(root, '.env'), join(root, 'public/leak.js'));

  const output = buildAssets(root);
  assert.deepEqual(files(output), ['index.html', 'public/site.css', 'src/App.js']);
  for (const path of ['.env', '.dev.vars', 'src/.env.local', 'public/.DS_Store']) {
    assert.equal(existsSync(join(output, path)), false, path);
  }
});

test('does not replace existing assets if a required frontend path is missing', t => {
  const root = fixture(t);
  write(root, '.cloudflare-assets/index.html', 'previous deployment');
  rmSync(join(root, 'public'), { recursive: true });
  assert.throws(() => buildAssets(root), /Missing frontend path: public/);
  assert.equal(readFileSync(join(root, '.cloudflare-assets/index.html'), 'utf8'), 'previous deployment');
});

test('stages the current site, volunteer page and all six workshop gallery photos byte-for-byte', t => {
  const root = fixture(t);
  for (const path of ['index.html', 'src', 'public']) {
    cpSync(join(projectRoot, path), join(root, path), { recursive: true });
  }
  const output = buildAssets(root);
  const expected = ['index.html', ...files(join(root, 'src')).map(path => `src/${path}`),
    ...files(join(root, 'public')).map(path => `public/${path}`)].sort();
  assert.deepEqual(files(output), expected);
  for (const path of expected) {
    assert.deepEqual(readFileSync(join(output, path)), readFileSync(join(root, path)), path);
  }

  const workshop = readFileSync(join(output, 'src/pages/WorkshopPage.js'), 'utf8');
  const photos = [...workshop.matchAll(/src: '(src\/assets\/workshops\/[^']+)'/g)];
  assert.equal(photos.length, 6);
  for (const [, path] of photos) assert.ok(existsSync(join(output, path)), path);
  const index = readFileSync(join(output, 'index.html'), 'utf8');
  assert.match(index, /src\/pages\/VolunteerRegistrationPage\.js/);
  assert.ok(existsSync(join(output, 'src/pages/VolunteerRegistrationPage.js')));

  // macOS can hide filename-case errors that become 404s on Cloudflare.
  const stagedPaths = new Set(files(output));
  for (const path of ['src/components/Mission.js', 'src/pages/AboutPage.js']) {
    const source = readFileSync(join(output, path), 'utf8');
    const references = [...source.matchAll(/(["'])(\/?src\/assets\/[^"']+)\1/g)];
    assert.ok(references.length > 0, path);
    for (const [, , src] of references) {
      const assetPath = decodeURIComponent(src).replace(/^\/+/, '');
      assert.ok(stagedPaths.has(assetPath), `${path}: exact-case asset ${src} must be staged`);
    }
  }

  const config = readFileSync(join(projectRoot, 'wrangler.toml'), 'utf8');
  assert.match(config, /\[build\]\s+command = "npm run build"/);
  assert.match(config, /directory = "\.cloudflare-assets"/);
});

test('all STEM previews match their thumbnails, fill the frame and support hover, focus and tap', () => {
  const render = renderComponent('src/components/Mission.js', 'Mission');
  const buttons = elements(render()).filter(node => node.type === 'button');
  assert.equal(buttons.length, 4);
  for (let index = 0; index < buttons.length; index++) {
    const thumbnail = elements(buttons[index]).find(node => node.type === 'img');
    for (const event of ['onMouseEnter', 'onFocus', 'onClick']) {
      assert.equal(typeof buttons[index].props[event], 'function', event);
      buttons[index].props[event]();
      const preview = elements(render()).filter(node => node.type === 'img').at(-1);
      assert.equal(preview.props.src, thumbnail.props.src);
      assert.equal(preview.props.alt, thumbnail.props.alt);
      assert.match(preview.props.src, /^\/src\/assets\//);
      const classes = preview.props.className.split(/\s+/);
      for (const token of ['w-full', 'h-full', 'object-cover']) {
        assert.ok(classes.includes(token), `${thumbnail.props.alt}: ${token}`);
      }
    }
  }
});

test('the founder uses Kumar Ram’s supplied photo with the exact filename case', () => {
  const render = renderComponent('src/pages/AboutPage.js', 'AboutPage');
  const portrait = elements(render()).find(node => node.type === 'img' && node.props.alt === 'Kumar Ram');
  assert.ok(portrait);
  assert.equal(portrait.props.src, '/src/assets/Kumarram.jpeg');

  let src = portrait.props.src;
  let updates = 0;
  const image = {
    get src() { return src; },
    set src(value) { src = value; updates++; },
  };
  portrait.props.onError({ currentTarget: image });
  assert.equal(new URL(src).searchParams.get('name'), 'Kumar Ram');
  portrait.props.onError({ currentTarget: image });
  assert.equal(updates, 1, 'a failed fallback must not trigger another image request');
});
