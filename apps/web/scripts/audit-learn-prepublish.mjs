/**
 * Read-only Learn prepublication audit. Run from apps/web:
 * node scripts/audit-learn-prepublish.mjs
 * No dependencies beyond Node; does NOT change publication state.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (relative) => readFileSync(path.join(root, relative), 'utf8');
const manifest = JSON.parse(read('config/dj-learn-curriculum.json'));
const registryText = read('components/learn/educational-components.tsx');
const match = registryText.match(/export\s+const\s+learnMdxComponents\s*=\s*\{([\s\S]*?)\};/);
if (!match) throw new Error('Could not locate learnMdxComponents registry');
const registry = new Set([...match[1].matchAll(/\b[A-Za-z_$][A-Za-z0-9_$]*\b/g)].map((m)=>m[0]));
const issues = [];
const log = (kind, subject, detail) => issues.push({ kind, subject, detail });
const seenRoutes = new Map();
const documents = [];
const parseFrontmatter = (raw, file) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) { log('ERROR', file, 'Missing YAML frontmatter'); return {data:{},body:raw}; }
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m=line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*?)\s*$/);
    if (m) data[m[1]]=m[2].replace(/^(['"])(.*)\1$/,'$2');
  }
  return {data,body:raw.slice(match[0].length)};
};
const urlFor = (mod,locale,slug='')=> `${locale==='en'?'/learn-to-dj':'/es/curso-dj'}/${mod.slugs[locale]}/${slug?`${slug}/`:''}`;
const publishedRoutes = new Set(['/learn-to-dj/','/es/curso-dj/']);
const ids = new Set();
for (const mod of manifest.modules) {
  if(ids.has(mod.id)) log('ERROR',mod.id,'Module ID duplicated');
  ids.add(mod.id);
  for(const locale of ['en','es']) {
    const expected=[{kind:'modules',id:mod.id,order:null},...mod.lessonIds.map((id,i)=>({kind:'lessons',id,order:i+1}))];
    for(const item of expected) {
      const relative=`content/learn/${locale}/${item.kind}/${item.id}.mdx`;
      if(!existsSync(path.join(root,relative))){log('ERROR',relative,'File missing');continue;}
      const {data,body}=parseFrontmatter(read(relative),relative);
      documents.push({relative,mod,locale,data,body,item});
      for(const [field,want] of Object.entries({id:item.id,locale})) if(data[field]!==want) log('ERROR',relative,`frontmatter ${field}=${JSON.stringify(data[field])}, expected ${JSON.stringify(want)}`);
      if(item.kind==='lessons') {
        if(data.moduleId!==mod.id)log('ERROR',relative,`moduleId must equal ${mod.id}`);
        if(Number(data.order)!==item.order)log('ERROR',relative,`order must equal ${item.order}`);
      }
      if(!['draft','ready'].includes(data.status))log('ERROR',relative,`Invalid status ${data.status}`);
      if(!data.title || !data.description)log('ERROR',relative,'Missing title or description');
      if(item.kind==='lessons' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug||''))log('ERROR',relative,`Invalid slug ${data.slug}`);
      const route=item.kind==='lessons'?urlFor(mod,locale,data.slug):urlFor(mod,locale);
      if(seenRoutes.has(route))log('ERROR',relative,`Route duplicates ${seenRoutes.get(route)}`);
      seenRoutes.set(route,relative);
      publishedRoutes.add(route);
      for(const tag of new Set([...body.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)].map(x=>x[1]))) {
        if(!registry.has(tag) && !['Link','Image'].includes(tag)) log('ERROR',relative,`Unregistered MDX component <${tag}>`);
      }
      for(const [,url] of body.matchAll(/\]\((\/[^\s)]+)(?:\s+[^)]*)?\)/g)) {
        const clean=url.split(/[?#]/)[0].replace(/\/$/,'')+'/';
        if((clean.startsWith('/learn-to-dj/')||clean.startsWith('/es/curso-dj/'))&&!publishedRoutes.has(clean)) {
          // Checked again after gathering all routes.
        }
      }
      if(/<https?:\/\//.test(body))log('WARN',relative,'Angle-bracket URL: may be rejected by MDX');
      if(/\b(?:TODO|FIXME|TBD|PLACEHOLDER)\b/.test(body))log('WARN',relative,'Possible unfinished editorial marker (inspect manually)');
    }
  }
}
for(const d of documents) {
  for(const [,url] of d.body.matchAll(/\]\((\/[^\s)]+)(?:\s+[^)]*)?\)/g)) {
    let clean=url.split(/[?#]/)[0];clean=clean.endsWith('/')?clean:`${clean}/`;
    if((clean.startsWith('/learn-to-dj/')||clean.startsWith('/es/curso-dj/'))&&!publishedRoutes.has(clean))log('WARN',d.relative,`Internal Learn link has no registered destination: ${url}`);
  }
}
for(const mod of manifest.modules){
  if(mod.status==='published'){
    for(const d of documents.filter(d=>d.mod.id===mod.id)) if(d.data.status!=='ready') log('ERROR',d.relative,`Published module requires ready article, currently ${d.data.status}`);
  }
}
const counts={ modules:manifest.modules.length, lessons:manifest.modules.reduce((n,m)=>n+m.lessonIds.length,0), files:documents.length, registeredComponents:registry.size, errors:issues.filter(x=>x.kind==='ERROR').length, warnings:issues.filter(x=>x.kind==='WARN').length };
console.log('Learn prepublication audit (read-only)');
console.log(JSON.stringify(counts,null,2));
for(const issue of issues)console.log(`${issue.kind} ${issue.subject}: ${issue.detail}`);
console.log(`Module publication statuses: ${manifest.modules.map(m=>`${m.id}=${m.status}`).join(', ')}`);
console.log(`Document readiness: ${documents.filter(d=>d.data.status==='ready').length}/${documents.length} ready`);
if(counts.errors)process.exitCode=1;
