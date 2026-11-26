'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { MusicLocale } from '@/lib/music/catalog.mjs';
import type { SetTrackRow } from '@/lib/music/sets.mjs';
import { YouTubePlayer } from './youtube-player';
import s from './release.module.css';
export function SetPlayer({id,title,thumbnail,locale,tracks}:{id:string;title:string;thumbnail:string;locale:MusicLocale;tracks:SetTrackRow[]}) {
  const [seek,setSeek]=useState<{seconds:number;revision:number}|null>(null);
  const es=locale==='es';
  return <><YouTubePlayer key={seek?.revision??0} id={id} title={title} thumbnail={thumbnail} locale={locale} startSeconds={seek?.seconds??0} playRequested={seek!==null}/>
  <section className={s.panel}><h2>{es?'Tracklist de la sesión':'DJ set tracklist'}</h2><p className={s.note}>{es?'Selecciona un tiempo para reproducir desde ese momento en YouTube.':'Select a timestamp to play from that point on YouTube.'}</p><ol className={s.tracklist}>{tracks.map(t=><li key={t.number}><span className={s.trackNumber}>{String(t.number).padStart(2,'0')}</span><div><strong>{t.title}</strong><div>{t.artist}</div>{t.href&&<Link href={t.href}>{es?'Ver producción':'Explore release'}</Link>}</div>{t.startSeconds!==undefined&&<button type="button" className={s.timestamp} aria-label={`${es?'Reproducir':'Play'} ${t.title} — ${t.timeLabel}`} onClick={()=>setSeek(previous=>({seconds:t.startSeconds!,revision:(previous?.revision??0)+1}))}>{t.timeLabel}</button>}</li>)}</ol></section></>;
}
