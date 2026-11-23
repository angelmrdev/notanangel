import type { Metadata } from 'next';
import { blogStructuredData } from '@/lib/blog/seo';
import { notFound } from 'next/navigation';
import { BlogArticle, BlogTaxonomyPage } from '@/components/blog/blog-pages';
import { blogUrl, getPublishedBlogPosts, getPublishedBlogRoute } from '@/lib/blog/repository';
import { activeTerms, blogTranslation, termTranslation, termPosts } from '@/lib/blog/views';
const locale = 'es' as const;
export const dynamicParams = false;
// Static export requires at least one generated path, even when the blog is empty.
// The internal fallback is not linked or listed in any sitemap and is noindex.
const EMPTY_BLOG_SLUG = '__empty__';
export function generateStaticParams() {
  const slugs = [...getPublishedBlogPosts(locale).map(p => p.slug), ...activeTerms(locale).map(t => t.slug)];
  return (slugs.length ? slugs : [EMPTY_BLOG_SLUG]).map(slug => ({ slug }));
}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {const {slug}=await params;const route=getPublishedBlogRoute(locale,slug);if(!route)return {title:'Not found',robots:{index:false}};if(route.kind==='post'){const p=route.post;const translation=blogTranslation(p);return {title:p.title,description:p.description,alternates:{canonical:p.seo?.canonical??blogUrl(locale,p.slug),languages:translation?{[locale]:blogUrl(locale,p.slug),[translation.locale]:blogUrl(translation.locale,translation.slug)}:undefined},openGraph:{type:'article',locale:locale==='es'?'es_ES':'en_US',title:p.title,description:p.description,images:p.cover?[p.cover.src]:undefined},twitter:{card:'summary',title:p.title,description:p.description},robots:{index:p.seo?.index!==false && !p.seo?.canonical,follow:true}}}const term=route.term;const other=termTranslation(term);const index=term.index!==false && termPosts(term).length>0;return {title:term.name,description:term.description??`${term.name} — Not an Angel Blog`,alternates:{canonical:blogUrl(locale,slug),languages:other&&termPosts(other).length?{[locale]:blogUrl(locale,slug),[other.locale]:blogUrl(other.locale,other.slug)}:undefined},robots:{index}}}
export default async function Page({params}:{params:Promise<{slug:string}>}) {const {slug}=await params;const route=getPublishedBlogRoute(locale,slug);if(!route && slug===EMPTY_BLOG_SLUG)return <main aria-label="Internal empty blog fallback" style={{minHeight:'1px'}} />;if(!route)notFound();return <>{route.kind==='post' && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(blogStructuredData(route.post)).replace(/</g,'\\u003c')}} />}{route.kind==='post'?<BlogArticle post={route.post}/>:<BlogTaxonomyPage term={route.term}/>}</>}
