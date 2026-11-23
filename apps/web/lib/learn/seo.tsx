import type { Metadata } from 'next';
import type { LearnLesson, LearnLocale, LearnModule, LearnModulePage } from './types';
import { learnLessonUrl, learnModuleUrl } from './repository';

const ORIGIN = 'https://notanangeldj.com';
const FULL_NAME = 'Not an Angel';

export function absoluteLearnUrl(url: string): string {
  return new URL(url, ORIGIN).toString();
}

export function learnModuleMetadata(module: LearnModule, locale: LearnLocale, page: LearnModulePage): Metadata {
  const canonical = learnModuleUrl(module, locale);
  const languages = {
    en: learnModuleUrl(module, 'en'),
    es: learnModuleUrl(module, 'es'),
    'x-default': learnModuleUrl(module, 'en'),
  };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical, languages },
    robots: { index: process.env.NODE_ENV === 'production', follow: true },
    openGraph: { type: 'website', url: canonical, title: page.title, description: page.description, siteName: FULL_NAME, locale: locale === 'es' ? 'es_ES' : 'en_US' },
  };
}

export function learnLessonMetadata(module: LearnModule, lesson: LearnLesson, counterpart: LearnLesson | undefined): Metadata {
  const locale = lesson.locale;
  const canonical = learnLessonUrl(module, lesson);
  const languages = counterpart ? {
    [locale]: canonical,
    [counterpart.locale]: learnLessonUrl(module, counterpart),
    'x-default': locale === 'en' ? canonical : learnLessonUrl(module, counterpart),
  } : undefined;
  return {
    title: lesson.title,
    description: lesson.description,
    alternates: { canonical, languages },
    robots: { index: process.env.NODE_ENV === 'production', follow: true },
    openGraph: { type: 'article', url: canonical, title: lesson.title, description: lesson.description, siteName: FULL_NAME, locale: locale === 'es' ? 'es_ES' : 'en_US' },
  };
}

function crumbs(items: {name:string;url:string}[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: absoluteLearnUrl(item.url) })),
  };
}

const homeTitle = (locale: LearnLocale) => locale === 'es' ? 'Curso DJ' : 'Learn to DJ';
const rootUrl = (locale: LearnLocale) => locale === 'es' ? '/es/curso-dj/' : '/learn-to-dj/';

export function learnModuleStructuredData(module: LearnModule, locale: LearnLocale, page: LearnModulePage) {
  const url = absoluteLearnUrl(learnModuleUrl(module, locale));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Course', '@id': `${url}#course`, name: page.title, description: page.description, inLanguage: locale, url, provider: { '@type': 'Organization', name: FULL_NAME, url: ORIGIN }, isAccessibleForFree: true },
      crumbs([{name:homeTitle(locale),url:rootUrl(locale)},{name:page.title,url:learnModuleUrl(module,locale)}]),
    ],
  };
}

export function learnLessonStructuredData(module: LearnModule, page: LearnModulePage, lesson: LearnLesson) {
  const locale = lesson.locale;
  const url = absoluteLearnUrl(learnLessonUrl(module, lesson));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'LearningResource', '@id': `${url}#lesson`, name: lesson.title, description: lesson.description, url, inLanguage: locale, isAccessibleForFree: true, educationalUse: 'instruction', isPartOf: { '@id': `${absoluteLearnUrl(learnModuleUrl(module,locale))}#course` }, provider: { '@type': 'Organization', name: FULL_NAME, url: ORIGIN } },
      crumbs([{name:homeTitle(locale),url:rootUrl(locale)},{name:page.title,url:learnModuleUrl(module,locale)},{name:lesson.title,url:learnLessonUrl(module,lesson)}]),
    ],
  };
}

/** JSON-LD is serialized as data, not JSX; escape HTML-sensitive characters. */
export function LearnJsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
