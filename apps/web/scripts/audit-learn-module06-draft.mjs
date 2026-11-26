/** M13-A: module 06 draft guard. Run from apps/web, read-only. */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root = process.cwd();
const read = (p) => existsSync(resolve(root,p)) ? readFileSync(resolve(root,p),'utf8') : null;
const errors=[];const check=(ok,msg)=>{if(!ok)errors.push(msg);};
const manifest=JSON.parse(read('config/dj-learn-curriculum.json')??'{}');
const mods=manifest.modules??[];
const mod=mods.find(m=>m.id==='dj-module-06');
check(mod?.status==='draft','Module 06 must stay draft');
check(mod?.lessonIds?.length===7,'Module 06 must contain exactly seven lessons');
check(mods.filter(m=>m.status==='published').length===5,'Only five modules may be published');
for (let i=1;i<=5;i++) check(mods.some(m=>m.id===`dj-module-${String(i).padStart(2,'0')}`&&m.status==='published'),`Module 0${i} must stay published`);
const fm=(s,p)=>{
 const m=s?.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
 if(!m){errors.push(`Missing frontmatter: ${p}`);return {};}
 const f={};for(const line of m[1].split(/\r?\n/)){const match=line.match(/^([\w-]+):\s*(.*?)\s*$/);if(match)f[match[1]]=match[2].replace(/^['"]|['"]$/g,'');}
 return f;
};
let docs=0;
for(const locale of ['en','es']){
 const modulePath=`content/learn/${locale}/modules/dj-module-06.mdx`;
 const moduleSource=read(modulePath);const moduleMeta=fm(moduleSource,modulePath);
 check(moduleMeta.id==='dj-module-06'&&moduleMeta.locale===locale&&moduleMeta.status==='draft',`${modulePath}: invalid draft metadata`);
 check(!!moduleMeta.title&&!!moduleMeta.description,`${modulePath}: missing SEO fields`);docs++;
 for(const [i,id] of (mod?.lessonIds??[]).entries()){
  const p=`content/learn/${locale}/lessons/${id}.mdx`;const s=read(p);const data=fm(s,p);
  for(const [k,v] of Object.entries({id,locale,moduleId:'dj-module-06',order:String(i+1),status:'draft'}))check(data[k]===v,`${p}: ${k} mismatch`);
  check(!!data.title&&!!data.description&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug??''),`${p}: missing or invalid SEO field`);
  docs++;
 }
}
if(process.argv.includes('--export')){
 for(const locale of ['en','es']){
  const slug=mod?.slugs?.[locale];const prefix=locale==='en'?'/learn-to-dj/':'/es/curso-dj/';
  const moduleURL=`${prefix}${slug}/`;
  const xml=read(`out/sitemaps/${locale}/learn-to-dj.xml`);
  check(!!xml,`Missing exported Learn sitemap for ${locale}`);
  check(!xml?.includes(moduleURL),`Draft module 06 leaked into ${locale} sitemap`);
  const index=read(`out${moduleURL}index.html`);
  check(index===null,`Draft module 06 has exported page ${moduleURL}`);
 }
}
console.log(`M13-A Module 06 draft guard: ${docs} draft documents; ${mods.filter(m=>m.status==='published').length} published modules; ${errors.length} errors`);
for(const error of errors) console.error('ERROR',error);
if(errors.length)process.exitCode=1;
