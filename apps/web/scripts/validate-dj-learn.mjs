import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// M05-A: validates the curriculum contract and existing editorial sources.
// It does not publish pages, convert Markdown, or alter the sitemap.
const repoRoot = resolve(process.cwd(), '../..');
const config = JSON.parse(readFileSync(resolve(process.cwd(), 'config/dj-learn-curriculum.json'), 'utf8'));
const errors = [];
const ids = new Set();
const routes = new Set();
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const field = (md, key) => {
  const front = md.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? '';
  return front.match(new RegExp(`^${key}:\\s*(.*?)\\s*$`, 'm'))?.[1]?.replace(/^['"]|['"]$/g, '') ?? null;
};
for (const mod of config.modules ?? []) {
  if (ids.has(mod.id)) errors.push(`Duplicate module ID: ${mod.id}`);
  ids.add(mod.id);
  if (!Array.isArray(mod.lessonIds) || !mod.lessonIds.length) errors.push(`${mod.id}: empty lesson list`);
  if (new Set(mod.lessonIds).size !== mod.lessonIds.length) errors.push(`${mod.id}: duplicate lesson IDs`);
  if (!['draft','published'].includes(mod.status)) errors.push(`${mod.id}: invalid module status`);
  for (const locale of config.locales) {
    const moduleSlug = mod.slugs?.[locale];
    if (!slugPattern.test(moduleSlug ?? '')) errors.push(`${mod.id}: invalid ${locale} module slug`);
    const route = `${config.basePaths[locale]}${moduleSlug}/`;
    if (routes.has(route)) errors.push(`Duplicate route: ${route}`);
    routes.add(route);
    for (const lessonId of mod.lessonIds ?? []) {
      const file = resolve(repoRoot, 'content/dj-learn', locale, 'lessons', `${lessonId}.md`);
      if (!existsSync(file)) {
        if (mod.status === 'published') errors.push(`Published module missing ${locale} lesson: ${lessonId}`);
        continue;
      }
      const md = readFileSync(file, 'utf8');
      if (field(md, 'id') !== lessonId) errors.push(`${file}: id mismatch`);
      if (field(md, 'locale') !== locale) errors.push(`${file}: locale mismatch`);
      const sourceModuleId = field(md, 'module_id');
      const legacyModuleId = mod.id.replace('dj-module-', 'dj-');
      if (![mod.id, legacyModuleId].includes(sourceModuleId)) errors.push(`${file}: module_id mismatch (${sourceModuleId})`);
      const slug = field(md, 'slug');
      if (!slugPattern.test(slug ?? '')) errors.push(`${file}: invalid slug`);
      const lessonRoute = `${route}${slug}/`;
      if (routes.has(lessonRoute)) errors.push(`Duplicate route: ${lessonRoute}`);
      routes.add(lessonRoute);
      if (mod.status === 'published') {
        if (field(md, 'status') !== 'ready') errors.push(`${file}: published module requires status ready`);
        if (field(md, 'visual_status') !== 'integrated') errors.push(`${file}: published module requires visual_status integrated`);
      }
    }
  }
}
if (errors.length) { console.error(errors.map(x => `- ${x}`).join('\n')); process.exitCode = 1; }
else console.log(`DJ Learn contract valid: ${config.modules.length} draft/published module definitions; ${routes.size} reserved routes.`);
