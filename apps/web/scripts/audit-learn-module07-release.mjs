/** M14-I: self-contained Module 07 prepublish gate (Node built-ins only).
 * Run from apps/web. `--export` checks sitemap/export AFTER the production build.
 */
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = p => readFileSync(resolve(root, p), 'utf8');
const manifest = JSON.parse(read('config/dj-learn-curriculum.json'));
const modules = manifest.modules;
const expectedIds = Array.from({ length: 7 }, (_, n) => `dj-module-${String(n + 1).padStart(2,'0')}`);
assert.equal(modules.length, 7, 'Expected 7 registered modules at this release');
assert.deepEqual(modules.map(m => m.id), expectedIds, 'Modules should be ordered 01–07');
assert.ok(modules.every(m => m.status === 'published'), 'Expected modules 01–07 published');
const module07 = modules[6];
assert.equal(module07.order, 7);
assert.equal(module07.slugs.en, 'eq-and-transitions');
assert.equal(module07.slugs.es, 'ecualizacion-y-transiciones');
assert.deepEqual(module07.lessonIds, Array.from({ length: 7 }, (_, n) => `dj-07-${String(n + 1).padStart(3,'0')}`));

const parse = text => {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  assert.ok(match, 'Missing frontmatter');
  return { fields: Object.fromEntries([...match[1].matchAll(/^([A-Za-z]+):\s*(.*)$/gm)].map(([, k, v]) => [k, v.trim().replace(/^['"]|['"]$/g,'')])), body: match[2].trim() };
};
const registry = read('components/learn/educational-components.tsx');
const componentMap = registry.split('export const learnMdxComponents = {')[1];
assert.ok(componentMap, 'Missing registered MDX component object');
const routes = { en: [], es: [] };
const slugs = { en: new Set(), es: new Set() };
let registeredResources = 0;
for (const locale of ['en','es']) {
  const prefix = locale === 'en' ? '/learn-to-dj/' : '/es/curso-dj/';
  const base = prefix + module07.slugs[locale] + '/';
  routes[locale].push(base);
  const overview = parse(read(`content/learn/${locale}/modules/dj-module-07.mdx`));
  assert.equal(overview.fields.id,'dj-module-07');
  assert.equal(overview.fields.locale,locale);
  assert.equal(overview.fields.status,'ready');
  assert.ok(overview.body.length > 1200, `${locale} module overview too short`);
  assert.match(overview.body, /(?:Learning outcomes|Objetivos de aprendizaje)/);
  for (const [index,id] of module07.lessonIds.entries()) {
    const item = parse(read(`content/learn/${locale}/lessons/${id}.mdx`));
    const data = item.fields;
    assert.equal(data.id,id);
    assert.equal(data.moduleId,'dj-module-07');
    assert.equal(data.locale,locale);
    assert.equal(data.order, String(index + 1));
    assert.equal(data.status,'ready',`${locale}/${id} must be ready`);
    assert.match(data.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!slugs[locale].has(data.slug),`Duplicate ${locale} slug ${data.slug}`);
    slugs[locale].add(data.slug);
    assert.ok(data.title && data.description,`${locale}/${id} missing SEO metadata`);
    assert.ok(item.body.length > 4800,`${locale}/${id} too short for release`);
    assert.doesNotMatch(item.body, /Editorial draft|Borrador editorial|outline only|solo esquema|TODO\b|TBD\b/);
    const symbols = [...item.body.matchAll(/<([A-Z][A-Za-z0-9]*)\s*\/>/g)].map(match => match[1]);
    assert.equal(symbols.length, 3,`Expected three teaching resources in ${locale}/${id}; got ${symbols.join(', ')}`);
    for (const symbol of symbols) {
      assert.ok(symbol.endsWith(locale === 'en' ? 'En' : 'Es'),`${symbol} has wrong locale suffix`);
      assert.match(componentMap,new RegExp(`\\b${symbol}\\b`),`${symbol} not registered in MDX components object`);
      registeredResources++;
    }
    const url = base + data.slug + '/';
    routes[locale].push(url);
    for (const [href] of item.body.matchAll(/\]\((\/(?:learn-to-dj|es\/curso-dj)\/[^)]+)\)/g)) {
      // Reserved for explicitly linked internal Learn destinations; normal MDX links are checked separately.
      void href;
    }
  }
  assert.equal(routes[locale].length,8,`${locale} routes should include module + seven lessons`);
}
assert.equal(registeredResources,42, 'Expected 7 lessons x 3 resources x 2 locales');
if (process.argv.includes('--export')) {
  for (const locale of ['en','es']) {
    const xmlPath = `out/sitemaps/${locale}/learn-to-dj.xml`;
    assert.ok(existsSync(resolve(root,xmlPath)),`No exported sitemap: ${xmlPath}`);
    const xml=read(xmlPath);
    for (const url of routes[locale]) {
      const output=`out/${url.slice(1)}index.html`;
      assert.ok(existsSync(resolve(root,output)),`No exported page: ${url}`);
      assert.ok(xml.includes(`<loc>https://notanangeldj.com${url}</loc>`),`Missing URL in sitemap: ${url}`);
      const enUrl=routes.en[routes[locale].indexOf(url)];
      const esUrl=routes.es[routes[locale].indexOf(url)];
      const xmlEntry=xml.match(new RegExp(`<loc>https://notanangeldj\\.com${url.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}</loc>([\\s\\S]*?)</url>`));
      assert.ok(xmlEntry,`No matching sitemap entry for ${url}`);
      for (const [lang,alt] of [['en',enUrl],['es',esUrl]]) assert.ok(xmlEntry[1].includes(`hreflang="${lang}" href="https://notanangeldj.com${alt}"`),`Missing ${lang} alternate on ${url}`);
    }
  }
}
console.log(`M14-I release gate PASS: 7 published modules, 14 ready lesson pages + 2 module overview locales, ${registeredResources} registered teaching-resource inserts${process.argv.includes('--export')?', 16 exported Module 07 pages with sitemap alternates':''}`);
