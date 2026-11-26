import {existsSync,readFileSync,readdirSync,mkdirSync,copyFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {loadMusicCatalog} from '../lib/music/catalog.mjs';
import {musicTemplates} from '../lib/music/publication.mjs';
const web=fileURLToPath(new URL('../',import.meta.url));
export function routePlan(root,entries,{apply=false,check=false,now=new Date()}={}) {
 const names=musicTemplates(entries,now), plan=[];
 for(const locale of ['en','es']) {
  const base=locale==='en'?'music':'musica';
  const source=join(root,'music-preview',locale,base);
  const dest=join(root,'app',locale==='en'?'(en)':'(es)/es',base);
  const walk=(dir,prefix='')=>existsSync(dir)?readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name),prefix+e.name+'/'):[prefix+e.name]):[];
  for(const name of walk(dest))if(!names.includes(name))throw Error(`Unexpected Music route file: ${join(dest,name)}; remove obsolete generated routes explicitly`);
  for(const name of names){const from=join(source,name),to=join(dest,name);if(!existsSync(from))throw Error(`Missing route template: ${from}`);if(existsSync(to)){if(!readFileSync(from).equals(readFileSync(to)))throw Error(`Route differs from template: ${to}`);}else if(check)throw Error(`Missing public route: ${to}; run prepare-music-routes.mjs --apply`);else plan.push({from,to});}
 }
 if(apply)for(const {from,to} of plan){mkdirSync(dirname(to),{recursive:true});copyFileSync(from,to,1);}
 return {expected:names.length*2,missing:plan.length};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const args=process.argv.slice(2);if(args.some(a=>!['--apply','--check'].includes(a))||args.length>1)throw Error('Use --apply or --check');const result=routePlan(web,loadMusicCatalog(join(web,'content/music')),{apply:args.includes('--apply'),check:args.includes('--check')});console.log(`Music routes: ${result.expected} expected, ${result.missing} ${args.includes('--apply')?'created':'missing'}`);}
