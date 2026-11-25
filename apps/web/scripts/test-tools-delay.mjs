import assert from 'node:assert/strict';
import {noteMs,bpmFromMs,cycleHz,barMs,sampleCount,noteDenominators,noteFactors} from '../lib/tools/delay.mjs';
assert.equal(noteMs(128,4),468.75);assert.equal(noteMs(128,8,1.5),351.5625);assert.equal(noteMs(128,8,2/3),156.25);assert.equal(cycleHz(500),2);assert.equal(barMs(128,4,4,16),30000);assert.equal(barMs(120,6,8),1500);assert.equal(sampleCount(500,48000),24000);
let count=7;for(const bpm of [1,90,128,174.5,1000])for(const d of noteDenominators)for(const f of noteFactors){assert.ok(Math.abs(bpmFromMs(noteMs(bpm,d,f),d,f)-bpm)<1e-8);count++;}console.log(`Delay tests passed (${count} assertions).`);
