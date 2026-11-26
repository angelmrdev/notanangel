import assert from 'node:assert/strict';
import { availableDownloads,relatedMusic,durationLabel,releaseMetadata,recordingData } from '../lib/music/detail.mjs';
const m={title:'Example',description:'Description',metaTitle:'SEO title',metaDescription:'SEO description',coverAlt:'Cover'};
const r={id:'one',slug:'one',category:'dj-edits',status:'published',publishedAt:'2025-01-01',artists:['Artist'],genres:['Pop'],locales:{en:m,es:m},downloads:[{id:'a',enabled:true,rights:'authorized'},{id:'b',enabled:true,rights:'blocked'},{id:'c',enabled:false,rights:'authorized'}],durationSeconds:123,thumbnail:'/thumb.jpg'};
assert.deepEqual(availableDownloads(r).map(d=>d.id),['a']);
assert.equal(durationLabel(123),'2:03');
assert.equal(releaseMetadata(r,'es').alternates.canonical,'/es/musica/dj-edits/one/');
assert.equal(releaseMetadata(r,'en').robots.index,true);
assert.equal(releaseMetadata({...r,status:'draft'},'en').robots.index,false);
assert.equal(releaseMetadata(r,'es').alternates.languages['x-default'],'/music/dj-edits/one/');
assert.equal(recordingData(r,'en').duration,'PT123S');
assert.deepEqual(relatedMusic(r,[r,{...r,id:'two'},{...r,id:'three',status:'draft'},{...r,id:'four',publishedAt:'2099-01-01'}]).map(x=>x.id),['two']);
console.log('Music detail tests passed (6 assertions).');

assert.deepEqual(releaseMetadata({...r,ogImage:'/og.jpg'},'en').openGraph.images,[{url:'/og.jpg',width:1200,height:630,alt:'Example'}]);
assert.equal(releaseMetadata(r,'en').openGraph.images[0].url,'/thumb.jpg');
console.log('Open Graph tests passed (2 assertions).');
