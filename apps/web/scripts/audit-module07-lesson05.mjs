/** M14-F: independent smoke check for lesson 05 and its draft isolation. Run from apps/web. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root=process.cwd();
const read=(path)=>readFileSync(resolve(root,path),'utf8');
const manifest=JSON.parse(read('config/dj-learn-curriculum.json'));
const module07=manifest.modules.find(m=>m.id==='dj-module-07');
assert.equal(module07?.status,'draft');
assert.equal(manifest.modules.filter(m=>m.status==='published').length,6);
assert.equal(module07.lessonIds.length,7);
const registry=read('components/learn/educational-components.tsx');
const tsx=read('components/learn/module07-filter-transitions-visuals.tsx');
const css=read('components/learn/module07-filter-transitions-visuals.module.css');
assert.match(registry,/from '\.\/module07-filter-transitions-visuals'/);
assert.ok(css.includes('.timeline')&&css.includes('.plot'));
const names=['FilterResponseExplorer','FilterSweepPlanner','FilterPractice'];
const expected={en:'filter-transitions',es:'transiciones-con-filtros'};
let references=0;
for(const lang of ['en','es']){
 const doc=read(`content/learn/${lang}/lessons/dj-07-005.mdx`);
 for(const match of [`id: "dj-07-005"`,`locale: "${lang}"`,'moduleId: "dj-module-07"',`slug: "${expected[lang]}"`,'order: 5','status: "draft"']) assert.ok(doc.includes(match),`${lang}: missing ${match}`);
 assert.doesNotMatch(doc,/\*\*Editorial draft|\*\*Borrador editorial/);
 assert.ok(doc.length>5000,`${lang}: lesson is unexpectedly short`);
 for(const name of names){
  const symbol=name+(lang==='en'?'En':'Es');
  assert.equal((doc.match(new RegExp(`<${symbol}\\s*\\/>`,'g'))||[]).length,1,`${symbol} must occur once in ${lang} lesson`);
  assert.match(tsx,new RegExp(`export function ${symbol}\\(`));
  assert.match(registry,new RegExp(`\\b${symbol}\\b`));
  references++;
 }
}
assert.match(tsx,/function FilterResponseExplorer\(/);
assert.match(tsx,/function FilterSweepPlanner\(/);
assert.match(tsx,/function FilterPractice\(/);
console.log(`M14-F smoke test PASS: lesson 07-005 EN/ES, ${references} educational inserts, 6 registered symbols, 7 modules with only 01-06 published`);
