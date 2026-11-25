import assert from 'node:assert/strict';
import {pitchPercent,targetTempo,beatMs,tapTempo} from '../lib/tools/tempo.mjs';
const near=(a,b)=>assert(Math.abs(a-b)<1e-9);
near(pitchPercent(136,128),-5.88235294117647);near(targetTempo(100,-10),90);near(beatMs(128),468.75);near(tapTempo([0,500,1000,1500]),120);assert.equal(tapTempo([0]),null);near(pitchPercent(128,132),3.125);near(beatMs(128)*.5*1.5,351.5625);console.log('Tempo tests passed (7 assertions).');
