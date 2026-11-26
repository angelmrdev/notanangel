/** M12-K: module 05 bilingual release audit. Read-only; run from apps/web.
 * Does not substitute for build + verify-learn-release-export + public-page audit.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root=process.cwd();
const read=(p)=>existsSync(resolve(root,p))?readFileSync(resolve(root,p),'utf8'):null;
const errors=[];const warnings=[];
const check=(condition,message)=>{if(!condition)errors.push(message)};
const manifest=JSON.parse(read('config/dj-learn-curriculum.json')??'{}');
const mod=(manifest.modules??[]).find(m=>m.id==='dj-module-05');
check(!!mod,'Module 05 missing from curriculum');
check(mod?.status==='published','Module 05 must be published');
check(mod?.lessonIds?.length===9,'Module 05 must have nine lessons');
check((manifest.modules??[]).filter(m=>m.status==='published').length===5,'Exactly five Learn modules must be published');
const registry=read('components/learn/educational-components.tsx')??'';
const routes=new Set();const normalized=(u)=>u.endsWith('/')?u:`${u}/`;
const docs=[];
const parse=(s,p)=>{
 const m=s?.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
 if(!m){errors.push('Missing frontmatter: '+p);return {}};
 const data={};for(const line of m[1].split(/\r?\n/)){
  const kv=line.match(/^([\w-]+):\s*(.*?)\s*$/);if(!kv)continue;
  data[kv[1]]=kv[2].replace(/^['"]|['"]$/g,'');
 }return data;
};
for(const m of manifest.modules??[]){if(m.status!=='published')continue;
 for(const locale of ['en','es']){
  const prefix=locale==='en'?'/learn-to-dj/':'/es/curso-dj/';
  const mp=prefix+m.slugs[locale]+'/';routes.add(mp);
  const modulePath=`content/learn/${locale}/modules/${m.id}.mdx`;
  const moduleSource=read(modulePath);const mf=parse(moduleSource,modulePath);
  check(mf.status==='ready',`${modulePath}: expected ready`);
  for(const id of m.lessonIds){
   const p=`content/learn/${locale}/lessons/${id}.mdx`;
   const s=read(p);const f=parse(s,p);
   if(f.slug)routes.add(mp+f.slug+'/');
  }
 }
}
const exportsByName=new Map();
for(const file of [
 'module05-music-sources-visuals', 'module05-audio-formats-visuals',
 'module05-metadata-visuals', 'module05-library-organization-visuals',
 'module05-playlists-visuals', 'module05-beatgrids-visuals',
 'module05-hotcues-visuals', 'module05-tagging-visuals',
 'module05-backup-visuals'
]){
 const path=`components/learn/${file}.tsx`;
 const content=read(path);
 check(!!content,`Missing component family ${path}`);
 const cssPath=`components/learn/${file}.module.css`;
 const css=read(cssPath);
 check(!!css,`Missing stylesheet: ${cssPath}`);
 for(const name of content?.matchAll(/export\s+(?:const|function)\s+(\w+)/g)??[]){exportsByName.set(name[1],file)}
 for(const cssClass of content?.matchAll(/\bs\.([A-Za-z][\w]*)/g)??[]){
  check(new RegExp('\\.'+cssClass[1]+'(?=[\\s.{:#>+~,\\[])').test(css??''),`${path}: missing CSS class ${cssClass[1]}`);
 }
}
let diagramCount=0,linkCount=0;
for(const locale of ['en','es']){
 const modulePath=`content/learn/${locale}/modules/dj-module-05.mdx`;
 const moduleContent=read(modulePath), moduleFront=parse(moduleContent,modulePath);
 check(moduleFront.locale===locale&&moduleFront.id==='dj-module-05'&&moduleFront.status==='ready',`Incorrect module page: ${modulePath}`);
 check(!!moduleFront.title&&!!moduleFront.description,`Missing module SEO: ${modulePath}`);
 for(const [i,id] of (mod?.lessonIds??[]).entries()){
  const p=`content/learn/${locale}/lessons/${id}.mdx`,content=read(p),fm=parse(content,p);
  check(fm.id===id&&fm.locale===locale&&fm.moduleId==='dj-module-05'&&fm.order===String(i+1),`Incorrect identity/order: ${p}`);
  check(fm.status==='ready',`Not ready: ${p}`);
  check(!!fm.title&&!!fm.description&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fm.slug??''),`Invalid SEO fields: ${p}`);
  check((content?.match(/^##\s+/gm)??[]).length>=5,`Incomplete section structure: ${p}`);
  const comps=[...(content?.matchAll(/<([A-Z][A-Za-z0-9]+)\s*\/>/g)??[])].map(x=>x[1]);
  check(comps.length===8,`Expected 8 diagrams: ${p}, got ${comps.length}`);
  for(const component of comps){diagramCount++;
   check(component.endsWith(locale==='en'?'En':'Es'),`Wrong locale component ${component} in ${p}`);
   check(exportsByName.has(component),`Missing exported component: ${component}`);
   check(new RegExp('\\b'+component+'\\b').test(registry),`Missing registered component: ${component}`);
  }
  docs.push({id,locale,comps:comps.map(c=>c.replace(/(?:En|Es)$/,''))});
  for(const match of (content?.matchAll(/\]\((\/[^\s)]+)(?:\s+[^)]*)?\)/g)??[])){
   const url=normalized(match[1].split(/[?#]/)[0]);
   if(url.startsWith('/learn-to-dj/')||url.startsWith('/es/curso-dj/')){
    linkCount++;check(routes.has(url),`${p}: dead Learn link ${url}`);
    check(url.startsWith(locale==='en'?'/learn-to-dj/':'/es/curso-dj/'),`${p}: cross-language link ${url}`);
   }
  }
 }
}
for(const id of mod?.lessonIds??[]){
 const en=docs.find(d=>d.id===id&&d.locale==='en');const es=docs.find(d=>d.id===id&&d.locale==='es');
 check(JSON.stringify(en?.comps)===JSON.stringify(es?.comps),`${id}: EN/ES visual order differs`);
}
check(diagramCount===144,`Expected 144 localized diagrams, got ${diagramCount}`);
check(routes.size===88,`Expected 88 localized content routes across five modules, got ${routes.size}`);
if(process.argv.includes('--export')){
 for(const locale of ['en','es']){
  const f=`out/sitemaps/${locale}/learn-to-dj.xml`;
  const xml=read(f);check(!!xml,`Missing export sitemap ${f}`);
  const slug=locale==='en'?'/learn-to-dj/music-library/':'/es/curso-dj/biblioteca-musical/';
  check(xml?.includes(slug),`${f}: module 05 missing from sitemap`);
 }
}
console.log(`M12-K module 05 release audit: 9 EN + 9 ES lessons; ${diagramCount} localized diagrams; ${linkCount} Learn links; 5 published modules; ${errors.length} errors, ${warnings.length} warnings`);
for(const e of errors)console.error('ERROR',e);
for(const w of warnings)console.warn('WARN',w);
if(errors.length)process.exitCode=1;
