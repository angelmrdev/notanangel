/** Read-only SEO readiness audit for Learn. No publication state changes. */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = file => readFileSync(resolve(root, file), 'utf8');
const manifest = JSON.parse(read('config/dj-learn-curriculum.json'));
const base = 'https://notanangeldj.com';
const frontmatter = source => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error('Missing YAML frontmatter');
  return Object.fromEntries([...match[1].matchAll(/^([a-zA-Z][a-zA-Z0-9]*):\s*(.*)$/gm)].map(x => [x[1], x[2].trim().replace(/^['\"]|['\"]$/g, '')]));
};
const seen = new Set();
const issues = [];
const warn = [];
const route = (mod,lang,slug='') => `${lang==='es'?'/es/curso-dj':'/learn-to-dj'}/${mod.slugs[lang]}/${slug?`${slug}/`:''}`;
const check = (condition,message) => { if (!condition) issues.push(message); };
let count=0;
for(const mod of manifest.modules){
  for(const lang of ['en','es']) {
    const record = frontmatter(read(`content/learn/${lang}/modules/${mod.id}.mdx`));
    const url=route(mod,lang);
    check(!seen.has(url),`Duplicated route: ${url}`); seen.add(url);
    check(record.locale===lang&&record.id===mod.id,`Wrong module identity: ${lang}/${mod.id}`);
    check(typeof record.title==='string'&&record.title.trim().length>0,`Missing module title ${url}`);
    check(typeof record.description==='string'&&record.description.trim().length>0,`Missing module description ${url}`);
    for(const [i,id] of mod.lessonIds.entries()) {
      const data=frontmatter(read(`content/learn/${lang}/lessons/${id}.mdx`));
      const lessonUrl=route(mod,lang,data.slug);
      check(!seen.has(lessonUrl),`Duplicated route: ${lessonUrl}`); seen.add(lessonUrl);
      check(data.id===id&&data.locale===lang&&data.moduleId===mod.id&&Number(data.order)===i+1,`Incorrect lesson identity/order ${lang}/${id}`);
      check(typeof data.title==='string'&&data.title.trim().length>0,`Missing title ${lessonUrl}`);
      check(typeof data.description==='string'&&data.description.trim().length>0,`Missing description ${lessonUrl}`);
      check(data.status==='ready'||mod.status!=='published',`Published lesson not ready: ${lessonUrl}`);
      count++;
    }
    check(record.status==='ready'||mod.status!=='published',`Published module MDX not ready: ${url}`);
  }
}
for(const lang of ['en','es']) {
  const entry = lang==='en'?'app/(en)/learn-to-dj':'app/(es)/es/curso-dj';
  for(const filename of ['[module]/page.tsx','[module]/[lesson]/page.tsx']) {
    const source=read(`${entry}/${filename}`);
    check(source.includes('LearnJsonLd'),`Missing JSON-LD component: ${entry}/${filename}`);
    check(source.includes('learnModuleMetadata')||source.includes('learnLessonMetadata'),`Missing SEO metadata helper: ${entry}/${filename}`);
  }
  check(read(`${entry}/page.tsx`).includes('x-default'),`Missing x-default on Learn index ${lang}`);
}
const seo = read('lib/learn/seo.tsx');
for(const token of ['BreadcrumbList','LearningResource','Course','canonical','x-default','openGraph','isAccessibleForFree']) check(seo.includes(token),`Missing SEO feature: ${token}`);
const sitemap = read('scripts/generate-sitemaps.mjs');
for(const token of ['loadPublishedLearn','counterpart','hreflang','learn-to-dj']) check(sitemap.includes(token),`Missing sitemap feature: ${token}`);
check(seo.includes(base),`Wrong canonical domain`);
const output={modules:manifest.modules.length,localizedLessons:count,expectedIndexableLessons:manifest.modules.filter(x=>x.status==='published').reduce((n,x)=>n+x.lessonIds.length*2,0),errors:issues.length,warnings:warn.length};
console.log('Learn SEO prepublish audit:',JSON.stringify(output));
for(const v of warn) console.warn('WARN',v);
for(const v of issues) console.error('ERROR',v);
if(issues.length) process.exitCode=1;
