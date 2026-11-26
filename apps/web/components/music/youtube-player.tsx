'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { MusicLocale } from '@/lib/music/catalog.mjs';
import s from './release.module.css';
export function YouTubePlayer({id,title,thumbnail,locale,startSeconds=0,playRequested=false}:{id:string;title:string;thumbnail:string;locale:MusicLocale;startSeconds?:number;playRequested?:boolean}) {
 const [active,setActive]=useState(false); const es=locale==='es';
 return <div><div className={s.player}>{(active||playRequested)?<iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&start=${startSeconds}`} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>:<button type="button" className={s.play} onClick={()=>setActive(true)} aria-label={es?`Reproducir ${title} en YouTube`:`Play ${title} on YouTube`}><Image src={thumbnail} alt="" width={1280} height={720} sizes="(max-width: 800px) 100vw, 70vw"/><span aria-hidden="true">▶</span></button>}</div><p className={s.note}>{es?'Al reproducir el vídeo se establece una conexión con YouTube.':'Playing the video connects to YouTube.'} <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">{es?'Ver en YouTube':'Watch on YouTube'}</a></p></div>;
}
