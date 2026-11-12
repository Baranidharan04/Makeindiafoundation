import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildAssets } from '../scripts/build-assets.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

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

  const config = readFileSync(join(projectRoot, 'wrangler.toml'), 'utf8');
  assert.match(config, /\[build\]\s+command = "npm run build"/);
  assert.match(config, /directory = "\.cloudflare-assets"/);
});
