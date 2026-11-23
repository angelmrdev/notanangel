import 'server-only';
import { blogTerms } from './taxonomies';
import { blogUrl, getPublishedBlogPosts } from './repository';
import type { BlogLocale, BlogPost, BlogTerm } from './types';

export function activeTerms(locale: BlogLocale): BlogTerm[] {
  const posts = getPublishedBlogPosts(locale);
  return blogTerms.filter(t => t.locale === locale && posts.some(p => t.type === 'category' ? p.category === t.id : p.tags.includes(t.id)));
}
export function termPosts(term: BlogTerm): BlogPost[] {
  return getPublishedBlogPosts(term.locale).filter(p => term.type === 'category' ? p.category === term.id : p.tags.includes(term.id));
}
export function blogTranslation(post: BlogPost): BlogPost | undefined {
  return getPublishedBlogPosts(post.locale === 'en' ? 'es' : 'en').find(p => p.id === post.id);
}
export function termTranslation(term: BlogTerm): BlogTerm | undefined {
  return blogTerms.find(t => t.id === term.id && t.type === term.type && t.locale !== term.locale);
}
export function postCategory(post: BlogPost): BlogTerm | undefined {
  return blogTerms.find(t => t.type === 'category' && t.id === post.category && t.locale === post.locale);
}
export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const posts = getPublishedBlogPosts(post.locale).filter(p => p.id !== post.id);
  return posts.sort((a,b) => {
    const score = (p: BlogPost) => (post.related?.includes(p.id) ? 100 : 0) + (p.category === post.category ? 10 : 0) + p.tags.filter(t => post.tags.includes(t)).length;
    return score(b) - score(a) || (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '');
  }).slice(0, limit);
}
export { blogUrl };
