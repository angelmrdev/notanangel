import { createServer } from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Hostinger Node.js Web App entrypoint for Next.js output: 'export'.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'out');
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.avif': 'image/avif',
  '.pdf': 'application/pdf', '.webmanifest': 'application/manifest+json',
  '.map': 'application/json; charset=utf-8', '.mp4': 'video/mp4',
};
const safeInside = (path, base) => path === base || path.startsWith(base + sep);

async function handle(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return;
  }
  let path;
  try {
    const rawPath = (req.url || '/').split(/[?#]/, 1)[0];
    path = decodeURIComponent(rawPath);
    if (!path.startsWith('/') || path.includes('\\') || path.includes('\0') || path.split('/').includes('..')) throw Error('Invalid path');
  } catch { res.writeHead(400); res.end(); return; }
  const relative = path.replace(/^\/+/, '');
  const candidate = resolve(root, relative, path.endsWith('/') ? 'index.html' : '');
  if (!safeInside(candidate, root)) { res.writeHead(403); res.end(); return; }
  let target = candidate;
  try {
    let info = await stat(target);
    if (info.isDirectory()) { target = resolve(target, 'index.html'); info = await stat(target); }
    if (!info.isFile()) throw Error('Not a file');
    const actual = await realpath(target);
    if (!safeInside(actual, await realpath(root))) { res.writeHead(403); res.end(); return; }
    const ext = extname(target).toLowerCase();
    const headers = {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': target.includes(`${sep}_next${sep}static${sep}`) ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
    };
    const body = req.method === 'HEAD' ? null : await readFile(target);
    res.writeHead(200, headers); res.end(body); return;
  } catch {
    try {
      const fallback = await readFile(resolve(root, '404.html'));
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(req.method === 'HEAD' ? undefined : fallback);
    } catch { res.writeHead(404); res.end(); }
  }
}

try { await stat(resolve(root, 'index.html')); }
catch { console.error(`Static export not found in ${root}. Run pnpm build first.`); process.exit(1); }
createServer((req, res) => { handle(req, res).catch((error) => {
  console.error(error); if (!res.headersSent) res.writeHead(500); res.end();
}); }).listen(port, host, () => console.log(`Not an Angel static server listening on ${host}:${port}`));
