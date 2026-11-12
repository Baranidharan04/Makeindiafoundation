import { cpSync, existsSync, lstatSync, mkdirSync, rmSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const frontendPaths = ['index.html', 'src', 'public'];
const assetExtensions = new Set([
  '.html', '.js', '.css', '.png', '.jpg', '.jpeg', '.webp', '.gif',
  '.svg', '.ico', '.avif', '.woff', '.woff2', '.ttf', '.otf',
]);
const privateName = /(?:^|[-_.])(credentials?|secrets?|private[-_.]?key|service[-_.]?account)(?:[-_.]|$)/i;

function isFrontendAsset(source) {
  const name = basename(source);
  if (name.startsWith('.') || name === 'node_modules' || privateName.test(name)) {
    return false;
  }
  const stat = lstatSync(source);
  // Never follow symlinks into credentials or files outside the frontend.
  return stat.isDirectory() || (stat.isFile() && assetExtensions.has(extname(name).toLowerCase()));
}

export function buildAssets(root = projectRoot) {
  for (const path of frontendPaths) {
    if (!existsSync(join(root, path))) {
      throw new Error(`Missing frontend path: ${path}`);
    }
  }

  const output = join(root, '.cloudflare-assets');
  // Recreate the upload directory so removed pages and old assets cannot linger.
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  for (const path of frontendPaths) {
    cpSync(join(root, path), join(output, path), {
      recursive: true,
      filter: isFrontendAsset,
    });
  }
  return output;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildAssets();
  console.log('Refreshed .cloudflare-assets from index.html, src/ and public/.');
}
