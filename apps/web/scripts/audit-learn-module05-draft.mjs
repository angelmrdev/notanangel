/** M12-A: Module 05 draft isolation auditor; run from apps/web. */
import { readFileSync,existsSync } from 'node:fs';
import { resolve } from 'node:path';
const root=process.cwd();
const manifest=JSON.parse(readFileSync(resolve(root,'config/dj-learn-curriculum.json'),'utf8'));
const issues=[];
const check=(ok,msg)=>{if(!ok)issues.push(msg)};
const module05=manifest.modules.find(x=>x.id==='dj-module-05');
check(Boolean(module05),'Missing dj-module-05');
check(['draft','published'].includes(module05?.status),'Module 05 must be draft or published');
const release = module05?.status === 'published';
const expected = release ? 'ready' : 'draft';
check(module05?.lessonIds?.length===9,'Module 05 must have nine lessons');
check(manifest.modules.filter(x=>x.status==='published').length===(release ? 5 : 4),'Expected publication count for module 05 state');
const read=(path)=>{const f=resolve(root,path);if(!existsSync(f)){issues.push('Missing '+path);return '';}return readFileSync(f,'utf8')};
const get=(src,key)=>{const row=src.split(/\r?\n/).find(x=>x.startsWith(key+':'));return row?.slice(key.length+1).trim().replace(/^['"]|['"]$/g,'')??'';};
for(const locale of ['en','es']){
 const modPath=`content/learn/${locale}/modules/dj-module-05.mdx`;
 const mod=read(modPath);
 check(get(mod,'status')===expected,modPath+' has incorrect status');
 check(get(mod,'locale')===locale,modPath+' wrong locale');
 module05?.lessonIds?.forEach((id,i)=>{
   const path=`content/learn/${locale}/lessons/${id}.mdx`;
   const doc=read(path);
   for(const [k,val] of Object.entries({id,locale,moduleId:'dj-module-05',order:String(i+1),status:expected}))check(get(doc,k)===val,`${path}: ${k} should be ${val}`);
   check(Boolean(get(doc,'slug')&&get(doc,'title')&&get(doc,'description')),path+' missing metadata');
 });
}
// Optional post-build leak check: export may not yet exist when preparing source.
const sitemap=resolve(root,'out/sitemaps');
if(existsSync(sitemap)){
 for(const locale of ['en','es']){
  const f=resolve(sitemap,locale,'learn-to-dj.xml');
  if(existsSync(f)){
   const xml=readFileSync(f,'utf8');
   const slug=locale==='en'?'/music-library/':'/biblioteca-musical/';
   if (process.argv.includes('--export')) check(release ? xml.includes(slug) : !xml.includes(slug), `${f}: wrong sitemap publication state for module 05`);
  }
 }
}
console.log(`M12-K Module 05 publication state guard: ${expected}; ${module05?.lessonIds?.length??0} lessons x 2 locales; ${manifest.modules.filter(x => x.status === 'published').length} published; ${issues.length} errors`);
for(const issue of issues)console.error('ERROR',issue);
if(issues.length)process.exitCode=1;
