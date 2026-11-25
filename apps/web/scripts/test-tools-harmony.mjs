import assert from 'node:assert/strict';
import {keys,relation} from '../lib/tools/harmony.mjs';
assert.equal(keys.length,24);assert.equal(new Set(keys.map(k=>k.open)).size,24);assert.equal(keys.find(k=>k.code==='8A').open,'1m');assert.equal(keys.find(k=>k.code==='8B').note,'C');assert.equal(relation('12A','1A'),'adjacent');assert.equal(relation('8A','8B'),'relative');assert.equal(relation('8A','8A'),'same');assert.equal(relation('8A','9B'),'other');console.log('Harmony tests passed (8 assertions).');
