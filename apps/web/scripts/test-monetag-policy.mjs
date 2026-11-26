import assert from 'node:assert/strict';
import {adPolicy} from '../lib/monetization/policy.mjs';
const options={enabled:true,advertisingAllowed:true,inpage:true,vignette:true,onclick:true};
const normal={inpage:true,vignette:true,onclick:false}, pop={inpage:true,vignette:false,onclick:true}, off={inpage:false,vignette:false,onclick:false};
const cases=[['/music/',false,{},normal],['/es/musica/dj-edits/',true,{},normal],['/music/dj-edits/sola/',true,{},pop],['/es/musica/dj-mixes/mix/',true,{},pop],['/music/dj-sets/set/',false,{},normal],['/music/dj-sets/set/',true,{},pop],['/blog/test/',true,{},normal],['/tools/',true,{},off],['/music/dj-edits/sola/',true,{advertisingAllowed:false},off],['/music/dj-edits/sola/',true,{enabled:false},off],['/music/dj-edits/sola/',true,{onclick:false},normal],['/music/dj-edits/sola/',true,{inpage:false},{...pop,inpage:false}],['/music/dj-edits/sola/',false,{vignette:false},{...normal,vignette:false}],['/music-preview/dj-edits/sola/',true,{},off]];
for(const [path,download,override,expected] of cases) assert.deepEqual(adPolicy(path,download,{...options,...override}),expected,path);
console.log(`Monetag policy: ${cases.length} assertions passed`);
