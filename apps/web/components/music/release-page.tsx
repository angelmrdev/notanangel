import { downloadUrl } from '@/lib/music/downloads.mjs';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/blog/mdx-components';
import { musicPath, type MusicCategory, type MusicLocale } from '@/lib/music/catalog.mjs';
import { getPublishedMusic, getPublishedRelease } from '@/lib/music/repository';
import { availableDownloads, relatedMusic, durationLabel, recordingData, releaseMetadata } from '@/lib/music/detail.mjs';
import { ReleaseCard } from './music-pages';
import { SetPlayer } from './set-player';
import { setTrackRows } from '@/lib/music/sets.mjs';
import { YouTubePlayer } from './youtube-player';
import base from './music.module.css';
import s from './release.module.css';
export function releaseParams(category:MusicCategory){return getPublishedMusic(category).map(r=>({slug:r.slug}));}
export function detailMetadata(locale:MusicLocale,category:MusicCategory,slug:string){const r=getPublishedRelease(category,slug);return r?releaseMetadata(r,locale):{robots:{index:false,follow:false}};}
export async function ReleasePage({locale,category,slug}:{locale:MusicLocale;category:MusicCategory;slug:string}){
 const r=getPublishedRelease(category,slug); if(!r)notFound(); const m=r.locales[locale], es=locale==='es'; const name=category==='dj-edits'?'DJ Edits':category==='dj-mixes'?'DJ Mixes':'DJ Sets';
 const {content}=await compileMDX({source:r.bodies[locale],components:mdxComponents,options:{mdxOptions:{remarkPlugins:[remarkGfm]}}});
 const related=relatedMusic(r,getPublishedMusic()); const downloads=availableDownloads(r);
 return <main id="main-content" data-naa-authorized-downloads={downloads.length>0?"true":undefined} className={base.wrap}><article><nav className={s.crumbs} aria-label={es?'Ruta de navegación':'Breadcrumb'}><Link href={musicPath(locale)}>{es?'Música':'Music'}</Link><span>/</span><Link href={musicPath(locale,category)}>{name}</Link><Link href={musicPath(es?'en':'es',category,slug)} hrefLang={es?'en':'es'}>{es?'EN':'ES'}</Link></nav><header className={s.head}><span className={base.kicker}>{name} / NOT AN ANGEL</span><h1>{m.title}</h1><p>{r.artists.join(' × ')}</p><p>{m.description}</p>{r.publishedAt&&<time dateTime={r.publishedAt}>{r.publishedAt}</time>}</header><div className={s.layout}><div>{r.youtubeId&&r.thumbnail&&<>{category==='dj-sets'?<SetPlayer key={r.youtubeId} id={r.youtubeId} title={m.title} thumbnail={r.thumbnail} locale={locale} tracks={setTrackRows(r,getPublishedMusic(),locale)}/>:<YouTubePlayer key={r.youtubeId} id={r.youtubeId} title={m.title} thumbnail={r.thumbnail} locale={locale}/>}</>}</div><aside className={s.panel}>{r.cover&&<Image className={s.art} src={r.cover} alt={m.coverAlt} width={640} height={640} sizes="(max-width: 800px) 60vw, 25vw"/>}<dl className={s.facts}><dt>{es?'Producción':'Produced by'}</dt><dd>Not an Angel</dd>{r.genres.length>0&&<><dt>{es?'Género':'Genre'}</dt><dd>{r.genres.join(' / ')}</dd></>}{r.bpm!==undefined&&<><dt>BPM</dt><dd>{r.bpm}</dd></>}{r.key&&<><dt>{es?'Tonalidad':'Key'}</dt><dd>{r.key}</dd></>}{r.durationSeconds&&<><dt>{es?'Duración':'Duration'}</dt><dd>{durationLabel(r.durationSeconds)}</dd></>}</dl></aside></div>
 {downloads.length>0&&<section className={s.panel}><h2>{es?'Formatos de descarga':'Download formats'}</h2><ul className={s.formats}>{downloads.map(d=><li key={d.id}><a className={s.downloadLink} href={downloadUrl(r.id,d.id)}>{es?'Descargar':'Download'} {d.label}</a>{d.bytes&&<span> · {(d.bytes/1048576).toFixed(1)} MiB</span>}</li>)}</ul></section>}
 <section className={s.reading}><h2>{category==='dj-sets'?(es?'Sobre esta sesión':'About this DJ set'):(es?'Sobre esta producción':'About this release')}</h2>{content}</section>{r.originalTracks.length>0&&<section className={s.panel}><h2>{es?'Canciones originales y créditos':'Original tracks and credits'}</h2><ul>{r.originalTracks.map((t,i)=><li key={`${i}-${t.title}`}><strong>{t.title}</strong> — {t.artist}</li>)}</ul><p className={s.note}>{es?'Los derechos de las composiciones y grabaciones originales pertenecen a sus respectivos titulares.':'Rights to the original compositions and recordings belong to their respective holders.'}</p></section>}</article>{related.length>0&&<section className={base.section}><h2>{es?'Más música de Not an Angel':'More from Not an Angel'}</h2><div className={base.grid}>{related.map(entry=><ReleaseCard key={entry.id} entry={entry} locale={locale}/>)}</div></section>}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(recordingData(r,locale)).replace(/</g,'\\u003c')}}/></main>;
}
