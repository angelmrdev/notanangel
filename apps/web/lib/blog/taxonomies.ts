import catalog from '../../config/blog-taxonomies.json';
import type { BlogTerm } from './types';

/** Single source of truth shared by the UI, validation and sitemap generation. */
export const blogTerms: BlogTerm[] = catalog.map(term => ({
  ...term,
  locale: term.locale as BlogTerm['locale'],
  type: term.type as BlogTerm['type'],
}));
