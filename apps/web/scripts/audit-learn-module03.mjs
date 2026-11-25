/**
 * M09-J · Source-only bilingual audit for module DJ-03 (draft or published).
 * Run from apps/web: node scripts/audit-learn-module03.mjs
 * No build or network needed. Does not modify project files.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const moduleId = 'dj-module-03';
const issues = [];
const warnings = [];
const read = (path) => readFileSync(path, 'utf8');
const fail = (message) => issues.push(message);
const warn = (message) => warnings.push(message);
const assert = (condition, message) => { if (!condition) fail(message); };
const full = (...pieces) => resolve(root, ...pieces);
const curriculum = JSON.parse(read(full('config/dj-learn-curriculum.json')));
const mod = curriculum.modules.find(m => m.id === moduleId);
if (!mod) { console.error(`Module ${moduleId} not registered`); process.exit(1); }

assert(['draft', 'published'].includes(mod.status), `${moduleId}: invalid publication state`);
const expectedDocumentStatus = mod.status === 'published' ? 'ready' : 'draft';
assert(mod.lessonIds?.length === 8, `Expected 8 lessons, got ${mod.lessonIds?.length}`);
assert(new Set(mod.lessonIds).size === mod.lessonIds?.length, 'Repeated lesson ID in curriculum');

const componentsFile = full('components/learn/educational-components.tsx');
const components = read(componentsFile);
const registration = components.match(/export const learnMdxComponents\s*=\s*\{([\s\S]*?)\};/);
assert(Boolean(registration), 'Could not find learnMdxComponents registry');
const registered = new Set((registration?.[1] ?? '').match(/\b[A-Za-z][A-Za-z0-9]*\b/g) ?? []);
const languages = ['en', 'es'];
const lessonData = { en: [], es: [] };
const internalLinks = [];
let diagramCount = 0;

function frontmatter(source, label) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) { fail(`Missing frontmatter: ${label}`); return {}; }
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([a-zA-Z][\w-]*):\s*(.*?)\s*$/);
    if (pair) {
      let value = pair[2];
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      data[pair[1]] = value;
    }
  }
  return data;
}
const expectedUrls = new Set();
for (const locale of languages) {
  const moduleFile = full('content/learn', locale, 'modules', `${moduleId}.mdx`);
  assert(existsSync(moduleFile), `Missing module description: ${locale}`);
  if (!existsSync(moduleFile)) continue;
  const page = frontmatter(read(moduleFile), `${locale}/module`);
  assert(page.id === moduleId && page.locale === locale && page.status === expectedDocumentStatus, `Module frontmatter mismatch: ${locale}`);
  assert(page.title?.length > 3 && page.description?.length > 40, `Module title/description incomplete: ${locale}`);
  const prefix = locale === 'en' ? '/learn-to-dj' : '/es/curso-dj';
  for (const [index, id] of mod.lessonIds.entries()) {
    const file = full('content/learn', locale, 'lessons', `${id}.mdx`);
    if (!existsSync(file)) { fail(`Missing lesson: ${locale}/${id}`); continue; }
    const src = read(file);
    const fm = frontmatter(src, `${locale}/${id}`);
    for (const [field, expected] of Object.entries({ id, locale, moduleId, order: String(index + 1), status: expectedDocumentStatus })) {
      assert(fm[field] === expected, `${locale}/${id}: ${field} must be ${expected}`);
    }
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fm.slug ?? ''), `${locale}/${id}: invalid slug`);
    assert((fm.title ?? '').length >= 15 && (fm.description ?? '').length >= 60, `${locale}/${id}: incomplete SEO metadata`);
    assert(src.split(/\s+/).length > 800, `${locale}/${id}: lesson is suspiciously short`);
    const headings = [...src.matchAll(/^##\s+(.+)$/gm)].map(match => match[1]);
    assert(headings.length >= 8, `${locale}/${id}: fewer than eight H2 sections`);
    const renderedComponents = [...src.matchAll(/<([A-Z][A-Za-z0-9]+)\b/g)].map(m => m[1]);
    const diagramComponents = renderedComponents.filter(name => name.endsWith(locale === 'en' ? 'En' : 'Es'));
    assert(diagramComponents.length === 8, `${locale}/${id}: expected eight localized diagrams, found ${diagramComponents.length}`);
    for (const name of renderedComponents) assert(registered.has(name), `${locale}/${id}: component ${name} missing from registry`);
    for (const name of diagramComponents) assert(name.endsWith(locale === 'en' ? 'En' : 'Es'), `${locale}/${id}: wrong visual locale: ${name}`);
    diagramCount += diagramComponents.length;
    const url = `${prefix}/${mod.slugs[locale]}/${fm.slug}/`;
    assert(!expectedUrls.has(url), `Duplicate URL: ${url}`);
    expectedUrls.add(url);
    lessonData[locale].push({ id, fm, headings, diagramComponents, url });
    for (const match of src.matchAll(/\]\((\/[^)#?]+\/?)(?:[?#][^)]*)?\)/g)) internalLinks.push({ url: match[1], from: `${locale}/${id}` });
  }
}
for (const {url, from} of internalLinks) {
  if (!url.startsWith('/learn-to-dj/') && !url.startsWith('/es/curso-dj/')) continue;
  assert(expectedUrls.has(url), `${from}: internal module link targets unknown page ${url}`);
  assert((from.startsWith('en/') && url.startsWith('/learn-to-dj/')) || (from.startsWith('es/') && url.startsWith('/es/curso-dj/')), `${from}: cross-language link ${url}`);
}
for (let index = 0; index < mod.lessonIds.length; index++) {
  const en = lessonData.en[index]; const es = lessonData.es[index];
  if (!en || !es) continue;
  assert(en.id === es.id, `Lesson order differs EN/ES at ${index + 1}`);
  assert(en.headings.length === es.headings.length, `${en.id}: heading counts differ EN/ES (${en.headings.length}/${es.headings.length})`);
  const enDiagrams = en.diagramComponents.map(name => name.replace(/En$/, ''));
  const esDiagrams = es.diagramComponents.map(name => name.replace(/Es$/, ''));
  assert(JSON.stringify(enDiagrams) === JSON.stringify(esDiagrams), `${en.id}: bilingual visual order differs`);
}

const visualFiles = [
  'module03-hardware-visuals', 'module03-mixer-visuals', 'module03-deck-visuals',
  'module03-eq-visuals', 'module03-cue-visuals', 'module03-speaker-visuals',
  'module03-audio-interface-visuals', 'module03-setup-troubleshooting-visuals',
];
for (const name of visualFiles) {
  const tsxFile = full('components/learn', `${name}.tsx`);
  const cssFile = full('components/learn', `${name}.module.css`);
  if (!existsSync(tsxFile) || !existsSync(cssFile)) { fail(`Missing TSX/CSS pair: ${name}`); continue; }
  const tsx = read(tsxFile); const css = read(cssFile);
  for (const match of tsx.matchAll(/\bs\.([a-zA-Z][\w]*)/g)) {
    const cls = match[1];
    assert(new RegExp(`\\.${cls}(?![\\w-])`).test(css), `${name}: missing CSS module class .${cls}`);
  }
  const imports = [...components.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]\.\/(module03-[^'"]+)['"]/g)]
    .filter(m => m[2] === name).flatMap(m => m[1].split(',').map(part => part.trim()));
  const declaredExports = new Set([...tsx.matchAll(/export\s+(?:function|const)\s+(\w+)/g)].map(m => m[1]));
  for (const symbol of imports) {
    assert(declaredExports.has(symbol), `${name}: imported ${symbol} is not exported`);
    assert(registered.has(symbol), `${name}: imported ${symbol} not registered`);
  }
  assert(imports.length >= 16, `${name}: expected at least 16 localized visual exports`);
}
for (const locale of languages) {
  const sitemap = full('public/sitemaps', locale, 'learn-to-dj.xml');
  if (existsSync(sitemap)) {
    const xml = read(sitemap);
    const moduleUrl = `${locale === 'en' ? '/learn-to-dj' : '/es/curso-dj'}/${mod.slugs[locale]}/`;
    const urls = [moduleUrl, ...lessonData[locale].map(item => item.url)];
    for (const url of urls) {
      const present = xml.includes(`<loc>https://notanangeldj.com${url}</loc>`);
      assert(mod.status === 'published' ? present : !present,
        `${locale}: ${mod.status} sitemap visibility mismatch for ${url}`);
    }
  } else warn(`${locale}: generated sitemap not found; run build before final publication verification`);
}
console.log(`M09-J module 03 audit: ${lessonData.en.length} EN lessons, ${lessonData.es.length} ES lessons, ${diagramCount} localized diagrams, ${internalLinks.length} relative links, ${visualFiles.length} visual component families; ${issues.length} errors, ${warnings.length} warnings`);
for (const message of warnings) console.warn('WARN', message);
for (const message of issues) console.error('ERROR', message);
if (issues.length) process.exitCode = 1;
