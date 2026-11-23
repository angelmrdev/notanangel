import type { BlogPost } from './types';
import { blogUrl } from './repository';
const origin = 'https://notanangeldj.com';
export function blogStructuredData(post: BlogPost) {
 const url = origin + blogUrl(post.locale, post.slug);
 return {
  '@context': 'https://schema.org',
  '@graph': [
   { '@type': 'BlogPosting', '@id': `${url}#article`, headline: post.title,
     description: post.description, inLanguage: post.locale, mainEntityOfPage: url,
     datePublished: post.publishedAt, ...(post.updatedAt ? {dateModified: post.updatedAt}:{}),
     ...(post.cover ? {image: origin + post.cover.src}:{}),
     author: {'@type':'Person',name:'Not an Angel'},
     publisher: {'@type':'Organization',name:'Not an Angel',url:origin} },
   { '@type':'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement:[
     {'@type':'ListItem',position:1,name:'Blog',item:origin+blogUrl(post.locale)},
     {'@type':'ListItem',position:2,name:post.title,item:url}
   ]}
  ]
 };
}
