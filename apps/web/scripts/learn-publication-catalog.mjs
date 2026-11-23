// Shared Learn publication parser: used by both the release gate and SEO generator.
// Editorial Markdown under /content/dj-learn is deliberately not read here.
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';

export const LEARN_LOCALES = ['en', 'es'];
export const LEARN_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function readLearnPublication(root, kind, id, locale) {
  const file = resolve(root, 'content/learn', locale, kind, `${id}.mdx`);
  if (!existsSync(file)) throw new Error(`Missing Learn MDX: ${file}`);
  let parsed;
  try { parsed = matter(readFileSync(file, 'utf8')); }
  catch (error) { throw new Error(`Invalid frontmatter ${file}: ${error.message}`); }
  if (!parsed.content.trim()) throw new Error(`Empty Learn MDX body: ${file}`);
  return { file, data: parsed.data };
}
export function validateLearnFrontmatter(record, kind, id, locale, moduleId, order) {
  const d = record.data;
  const errors = [];
  for (const key of ['title', 'description']) if (typeof d[key] !== 'string' || !d[key].trim()) errors.push(`Missing ${key}`);
  if (d.id !== id) errors.push(`Expected id ${id}`);
  if (d.locale !== locale) errors.push(`Expected locale ${locale}`);
  if (d.status !== 'ready') errors.push('Status must be ready');
  if (kind === 'lessons') {
    if (d.moduleId !== moduleId) errors.push(`Expected moduleId ${moduleId}`);
    if (d.order !== order) errors.push(`Expected order ${order}`);
    if (typeof d.slug !== 'string' || !LEARN_SLUG.test(d.slug)) errors.push('Invalid slug');
  }
  if (errors.length) throw new Error(`${record.file}: ${errors.join('; ')}`);
  return d;
}
export function loadPublishedLearn(root, manifest) {
  const failures = []; const published = [];
  const modules = manifest.modules;
  if (!Array.isArray(modules)) throw new Error('Invalid Learn curriculum: modules must be an array');
  const ids = new Set(), lessonsGlobal = new Set(), routes = new Set(), orders = new Set();
  for (const mod of modules) {
    if (ids.has(mod.id)) failures.push(`Duplicate module ID ${mod.id}`); ids.add(mod.id);
    if (!Number.isInteger(mod.order) || mod.order < 1 || orders.has(mod.order)) failures.push(`Invalid/duplicate module order ${mod.id}`); orders.add(mod.order);
    if (!['draft', 'published'].includes(mod.status)) failures.push(`Invalid module status ${mod.id}`);
    if (!Array.isArray(mod.lessonIds) || !mod.lessonIds.length) { failures.push(`Empty lessons ${mod.id}`); continue; }
    for (const id of mod.lessonIds) { if (lessonsGlobal.has(id)) failures.push(`Duplicate lesson ID ${id}`); lessonsGlobal.add(id); }
    for (const locale of LEARN_LOCALES) {
      const s = mod.slugs?.[locale];
      if (typeof s !== 'string' || !LEARN_SLUG.test(s)) failures.push(`Invalid module slug ${mod.id}/${locale}`);
      const route = `${locale}/${s}`; if (routes.has(route)) failures.push(`Duplicate module route ${route}`); routes.add(route);
    }
    if (mod.status !== 'published') continue;
    for (const locale of LEARN_LOCALES) {
      try {
        validateLearnFrontmatter(readLearnPublication(root, 'modules', mod.id, locale), 'modules', mod.id, locale);
        const seen = new Set(); const lessons = [];
        for (const [i, id] of mod.lessonIds.entries()) {
          const data = validateLearnFrontmatter(readLearnPublication(root, 'lessons', id, locale), 'lessons', id, locale, mod.id, i + 1);
          if (seen.has(data.slug)) throw new Error(`Duplicate lesson slug ${locale}/${mod.id}/${data.slug}`);
          seen.add(data.slug); lessons.push({ id, slug: data.slug });
        }
        published.push({ module: mod, locale, lessons });
      } catch (error) { failures.push(error.message); }
    }
  }
  if (failures.length) throw new Error(failures.join('\n'));
  return published;
}
