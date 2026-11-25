import assert from 'node:assert/strict';
import {detectKey} from '../lib/tools/audio/key.mjs';
import {keys} from '../lib/tools/harmony.mjs';
import {pitch} from '../lib/tools/converter.mjs';
const rate=22050;
assert.equal(detectKey(new Float32Array(rate*5),rate),null);
assert.equal(detectKey(new Float32Array(rate),rate),null);
let primary=0,top=0;
for(const k of keys){const root=pitch(k.note);const intervals=k.minor?[0,2,3,5,7,8,10]:[0,2,4,5,7,9,11];const weights=[1,.22,.65,.32,.85,.24,.18];const s=Float32Array.from({length:rate*5},(_,i)=>intervals.reduce((a,n,j)=>a+weights[j]*Math.sin(2*Math.PI*440*2**((48+root+n-69)/12)*i/rate),0)/4);const r=detectKey(s,rate);assert.ok(r,k.code);assert.ok(Math.abs(r.chroma.reduce((a,b)=>a+b,0)-1)<1e-8);if(r.code===k.code)primary++;if(r.candidates.some(c=>c.code===k.code))top++;console.log(k.code,r.code);}
assert.equal(top,24);console.log({primary,top});
