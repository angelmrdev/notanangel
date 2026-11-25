import assert from 'node:assert/strict';
import {detectTempo} from '../lib/tools/audio/tempo.mjs';
const rate=22050;
for(const bpm of [70,90,100,120,128,140,174,200]){const x=new Float32Array(rate*20);for(let t=0;t<20;t+=60/bpm){const start=Math.round(t*rate);for(let j=0;j<600&&start+j<x.length;j++)x[start+j]=Math.sin(j*.2)*Math.exp(-j/150);}const r=detectTempo(x,rate);assert(r);assert(r.candidates.some(c=>Math.abs(c.bpm-bpm)<2),JSON.stringify({bpm,r}));console.log(bpm,r.bpm);}
assert.equal(detectTempo(new Float32Array(rate*10),rate),null);assert.equal(detectTempo(new Float32Array(rate),rate),null);
console.log('Tempo tests passed');
