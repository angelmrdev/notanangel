/** M14-E: standalone draft / MDX-resource / lint-regression smoke test. */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const root=process.cwd();
const read=(p)=>readFileSync(resolve(root,p),'utf8');
const registry=read('components/learn/educational-components.tsx');
const eq=read('components/learn/module07-eq-basics-visuals.tsx');
const phrases=read('components/learn/module07-eq-phrases-visuals.tsx');
const curriculum=JSON.parse(read('config/dj-learn-curriculum.json'));
const module07=curriculum.modules.find(m=>m.id==='dj-module-07');
assert.equal(module07?.status,'draft');
assert.equal(curriculum.modules.filter(m=>m.status==='published').length,6);
assert.equal(module07.lessonIds.length,7);
assert.match(eq,/function EqDeckControls\(/);
assert.match(eq,/<EqDeckControls deck="a"/);
assert.doesNotMatch(eq,/function Deck\(/);
assert.match(registry,/from '\.\/module07-eq-phrases-visuals'/);
const resourceNames=['PhraseEQMap','PhraseBlendLab','EQPhrasePractice'];
let componentCount=0;
for(const lang of ['en','es']){
 const doc=read(`content/learn/${lang}/lessons/dj-07-004.mdx`);
 assert.match(doc,new RegExp(`locale: "${lang}"`));
 assert.match(doc,/status: "draft"/);
 assert.match(doc,/moduleId: "dj-module-07"/);
 assert.match(doc,/order: 4/);
 assert.doesNotMatch(doc,/\*\*Editorial draft|\*\*Borrador editorial/);
 for(const name of resourceNames){
  const id=`${name}${lang==='en'?'En':'Es'}`;
  assert.equal((doc.match(new RegExp(`<${id}\\s*\\/>`,'g'))||[]).length,1,`${id} must appear once in ${lang} MDX`);
  assert.match(phrases,new RegExp(`export function ${id}\\(`));
  assert.match(registry,new RegExp(`\\b${id}\\b`));
  componentCount++;
 }
}
console.log(`M14-E smoke test PASS: EQ child component is static, ${componentCount} EN/ES resources registered, module 07 remains draft`);
