import assert from 'node:assert/strict';
import {keys} from '../lib/tools/harmony.mjs';
import {compare} from '../lib/tools/compatibility.mjs';
for(const a of keys)for(const b of keys){const r=compare(a.code,b.code),s=compare(b.code,a.code);assert.equal(r.common.length,s.common.length);assert.equal(r.common.length+r.onlyA.length,7);assert.equal(r.common.length+r.onlyB.length,7);if(r.kind==='same'||r.kind==='relative')assert.equal(r.common.length,7);if(r.kind==='adjacent')assert.equal(r.common.length,6);if(r.kind==='parallel')assert.equal(r.common.length,4);}
assert.equal(compare('8A','10A').kind,'creative');assert.equal(compare('8A','10A').common.length,5);assert.equal(compare('12A','1A').kind,'adjacent');assert.equal(compare('bad','8A'),null);console.log('Compatibility: all 576 ordered pairs and targeted cases passed');
