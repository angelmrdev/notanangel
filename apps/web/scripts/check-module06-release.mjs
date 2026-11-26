/** Module 06 pre-deploy static release smoke test. No third-party dependencies. */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const root = process.cwd();
const read = p => readFileSync(resolve(root,p),'utf8');
const manifest = JSON.parse(read('config/dj-learn-curriculum.json'));
const mod = manifest.modules.find(m => m.id === 'dj-module-06');
assert(mod, 'Module 06 is absent from the curriculum');
assert.equal(mod.status, 'published');
assert.equal(mod.lessonIds.length, 7);
const registry = read('components/learn/educational-components.tsx');
const slugLists = new Map();
let componentCount=0, internalLinkCount=0;
for (const locale of ['en','es']) {
  const prefix = locale === 'en' ? '/learn-to-dj/' : '/es/curso-dj/';
  const prefixModule = `${prefix}${mod.slugs[locale]}/`;
  const lessonSlugs = new Set();
  const docs = [];
  for(const [index, id] of mod.lessonIds.entries()) {
    const p=`content/learn/${locale}/lessons/${id}.mdx`;
    const body=read(p);
    const meta=Object.fromEntries([...body.matchAll(/^([\w]+):\s*"?([^"\r\n]+)"?$/gm)].map(([,key,value])=>[key,value.replace(/"$/,'')]));
    assert.equal(meta.id,id,p); assert.equal(meta.locale,locale,p);
    assert.equal(meta.moduleId,mod.id,p); assert.equal(meta.status,'ready',p);
    assert.equal(Number(meta.order),index+1,p);
    assert(meta.title?.trim() && meta.description?.trim(),`Missing SEO fields in ${p}`);
    assert(meta.slug && !lessonSlugs.has(meta.slug),`Duplicate/missing slug in ${p}`);
    lessonSlugs.add(meta.slug);
    for (const [,component] of body.matchAll(/<([A-Z][\w]+)\s*\/>/g)) {
      assert(component.endsWith(locale==='en'?'En':'Es'), `Wrong-language component ${component} in ${p}`);
      assert(new RegExp(`\\b${component}\\b`).test(registry),`Unregistered MDX component ${component} in ${p}`);
      componentCount++;
    }
    const links = [...body.matchAll(/\]\((\/[^)#]+)\)/g)].map(m=>m[1]);
    for (const link of links) {
      assert(link.startsWith(prefixModule),`Wrong route prefix in ${p}: ${link}`);
      internalLinkCount++;
    }
    docs.push({p,links});
  }
  for (const {p,links} of docs) for (const link of links) {
    assert(lessonSlugs.has(link.slice(prefixModule.length).replace(/\/$/,'')),`Broken internal lesson link in ${p}: ${link}`);
  }
  const moduleFile=`content/learn/${locale}/modules/dj-module-06.mdx`;
  const content=read(moduleFile);
  assert(/^status: "ready"$/m.test(content),`Module frontmatter not ready: ${moduleFile}`);
  slugLists.set(locale,lessonSlugs);
}
for(const f of ['module06-tempo-visuals','module06-ear-visuals','module06-sync-visuals','module06-alignment-visuals','module06-cue-visuals','module06-drift-visuals','module06-transition-visuals']) {
  const tsx=`components/learn/${f}.tsx`;
  assert(existsSync(resolve(root,tsx)),`Missing ${tsx}`);
  assert(existsSync(resolve(root,`components/learn/${f}.module.css`)),`Missing CSS for ${f}`);
  assert(registry.includes(`from './${f}'`),`Module visual not imported: ${f}`);
}
console.log(`Module 06 release smoke test PASS: 14 lessons, 2 module MDX, ${componentCount} embedded resources, ${internalLinkCount} internal lesson links; EN/ES slugs, statuses and registrations verified.`);
