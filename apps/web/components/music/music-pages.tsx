import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { musicPath, type MusicCategory, type MusicEntry, type MusicLocale } from '@/lib/music/catalog.mjs';
import { readAllMusic } from '@/lib/music/repository';
import { musicView, hasDownload } from '@/lib/music/views.mjs';
import s from './music.module.css';
const names: Record<MusicCategory,string> = {'dj-edits':'DJ Edits','dj-mixes':'DJ Mixes','dj-sets':'DJ Sets'};
const copy = {
 en: {music:'Music', title:'GOOD MUSIC.', accent:'BAD INFLUENCE.', intro:'DJ edits, unexpected mashups and dancefloor-ready sets by Not an Angel.', featured:'Featured release', latest:'Latest', all:'All music', view:'View all', explore:'Explore release', download:'Free download', empty:'No releases in this category.', nav:'Music categories', descriptions:{'dj-edits':'Reworks and DJ edits of individual tracks.','dj-mixes':'Unexpected mashups and combinations of tracks.','dj-sets':'Full DJ sessions and themed mixes.'}},
 es: {music:'Música', title:'BUENA MÚSICA.', accent:'MALA INFLUENCIA.', intro:'DJ edits, mashups inesperados y sesiones para la pista de baile de Not an Angel.', featured:'Lanzamiento destacado', latest:'Últimos', all:'Toda la música', view:'Ver todos', explore:'Ver lanzamiento', download:'Descarga gratuita', empty:'No hay lanzamientos en esta categoría.', nav:'Categorías musicales', descriptions:{'dj-edits':'Reworks y DJ edits de canciones individuales.','dj-mixes':'Mashups inesperados y combinaciones de canciones.','dj-sets':'Sesiones DJ completas y mezclas temáticas.'}}
};
export function musicMetadata(locale:MusicLocale, category?:MusicCategory):Metadata {
 const visible=musicView(readAllMusic(),category).selected.length>0;
 const t=copy[locale]; const title=category?names[category]:t.music; const description=category?t.descriptions[category]:t.intro;
 return {title,description,robots:{index:visible,follow:visible},alternates:{canonical:musicPath(locale,category),languages:{en:musicPath('en',category),es:musicPath('es',category),'x-default':musicPath('en',category)}},openGraph:{title,description,url:musicPath(locale,category)}};
}
export function ReleaseCard({entry,locale}:{entry:MusicEntry;locale:MusicLocale}) {
 const m=entry.locales[locale]; return <Link className={s.card} href={musicPath(locale,entry.category,entry.slug)}>
 {entry.cover && <Image className={s.cover} src={entry.cover} alt={m.coverAlt} width={640} height={640} sizes="(max-width: 600px) 50vw, (max-width: 950px) 33vw, 25vw"/>}
 <div className={s.cardBody}><span className={s.kicker}>{names[entry.category]}</span><h3>{m.title}</h3><p>{entry.artists.join(' × ')}</p>{hasDownload(entry)&&<span className={s.download}>{copy[locale].download}</span>}</div></Link>;
}
export function MusicLanding({locale,category}:{locale:MusicLocale;category?:MusicCategory}) {
 const t=copy[locale]; const {groups,selected,featured}=musicView(readAllMusic(),category);
 return <main id="main-content" className={s.wrap}>
 <nav className={s.tabs} aria-label={t.nav}><Link href={musicPath(locale==='en'?'es':'en',category)} hrefLang={locale==='en'?'es':'en'}>{locale==='en'?'ES':'EN'}</Link><Link href={musicPath(locale)} aria-current={!category?'page':undefined}>{t.all}</Link>{groups.map(g=><Link key={g.category} href={musicPath(locale,g.category)} aria-current={category===g.category?'page':undefined}>{names[g.category]}</Link>)}</nav>
 <header className={s.hero}><span className={s.kicker}>NOT AN ANGEL / {t.music}</span><h1>{category?names[category]:<>{t.title}<br/><span>{t.accent}</span></>}</h1><p>{category?t.descriptions[category]:t.intro}</p></header>
 {featured&&<section className={s.feature}><Link href={musicPath(locale,featured.category,featured.slug)} className={s.featureImage}>{featured.thumbnail&&<Image src={featured.thumbnail} alt={featured.locales[locale].coverAlt} width={1280} height={720} sizes="(max-width: 800px) 100vw, 60vw"/>}</Link><div className={s.featureBody}><span className={s.kicker}>{t.featured} / {names[featured.category]}</span><h2>{featured.locales[locale].title}</h2><p>{featured.locales[locale].description}</p><Link className={s.cta} href={musicPath(locale,featured.category,featured.slug)}>{t.explore}</Link></div></section>}
 {category ? <section aria-label={names[category]}>{selected.length?<div className={s.grid}>{selected.map(entry=><ReleaseCard key={entry.id} entry={entry} locale={locale}/>)}</div>:<p>{t.empty}</p>}</section> : groups.map(g=><section key={g.category} className={s.section}><div className={s.sectionHead}><h2>{t.latest} {names[g.category]}</h2><Link href={musicPath(locale,g.category)}>{t.view}</Link></div><div className={s.grid}>{g.entries.slice(0,4).map(entry=><ReleaseCard key={entry.id} entry={entry} locale={locale}/>)}</div></section>)}
 </main>;
}
