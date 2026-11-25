/**
 * M10-I · Source-only bilingual QA for DJ software module (draft or published).
 * Run from apps/web: node scripts/audit-learn-module04.mjs
 * Does not write project files or require a build.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const full = (...paths) => resolve(root, ...paths);
const read = (...paths) => readFileSync(full(...paths), 'utf8');
const errors = [];
const warnings = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const warn = message => warnings.push(message);
const moduleId = 'dj-module-04';
const manifest = JSON.parse(read('config/dj-learn-curriculum.json'));
const mod = manifest.modules.find(item => item.id === moduleId);
if (!mod) { console.error(`ERROR Missing ${moduleId} in curriculum`); process.exit(1); }
check(['draft', 'published'].includes(mod.status), 'Module 04 has invalid publication state');
const expectedDocumentStatus = mod.status === 'published' ? 'ready' : 'draft';
check(mod.lessonIds?.length === 7, 'Module 04 must have seven lessons');
check(new Set(mod.lessonIds).size === mod.lessonIds?.length, 'Duplicate lesson IDs');
const registrySource = read('components/learn/educational-components.tsx');
const registryMatch = registrySource.match(/export const learnMdxComponents\s*=\s*\{([\s\S]*?)\};/);
check(Boolean(registryMatch), 'Missing learnMdxComponents registration object');
const registry = new Set((registryMatch?.[1] ?? '').match(/\b[A-Za-z][A-Za-z0-9]*\b/g) ?? []);
const visualFamilies = [
  'module04-software-visuals',
  'module04-interface-visuals',
  'module04-audio-settings-visuals',
  'module04-analysis-visuals',
  'module04-performance-visuals',
  'module04-compatibility-visuals',
  'module04-offline-visuals',
];
const declared = new Set();
for (const name of visualFamilies) {
  const tsx = full('components/learn', `${name}.tsx`);
  const css = full('components/learn', `${name}.module.css`);
  if (!existsSync(tsx) || !existsSync(css)) { errors.push(`Missing visual TSX/CSS pair: ${name}`); continue; }
  const source = read('components/learn', `${name}.tsx`);
  const stylesheet = read('components/learn', `${name}.module.css`);
  for (const match of source.matchAll(/\bs\.([A-Za-z][\w]*)/g)) {
    const cssClass = match[1];
    check(new RegExp(`\\.${cssClass}(?![\\w-])`).test(stylesheet), `${name}: CSS module missing .${cssClass}`);
  }
  const exports = new Set([...source.matchAll(/export\s+(?:function|const)\s+(\w+)/g)].map(item => item[1]));
  const importMatch = [...registrySource.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]\.\/(module04-[^'"]+)['"]/g)]
    .filter(item => item[2] === name);
  check(importMatch.length === 1, `${name}: expected one registry import statement`);
  const imported = importMatch.flatMap(item => item[1].split(',').map(part => part.trim().split(/\s+as\s+/)[0]));
  check(imported.length >= 16, `${name}: fewer than 16 localized imports`);
  for (const symbol of imported) {
    check(exports.has(symbol), `${name}: imported symbol ${symbol} is not exported`);
    check(registry.has(symbol), `${name}: imported symbol ${symbol} is not registered`);
    declared.add(symbol);
  }
}
function frontmatter(source, label) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) { errors.push(`${label}: frontmatter missing`); return {}; }
  const output = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*?)\s*$/);
    if (!kv) continue;
    let v = kv[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    output[kv[1]] = v;
  }
  return output;
}
const locales = ['en', 'es'];
const lessons = { en: [], es: [] };
const allLinks = [];
const knownRoutes = new Set();
let diagrams = 0;
for (const locale of locales) {
  const prefix = locale === 'en' ? '/learn-to-dj' : '/es/curso-dj';
  for (const item of manifest.modules) {
    const moduleDoc = full('content/learn', locale, 'modules', `${item.id}.mdx`);
    if (!existsSync(moduleDoc)) continue;
    knownRoutes.add(`${prefix}/${item.slugs[locale]}/`);
    for (const id of item.lessonIds ?? []) {
      const path = full('content/learn', locale, 'lessons', `${id}.mdx`);
      if (!existsSync(path)) continue;
      const fm = frontmatter(read('content/learn', locale, 'lessons', `${id}.mdx`), `${locale}/${id}`);
      if (fm.slug) knownRoutes.add(`${prefix}/${item.slugs[locale]}/${fm.slug}/`);
    }
  }
  const page = full('content/learn', locale, 'modules', `${moduleId}.mdx`);
  if (!existsSync(page)) { errors.push(`${locale}: missing module MDX`); continue; }
  const introSource = read('content/learn', locale, 'modules', `${moduleId}.mdx`);
  const intro = frontmatter(introSource, `${locale}/module`);
  check(intro.id === moduleId && intro.locale === locale && intro.status === expectedDocumentStatus, `${locale}: module frontmatter mismatch`);
  check((intro.description ?? '').length > 60, `${locale}: module meta description too short`);
  for (const [index, id] of mod.lessonIds.entries()) {
    const path = full('content/learn', locale, 'lessons', `${id}.mdx`);
    if (!existsSync(path)) { errors.push(`${locale}: missing ${id}`); continue; }
    const source = read('content/learn', locale, 'lessons', `${id}.mdx`);
    const fm = frontmatter(source, `${locale}/${id}`);
    for (const [key, expected] of Object.entries({ id, locale, moduleId, order: String(index + 1), status: expectedDocumentStatus })) {
      check(fm[key] === expected, `${locale}/${id}: ${key} must be ${expected}`);
    }
    check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fm.slug ?? ''), `${locale}/${id}: invalid URL slug`);
    check((fm.title ?? '').length >= 15, `${locale}/${id}: title incomplete`);
    check((fm.description ?? '').length >= 60, `${locale}/${id}: meta description incomplete`);
    check(source.split(/\s+/).length >= 900, `${locale}/${id}: editorial content appears too short`);
    const headings = [...source.matchAll(/^##\s+(.+)$/gm)].map(match => match[1]);
    check(headings.length >= 8, `${locale}/${id}: fewer than eight section headings`);
    const components = [...source.matchAll(/<([A-Z][A-Za-z0-9]+)\b/g)].map(match => match[1]);
    const suffix = locale === 'en' ? 'En' : 'Es';
    const figures = components.filter(name => name.endsWith(suffix));
    const expectedFigures = id === 'dj-04-002' ? 9 : 8;
    check(figures.length === expectedFigures, `${locale}/${id}: expected ${expectedFigures} bilingual diagrams, found ${figures.length}`);
    for (const symbol of components) check(registry.has(symbol), `${locale}/${id}: ${symbol} is not registered`);
    for (const symbol of figures) check(declared.has(symbol), `${locale}/${id}: ${symbol} is not exported from a module04 visual family`);
    diagrams += figures.length;
    const url = `${prefix}/${mod.slugs[locale]}/${fm.slug}/`;
    lessons[locale].push({ id, headings, figures, url });
    for (const match of source.matchAll(/\]\((\/[^)#?]+\/?)(?:[?#][^)]*)?\)/g)) {
      allLinks.push({ link: match[1], from: `${locale}/${id}`, locale });
    }
  }
}
for (const {link, from, locale} of allLinks) {
  if (!link.startsWith('/learn-to-dj/') && !link.startsWith('/es/curso-dj/')) continue;
  check(knownRoutes.has(link), `${from}: linked Learn route does not exist: ${link}`);
  check((locale === 'en' && link.startsWith('/learn-to-dj/')) || (locale === 'es' && link.startsWith('/es/curso-dj/')), `${from}: links across locales: ${link}`);
}
for (let i = 0; i < mod.lessonIds.length; i++) {
  const en = lessons.en[i]; const es = lessons.es[i];
  if (!en || !es) continue;
  check(en.id === es.id, `Lesson order mismatch EN/ES at ${i + 1}`);
  check(en.headings.length === es.headings.length, `${en.id}: unequal H2 count EN/ES`);
  check(JSON.stringify(en.figures.map(s => s.replace(/En$/, ''))) === JSON.stringify(es.figures.map(s => s.replace(/Es$/, ''))), `${en.id}: diagram mismatch or different order EN/ES`);
}
for (const locale of locales) {
  const file = full('public/sitemaps', locale, 'learn-to-dj.xml');
  if (!existsSync(file)) { warn(`${locale}: sitemap not generated; verify after successful build`); continue; }
  const xml = read('public/sitemaps', locale, 'learn-to-dj.xml');
  const prefix = locale === 'en' ? '/learn-to-dj' : '/es/curso-dj';
  const moduleUrl = `${prefix}/${mod.slugs[locale]}/`;
  for (const url of [moduleUrl, ...lessons[locale].map(item => item.url)]) {
    const present = xml.includes(`<loc>https://notanangeldj.com${url}</loc>`);
    check(mod.status === 'published' ? present : !present,
      `${locale}: ${mod.status} sitemap visibility mismatch for ${url}`);
  }
}
console.log(`M10-I module 04 audit: ${lessons.en.length} EN lessons, ${lessons.es.length} ES lessons, ${diagrams} localized diagrams, ${allLinks.length} internal Learn links, ${visualFamilies.length} visual families; ${errors.length} errors, ${warnings.length} warnings`);
for (const message of warnings) console.warn('WARN', message);
for (const message of errors) console.error('ERROR', message);
if (errors.length) process.exitCode = 1;
