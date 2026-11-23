import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import matter from 'gray-matter';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const locales = ['en', 'es'];
const types = ['category', 'tag'];
const statuses = ['draft', 'scheduled', 'published'];
const isDate = value => typeof value === 'string' && datePattern.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const fail = message => { throw new Error(`[Blog catalog] ${message}`); };

export function loadBlogCatalog(root = process.cwd()) {
  const terms = JSON.parse(readFileSync(resolve(root, 'config/blog-taxonomies.json'), 'utf8'));
  if (!Array.isArray(terms)) fail('Taxonomies must be an array');
  const routes = new Map();
  const termIds = new Set();
  const register = (locale, slug, owner) => {
    const key = `${locale}/${slug}`;
    if (routes.has(key)) fail(`Slug collision ${key}: ${routes.get(key)} vs ${owner}`);
    routes.set(key, owner);
  };
  for (const term of terms) {
    if (!term || !locales.includes(term.locale) || !types.includes(term.type) || !slugPattern.test(term.id || '') || !slugPattern.test(term.slug || '') || typeof term.name !== 'string' || !term.name.trim() || (term.index !== undefined && typeof term.index !== 'boolean')) fail(`Invalid taxonomy ${JSON.stringify(term)}`);
    const key = `${term.locale}:${term.type}:${term.id}`;
    if (termIds.has(key)) fail(`Duplicate taxonomy ${key}`);
    termIds.add(key);
    register(term.locale, term.slug, `taxonomy ${term.type}:${term.id}`);
  }
  const posts = [];
  const ids = new Set();
  for (const locale of locales) {
    const dir = resolve(root, 'content/blog', locale);
    if (!existsSync(dir)) continue;
    for (const filename of readdirSync(dir).filter(name => name.endsWith('.mdx')).sort()) {
      const label = `${locale}/${filename}`;
      const { data: post } = matter(readFileSync(join(dir, filename), 'utf8'));
      if (!post || post.locale !== locale || !slugPattern.test(post.id || '') || !slugPattern.test(post.slug || '') || typeof post.title !== 'string' || !post.title.trim() || typeof post.description !== 'string' || !post.description.trim() || !statuses.includes(post.status)) fail(`Invalid metadata: ${label}`);
      if (post.publishedAt !== undefined && !isDate(post.publishedAt)) fail(`Invalid publishedAt: ${label}`);
      if (post.updatedAt !== undefined && !isDate(post.updatedAt)) fail(`Invalid updatedAt: ${label}`);
      if (post.status !== 'draft' && !post.publishedAt) fail(`Missing publishedAt: ${label}`);
      if (!termIds.has(`${locale}:category:${post.category}`)) fail(`Unknown category in ${label}: ${post.category}`);
      if (post.tags !== undefined && (!Array.isArray(post.tags) || !post.tags.every(tag => termIds.has(`${locale}:tag:${tag}`)))) fail(`Unknown tags in ${label}`);
      if (post.featured !== undefined && typeof post.featured !== 'boolean') fail(`Invalid featured in ${label}`);
      if (post.cover !== undefined && (!post.cover || typeof post.cover.src !== 'string' || !post.cover.src.startsWith('/') || typeof post.cover.alt !== 'string' || !post.cover.alt.trim() || (post.cover.width !== undefined && (!Number.isInteger(post.cover.width) || post.cover.width <= 0)) || (post.cover.height !== undefined && (!Number.isInteger(post.cover.height) || post.cover.height <= 0)))) fail(`Invalid cover in ${label}`);
      if (post.seo !== undefined && (!post.seo || (post.seo.index !== undefined && typeof post.seo.index !== 'boolean') || (post.seo.canonical !== undefined && typeof post.seo.canonical !== 'string'))) fail(`Invalid SEO in ${label}`);
      if (post.related !== undefined && (!Array.isArray(post.related) || !post.related.every(id => typeof id === 'string'))) fail(`Invalid related in ${label}`);
      const allowed = new Set(['id','locale','slug','title','description','status','publishedAt','updatedAt','category','tags','featured','cover','seo','related']);
      for (const key of Object.keys(post)) if (!allowed.has(key)) fail(`Unknown frontmatter field ${key} in ${label}`);
      const idKey = `${locale}:${post.id}`;
      if (ids.has(idKey)) fail(`Duplicate post id ${idKey}`);
      ids.add(idKey);
      register(locale, post.slug, `post ${post.id} (${label})`);
      posts.push({ ...post, tags: post.tags || [] });
    }
  }
  return { terms, posts };
}

export function publishedPosts(posts, now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return posts.filter(post => post.status === 'published' && post.publishedAt <= today);
}
