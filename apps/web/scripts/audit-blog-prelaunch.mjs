import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadBlogCatalog, publishedPosts } from './blog-catalog.mjs';

const root = process.cwd();
const base = 'https://notanangeldj.com';
const { posts } = loadBlogCatalog(root);
const products = JSON.parse(readFileSync(resolve(root, 'config/blog-products.json'), 'utf8')).products;
const errors = [];
const warnings = [];
const byId = new Map(posts.map(p => [`${p.locale}:${p.id}`, p]));
const published = publishedPosts(posts);
const isLive = p => published.includes(p);
const pathFor = p => `${p.locale === 'es' ? '/es' : ''}/blog/${p.slug}/`;
const fail = message => errors.push(message);
const warn = message => warnings.push(message);

if (posts.length !== 24) fail(`Expected 24 MVP MDX entries, got ${posts.length}.`);
if (new Set(posts.map(p => p.id)).size !== 12) fail('Expected 12 unique bilingual article IDs.');
if (published.length !== 24) fail(`All 24 MVP pages must be published; found ${published.length}.`);

for (const post of posts) {
  const label = `${post.locale}/${post.slug}`;
  const other = byId.get(`${post.locale === 'es' ? 'en' : 'es'}:${post.id}`);
  if (!other) fail(`${label}: missing counterpart translation.`);
  else if (!isLive(other)) fail(`${label}: counterpart is not published.`);
  if (!isLive(post)) fail(`${label}: not published as of the build date.`);
  if (post.seo?.index === false || post.seo?.canonical) fail(`${label}: not eligible for normal indexable canonical.`);
  if (!post.cover) warn(`${label}: cover / social image pending.`);
  else if (!existsSync(resolve(root, 'public', post.cover.src.replace(/^\//, '')))) fail(`${label}: missing cover ${post.cover.src}.`);
  for (const related of post.related ?? []) {
    const target = byId.get(`${post.locale}:${related}`);
    if (!target) fail(`${label}: unknown related ID ${related}.`);
    else if (!isLive(target)) fail(`${label}: related entry ${related} is not published.`);
  }
}
for (const [id,p] of Object.entries(products)) {
  if (p.affiliateUrlES && p.linkStatus !== 'verified') warn(`${id}: affiliate link pending verification; button must stay hidden.`);
  if (p.imagePath === null) continue;
  if (!existsSync(resolve(root, 'public', p.imagePath.replace(/^\//, '')))) fail(`${id}: missing product image.`);
}
const out = resolve(root, 'out');
if (!existsSync(out)) {
  warn('No out/ directory yet: run pnpm build, then rerun this audit for exported HTML and sitemaps.');
} else {
  for (const post of posts) {
    const route = pathFor(post);
    const file = resolve(out, route.slice(1), 'index.html');
    if (!existsSync(file)) { fail(`Missing exported HTML: ${route}`); continue; }
    const html = readFileSync(file, 'utf8');
    const self = base + route;
    const counterpart = byId.get(`${post.locale === 'es' ? 'en' : 'es'}:${post.id}`);
    const counterpartUrl = counterpart ? base + pathFor(counterpart) : null;
    if (!html.includes('rel="canonical"') || !html.includes(self)) fail(`${route}: missing canonical URL.`);
    if (!html.toLowerCase().includes('hreflang="en"') || !html.toLowerCase().includes('hreflang="es"') || !counterpartUrl || !html.includes(counterpartUrl)) fail(`${route}: missing reciprocal hreflang URL.`);
    if (!html.includes('application/ld+json') || !html.includes('"BlogPosting"') || !html.includes('"BreadcrumbList"')) fail(`${route}: missing BlogPosting/BreadcrumbList JSON-LD.`);
    if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) fail(`${route}: unexpectedly noindex.`);
    for (const p of Object.values(products)) {
      if (p.affiliateUrlES && p.linkStatus !== 'verified' && html.includes(p.affiliateUrlES)) {
        fail(`${route}: unverified affiliate URL exposed in exported HTML.`);
      }
    }
  }
  for (const locale of ['en','es']) {
    const sitemapPath = resolve(out, 'sitemaps', locale, 'blog.xml');
    if (!existsSync(sitemapPath)) { fail(`Missing ${locale} blog sitemap.`); continue; }
    const sitemap = readFileSync(sitemapPath, 'utf8');
    for (const post of posts.filter(p => p.locale === locale)) {
      if (!sitemap.includes(`<loc>${base}${pathFor(post)}</loc>`)) fail(`${locale} sitemap missing ${pathFor(post)}.`);
    }
  }
  const sitemapIndex = resolve(out, 'sitemap.xml');
  const robots = resolve(out, 'robots.txt');
  if (!existsSync(sitemapIndex) || !existsSync(robots)) fail('Missing sitemap.xml or robots.txt in static export.');
  else if (!readFileSync(robots,'utf8').includes(`${base}/sitemap.xml`)) fail('robots.txt points to wrong sitemap host.');
}
console.log(`Blog prelaunch audit: ${published.length}/${posts.length} published, ${new Set(posts.map(p=>p.id)).size} bilingual pairs, ${Object.keys(products).length} catalog entries.`);
console.log(`Errors: ${errors.length}; warnings: ${warnings.length}.`);
for (const e of errors) console.error(`ERROR ${e}`);
for (const w of warnings) console.warn(`WARN ${w}`);
if (errors.length) process.exitCode = 1;
