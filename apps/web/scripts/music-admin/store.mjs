import { cpSync, mkdtempSync, mkdirSync, writeFileSync, renameSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { categories, loadMusicCatalog, validateRelease } from '../../lib/music/catalog.mjs';
export function youtubeId(value) {
 if (!value) return undefined;
 if (/^[\w-]{11}$/.test(value)) return value;
 const u = new URL(value); if (u.protocol !== 'https:') throw Error('Use an HTTPS YouTube URL');
 const host=u.hostname; const id=host==='youtu.be'?u.pathname.split('/')[1]:['youtube.com','www.youtube.com','m.youtube.com','www.youtube-nocookie.com'].includes(host)?(u.pathname==='/watch'?u.searchParams.get('v'): /^\/(embed|shorts|live)\//.test(u.pathname)?u.pathname.split('/')[2]:null):null;
 if (!id || !/^[\w-]{11}$/.test(id)) throw Error('Invalid YouTube URL'); return id;
}
export function saveRelease(root, input, {dryRun=false}={}) {
 const {bodies,tracklist=[],...r}=input; r.youtubeId=youtubeId(r.youtubeId);
 validateRelease(r,r.category,r.slug);
 if (!bodies || !['en','es'].every(l=>typeof bodies[l]==='string')) throw Error('Both MDX bodies required');
 const existing=loadMusicCatalog(root).find(e=>e.id===r.id);
 if(existing && (existing.slug!==r.slug || existing.category!==r.category)) throw Error('Changing category or slug is not supported');
 const target=join(root,r.category,r.slug);
 if(existsSync(target)&&!existing) throw Error('Slug already exists');
 const temp=mkdtempSync(join(tmpdir(),'naa-music-'));
 try {
  const copy=join(temp,'music'); cpSync(root,copy,{recursive:true});
  const dir=join(copy,r.category,r.slug); mkdirSync(dir,{recursive:true});
  const files={'release.json':JSON.stringify(r,null,2)+'\n','en.mdx':bodies.en,'es.mdx':bodies.es};
  if(r.category==='dj-sets') files['tracklist.json']=JSON.stringify(tracklist,null,2)+'\n';
  for(const [name,data] of Object.entries(files)) writeFileSync(join(dir,name),data);
  loadMusicCatalog(copy);
  if(!dryRun){
   const stage=mkdtempSync(join(root,r.category,'.admin-')); const backup=join(stage,'previous'); const next=join(stage,'next');
   try {cpSync(dir,next,{recursive:true}); if(existsSync(target))renameSync(target,backup); try{renameSync(next,target);}catch(e){if(existsSync(backup))renameSync(backup,target);throw e;}} finally {if(!existsSync(backup)||existsSync(target))rmSync(stage,{recursive:true,force:true});}
  }
  return {id:r.id,category:r.category,slug:r.slug,status:r.status};
 } finally {rmSync(temp,{recursive:true,force:true});}
}
export function emptyRelease(category){if(!categories.includes(category))throw Error('Invalid category');const locale=()=>({title:'',description:'',metaTitle:'',metaDescription:'',coverAlt:''});return {id:'',slug:'',category,status:'draft',featured:false,locales:{en:locale(),es:locale()},artists:['Not an Angel'],genres:[],originalTracks:[],downloads:category==='dj-sets'?[]:[{id:'mp3',format:'mp3',label:'MP3 320 kbps',rights:'pending',enabled:false}],bodies:{en:'',es:''},tracklist:[]};}
