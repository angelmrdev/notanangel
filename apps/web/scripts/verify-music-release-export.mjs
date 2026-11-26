import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadMusicCatalog,publishedMusic,musicPath} from '../lib/music/catalog.mjs';
import {musicRoutes} from '../lib/music/publication.mjs';
import {availableDownloads} from '../lib/music/detail.mjs';
import {downloadUrl} from '../lib/music/downloads.mjs';
import {buildManifest} from '../../../infra/music-downloads/manifest.mjs';
const web=fileURLToPath(new URL('../',import.meta.url)),out=join(web,'out'),origin='https://notanangeldj.com';
const entries=loadMusicCatalog(join(web,'content/music')), now=new Date(), live=publishedMusic(entries,now);
const read=p=>readFileSync(join(out,p),'utf8');
const index=read('sitemap.xml');
for(const locale of ['en','es']){
 const expected=musicRoutes(entries,locale,now), base=musicPath(locale), sitemap=`sitemaps/${locale}/music.xml`;
 assert.equal(index.includes(`${origin}/${sitemap}`),expected.length>0);
 const xml=expected.length?read(sitemap):'';
 assert.deepEqual((Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g),m=>m[1])).sort(),expected.map(p=>origin+p).sort());
 const scan=(dir,prefix)=>existsSync(dir)?readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?scan(join(dir,e.name),prefix+e.name+'/'):e.name==='index.html'?[prefix]:[]):[];
 assert.deepEqual(scan(join(out,base),base).sort(),[...expected].sort(),'Unexpected/missing public Music pages');
 for(const p of expected){const html=read(p+'index.html');const tags=html.match(/<(?:link|meta)\b[^>]*>/gi)||[];assert(tags.some(t=>t.includes('rel="canonical"')&&t.includes(`href="${origin+p}"`)),`canonical ${p}`);assert(!tags.some(t=>t.includes('name="robots"')&&t.includes('noindex')),`noindex ${p}`);for(const l of ['en','es','x-default'])assert(tags.some(t=>t.includes(`hreflang="${l}"`)||t.includes(`hrefLang="${l}"`)),`hreflang ${p} ${l}`);}
 for(const r of live){const p=musicPath(locale,r.category,r.slug),html=read(p+'index.html');assert(html.includes(`https://www.youtube.com/watch?v=${r.youtubeId}`),`missing YouTube ${p}`);assert(html.includes('MusicRecording'),`missing structured data ${p}`);for(const img of [r.cover,r.thumbnail,r.ogImage].filter(Boolean))assert(existsSync(join(out,img)),`missing exported ${img}`);const downloads=availableDownloads(r);for(const d of r.downloads)assert.equal(html.includes(`href="${downloadUrl(r.id,d.id)}"`),downloads.includes(d),`download exposure ${p}/${d.id}`);assert.equal(html.includes('data-naa-authorized-downloads="true"'),downloads.length>0);}
}
const saved=JSON.parse(readFileSync(new URL('../../../infra/music-downloads/manifest.json',import.meta.url),'utf8'));assert.deepEqual(saved,buildManifest(entries,now),'Regenerate Worker manifest');
console.log(`Music export: ${live.length} releases; ${musicRoutes(entries,'en',now).length*2} public URLs; ${saved.length} downloads. Checks passed.`);
