import {readFileSync,existsSync,readdirSync} from "node:fs";
import assert from "node:assert/strict";
const tools=JSON.parse(readFileSync(new URL("../config/tools-catalog.json",import.meta.url),"utf8"));
assert(Array.isArray(tools)&&tools.length>0);
const ids=new Set(), slugs={en:new Set(),es:new Set()};
for(const t of tools){
 assert.match(t.id,/^[AB][0-9]{2}$/); assert(!ids.has(t.id),`Duplicate ID ${t.id}`); ids.add(t.id);
 assert(["tempo","harmony"].includes(t.category)); assert(["draft","published"].includes(t.status));
 for(const l of ["en","es"]){const c=t[l];assert.match(c.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);assert(!slugs[l].has(c.slug));slugs[l].add(c.slug);assert(c.title.trim()&&c.description.trim());}
}
const live=tools.filter(t=>t.status==='published');
for(const l of ['en','es']) {
 const base=new URL(l==='en'?'../app/(en)/tools/':'../app/(es)/es/herramientas/',import.meta.url);
 assert.equal(existsSync(new URL('page.tsx',base)),live.length>0);
 for(const t of tools) assert.equal(existsSync(new URL(t[l].slug+'/page.tsx',base)),t.status==='published',`Route/status mismatch: ${l}/${t.id}`);
 if(live.length) for(const d of readdirSync(base,{withFileTypes:true}).filter(d=>d.isDirectory())) assert(live.some(t=>t[l].slug===d.name),`Unexpected public route: ${d.name}`);
}
console.log(`Tools validated: ${live.length} published, ${tools.length-live.length} drafts.`);
