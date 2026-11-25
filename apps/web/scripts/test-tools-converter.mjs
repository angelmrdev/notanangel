import assert from 'node:assert/strict';
import {keys} from '../lib/tools/harmony.mjs';
import {searchKeys,notes,pitch,spellings} from '../lib/tools/converter.mjs';
import {scale} from '../lib/tools/wheel.mjs';
for(const k of keys){assert.deepEqual(searchKeys(k.code),[k]);assert.deepEqual(searchKeys(k.open),[k]);assert.deepEqual(notes(k).map(pitch),scale(k.code));for(const n of spellings(k))assert.ok(searchKeys(n+(k.minor?' minor':' major')).includes(k));}
assert.equal(searchKeys('Fa sostenido menor')[0].code,'11A');assert.equal(searchKeys('F♯m')[0].code,'11A');assert.equal(searchKeys('Gb minor')[0].code,'11A');assert.equal(searchKeys('nonsense').length,0);assert.equal(searchKeys('A').length,2);console.log('Converter tests passed for all 24 keys.');
