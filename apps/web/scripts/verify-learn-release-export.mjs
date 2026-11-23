/** Verify a complete bilingual Learn export AFTER `pnpm --filter @naa/web build`.
 * Read-only. Requires generated `out/` and public Learn sitemaps.
 * Run from apps/web: node scripts/verify-learn-release-export.mjs
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(resolve(root, 'config/dj-learn-curriculum.json'), 'utf8'));
const host = 'https://notanangeldj.com';
const issues = [];
const routes = { en: [], es: [] };
const identities = new Map();
function check(condition, message) { if (!condition) issues.push(message); }

/** Extract HTML link attributes without depending on attribute case or order.
 * Next/React may serialize hrefLang as `hrefLang`, while HTML attribute names
 * are case-insensitive. Restrict checks to alternate link elements only.
 */
function parseLinkAttrs(tag) {
  const attrs = {};
  for (const match of tag.matchAll(/([a-zA-Z][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? '';
  }
  return attrs;
}
function alternateLinks(html) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .map(match => parseLinkAttrs(match[0]))
    .filter(attrs => attrs.rel?.toLowerCase().split(/\s+/).includes('alternate'));
}
function canonicalLinks(html) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .map(match => parseLinkAttrs(match[0]))
    .filter(attrs => attrs.rel?.toLowerCase().split(/\s+/).includes('canonical'));
}

function parse(file) {
  check(existsSync(file), `Missing source: ${file}`);
  return existsSync(file) ? matter(readFileSync(file, 'utf8')).data : {};
}
for (const mod of manifest.modules) {
  check(mod.status === 'published', `Module not published: ${mod.id}`);
  for (const locale of ['en','es']) {
    const prefix = locale === 'en' ? '/learn-to-dj' : '/es/curso-dj';
    const modulePath = `${prefix}/${mod.slugs[locale]}/`;
    const page = parse(resolve(root,'content/learn',locale,'modules',`${mod.id}.mdx`));
    check(page.status === 'ready', `Module page not ready: ${locale}/${mod.id}`);
    routes[locale].push(modulePath);
    identities.set(`${locale}:${mod.id}`,modulePath);
    for (const [i,id] of mod.lessonIds.entries()) {
      const lesson = parse(resolve(root,'content/learn',locale,'lessons',`${id}.mdx`));
      check(lesson.status === 'ready', `Lesson not ready: ${locale}/${id}`);
      check(lesson.moduleId === mod.id && lesson.order === i+1, `Wrong lesson module/order: ${locale}/${id}`);
      check(typeof lesson.slug === 'string' && !!lesson.slug, `Missing lesson slug: ${locale}/${id}`);
      const url = `${modulePath}${lesson.slug}/`;
      routes[locale].push(url);
      identities.set(`${locale}:${id}`,url);
    }
  }
}
for (const locale of ['en','es']) {
  const unique = new Set(routes[locale]);
  check(unique.size === routes[locale].length, `Duplicate ${locale} Learn URLs`);
  const xmlPath = resolve(root,'public','sitemaps',locale,'learn-to-dj.xml');
  check(existsSync(xmlPath),`Missing sitemap: ${xmlPath}`);
  const xml = existsSync(xmlPath) ? readFileSync(xmlPath,'utf8') : '';
  for (const url of routes[locale]) {
    const filename = resolve(root,'out',url.slice(1),'index.html');
    check(existsSync(filename),`Missing exported page: ${url}`);
    if (existsSync(filename)) {
      const html=readFileSync(filename,'utf8');
      check(html.length>1000,`Suspiciously short exported page: ${url}`);
      const canonicals = canonicalLinks(html);
      check(canonicals.some(link => link.href === `${host}${url}` || link.href === url), `Missing or incorrect canonical tag: ${url}`);
      const alternates = alternateLinks(html);
      const identity = [...identities.entries()].find(([, path]) => path === url);
      if (!identity) {
        check(false, `Missing identity for exported route: ${url}`);
      } else {
        const id = identity[0].split(':').slice(1).join(':');
        for (const language of ['en', 'es']) {
          const expected = `${host}${identities.get(`${language}:${id}`)}`;
          check(alternates.some(link => link.hreflang?.toLowerCase() === language && (link.href === expected || link.href === new URL(expected).pathname)), `Missing or incorrect ${language} HTML alternate for ${url}: expected ${expected}`);
        }
      }
      check(html.includes('application/ld+json'),`Missing JSON-LD: ${url}`);
    }
    check(xml.includes(`<loc>${host}${url}</loc>`),`Missing sitemap URL: ${url}`);
  }
}
for (const mod of manifest.modules) for (const id of [mod.id, ...mod.lessonIds]) {
  const en=identities.get(`en:${id}`),es=identities.get(`es:${id}`);
  for (const locale of ['en','es']) {
    const xmlPath=resolve(root,'public','sitemaps',locale,'learn-to-dj.xml');
    const xml=existsSync(xmlPath)?readFileSync(xmlPath,'utf8'):'';
    const url=identities.get(`${locale}:${id}`);
    const entry=xml.match(new RegExp(`<url>\\s*<loc>${host.replaceAll('.','\\.')}${url.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')}</loc>([\\s\\S]*?)</url>`));
    check(!!entry,`Sitemap entry missing: ${url}`);
    if(entry) for(const [lang,alt] of [['en',en],['es',es]]) check(entry[1].includes(`hreflang="${lang}" href="${host}${alt}"`),`Missing ${lang} sitemap alternate for ${url}`);
  }
}
const expected = manifest.modules.reduce((n,m)=>n+m.lessonIds.length+1,0);
check(routes.en.length===expected && routes.es.length===expected,`Expected ${expected} pages per locale, got ${routes.en.length}/${routes.es.length}`);
console.log(`Learn release export: EN ${routes.en.length}, ES ${routes.es.length}, total ${routes.en.length+routes.es.length} pages; ${issues.length} errors`);
for(const issue of issues) console.error('ERROR',issue);
if(issues.length)process.exitCode=1;
