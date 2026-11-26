import {readFileSync,writeFileSync,renameSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {loadMusicCatalog,validateRelease} from '../lib/music/catalog.mjs';
import {objectKey,downloadUrl} from '../lib/music/downloads.mjs';
import {downloadFilename} from '../lib/music/filenames.mjs';
import {checkR2} from './music-admin/r2.mjs';

export async function verifyCatalogR2(root,{apply=false,check=input=>checkR2(input,undefined,{verifyFormat:true}),onResult=()=>{}}={}) {
 const releases=loadMusicCatalog(root);
 const targets=releases.filter(r=>r.status==='draft' && r.downloads.length);
 const snapshots=targets.map(r=>{
  const file=join(root,r.category,r.slug,'release.json');
  const original=readFileSync(file,'utf8');
  return {file,original,release:JSON.parse(original)};
 });
 const results=[];
 for(const {release:r} of snapshots) for(const d of r.downloads){
  const input={category:r.category,slug:r.slug,id:d.id,format:d.format};
  const result={releaseId:r.id,id:d.id,key:objectKey(r.category,r.slug,d.id,d.format),filename:downloadFilename(r,d),url:downloadUrl(r.id,d.id),rights:d.rights,enabled:d.enabled};
  try {
   const checked=await check(input);
   if(checked.key!==result.key || !Number.isSafeInteger(checked.bytes)||checked.bytes<=0)throw Error('Invalid verification result');
   if(d.enabled && d.bytes!==checked.bytes)throw Error('Enabled download changed size; disable and review it in Music Admin first');
   result.bytes=checked.bytes;result.ok=true;d.bytes=checked.bytes;
  }catch(e){result.ok=false;result.error=e instanceof Error?e.message:String(e);}
  results.push(result);onResult(result);
 }
 const ok=results.length>0 && results.every(r=>r.ok);
 let updated=0;
 if(apply && ok){
  // Check every snapshot before touching any file. Close Music Admin while running.
  for(const s of snapshots){
   if(readFileSync(s.file,'utf8')!==s.original)throw Error(`Catalog changed during verification: ${s.release.id}; rerun`);
   validateRelease(s.release,s.release.category,s.release.slug);
  }
  const changes=snapshots.filter(s=>JSON.stringify(JSON.parse(s.original))!==JSON.stringify(s.release));
  const staged=[];
  try{
   for(const s of changes){const temp=`${s.file}.${randomUUID()}.tmp`;writeFileSync(temp,JSON.stringify(s.release,null,2)+'\n',{flag:'wx'});staged.push({...s,temp});}
   for(const s of staged){renameSync(s.temp,s.file);updated++;}
  }finally{for(const s of staged)rmSync(s.temp,{force:true});}
 }
 return {results,ok,updated,skippedPublished:releases.filter(r=>r.status==='published').length};
}

if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
 const args=process.argv.slice(2);
 if(args.some(a=>a!=='--apply'))throw Error('Usage: node scripts/verify-music-r2.mjs [--apply]');
 const apply=args.includes('--apply');
 const root=fileURLToPath(new URL('../content/music/',import.meta.url));
 try{
  const report=await verifyCatalogR2(root,{apply,onResult:r=>{
   console.log(`${r.ok?'OK':'FAIL'} ${r.key} ${r.ok?`${r.bytes} bytes | ${r.filename}`:r.error}`);
   if(r.ok)console.log(`  ${r.url} | rights=${r.rights} | enabled=${r.enabled}`);
  }});
  console.log(`R2: ${report.results.filter(r=>r.ok).length}/${report.results.length} verified; ${report.updated} releases updated; ${report.skippedPublished} published releases skipped.`);
  console.log(!report.ok?'Verification incomplete. No catalog changes.':apply?'Sizes saved. Rights, enabled flags and publication status unchanged.':'Read-only check. Use --apply to verify again and save sizes.');
  if(!report.ok)process.exitCode=1;
 }catch(e){console.error(e.message);process.exitCode=1;}
}
