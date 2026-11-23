import 'server-only';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import { blogTerms } from './taxonomies';
import type { BlogLocale, BlogPost, BlogPostMeta, BlogTerm } from './types';

const localeSchema = z.enum(['en', 'es']);
const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase URL-safe slugs');
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD');
const postSchema = z.object({
  id: z.string().min(1), locale: localeSchema, slug: slugSchema,
  title: z.string().min(1), description: z.string().min(1),
  status: z.enum(['draft', 'scheduled', 'published']),
  publishedAt: dateSchema.optional(), updatedAt: dateSchema.optional(),
  category: z.string().min(1), tags: z.array(z.string()).default([]),
  featured: z.boolean().optional(),
  cover: z.object({ src: z.string().startsWith('/'), alt: z.string().min(1), width: z.number().int().positive().optional(), height: z.number().int().positive().optional() }).optional(),
  seo: z.object({ index: z.boolean().optional(), canonical: z.string().optional() }).optional(),
  related: z.array(z.string()).optional(),
}).strict();

const CONTENT_ROOT = path.resolve(process.cwd(), 'content/blog');

function assertUnique(posts: BlogPost[]): void {
  const routes = new Map<string, string>();
  for (const term of blogTerms) {
    const key = `${term.locale}/${term.slug}`;
    if (routes.has(key)) throw new Error(`Blog slug collision: ${key}`);
    routes.set(key, `taxonomy ${term.type}:${term.id}`);
  }
  const ids = new Set<string>();
  for (const post of posts) {
    const key = `${post.locale}/${post.slug}`;
    if (routes.has(key)) throw new Error(`Blog slug collision: ${key} (${routes.get(key)} vs post ${post.id})`);
    routes.set(key, `post ${post.id}`);
    const idKey = `${post.locale}/${post.id}`;
    if (ids.has(idKey)) throw new Error(`Duplicate blog post ID for locale: ${idKey}`);
    ids.add(idKey);
    if (!blogTerms.some(t => t.id === post.category && t.type === 'category' && t.locale === post.locale)) throw new Error(`Unknown category ${post.category} in ${post.sourcePath}`);
    for (const tag of post.tags) if (!blogTerms.some(t => t.id === tag && t.type === 'tag' && t.locale === post.locale)) throw new Error(`Unknown tag ${tag} in ${post.sourcePath}`);
  }
}

export function readAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const locale of ['en', 'es'] as const) {
    const dir = path.join(CONTENT_ROOT, locale);
    if (!existsSync(dir)) continue;
    for (const filename of readdirSync(dir).filter(f => f.endsWith('.mdx')).sort()) {
      const sourcePath = path.join(dir, filename);
      const parsed = matter(readFileSync(sourcePath, 'utf8'));
      const meta = postSchema.parse(parsed.data) as BlogPostMeta;
      if (meta.locale !== locale) throw new Error(`Locale mismatch in ${sourcePath}`);
      if (meta.status !== 'draft' && !meta.publishedAt) throw new Error(`publishedAt required in ${sourcePath}`);
      posts.push({ ...meta, body: parsed.content, sourcePath });
    }
  }
  assertUnique(posts);
  return posts;
}

export function getPublishedBlogPosts(locale?: BlogLocale, now = new Date()): BlogPost[] {
  const today = now.toISOString().slice(0, 10);
  return readAllBlogPosts()
    .filter(post => (!locale || post.locale === locale) && post.status === 'published' && !!post.publishedAt && post.publishedAt <= today)
    .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''));
}

export function getBlogTerm(locale: BlogLocale, slug: string): BlogTerm | undefined {
  return blogTerms.find(term => term.locale === locale && term.slug === slug);
}

export function getPublishedBlogRoute(locale: BlogLocale, slug: string) {
  const post = getPublishedBlogPosts(locale).find(item => item.slug === slug);
  if (post) return { kind: 'post' as const, post };
  const term = getBlogTerm(locale, slug);
  if (term) return { kind: 'taxonomy' as const, term };
  return null;
}

export function blogUrl(locale: BlogLocale, slug?: string): string {
  return `${locale === 'es' ? '/es' : ''}/blog/${slug ? `${slug}/` : ''}`;
}
