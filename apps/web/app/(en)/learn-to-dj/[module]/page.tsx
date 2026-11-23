import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LearnModulePage } from '@/components/learn/learn-pages';
import { getPublishedLearnModules } from '@/lib/learn/repository';
import { LearnJsonLd, learnModuleMetadata, learnModuleStructuredData } from '@/lib/learn/seo';

const locale = 'en' as const;
export const dynamicParams = false;
const EMPTY = '__empty__';

export function generateStaticParams() {
  const slugs = getPublishedLearnModules(locale).map(item => item.module.slugs[locale]);
  return (slugs.length ? slugs : [EMPTY]).map(module => ({ module }));
}

export async function generateMetadata({params}:{params:Promise<{module:string}>}):Promise<Metadata> {
  const {module} = await params;
  const entry = getPublishedLearnModules(locale).find(item => item.module.slugs[locale] === module);
  if (!entry) return { title:'Not found', robots:{index:false} };
  return learnModuleMetadata(entry.module, locale, entry.page);
}

export default async function Page({params}:{params:Promise<{module:string}>}) {
  const {module} = await params;
  const entry = getPublishedLearnModules(locale).find(item => item.module.slugs[locale] === module);
  if (!entry && module === EMPTY) return <main aria-label="Empty learn route" />;
  if (!entry) notFound();
  return <><LearnJsonLd data={learnModuleStructuredData(entry.module, locale, entry.page)} /><LearnModulePage entry={entry} /></>;
}
