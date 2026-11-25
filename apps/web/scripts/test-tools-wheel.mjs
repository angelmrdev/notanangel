import assert from 'node:assert/strict';
import {keys} from '../lib/tools/harmony.mjs';
import {move,options,advanced,scale,shared,relation} from '../lib/tools/wheel.mjs';
for(const k of keys){assert.equal(new Set(scale(k.code)).size,7);assert.equal(options(k.code).length,4);for(const o of options(k.code)){assert.equal(relation(k.code,o.code),o.kind);assert.equal(shared(k.code,o.code),o.kind==='adjacent'?6:7);}for(const a of advanced(k.code)){assert.ok(keys.some(x=>x.code===a.code));assert.equal(relation(k.code,a.code),'other');}assert.equal(move(move(k.code,1),-1),k.code);}
assert.equal(move('12A',1),'1A');assert.equal(move('1B',-1),'12B');assert.equal(move('bad',1),null);console.log('Wheel tests passed for all 24 starting keys.');
