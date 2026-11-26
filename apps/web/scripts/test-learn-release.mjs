/** M06-B: isolated bilingual release-gate and sitemap smoke tests.
 * Uses a temporary directory, never edits the actual publication content/manifest.
 * Run from apps/web: node scripts/test-learn-release.mjs
 */
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, cpSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { loadPublishedLearn } from './learn-publication-catalog.mjs';

const appRoot = process.cwd();
const sandbox = mkdtempSync(join(tmpdir(), 'naa-m06b-'));
const manifestPath = resolve(appRoot, 'config/dj-learn-curriculum.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const target = manifest.modules[0];
if (!target || target.lessonIds.length < 2) throw new Error('Expected a curriculum module with at least two lessons');
const testManifest = structuredClone(manifest);
for (const curriculumModule of testManifest.modules) curriculumModule.status = 'draft';
testManifest.modules[0].status = 'published';
const file = (locale, kind, id) => join(sandbox, 'content', 'learn', locale, kind, `${id}.mdx`);
const write = (locale, kind, id, data, body = '# Fixture only\n\n< KeyConcept /> is not used in this test.\n') => {
  const dest = file(locale, kind, id);
  mkdirSync(resolve(dest, '..'), { recursive: true });
  const yaml = Object.entries(data).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
  writeFileSync(dest, `---\n${yaml}\n---\n\n${body}`, 'utf8');
};
const lessonSlug = (locale, index) => `${locale === 'es' ? 'leccion' : 'lesson'}-${index + 1}`;
const lessonData = (locale, id, index) => ({ id, locale, moduleId: target.id, order: index + 1, slug: lessonSlug(locale, index), title: `${locale} ${id}`, description: 'Temporary test fixture', status: 'ready' });
const checkFails = (label, expected) => {
  assert.throws(() => loadPublishedLearn(sandbox, testManifest), expected, label);
  console.log(`PASS: ${label}`);
};
const writeLesson = (locale, index, overrides = {}, body) => write(locale, 'lessons', target.lessonIds[index], { ...lessonData(locale, target.lessonIds[index], index), ...overrides }, body);
try {
  for (const locale of ['en', 'es']) {
    write(locale, 'modules', target.id, { id: target.id, locale, title: `Module ${locale}`, description: 'Temporary module', status: 'ready' });
    target.lessonIds.forEach((_, i) => writeLesson(locale, i));
  }
  const pairs = loadPublishedLearn(sandbox, testManifest);
  assert.equal(pairs.length, 2);
  for (const pair of pairs) assert.equal(pair.lessons.length, target.lessonIds.length);
  console.log('PASS: complete bilingual module accepted');

  unlinkSync(file('es', 'lessons', target.lessonIds[0]));
  checkFails('missing Spanish lesson rejected', /Missing Learn MDX/);
  writeLesson('es', 0);

  writeLesson('en', 0, { order: 999 });
  checkFails('incorrect lesson order rejected', /Expected order/);
  writeLesson('en', 0);

  writeLesson('es', 1, { slug: lessonSlug('es', 0) });
  checkFails('duplicate lesson slug rejected', /Duplicate lesson slug/);
  writeLesson('es', 1);

  writeLesson('en', 0, { status: 'draft' });
  checkFails('unready lesson rejected', /Status must be ready/);
  writeLesson('en', 0);

  writeLesson('en', 0, {}, '  \n');
  checkFails('empty lesson body rejected', /Empty Learn MDX body/);
  writeLesson('en', 0);

  // Run the real sitemap generator against a sandbox with the fixture manifest.
  mkdirSync(join(sandbox, 'config'), { recursive: true });
  writeFileSync(join(sandbox, 'config', 'dj-learn-curriculum.json'), JSON.stringify(testManifest));
  for (const name of ['sitemap-routes.json', 'blog-taxonomies.json', 'tools-catalog.json']) {
    cpSync(resolve(appRoot, 'config', name), join(sandbox, 'config', name));
  }
  const result = spawnSync(process.execPath, [resolve(appRoot, 'scripts/generate-sitemaps.mjs')], { cwd: sandbox, encoding: 'utf8' });
  assert.equal(result.status, 0, `Sitemap generator failed: ${result.stderr || result.stdout}`);
  const xml = locale => readFileSync(join(sandbox, 'public', 'sitemaps', locale, 'learn-to-dj.xml'), 'utf8');
  const en = xml('en'), es = xml('es');
  assert.ok(en.includes(`/learn-to-dj/${target.slugs.en}/`));
  assert.ok(es.includes(`/es/curso-dj/${target.slugs.es}/`));
  assert.ok(en.includes('hreflang="es"') && es.includes('hreflang="en"'));
  for (const [i] of target.lessonIds.entries()) {
    assert.ok(en.includes(`/learn-to-dj/${target.slugs.en}/${lessonSlug('en', i)}/`));
    assert.ok(es.includes(`/es/curso-dj/${target.slugs.es}/${lessonSlug('es', i)}/`));
  }
  assert.ok(!en.includes('/__empty__/') && !es.includes('/__empty__/'));
  assert.ok(!en.includes(`/learn-to-dj/${testManifest.modules[1]?.slugs.en}/`));
  console.log('PASS: bilingual sitemap URLs, alternates, and draft exclusion');

  // Empty release must contain only the course landing in both locales.
  testManifest.modules[0].status = 'draft';
  assert.equal(loadPublishedLearn(sandbox, testManifest).length, 0);
  writeFileSync(join(sandbox, 'config', 'dj-learn-curriculum.json'), JSON.stringify(testManifest));
  const empty = spawnSync(process.execPath, [resolve(appRoot, 'scripts/generate-sitemaps.mjs')], { cwd: sandbox, encoding: 'utf8' });
  assert.equal(empty.status, 0, `Empty sitemap failed: ${empty.stderr || empty.stdout}`);
  assert.ok(!xml('en').includes(`/learn-to-dj/${target.slugs.en}/`));
  assert.ok(!xml('es').includes(`/es/curso-dj/${target.slugs.es}/`));
  console.log('PASS: draft-only sitemap excludes module and lesson routes');
  console.log('M06-B release gate and sitemap smoke tests: PASS');
} finally {
  rmSync(sandbox, { recursive: true, force: true });
}
