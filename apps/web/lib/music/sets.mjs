import { musicPath, publishedMusic } from './catalog.mjs';
export function timestampLabel(seconds) {
  const hours=Math.floor(seconds/3600), minutes=Math.floor(seconds/60)%60, rest=String(seconds%60).padStart(2,'0');
  return hours?`${hours}:${String(minutes).padStart(2,'0')}:${rest}`:`${minutes}:${rest}`;
}
export function setTrackRows(entry, entries, locale, now=new Date()) {
  const links=new Map(publishedMusic(entries,now).filter(r=>r.category!=='dj-sets').map(r=>[r.id,musicPath(locale,r.category,r.slug)]));
  return entry.tracklist.map((track,i)=>({...track,number:i+1,timeLabel:track.startSeconds===undefined?undefined:timestampLabel(track.startSeconds),href:links.get(track.releaseId)}));
}
