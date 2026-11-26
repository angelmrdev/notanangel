/** M14-G: lesson 07-006 bilingual completeness and draft isolation check. Run from apps/web. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const read = path => readFileSync(resolve(process.cwd(), path), 'utf8');
const curriculum = JSON.parse(read('config/dj-learn-curriculum.json'));
const module07 = curriculum.modules.find(module => module.id === 'dj-module-07');
assert.ok(module07, 'Module 07 must be registered');
assert.equal(module07.status, 'draft', 'Module 07 must stay unpublished');
assert.equal(module07.lessonIds.length, 7);
assert.equal(curriculum.modules.filter(module => module.status === 'published').length, 6);
for (const publishedModule of curriculum.modules.slice(0, 6)) {
  assert.equal(publishedModule.status, 'published', `Module ${publishedModule.id} unexpectedly unpublished`);
}
const registry = read('components/learn/educational-components.tsx');
const tsx = read('components/learn/module07-fast-transitions-visuals.tsx');
const css = read('components/learn/module07-fast-transitions-visuals.module.css');
assert.match(registry, /from '\.\/module07-fast-transitions-visuals'/);
assert.match(tsx, /^'use client';/);
for (const className of ['.panel', '.timeline', '.readout', '.checklist']) assert.ok(css.includes(className), `Missing style ${className}`);
const symbols = ['FastTransitionMap', 'FastTransitionDiagnosis', 'FastTransitionPractice'];
const expectedSlug = { en: 'cuts-drops-and-quick-transitions', es: 'cortes-drops-y-transiciones-rapidas' };
let inserts = 0;
for (const locale of ['en', 'es']) {
  const doc = read(`content/learn/${locale}/lessons/dj-07-006.mdx`);
  for (const expected of [`id: "dj-07-006"`, `locale: "${locale}"`, 'moduleId: "dj-module-07"', `slug: "${expectedSlug[locale]}"`, 'order: 6', 'status: "draft"']) {
    assert.ok(doc.includes(expected), `${locale} missing metadata ${expected}`);
  }
  assert.doesNotMatch(doc, /\*\*Editorial draft|\*\*Borrador editorial/);
  assert.ok(doc.length > 6500, `${locale} lesson unexpectedly short`);
  assert.match(doc, /<FastTransitionMap(?:En|Es)\s*\/>/);
  for (const name of symbols) {
    const symbol = `${name}${locale === 'en' ? 'En' : 'Es'}`;
    const usage = new RegExp(`<${symbol}\\s*\\/>`, 'g');
    assert.equal([...doc.matchAll(usage)].length, 1, `Expected exactly one ${symbol} in ${locale}`);
    assert.match(tsx, new RegExp(`export function ${symbol}\\(`), `Missing export ${symbol}`);
    assert.match(registry, new RegExp(`\\b${symbol}\\b`), `Missing MDX registration ${symbol}`);
    inserts++;
  }
}
for (const locale of ['en', 'es']) {
  const moduleDoc = read(`content/learn/${locale}/modules/dj-module-07.mdx`);
  assert.match(moduleDoc, /status: "draft"/);
  const finalDoc = read(`content/learn/${locale}/lessons/dj-07-007.mdx`);
  assert.match(finalDoc, /status: "draft"/);
}
assert.match(tsx, /handover\s*=\s*length\s*\/\s*2\s*\+\s*1/);
assert.match(tsx, /handover\s*-\s*2/);
console.log(`M14-G smoke test PASS: DJ-07-006 EN/ES, ${inserts} resources, module 07 draft; only modules 01–06 public`);
