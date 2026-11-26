import {categories,musicPath,publishedMusic} from './catalog.mjs';
export function musicRoutes(entries,locale,now=new Date()) {
 const live=publishedMusic(entries,now); if(!live.length)return [];
 return [musicPath(locale),...categories.flatMap(c=>{const group=live.filter(r=>r.category===c);return group.length?[musicPath(locale,c),...group.map(r=>musicPath(locale,c,r.slug))]:[];})];
}
export function musicTemplates(entries,now=new Date()) {
 const live=publishedMusic(entries,now); if(!live.length)return [];
 return ['page.tsx',...categories.filter(c=>live.some(r=>r.category===c)).flatMap(c=>[`${c}/page.tsx`,`${c}/[slug]/page.tsx`])];
}
