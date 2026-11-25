import assert from 'node:assert/strict';
import {pitchPlan} from '../lib/tools/pitch.mjs';
const p=(a,b,m='target',pitch=0,r=6)=>pitchPlan(a,b,m,pitch,r,16,4);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9);
near(p(136,128).a.percent,-5.88235294117647);assert.ok(p(136,128).a.fits);assert.ok(!p(128,136).a.fits);near(p(128,136,'mid').target,132);const balanced=p(136,128,'balanced');near(balanced.a.percent,-balanced.b.percent);near(p(100,0,'reverse',10).target,110);near(p(100,200).a.semitones,12);near(p(128,128).seconds,30);assert.equal(p(0,128),null);assert.equal(p(128,0),null);assert.equal(p(128,0,'reverse',-100),null);assert.equal(p(128,0,'reverse',NaN),null);console.log('Pitch tests passed (12 assertions).');
