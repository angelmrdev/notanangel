import {existsSync} from 'node:fs';
import {win32,posix} from 'node:path';

// pnpm run supplies npm_execpath; pnpm exec does not necessarily supply it.
// Do not invoke .cmd/.bat through a shell: file paths can contain spaces or shell metacharacters.
export function pnpmInvocation({env=process.env,platform=process.platform,node=process.execPath,exists=existsSync}={}) {
 const windows=platform==='win32';
 const path=windows?win32:posix;
 const explicit=env.NAA_PNPM_EXEC_PATH || env.npm_execpath;
 const fromPath=p=>{
  if(!p || !exists(p))return null;
  if(/\.(?:cjs|mjs|js)$/i.test(p))return {command:node,prefix:[p]};
  if(windows && /\.exe$/i.test(p))return {command:p,prefix:[]};
  if(!windows && !/\.(?:cmd|bat|ps1)$/i.test(p))return {command:p,prefix:[]};
  return null;
 };
 const selected=fromPath(explicit);
 if(selected)return selected;
 if(env.NAA_PNPM_EXEC_PATH)throw Error('NAA_PNPM_EXEC_PATH must point to an existing pnpm JS entry point or executable (not a shell shim)');
 if(!windows)return {command:'pnpm',prefix:[]};
 const search=env.Path || env.PATH || '';
 for(const raw of search.split(';')){
  const dir=raw.trim().replace(/^"|"$/g,'');if(!dir)continue;
  for(const name of ['pnpm.exe','pnpm.cjs','node_modules/pnpm/bin/pnpm.cjs','node_modules/corepack/dist/pnpm.js']){
   const candidate=fromPath(path.join(dir,name));if(candidate)return candidate;
  }
 }
 throw Error('Cannot locate pnpm executable. Use pnpm --dir apps/web run music:r2:verify --apply, or set NAA_PNPM_EXEC_PATH to the pnpm .cjs/.js/.exe entry point.');
}
