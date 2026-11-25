/** M12-A: Module 05 draft isolation auditor; run from apps/web. */
import { readFileSync,existsSync } from 'node:fs';
import { resolve } from 'node:path';
const root=process.cwd();
const manifest=JSON.parse(readFileSync(resolve(root,'config/dj-learn-curriculum.json'),'utf8'));
const issues=[];
const check=(ok,msg)=>{if(!ok)issues.push(msg)};
const module=manifest.modules.find(x=>x.id==='dj-module-05');
check(Boolean(module),'Missing dj-module-05');
check(module?.status==='draft','Module 05 must remain draft');
check(module?.lessonIds?.length===9,'Module 05 must have nine lessons');
check(manifest.modules.filter(x=>x.status==='published').length===4,'Expected precisely four published modules');
const read=(path)=>{const f=resolve(root,path);if(!existsSync(f)){issues.push('Missing '+path);return '';}return readFileSync(f,'utf8')};
const get=(src,key)=>{const row=src.split(/\r?\n/).find(x=>x.startsWith(key+':'));return row?.slice(key.length+1).trim().replace(/^['"]|['"]$/g,'')??'';};
for(const locale of ['en','es']){
 const modPath=`content/learn/${locale}/modules/dj-module-05.mdx`;
 const mod=read(modPath);
 check(get(mod,'status')==='draft',modPath+' is not draft');
 check(get(mod,'locale')===locale,modPath+' wrong locale');
 module?.lessonIds?.forEach((id,i)=>{
   const path=`content/learn/${locale}/lessons/${id}.mdx`;
   const doc=read(path);
   for(const [k,val] of Object.entries({id,locale,moduleId:'dj-module-05',order:String(i+1),status:'draft'}))check(get(doc,k)===val,`${path}: ${k} should be ${val}`);
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
   check(!xml.includes(slug),`${f}: draft module 05 included in sitemap`);
  }
 }
}
console.log(`M12-A Module 05 draft guard: ${module?.lessonIds?.length??0} lessons x 2 locales; 4 published; ${issues.length} errors`);
for(const issue of issues)console.error('ERROR',issue);
if(issues.length)process.exitCode=1;
