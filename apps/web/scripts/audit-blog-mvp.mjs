import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadBlogCatalog, publishedPosts } from './blog-catalog.mjs';

const root = process.cwd();
const { posts } = loadBlogCatalog(root);
const catalog = JSON.parse(readFileSync(resolve(root, 'config/blog-products.json'), 'utf8'));
const byId = new Map(posts.map(post => [`${post.locale}:${post.id}`, post]));
const byRoute = new Map(posts.map(post => [`${post.locale === 'es' ? '/es' : ''}/blog/${post.slug}/`, post]));
const published = new Set(publishedPosts(posts).map(post => `${post.locale}:${post.id}`));
const errors = [], warnings = [];
const alert = (list, post, message) => list.push(`${post.locale}/${post.slug}: ${message}`);

for (const post of posts) {
  // Do not assume the MDX basename and URL slug coincide.
  const matching = resolve(root, 'content/blog', post.locale);
  const sources = readdirSync(matching).filter(name => name.endsWith('.mdx'));
  const sourceFile = sources.find(name => {
    const src = readFileSync(resolve(matching, name), 'utf8');
    return new RegExp(`^slug:\\s*['\"]?${post.slug}['\"]?\\s*$`, 'm').test(src);
  });
  if (!sourceFile) { alert(errors, post, 'Source MDX not found'); continue; }
  const source = readFileSync(resolve(matching, sourceFile), 'utf8');
  const body = source.split(/^---\s*$/m).slice(2).join('---');
  if (!byId.has(`${post.locale === 'es' ? 'en' : 'es'}:${post.id}`)) alert(errors, post, 'Missing partner locale');
  if (!post.cover) alert(warnings, post, 'Missing cover / Open Graph image');
  else if (!existsSync(resolve(root, 'public', post.cover.src.replace(/^\//, '')))) alert(errors, post, `Missing cover file: ${post.cover.src}`);
  if (post.related) for (const id of post.related) {
    if (!byId.has(`${post.locale}:${id}`)) alert(errors, post, `Unknown related ID: ${id}`);
  }
  // Catch both normal Markdown links and explicit JSX links / text paths.
  const links = [...new Set(body.match(/\/(?:es\/)?blog\/[a-z0-9-]+\//g) ?? [])];
  for (const link of links) {
    const target = byRoute.get(link);
    if (!target) alert(errors, post, `Broken internal blog URL: ${link}`);
    else if (published.has(`${post.locale}:${post.id}`) && !published.has(`${target.locale}:${target.id}`)) {
      alert(errors, post, `Published page links to unpublished article: ${link}`);
    }
  }
}
for (const [id,p] of Object.entries(catalog.products)) {
  if (p.imagePath && !existsSync(resolve(root,'public',p.imagePath.slice(1)))) errors.push(`Catalog product ${id}: missing image ${p.imagePath}`);
}
const totalPublished = posts.filter(p=>published.has(`${p.locale}:${p.id}`)).length;
console.log(`Blog MVP audit: ${posts.length} MDX (${totalPublished} published), ${byId.size / 2} bilingual pairs, ${Object.keys(catalog.products).length} products.`);
console.log(`Errors: ${errors.length}; warnings: ${warnings.length}`);
for (const e of errors) console.error(`ERROR ${e}`);
for (const w of warnings) console.warn(`WARN ${w}`);
if (errors.length) process.exitCode = 1;
