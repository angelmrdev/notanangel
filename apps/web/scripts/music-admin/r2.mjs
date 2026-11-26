import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {mkdtemp,stat,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {pnpmInvocation} from './pnpm.mjs';
import {verifyAudioHeader} from './audio-header.mjs';
import {objectKey} from '../../lib/music/downloads.mjs';
const exec=promisify(execFile);
const config=fileURLToPath(new URL('../../../../infra/music-downloads/wrangler.toml',import.meta.url));
export async function checkR2(input,run=exec,{verifyFormat=false,resolvePnpm=pnpmInvocation}={}){
 const key=objectKey(input.category,input.slug,input.id,input.format);
 const {command,prefix}=resolvePnpm();
 const dir=await mkdtemp(join(tmpdir(),'naa-r2-'));const file=join(dir,'audio');
 try{
  await run(command,[...prefix,'dlx','wrangler@4.168.0','r2','object','get',`notanangel/${key}`,'--remote','--file',file,'--config',config],{timeout:180000,maxBuffer:1024*1024,windowsHide:true});
  const {size}=await stat(file);if(!size)throw Error('Empty object');
  if(verifyFormat)await verifyAudioHeader(file,input.format,size);
  return {key,bytes:size};
 }catch(e){throw Error(`R2 check failed for ${key}: ${e.code==='ENOENT'?'pnpm executable or temporary file missing':(/^(Expected WAVE|No MPEG|Invalid ID3|Empty object)/.test(e.message))?e.message:'verify object, Wrangler login and connection'}`);}finally{await rm(dir,{recursive:true,force:true});}
}
