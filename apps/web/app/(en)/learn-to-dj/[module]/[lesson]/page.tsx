import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LearnLessonPage } from '@/components/learn/learn-pages';
import { getPublishedLearnModules } from '@/lib/learn/repository';
import { LearnJsonLd, learnLessonMetadata, learnLessonStructuredData } from '@/lib/learn/seo';

const locale = 'en' as const;
export const dynamicParams = false;
const EMPTY = '__empty__';

export function generateStaticParams() {
  const params = getPublishedLearnModules(locale).flatMap(entry => entry.lessons.map(lesson => ({module:entry.module.slugs[locale],lesson:lesson.slug})));
  return params.length ? params : [{module:EMPTY,lesson:EMPTY}];
}

export async function generateMetadata({params}:{params:Promise<{module:string,lesson:string}>}):Promise<Metadata> {
  const {module,lesson} = await params;
  const entry = getPublishedLearnModules(locale).find(item => item.module.slugs[locale] === module);
  const current = entry?.lessons.find(item => item.slug === lesson);
  if (!entry || !current) return { title:'Not found', robots:{index:false} };
  const otherLocale = 'es' as const;
  const counterpart = getPublishedLearnModules(otherLocale).find(item => item.module.id === entry.module.id)?.lessons.find(item => item.id === current.id);
  return learnLessonMetadata(entry.module, current, counterpart);
}

export default async function Page({params}:{params:Promise<{module:string,lesson:string}>}) {
  const {module,lesson} = await params;
  const entry = getPublishedLearnModules(locale).find(item => item.module.slugs[locale] === module);
  const current = entry?.lessons.find(item => item.slug === lesson);
  if (!entry || !current) {
    if (module === EMPTY && lesson === EMPTY) return <main aria-label="Empty learn route" />;
    notFound();
  }
  return <><LearnJsonLd data={learnLessonStructuredData(entry.module, entry.page, current)} /><LearnLessonPage entry={entry} lesson={current} /></>;
}
