import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdirSync,mkdtempSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {verifyCatalogR2} from './verify-music-r2.mjs';
import {checkR2} from './music-admin/r2.mjs';
import {objectKey} from '../lib/music/downloads.mjs';
import {loadMusicCatalog} from '../lib/music/catalog.mjs';
import {setInitialNames,initialNames} from './set-initial-download-filenames.mjs';
import {buildManifest} from '../../../infra/music-downloads/manifest.mjs';
function fixture(t){
 const dir=mkdtempSync(join(tmpdir(),'naa-r2-batch-test-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));
 for(const category of ['dj-edits','dj-mixes','dj-sets'])mkdirSync(join(dir,category));
 for(const [index,id] of Object.keys(initialNames).entries()){
  const category=index<3?'dj-edits':'dj-mixes';const path=join(dir,category,id);mkdirSync(path);
  const locale={title:id,description:'Test',metaTitle:id,metaDescription:'Test',coverAlt:'Test'};
  const r={id,slug:id,category,status:'draft',locales:{en:locale,es:locale},artists:['Test'],genres:[],originalTracks:Array.from({length:index<3?1:2},()=>({artist:'Test',title:'Test'})),downloads:['mp3','wav'].map(format=>({id:format,format,label:format,rights:'pending',enabled:false}))};
  writeFileSync(join(path,'release.json'),JSON.stringify(r));for(const l of ['en','es'])writeFileSync(join(path,`${l}.mdx`),'Test');
 }
 return dir;
}
const check=async i=>({key:objectKey(i.category,i.slug,i.id,i.format),bytes:i.format==='mp3'?1234:5678});
const files=root=>loadMusicCatalog(root).map(r=>join(root,r.category,r.slug,'release.json'));
const snapshot=root=>files(root).map(p=>readFileSync(p,'utf8'));
test('read-only checks all 12 objects without writing',async t=>{
 const root=fixture(t);setInitialNames(root,{apply:true});const before=snapshot(root);const r=await verifyCatalogR2(root,{check});assert.equal(r.results.length,12);assert.ok(r.ok);assert.equal(r.updated,0);assert.deepEqual(snapshot(root),before);assert.ok(r.results.some(r=>r.filename.includes('Español')));assert.ok(r.results.every(r=>r.url.startsWith('https://downloads.notanangeldj.com/download/')));
});
test('apply updates only bytes; no publication or authorization',async t=>{
 const root=fixture(t);setInitialNames(root,{apply:true});const before=loadMusicCatalog(root);const r=await verifyCatalogR2(root,{apply:true,check});assert.equal(r.updated,6);const after=loadMusicCatalog(root);assert.deepEqual(after,before.map(r=>({...r,downloads:r.downloads.map(d=>({...d,bytes:d.format==='mp3'?1234:5678}))})));assert.deepEqual(buildManifest(after),[]);assert.equal((await verifyCatalogR2(root,{apply:true,check})).updated,0);
});
test('missing or malformed object prevents all updates',async t=>{
 const root=fixture(t);const before=snapshot(root);const report=await verifyCatalogR2(root,{apply:true,check:async i=>{if(i.slug==='monica-naranjo-sola')throw Error('missing');return check(i);}});assert.equal(report.ok,false);assert.equal(report.updated,0);assert.equal(report.results.filter(r=>r.ok).length,10);assert.deepEqual(snapshot(root),before);
});
test('unexpected size or key is rejected',async t=>{
 const root=fixture(t);const before=snapshot(root);const r=await verifyCatalogR2(root,{apply:true,check:async i=>({...await check(i),bytes:0})});assert.equal(r.ok,false);assert.deepEqual(snapshot(root),before);
});
test('changed enabled object is not silently accepted',async t=>{
 const root=fixture(t);const p=files(root)[0];const obj=JSON.parse(readFileSync(p));Object.assign(obj.downloads[0],{enabled:true,rights:'authorized',bytes:77});writeFileSync(p,JSON.stringify(obj));const before=snapshot(root);const r=await verifyCatalogR2(root,{apply:true,check});assert.equal(r.ok,false);assert.deepEqual(snapshot(root),before);
});
test('concurrent edit is detected before write',async t=>{
 const root=fixture(t);const p=files(root)[0];let changed=false;await assert.rejects(verifyCatalogR2(root,{apply:true,check:async i=>{if(!changed){changed=true;const obj=JSON.parse(readFileSync(p));obj.featured=!obj.featured;writeFileSync(p,JSON.stringify(obj));}return check(i);}}),/Catalog changed/);assert.ok(loadMusicCatalog(root).every(r=>r.downloads.every(d=>d.bytes===undefined)));
});
test('actual verification path accepts expected signatures and rejects mislabeled data',async()=>{
 const options={verifyFormat:true,resolvePnpm:()=>({command:process.execPath,prefix:['mock-pnpm.cjs']})};
 const wav=Buffer.from('RIFF0000WAVE');const mp3=Buffer.from([255,251,144,0,0,0,0,0]);const tagged=Buffer.concat([Buffer.from([73,68,51,3,0,0,0,0,0,3]),Buffer.from([1,2,3]),mp3]);
 const run=buffer=>async(_cmd,args)=>writeFileSync(args[args.indexOf('--file')+1],buffer);
 const i=format=>({category:'dj-edits',slug:'sola',id:format,format});
 for(const [format,buffer] of [['wav',wav],['mp3',mp3],['mp3',tagged]])assert.equal((await checkR2(i(format),run(buffer),options)).bytes,buffer.length);
 await assert.rejects(checkR2(i('mp3'),run(wav),options),/No MPEG/);
 await assert.rejects(checkR2(i('wav'),run(mp3),options),/Expected WAVE/);
 await assert.rejects(checkR2(i('mp3'),run(tagged.subarray(0,13)),options),/No MPEG/);
});
