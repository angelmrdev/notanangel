import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {emptyRelease,saveRelease,youtubeId} from './music-admin/store.mjs';
import {categories,loadMusicCatalog} from '../lib/music/catalog.mjs';
const root=mkdtempSync(join(tmpdir(),'music-admin-test-'));
try{for(const c of categories)mkdirSync(join(root,c));const r=emptyRelease('dj-edits');Object.assign(r,{id:'test-edit',slug:'test-edit',youtubeId:'https://youtu.be/abcdefghijk',originalTracks:[{title:'Track',artist:'Artist'}]});for(const l of ['en','es'])for(const k of Object.keys(r.locales[l]))r.locales[l][k]='Test';
assert.equal(youtubeId(r.youtubeId),'abcdefghijk');assert.throws(()=>youtubeId('https://evil.test/watch?v=abcdefghijk'));saveRelease(root,r,{dryRun:true});assert.equal(loadMusicCatalog(root).length,0);saveRelease(root,r);assert.equal(loadMusicCatalog(root)[0].youtubeId,'abcdefghijk');assert.throws(()=>saveRelease(root,{...r,status:'published'}));assert.equal(loadMusicCatalog(root)[0].status,'draft');r.bodies.en='Updated';saveRelease(root,r);assert.equal(loadMusicCatalog(root)[0].bodies.en,'Updated');assert.throws(()=>saveRelease(root,{...r,id:'other'}));assert.throws(()=>saveRelease(root,{...r,slug:'../bad'}));console.log('Music admin tests passed (9 assertions).');}finally{rmSync(root,{recursive:true,force:true});}
