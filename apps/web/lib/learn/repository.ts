import 'server-only';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import manifest from '@/config/dj-learn-curriculum.json';
import type { LearnLesson, LearnLocale, LearnModule, LearnModulePage, LearnPublishedModule } from './types';

// Only the dedicated publication MDX directory is read. Editorial .md is never imported.
const ROOT = path.resolve(process.cwd(), 'content/learn');
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const base = z.object({ id: z.string().min(1), locale: z.enum(['en','es']), title: z.string().min(1), description: z.string().min(1), status: z.enum(['draft','ready']) });
const lessonSchema = base.extend({ moduleId: z.string().min(1), slug, order: z.number().int().positive() });
const moduleSchema = base;
const modules = manifest.modules as LearnModule[];

function load(file: string) {
  if (!existsSync(file)) return null;
  return matter(readFileSync(file, 'utf8'));
}
function moduleFile(id: string, locale: LearnLocale) { return path.join(ROOT, locale, 'modules', `${id}.mdx`); }
function lessonFile(id: string, locale: LearnLocale) { return path.join(ROOT, locale, 'lessons', `${id}.mdx`); }
export function readLearnModulePage(id: string, locale: LearnLocale): LearnModulePage | null {
  const sourcePath = moduleFile(id, locale); const raw = load(sourcePath); if (!raw) return null;
  const data = moduleSchema.parse(raw.data);
  if (data.id !== id || data.locale !== locale) throw new Error(`Module identity mismatch: ${sourcePath}`);
  return { ...data, body: raw.content, sourcePath };
}
export function readLearnLesson(id: string, locale: LearnLocale): LearnLesson | null {
  const sourcePath = lessonFile(id, locale); const raw = load(sourcePath); if (!raw) return null;
  const data = lessonSchema.parse(raw.data);
  if (data.id !== id || data.locale !== locale) throw new Error(`Lesson identity mismatch: ${sourcePath}`);
  return { ...data, body: raw.content, sourcePath };
}
export function getLearnManifest(): LearnModule[] { return modules; }
export function learnModuleUrl(module: LearnModule, locale: LearnLocale) {
  return `${locale === 'en' ? '/learn-to-dj' : '/es/curso-dj'}/${module.slugs[locale]}/`;
}
export function learnLessonUrl(module: LearnModule, lesson: LearnLesson) {
  return `${learnModuleUrl(module, lesson.locale)}${lesson.slug}/`;
}
function assertManifest() {
  const ids = new Set<string>();
  const routes = new Set<string>();
  for (const mod of modules) {
    if (ids.has(mod.id)) throw new Error(`Duplicate module ID ${mod.id}`);
    ids.add(mod.id);
    if (!['draft','published'].includes(mod.status)) throw new Error(`Invalid module status ${mod.id}`);
    if (!mod.lessonIds.length || new Set(mod.lessonIds).size !== mod.lessonIds.length) throw new Error(`Invalid lesson list ${mod.id}`);
    for (const locale of ['en','es'] as const) {
      if (!slug.safeParse(mod.slugs[locale]).success) throw new Error(`Invalid module slug ${mod.id}/${locale}`);
      const route = `${locale}/${mod.slugs[locale]}`;
      if (routes.has(route)) throw new Error(`Duplicate module route ${route}`);
      routes.add(route);
    }
  }
  const lessonIds = modules.flatMap(m => m.lessonIds);
  if (new Set(lessonIds).size !== lessonIds.length) throw new Error('Lesson ID appears in multiple modules');
}

/** Release gate: published modules require complete, ready EN+ES MDX files. */
export function getPublishedLearnModules(locale?: LearnLocale): LearnPublishedModule[] {
  assertManifest();
  const result: LearnPublishedModule[] = [];
  for (const mod of modules.filter(m => m.status === 'published')) {
    const pairs = (['en','es'] as const).map(lang => {
      const page = readLearnModulePage(mod.id, lang);
      if (!page || page.status !== 'ready') throw new Error(`Published module ${mod.id} missing ready ${lang} module MDX`);
      const lessons = mod.lessonIds.map((id, i) => {
        const item = readLearnLesson(id, lang);
        if (!item || item.status !== 'ready') throw new Error(`Published module ${mod.id} missing ready ${lang} lesson ${id}`);
        if (item.moduleId !== mod.id || item.order !== i + 1) throw new Error(`Invalid lesson module/order ${lang}/${id}`);
        return item;
      });
      const slugs = lessons.map(l => l.slug);
      if (new Set(slugs).size !== slugs.length) throw new Error(`Duplicate lesson slug ${lang}/${mod.id}`);
      return { module: mod, locale: lang, page, lessons };
    });
    result.push(...pairs.filter(pair => !locale || pair.locale === locale));
  }
  // DEV-ONLY: preview localized lessons at their final URLs without publishing.
  // Spanish may be translated incrementally; only files that actually exist are listed.
  // The strict ready EN/ES publication gate above remains unchanged in production.
  if (process.env.NODE_ENV === 'development') {
    for (const mod of modules.filter(m => m.status === 'draft')) {
      for (const lang of (['en', 'es'] as const)) {
        if (locale && locale !== lang) continue;
        const page = readLearnModulePage(mod.id, lang);
        if (!page) continue;
        const lessons = mod.lessonIds.flatMap((id, i) => {
          const item = readLearnLesson(id, lang);
          return item && item.moduleId === mod.id && item.order === i + 1 ? [item] : [];
        });
        if (!lessons.length) continue;
        if (new Set(lessons.map(item => item.slug)).size !== lessons.length) continue;
        result.push({ module: mod, locale: lang, page, lessons });
      }
    }
  }
  return result.sort((a,b) => a.module.order - b.module.order);
}
export function getPublishedLearnLessonBySlug(locale: LearnLocale, moduleSlug: string, lessonSlug: string) {
  for (const entry of getPublishedLearnModules(locale)) {
    if (entry.module.slugs[locale] !== moduleSlug) continue;
    const lesson = entry.lessons.find(l => l.slug === lessonSlug);
    if (lesson) return { ...entry, lesson };
  }
  return null;
}
export function getLearnAdjacentLessons(entry: LearnPublishedModule, lessonId: string) {
  const i = entry.lessons.findIndex(l => l.id === lessonId);
  if (i < 0) return { previous: null, next: null };
  return { previous: entry.lessons[i - 1] ?? null, next: entry.lessons[i + 1] ?? null };
}
