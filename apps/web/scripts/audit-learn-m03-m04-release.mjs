/** M11 release readiness gate: strictly read-only; run from apps/web.
 * Source checks do not replace a successful Next build and export verification.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(resolve(root, 'config/dj-learn-curriculum.json'), 'utf8'));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const ids = new Set();
const expectedRoutes = new Set(['/learn-to-dj/', '/es/curso-dj/']);
const documents = [];
const target = new Set(['dj-module-03', 'dj-module-04']);
const read = (relative) => {
  const file = resolve(root, relative);
  if (!existsSync(file)) { errors.push(`Missing source: ${relative}`); return null; }
  return readFileSync(file, 'utf8');
};
function frontmatter(source, relative) {
  const match = source?.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) { errors.push(`Missing frontmatter: ${relative}`); return {}; }
  const data = {};
  for (const row of match[1].split(/\r?\n/)) {
    const m = row.match(/^([A-Za-z][\w-]*):\s*(.*?)\s*$/);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    data[m[1]] = v;
  }
  return data;
}
check(manifest.modules.length === 4, 'Expected exactly 4 registered Learn modules');
check(manifest.modules.filter(mod => mod.status === 'published').length === 4, 'Modules 01-04 must all be published');
for (const mod of manifest.modules) {
  check(mod.status === 'published', `${mod.id}: module must be published`);
  check(!ids.has(mod.id), `Duplicate module id: ${mod.id}`);
  ids.add(mod.id);
  check(Array.isArray(mod.lessonIds) && mod.lessonIds.length > 0, `${mod.id}: missing lesson ids`);
  for (const locale of ['en', 'es']) {
    const prefix = locale === 'en' ? '/learn-to-dj' : '/es/curso-dj';
    const modulePath = `${prefix}/${mod.slugs?.[locale]}/`;
    check(!expectedRoutes.has(modulePath), `Duplicate route: ${modulePath}`);
    expectedRoutes.add(modulePath);
    const moduleRelative = `content/learn/${locale}/modules/${mod.id}.mdx`;
    const moduleSource = read(moduleRelative);
    const moduleData = frontmatter(moduleSource, moduleRelative);
    check(moduleData.id === mod.id && moduleData.locale === locale, `${moduleRelative}: incorrect module identity`);
    check(moduleData.status === 'ready', `${moduleRelative}: expected ready status`);
    check(Boolean(moduleData.title && moduleData.description), `${moduleRelative}: incomplete SEO metadata`);
    if (moduleSource) documents.push({ source: moduleSource, relative: moduleRelative });
    for (const [index, id] of (mod.lessonIds ?? []).entries()) {
      const relative = `content/learn/${locale}/lessons/${id}.mdx`;
      const source = read(relative);
      const data = frontmatter(source, relative);
      check(data.id === id && data.locale === locale && data.moduleId === mod.id, `${relative}: incorrect identity`);
      check(data.order === String(index + 1), `${relative}: incorrect lesson order`);
      check(data.status === 'ready', `${relative}: expected ready status`);
      check(Boolean(data.title && data.description), `${relative}: incomplete SEO metadata`);
      check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug ?? ''), `${relative}: invalid slug`);
      const url = `${modulePath}${data.slug}/`;
      check(!expectedRoutes.has(url), `Duplicate route: ${url}`);
      expectedRoutes.add(url);
      if (source) documents.push({ source, relative });
    }
  }
}
for (const doc of documents) {
  for (const match of doc.source.matchAll(/\]\((\/[^\s)]+)(?:\s+[^)]*)?\)/g)) {
    const url = match[1].split(/[?#]/)[0];
    if (!(url.startsWith('/learn-to-dj/') || url.startsWith('/es/curso-dj/'))) continue;
    const normalized = url.endsWith('/') ? url : `${url}/`;
    check(expectedRoutes.has(normalized), `${doc.relative}: link to unpublished or unknown Learn route ${url}`);
  }
}
const expectedContent = manifest.modules.reduce((n, mod) => n + 2 * (mod.lessonIds.length + 1), 0);
check(expectedContent === 68, `Expected 68 localized module+lesson pages, got ${expectedContent}`);
check(expectedRoutes.size === 70, `Expected 70 total Learn URLs, got ${expectedRoutes.size}`);
for (const id of target) check(ids.has(id), `Missing targeted release module: ${id}`);
console.log(`M11 pre-push Learn gate: 4 published modules, ${expectedContent} bilingual content pages, 70 Learn URLs, ${documents.length} MDX files, ${errors.length} errors`);
for (const issue of errors) console.error('ERROR', issue);
if (errors.length) process.exitCode = 1;
