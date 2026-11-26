import {readFileSync,writeFileSync,renameSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {loadMusicCatalog,validateRelease} from '../lib/music/catalog.mjs';
export const initialNames = Object.freeze({
 'evanescence-bring-me-to-life':'Evanescence - Bring Me to Life (Not an Angel Edit)',
 'monica-naranjo-sola':'Mónica Naranjo - Sola (Not an Angel Remake)',
 'judeline-soldadito-espanol':'Judeline - Soldadito Español (Not an Angel Remake)',
 'till-the-world-ends-we-found-love':'Britney Spears x Rihanna - Till the World Ends x We Found Love (Not an Angel Mashup)',
 'soldadito-espanol-demasiadas-mujeres':'Judeline x C. Tangana - Soldadito Español x Demasiadas Mujeres (Not an Angel Mashup)',
 'superestrella-i-gotta-feeling':'Aitana x Black Eyed Peas - Superestrella x I Gotta Feeling (Not an Angel Mashup)',
});
export function setInitialNames(root,{apply=false}={}) {
 const catalog=loadMusicCatalog(root), changes=[];
 for(const release of catalog){
  if(!Object.hasOwn(initialNames,release.id)||release.downloadFilename!==undefined)continue;
  const file=join(root,release.category,release.slug,'release.json');
  const r=JSON.parse(readFileSync(file,'utf8'));
  r.downloadFilename=initialNames[release.id];validateRelease(r,r.category,r.slug);
  changes.push({file,r});
 }
 if(apply) for(const {file,r} of changes){const temp=`${file}.h3b-${process.pid}.tmp`;writeFileSync(temp,JSON.stringify(r,null,2)+'\n',{flag:'wx'});renameSync(temp,file);}
 return changes.map(({r})=>({id:r.id,filename:r.downloadFilename}));
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
 const args=process.argv.slice(2);if(args.some(a=>a!=='--apply'))throw Error('Usage: node scripts/set-initial-download-filenames.mjs [--apply]');
 const apply=args.includes('--apply'), root=fileURLToPath(new URL('../content/music/',import.meta.url));
 const changes=setInitialNames(root,{apply});for(const c of changes)console.log(`${c.id}: ${c.filename}`);
 console.log(`${apply?'Updated':'Preview'}: ${changes.length} releases. Existing custom names preserved.`);
}
