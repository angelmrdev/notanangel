/** M14-A — read-only draft guard. Run from apps/web. */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
const root = process.cwd();
const errors = [];
const requireCheck = (condition, message) => { if (!condition) errors.push(message); };
const read = (p) => readFileSync(resolve(root,p), 'utf8');
const manifest = JSON.parse(read('config/dj-learn-curriculum.json'));
const mods = manifest.modules;
const module07 = mods.find(m => m.id === 'dj-module-07');
requireCheck(mods.length === 7, 'Expected exactly seven registered modules');
requireCheck(mods.filter(m => m.status === 'published').length === 6, 'Exactly modules 01–06 must be published');
for (let i = 1; i <= 6; i++) requireCheck(mods.some(m => m.id === `dj-module-${String(i).padStart(2,'0')}` && m.status === 'published'), `Module ${i} must remain published`);
requireCheck(module07?.status === 'draft' && module07?.order === 7, 'Module 07 must remain a draft');
requireCheck(module07?.lessonIds?.length === 7, 'Module 07 must contain exactly seven lessons');
const frontmatter = (content) => {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return Object.fromEntries(match[1].split(/\r?\n/).map(row => row.match(/^([A-Za-z]+):\s*(.*)$/)).filter(Boolean).map(([,k,v]) => [k, v.replace(/^['"]|['"]$/g,'')]));
};
let documentCount = 0;
for (const locale of ['en','es']) {
  for (const [kind,id,expected] of [['modules','dj-module-07',null], ...module07.lessonIds.map((id,i) => ['lessons',id,i+1])]) {
    const filename = `content/learn/${locale}/${kind}/${id}.mdx`;
    requireCheck(existsSync(resolve(root,filename)), `Missing ${filename}`);
    if (!existsSync(resolve(root,filename))) continue;
    const doc = read(filename); const meta = frontmatter(doc);
    requireCheck(meta?.id === id && meta?.locale === locale && meta?.status === 'draft', `${filename}: draft metadata invalid`);
    requireCheck(!!meta?.title && !!meta?.description, `${filename}: missing title or description`);
    if (expected !== null) {
      requireCheck(meta?.moduleId === 'dj-module-07' && Number(meta?.order) === expected, `${filename}: order/module mismatch`);
      requireCheck(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta?.slug || ''), `${filename}: invalid slug`);
    }
    documentCount++;
  }
}
if (process.argv.includes('--export')) {
  for (const locale of ['en','es']) {
    const prefix = locale === 'en' ? '/learn-to-dj/' : '/es/curso-dj/';
    const path = `${prefix}${module07.slugs[locale]}/`;
    const xmlPath = `out/sitemaps/${locale}/learn-to-dj.xml`;
    if (existsSync(resolve(root,xmlPath))) requireCheck(!read(xmlPath).includes(path), `Module 07 leaked into ${xmlPath}`);
    requireCheck(!existsSync(resolve(root, `out${path}index.html`)), `Draft route was exported: ${path}`);
  }
}
console.log(`M14-A draft guard: ${documentCount} documents, ${mods.filter(m => m.status === 'published').length} published modules, ${errors.length} errors`);
for (const error of errors) console.error('ERROR:', error);
if (errors.length) process.exitCode = 1;
