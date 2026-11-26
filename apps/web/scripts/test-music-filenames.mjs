import assert from 'node:assert/strict';
import {test} from 'node:test';
import {cpSync,mkdtempSync,rmSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {validDownloadStem,downloadFilename,contentDisposition} from '../lib/music/filenames.mjs';
import {loadMusicCatalog,validateRelease} from '../lib/music/catalog.mjs';
import {saveRelease} from './music-admin/store.mjs';
import {setInitialNames} from './set-initial-download-filenames.mjs';
import {buildManifest} from '../../../infra/music-downloads/manifest.mjs';
import {handler} from '../../../infra/music-downloads/worker.mjs';
const source=fileURLToPath(new URL('../content/music/',import.meta.url));
const draft=loadMusicCatalog(source).find(r=>r.id==='judeline-soldadito-espanol');
const custom='Judeline - Soldadito Español (Not an Angel Remake)';
const now=new Date('2026-11-26');
const live={...draft,status:'published',publishedAt:'2026-11-25',downloadFilename:custom,downloads:[{id:'mp3',format:'mp3',label:'MP3',rights:'authorized',enabled:true,bytes:3},{id:'wav',format:'wav',label:'WAV',rights:'pending',enabled:false}]};
test('safe names, Unicode and byte limits',()=>{
 for(const name of [custom,'日本語','Artist × Artist - Title','a'.repeat(200),'é'.repeat(100)])assert.equal(validDownloadStem(name),true,name);
 for(const name of ['',null,123,'../file','a/b','a\\b','a"b','a\r\nX-Evil: yes','a\u0000b','a\u202eb','CON','LPT1.foo','NUL .foo','file.',' file','file ','file.MP3','file.wav','.hidden','a'.repeat(201),'é'.repeat(101),'\ud800'])assert.equal(validDownloadStem(name),false,String(name));
});
test('catalog validates optional filename, old releases still load',()=>{
 assert.equal(validateRelease({...draft,downloadFilename:custom},draft.category,draft.slug).downloadFilename,custom);
 assert.throws(()=>validateRelease({...draft,downloadFilename:'../unsafe'},draft.category,draft.slug));
 assert.equal(downloadFilename({...draft,downloadFilename:undefined},draft.downloads[0]),`${draft.slug}-mp3.mp3`);
});
test('one stem, two extensions, Unicode response and safe ASCII fallback',()=>{
 assert.equal(downloadFilename(live,live.downloads[0]),custom+'.mp3');
 assert.equal(downloadFilename(live,live.downloads[1]),custom+'.wav');
 const header=contentDisposition(custom+'.mp3','mp3');
 assert.match(header,/filename="Judeline - Soldadito Espanol \(Not an Angel Remake\)\.mp3"/);
 assert.equal(decodeURIComponent(header.split("filename*=UTF-8''")[1]),custom+'.mp3');
 assert.match(contentDisposition('日本語.wav','wav'),/filename="download.wav"/);
 assert.match(contentDisposition("A's (Edit)*".replace('*','!')+'.mp3','mp3'),/%27.*%28Edit%29/);
 assert.throws(()=>contentDisposition('bad\r\nX-Evil: yes.mp3','mp3'));
 assert.throws(()=>contentDisposition('safe.wav','mp3'));
});
test('manifest preserves R2 key, excludes disabled, drafts and future releases',()=>{
 const entries=buildManifest([live,{...live,status:'draft'},{...live,publishedAt:'2026-12-01'}],now);
 assert.deepEqual(entries,[{releaseId:live.id,id:'mp3',format:'mp3',bytes:3,key:`${live.category}/${live.slug}/mp3.mp3`,filename:custom+'.mp3'}]);
 assert.deepEqual(buildManifest([{...live,downloads:[{...live.downloads[0],rights:'blocked'}]}],now),[]);
});
test('worker GET and HEAD use same filename, do not change payload, reject unsafe manifest',async()=>{
 const [entry]=buildManifest([live],now), data=new Uint8Array([1,2,3]);let key;
 const env={MUSIC:{get:async k=>{key=k;return {size:3,body:data}},head:async k=>{key=k;return {size:3}}}};
 const url=`https://example.com/download/${live.id}/mp3`;
 const get=await handler([entry])(new Request(url),env),head=await handler([entry])(new Request(url,{method:'HEAD'}),env);
 assert.equal(get.status,200);assert.equal(head.status,200);assert.equal(key,entry.key);
 assert.equal(get.headers.get('content-disposition'),head.headers.get('content-disposition'));
 assert.equal(decodeURIComponent(get.headers.get('content-disposition').split("filename*=UTF-8''")[1]),custom+'.mp3');
 assert.deepEqual(new Uint8Array(await get.arrayBuffer()),data);assert.equal(head.body,null);
 assert.equal((await handler([{...entry,filename:'bad\nname.mp3'}])(new Request(url),env)).status,404);
});
test('migration preview and apply preserve existing names, rights, sizes and other fields',()=>{
 const tmp=mkdtempSync(join(tmpdir(),'naa-filenames-'));
 try{
  cpSync(source,tmp,{recursive:true});
  const r=loadMusicCatalog(tmp).find(x=>x.id===draft.id);r.downloadFilename='My custom name';r.downloads[0].bytes=4321;saveRelease(tmp,r);
  const file=join(tmp,r.category,r.slug,'release.json'), before=readFileSync(file,'utf8');
  const preview=setInitialNames(tmp);assert.equal(preview.some(x=>x.id===r.id),false);assert.equal(readFileSync(file,'utf8'),before);
  assert.deepEqual(setInitialNames(tmp,{apply:true}),preview);assert.equal(readFileSync(file,'utf8'),before);
  assert.deepEqual(setInitialNames(tmp,{apply:true}),[]);
  const entries=loadMusicCatalog(tmp);for(const e of entries){const original=loadMusicCatalog(source).find(x=>x.id===e.id);if(e.id!==r.id){const {downloadFilename:ignored,...other}=e;const {downloadFilename:previous,...expected}=original;assert.deepEqual(other,expected);assert.ok(ignored);}}
  const saved=entries.find(x=>x.id===r.id);assert.equal(saved.downloads[0].bytes,4321);assert.equal(saved.downloadFilename,'My custom name');
 }finally{rmSync(tmp,{recursive:true,force:true});}
});
