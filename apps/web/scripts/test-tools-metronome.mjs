import assert from 'node:assert/strict';
import {tickInfo,tickSeconds} from '../lib/tools/metronome.mjs';
let count=0;
for(const beats of [2,3,4,5,6,7,8])for(const sub of [1,2,3,4])for(const phrase of [4,8,16,32]){const size=beats*sub*phrase;for(let i=0;i<=size;i++){const t=tickInfo(i,beats,sub,phrase);assert.equal(t.phraseStart,i%size===0);assert.equal(t.accent,i%(beats*sub)===0);assert.equal(t.main,i%sub===0);assert.equal(t.beat,Math.floor(i/sub)%beats+1);count++;}}
assert.equal(tickSeconds(120,2),.25);console.log(`${count} tick positions verified`);
