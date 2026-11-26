import { readFileSync, mkdirSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { loadMusicCatalog } from '../lib/music/catalog.mjs';
import { musicRoutes } from '../lib/music/publication.mjs';
import { loadPublishedLearn } from './learn-publication-catalog.mjs';
import { resolve } from 'node:path';
import { loadBlogCatalog, publishedPosts } from './blog-catalog.mjs';
const base = 'https://notanangeldj.com';
const root = process.cwd();
const registry = JSON.parse(readFileSync(resolve(root, 'config/sitemap-routes.json'), 'utf8'));
const publicDir = resolve(root, 'public');
const escapeXml = value => value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const clean = value => { if (!/^\/(?:[a-z0-9\-/]*)$/i.test(value) || !value.endsWith('/')) throw Error(`Invalid route ${value}`); return value; };
// The exact same taxonomy and post catalog drives validation, rendering and XML.
const { terms, posts: allPosts } = loadBlogCatalog(root);
const posts = publishedPosts(allPosts);
const blogPath=p=>`${p.locale==='es'?'/es':''}/blog/${p.slug}/`;
const postVisible=p=>p.seo?.index!==false && !p.seo?.canonical;
const termVisible=t=>t.index!==false && posts.filter(postVisible).some(p=>p.locale===t.locale && (t.type==='category'?p.category===t.id:(p.tags||[]).includes(t.id)));
for (const locale of ['en','es']) {
 registry[locale].blog=[`${locale==='es'?'/es':''}/blog/`,
  ...posts.filter(p=>p.locale===locale&&postVisible(p)).map(blogPath),
  ...terms.filter(t=>t.locale===locale&&termVisible(t)).map(t=>`${locale==='es'?'/es':''}/blog/${t.slug}/`)
 ];
}
// Learn URLs come only from the same publication manifest and ready MDX files
// validated by validate-learn-publication.mjs before this generator runs.
const learnManifest = JSON.parse(readFileSync(resolve(root, 'config/dj-learn-curriculum.json'), 'utf8'));
const publishedLearn = loadPublishedLearn(root, learnManifest);
const learnPairs = publishedLearn.map(({module: mod, locale, lessons}) => {
 const url = `${locale === 'es' ? '/es/curso-dj' : '/learn-to-dj'}/${mod.slugs[locale]}/`;
 return { id: mod.id, locale, url, lessons: lessons.map(lesson => ({ id: lesson.id, url: `${url}${lesson.slug}/` })) };
});
for (const locale of ['en','es']) {
 const basePath = locale === 'es' ? '/es/curso-dj/' : '/learn-to-dj/';
 registry[locale]['learn-to-dj'] = [basePath, ...learnPairs.filter(p => p.locale === locale).flatMap(p => [p.url, ...p.lessons.map(l => l.url)])];
}
const toolCatalog = JSON.parse(readFileSync(resolve(root, 'config/tools-catalog.json'), 'utf8'));
const liveTools = toolCatalog.filter(t => t.status === 'published');
const toolsBase = locale => locale === 'es' ? '/es/herramientas/' : '/tools/';
const toolPath = (t, locale) => toolsBase(locale) + t[locale].slug + '/';
for (const locale of ['en','es']) registry[locale].tools = liveTools.length ? [toolsBase(locale), ...liveTools.map(t => toolPath(t, locale))] : [];
const music = loadMusicCatalog(resolve(root,'content/music'));
const now = new Date();
for (const locale of ['en','es']) registry[locale].music = musicRoutes(music,locale,now);
const all = new Set(Object.values(registry).flatMap(types => Object.values(types).flat()));
const counterpart = {
 '/':'/es/', '/about/':'/es/sobre-mi/', '/contact/':'/es/contacto/',
 '/blog/':'/es/blog/'
};
for(const post of posts) {
 const other=posts.find(p=>p.id===post.id&&p.locale!==post.locale);
 if(other && postVisible(post) && postVisible(other)) counterpart[blogPath(post)]=blogPath(other);
}
for(const term of terms.filter(termVisible)) {
 const other=terms.find(t=>t.id===term.id&&t.type===term.type&&t.locale!==term.locale);
 if(other && termVisible(other)) counterpart[`${term.locale==='es'?'/es':''}/blog/${term.slug}/`]=`${other.locale==='es'?'/es':''}/blog/${other.slug}/`;
}
counterpart['/learn-to-dj/'] = '/es/curso-dj/';
for (const en of learnPairs.filter(p => p.locale === 'en')) {
 const es = learnPairs.find(p => p.id === en.id && p.locale === 'es');
 if (!es) continue;
 counterpart[en.url] = es.url;
 for (const enLesson of en.lessons) {
  const esLesson = es.lessons.find(l => l.id === enLesson.id);
  if (esLesson) counterpart[enLesson.url] = esLesson.url;
 }
}
counterpart[toolsBase('en')] = toolsBase('es');
for (const t of liveTools) counterpart[toolPath(t,'en')] = toolPath(t,'es');
registry.en.music.forEach((url,i)=>{counterpart[url]=registry.es.music[i];});
const reverse = Object.fromEntries(Object.entries(counterpart).map(([a,b])=>[b,a]));
const links = path => {
 const other = counterpart[path] ?? reverse[path];
 if (!other || !all.has(other)) return '';
 const en = path.startsWith('/es/') ? other : path;
 const es = path.startsWith('/es/') ? path : other;
 return `\n    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(base+en)}"/>\n    <xhtml:link rel="alternate" hreflang="es" href="${escapeXml(base+es)}"/>`;
};
// Avoid leaving stale XML files when a section becomes empty.
for(const locale of ['en','es']) for(const type of ['blog','learn-to-dj','tools','music']) {
 const file=resolve(publicDir,'sitemaps',locale,`${type}.xml`);
 if(existsSync(file)) unlinkSync(file);
}
const entries=[];
for (const [locale, groups] of Object.entries(registry)) {
 for (const [type, urls] of Object.entries(groups)) {
  if (!urls.length) continue;
  const output = resolve(publicDir,'sitemaps',locale,`${type}.xml`);
  mkdirSync(resolve(publicDir,'sitemaps',locale),{recursive:true});
  const unique = [...new Set(urls.map(clean))];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${unique.map(url=>`  <url>\n    <loc>${escapeXml(base+url)}</loc>${links(url)}\n  </url>`).join('\n')}\n</urlset>\n`;
  writeFileSync(output,xml);
  entries.push(`/sitemaps/${locale}/${type}.xml`);
 }
}
const index = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(path=>`  <sitemap><loc>${escapeXml(base+path)}</loc></sitemap>`).join('\n')}\n</sitemapindex>\n`;
writeFileSync(resolve(publicDir,'sitemap.xml'),index);
writeFileSync(resolve(publicDir,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
console.log(`Generated sitemap index with ${entries.length} sitemaps (${entries.join(', ')})`);
