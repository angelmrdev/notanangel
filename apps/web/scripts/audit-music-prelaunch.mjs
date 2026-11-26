import assert from 'node:assert/strict';
import {existsSync,statSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadMusicCatalog,validateRelease} from '../lib/music/catalog.mjs';
import {musicRoutes,musicTemplates} from '../lib/music/publication.mjs';
import {initialNames} from './set-initial-download-filenames.mjs';
import {buildManifest} from '../../../infra/music-downloads/manifest.mjs';
import {downloadFilename} from '../lib/music/filenames.mjs';
import {objectKey} from '../lib/music/downloads.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const entries=loadMusicCatalog(join(root,'content/music'));
const initial=entries.filter(r=>Object.hasOwn(initialNames,r.id));
assert.equal(initial.length,6,'Expected all six initial releases');
const date=new Date().toISOString().slice(0,10);
const candidates=initial.map(r=>({...r,status:'published',publishedAt:r.publishedAt??date}));
for(const r of candidates){
 validateRelease(r,r.category,r.slug);assert(r.downloadFilename,`${r.id}: missing custom filename`);
 for(const l of ['en','es'])assert(r.bodies[l]?.trim(),`${r.id}: missing ${l} MDX`);
 for(const img of [r.cover,r.thumbnail,r.ogImage])assert(img&&existsSync(join(root,'public',img))&&statSync(join(root,'public',img)).size>0,`${r.id}: missing artwork ${img}`);
 assert.equal(r.downloads.length,2,`${r.id}: expected two downloads`);
 for(const f of ['mp3','wav']){const d=r.downloads.find(d=>d.id===f&&d.format===f);assert(d&&Number.isSafeInteger(d.bytes)&&d.bytes>0,`${r.id}/${f}: missing verified size; run music:r2:verify --apply`); console.log(`${objectKey(r.category,r.slug,d.id,d.format)} | ${d.bytes} bytes | ${downloadFilename(r,d)} | ${d.rights} | enabled=${d.enabled}`);}
}
const now=new Date();
for(const l of ['en','es'])assert.equal(musicRoutes(candidates,l,now).length,9);
assert.equal(musicTemplates(candidates,now).length,5);
const manifest=buildManifest(candidates,now);
console.log(`Music prelaunch: ${initial.length} releases, 12 recorded sizes, 18 candidate URLs, ${manifest.length} authorized enabled candidate downloads.`);
console.log('Read-only audit. No publication, rights or route changes. Recorded sizes are not a fresh R2 check.');
