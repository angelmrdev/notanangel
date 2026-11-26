import assert from 'node:assert/strict';
import {isMetadataRoute,crossesMetadataBoundary} from '../lib/tools/metadata/private-route.mjs';
import {adPolicy} from '../lib/monetization/policy.mjs';
const options={enabled:true,advertisingAllowed:true,inpage:true,vignette:true,onclick:true};
for(const path of ['/tools/audio-metadata-editor/','/es/herramientas/editor-metadatos-audio/']) {assert(isMetadataRoute(path));assert(isMetadataRoute(path.slice(0,-1)));assert(crossesMetadataBoundary('/blog/',path));assert(crossesMetadataBoundary(path,'/music/'));assert.deepEqual(adPolicy(path,true,options),{inpage:false,vignette:false,onclick:false});}
assert(!isMetadataRoute('/tools/'));assert(!crossesMetadataBoundary('/blog/','/music/'));console.log('Metadata privacy: 12 assertions passed (route policy only).');
