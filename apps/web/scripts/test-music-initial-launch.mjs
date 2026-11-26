import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publishInitialMusic } from './publish-initial-music.mjs';
import { routePlan } from './prepare-music-routes.mjs';
import { initialNames } from './set-initial-download-filenames.mjs';
import { loadMusicCatalog } from '../lib/music/catalog.mjs';
import { buildManifest } from '../../../infra/music-downloads/manifest.mjs';
const source=fileURLToPath(new URL('../',import.meta.url)), now=new Date('2026-11-26T12:00:00Z');
const file=(root,r)=>join(root,'content/music',r.category,r.slug,'release.json');
const read=(root,r)=>JSON.parse(readFileSync(file(root,r),'utf8'));
const write=(root,r)=>writeFileSync(file(root,r),JSON.stringify(r,null,2)+'\n');
function fixture(fn){
 const root=mkdtempSync(join(tmpdir(),'naa-initial-launch-'));
 try{
  for(const path of ['content/music','music-preview','public/images/music']){mkdirSync(join(root,path),{recursive:true});cpSync(join(source,path),join(root,path),{recursive:true});}
  const catalog=()=>loadMusicCatalog(join(root,'content/music'));
  const initial=catalog().filter(r=>Object.hasOwn(initialNames,r.id));
  for(const r of initial){const next=read(root,r);next.status='draft';delete next.publishedAt;next.downloadFilename=initialNames[r.id];next.downloads=next.downloads.map(d=>({...d,bytes:12345,rights:'pending',enabled:false}));write(root,next);}
  fn(root,catalog,initial);
 }finally{rmSync(root,{recursive:true,force:true});}
}
test('preview changes nothing and predicts 18 URLs, zero downloads',()=>fixture((root,catalog)=>{const before=catalog();const r=publishInitialMusic(root,{now});assert.equal(r.changes,6);assert.equal(r.publicUrls,18);assert.equal(r.downloads,0);assert.deepEqual(catalog(),before);assert(!existsSync(join(root,'app')));}));
test('apply changes only status and date; route generation and manifest work',()=>fixture((root,catalog,initial)=>{const before=initial.map(r=>read(root,r));publishInitialMusic(root,{now,apply:true});for(const r of before)assert.deepEqual(read(root,r),{...r,status:'published',publishedAt:'2026-11-26'});assert.equal(routePlan(root,catalog(),{now,apply:true}).missing,10);assert.equal(routePlan(root,catalog(),{now,check:true}).missing,0);assert.deepEqual(buildManifest(catalog(),now),[]);assert.equal(publishInitialMusic(root,{now,apply:true}).changes,0);}));
test('missing verified size prevents all writes',()=>fixture((root,catalog,initial)=>{const r=read(root,initial[0]);delete r.downloads[0].bytes;write(root,r);const before=catalog();assert.throws(()=>publishInitialMusic(root,{now,apply:true}),/missing verified/);assert.deepEqual(catalog(),before);}));
test('future date blocks accidental early release',()=>fixture((root,catalog,initial)=>{const r=read(root,initial[0]);r.publishedAt='2026-11-27';write(root,r);assert.throws(()=>publishInitialMusic(root,{now,apply:true}),/future publication/);assert(catalog().every(r=>r.status==='draft'));}));
test('preserves explicitly authorized enabled and blocked states',()=>fixture((root,catalog,initial)=>{const r=read(root,initial[0]);r.downloads[0].rights='authorized';r.downloads[0].enabled=true;r.downloads[1].rights='blocked';write(root,r);const report=publishInitialMusic(root,{now,apply:true});assert.equal(report.downloads,1);assert.deepEqual(read(root,r).downloads,r.downloads);assert.equal(buildManifest(catalog(),now).length,1);}));
test('route conflict prevents publication',()=>fixture((root,catalog)=>{const path=join(root,'app/(en)/music/page.tsx');mkdirSync(join(root,'app/(en)/music'),{recursive:true});writeFileSync(path,'conflict');assert.throws(()=>publishInitialMusic(root,{now,apply:true}),/Route differs/);assert(catalog().every(r=>r.status==='draft'));}));
