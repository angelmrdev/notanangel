import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const catalog=JSON.parse(readFileSync(new URL('../config/tools-catalog.json',import.meta.url),'utf8'));
const origin='https://notanangeldj.com';
const read=p=>readFileSync(new URL('../out/'+p,import.meta.url),'utf8');
const base=l=>l==='en'?'tools/':'es/herramientas/';
const index=read('sitemap.xml');
for(const l of ['en','es']) {
 const xml=read(`sitemaps/${l}/tools.xml`);
 assert(index.includes(`${origin}/sitemaps/${l}/tools.xml`));
 const paths=[base(l),...catalog.filter(t=>t.status==='published').map(t=>base(l)+t[l].slug+'/')];
 assert.equal((xml.match(/<loc>/g)||[]).length,paths.length);
 for(const p of paths){const html=read(p+'index.html');assert(xml.includes(`<loc>${origin}/${p}</loc>`));assert(html.includes(`${origin}/${p}`),`Missing canonical URL: ${p}`);assert(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html),`Noindex: ${p}`);}
 for(const t of catalog.filter(t=>t.status==='draft')) {const p=base(l)+t[l].slug+'/';assert(!existsSync(new URL('../out/'+p+'index.html',import.meta.url)));assert(!xml.includes(`<loc>${origin}/${p}</loc>`));}
}
console.log('Public tool export and sitemap checks passed.');
