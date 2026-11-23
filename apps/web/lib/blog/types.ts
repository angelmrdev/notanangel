export type BlogLocale = 'en' | 'es';
export type BlogStatus = 'draft' | 'scheduled' | 'published';
export type BlogTaxonomy = 'category' | 'tag';

export interface BlogTerm {
  id: string;
  locale: BlogLocale;
  type: BlogTaxonomy;
  slug: string;
  name: string;
  description?: string;
  index?: boolean;
}

export interface BlogPostMeta {
  id: string;
  locale: BlogLocale;
  slug: string;
  title: string;
  description: string;
  status: BlogStatus;
  publishedAt?: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  featured?: boolean;
  cover?: { src: string; alt: string; width?: number; height?: number };
  seo?: { index?: boolean; canonical?: string };
  related?: string[];
}

export interface BlogPost extends BlogPostMeta {
  body: string;
  sourcePath: string;
}
