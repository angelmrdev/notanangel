import { existsSync, readFileSync, statSync, writeFileSync, renameSync, rmSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadMusicCatalog, validateRelease, publishedMusic } from '../lib/music/catalog.mjs';
import { musicRoutes } from '../lib/music/publication.mjs';
import { initialNames } from './set-initial-download-filenames.mjs';
import { routePlan } from './prepare-music-routes.mjs';
import { buildManifest } from '../../../infra/music-downloads/manifest.mjs';

export function publishInitialMusic(web, { apply = false, now = new Date() } = {}) {
 const root = join(web, 'content/music');
 const today = now.toISOString().slice(0, 10);
 const entries = loadMusicCatalog(root);
 const initial = entries.filter(r => Object.hasOwn(initialNames, r.id));
 if (initial.length !== Object.keys(initialNames).length) throw Error('Expected all six initial releases');
 const changes = [], candidates = new Map();
 for (const r of initial) {
  const file = join(root, r.category, r.slug, 'release.json');
  const original = readFileSync(file, 'utf8'), next = JSON.parse(original);
  if (next.publishedAt && next.publishedAt > today) throw Error(`${r.id}: future publication date; review in Music Admin`);
  if (next.status === 'draft') { next.status = 'published'; next.publishedAt = today; }
  validateRelease(next, r.category, r.slug);
  if (!next.downloadFilename) throw Error(`${r.id}: missing custom filename`);
  if (!r.bodies.en || !r.bodies.es) throw Error(`${r.id}: missing bilingual editorial content`);
  for (const image of [next.cover, next.thumbnail, next.ogImage]) {
   if (!image || !existsSync(join(web, 'public', image)) || !statSync(join(web, 'public', image)).isFile() || !statSync(join(web, 'public', image)).size) throw Error(`${r.id}: missing artwork ${image}`);
  }
  if (next.downloads.length !== 2 || !['mp3','wav'].every(f => next.downloads.some(d => d.id === f && d.format === f && Number.isSafeInteger(d.bytes) && d.bytes > 0))) throw Error(`${r.id}: missing verified MP3/WAV sizes; run music:r2:verify --apply before publication`);
  candidates.set(r.id, { ...next, bodies: r.bodies, tracklist: r.tracklist });
  if (r.status === 'draft') changes.push({ file, original, next });
 }
 const proposed = entries.map(r => candidates.get(r.id) ?? r);
 // Check template availability and conflicts before writing any catalog data.
 const routes = routePlan(web, proposed, { now });
 const manifest = buildManifest(proposed, now);
 const report = { changes: changes.length, initial: [...candidates.values()].map(r => ({ id:r.id, publishedAt:r.publishedAt, downloads:r.downloads.map(d=>({id:d.id,rights:d.rights,enabled:d.enabled})) })), publicReleases: publishedMusic(proposed, now).length, publicUrls: ['en','es'].reduce((n,l)=>n+musicRoutes(proposed,l,now).length,0), routeFilesMissing:routes.missing, downloads:manifest.length };
 if (!apply) return report;
 for (const c of changes) if (readFileSync(c.file,'utf8') !== c.original) throw Error(`Catalog changed: ${c.file}`);
 const staged = [], committed = [];
 try {
  for (const c of changes) { const temp = `${c.file}.${randomUUID()}.tmp`; staged.push({...c,temp}); writeFileSync(temp, JSON.stringify(c.next,null,2)+'\n', {flag:'wx'}); }
  for (const c of staged) { renameSync(c.temp,c.file); committed.push(c); }
  loadMusicCatalog(root);
 } catch (error) {
  // Best-effort rollback for ordinary filesystem errors; keep Git as the recovery source.
  for (const c of committed.reverse()) { const backup = `${c.file}.${randomUUID()}.rollback`; writeFileSync(backup,c.original,{flag:'wx'}); renameSync(backup,c.file); }
  throw error;
 } finally { for (const c of staged) rmSync(c.temp,{force:true}); }
 return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
 const args = process.argv.slice(2);
 if (args.length > 1 || args.some(a=>a!=='--apply')) throw Error('Usage: node scripts/publish-initial-music.mjs [--apply]');
 const apply = args.includes('--apply');
 try {
  const report = publishInitialMusic(fileURLToPath(new URL('../',import.meta.url)), {apply});
  for (const r of report.initial) console.log(`${r.id} | ${r.publishedAt} | ${r.downloads.map(d=>`${d.id}: ${d.rights}, enabled=${d.enabled}`).join(' | ')}`);
  console.log(`${apply?'Applied':'Preview'}: ${report.changes} releases ${apply?'published':'to publish'}; ${report.publicReleases} public releases; ${report.publicUrls} public URLs; ${report.downloads} authorized enabled downloads.`);
  console.log(`Missing route files: ${report.routeFilesMissing}. Rights, enabled flags, sizes and filenames unchanged. No Worker deploy performed.`);
 } catch (error) { console.error(error.message); process.exitCode=1; }
}
