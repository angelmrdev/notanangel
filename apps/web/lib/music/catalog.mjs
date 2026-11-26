import { validDownloadStem } from './filenames.mjs';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const categories = Object.freeze(['dj-edits', 'dj-mixes', 'dj-sets']);
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const text = v => typeof v === 'string' && v.trim().length > 0;
const date = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && Number.isFinite(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v;
const positive = v => typeof v === 'number' && Number.isFinite(v) && v > 0;
const localImage = v => typeof v === 'string' && /^\/[^/\\?#]+(?:\/[^/\\?#]+)*\.(png|jpg|jpeg|webp|avif)$/i.test(v) && !v.split('/').some(p => p === '..' || p === '.');
export function musicPath(locale, category, releaseSlug) {
  if (!['en','es'].includes(locale) || (category !== undefined && !categories.includes(category)) || (releaseSlug !== undefined && (!category || !slug.test(releaseSlug)))) throw new Error('Invalid music route');
  return `${locale === 'es' ? '/es/musica/' : '/music/'}${category ? `${category}/` : ''}${releaseSlug ? `${releaseSlug}/` : ''}`;
}
export function validateRelease(r, category, folder) {
  const check = (ok, message) => { if (!ok) throw new Error(`${category}/${folder}: ${message}`); };
  check(r && typeof r === 'object' && !Array.isArray(r), 'Invalid release');
  check(categories.includes(category) && r.category === category && r.slug === folder && slug.test(folder), 'Category or slug mismatch');
  check(typeof r.id === 'string' && slug.test(r.id), 'Invalid ID');
  check(['draft','published'].includes(r.status), 'Invalid status');
  check(r.publishedAt === undefined || date(r.publishedAt), 'Invalid publication date');
  check(r.status !== 'published' || date(r.publishedAt), 'Publication date required');
  check(r.featured === undefined || typeof r.featured === 'boolean', 'Invalid featured flag');
  for (const locale of ['en','es']) {
    const l = r.locales?.[locale];
    check(l && ['title','description','metaTitle','metaDescription','coverAlt'].every(k => text(l[k])), `Missing ${locale} metadata`);
  }
  check(Array.isArray(r.artists) && r.artists.length > 0 && r.artists.every(text), 'Artists required');
  check(Array.isArray(r.genres) && r.genres.every(text), 'Invalid genres');
  check(r.youtubeId === undefined || (typeof r.youtubeId === 'string' && /^[\w-]{11}$/.test(r.youtubeId)), 'Invalid YouTube ID');
  check(r.cover === undefined || localImage(r.cover), 'Invalid cover');
  check(r.thumbnail === undefined || localImage(r.thumbnail), 'Invalid thumbnail');
  check(r.ogImage === undefined || localImage(r.ogImage), 'Invalid Open Graph image');
  check(r.status !== 'published' || (r.youtubeId && r.cover && r.thumbnail), 'Published release requires video and artwork');
  check(r.durationSeconds === undefined || positive(r.durationSeconds), 'Invalid duration');
  check(r.bpm === undefined || positive(r.bpm), 'Invalid BPM');
  check(r.key === undefined || text(r.key), 'Invalid key');
  check(Array.isArray(r.originalTracks) && r.originalTracks.every(t => t && text(t.title) && text(t.artist)), 'Invalid original tracks');
  check(category === 'dj-sets' || r.originalTracks.length >= (category === 'dj-mixes' ? 2 : 1), 'Missing original tracks');
  check(r.downloadFilename === undefined || validDownloadStem(r.downloadFilename), 'Invalid download filename (use a safe name without extension, maximum 200 UTF-8 bytes)');
  check(Array.isArray(r.downloads), 'Downloads must be an array');
  const ids = new Set();
  for (const d of r.downloads) {
    check(d && typeof d.id === 'string' && slug.test(d.id) && !ids.has(d.id), 'Invalid or duplicate download ID'); ids.add(d.id);
    check(['mp3','wav'].includes(d.format) && text(d.label) && ['pending','authorized','blocked'].includes(d.rights) && typeof d.enabled === 'boolean', 'Invalid download metadata');
    check(d.bytes === undefined || (Number.isSafeInteger(d.bytes) && d.bytes > 0), 'Invalid download size');
    check(!d.enabled || (d.rights === 'authorized' && Number.isSafeInteger(d.bytes) && d.bytes > 0), 'Enabled download requires authorization and size');
  }
  check(category === 'dj-sets' || r.downloads.length > 0, 'Edits and mixes require a planned download');
  return r;
}
export function validateTracklist(tracks, duration) {
  if (!Array.isArray(tracks)) throw new Error('Invalid tracklist');
  let last = -1;
  for (const t of tracks) {
    if (!t || !text(t.title) || !text(t.artist)) throw new Error('Invalid track');
    if (t.startSeconds !== undefined) {
      if (!Number.isInteger(t.startSeconds) || t.startSeconds < 0 || t.startSeconds <= last || (duration !== undefined && t.startSeconds >= duration)) throw new Error('Invalid track timestamp');
      last = t.startSeconds;
    }
    if (t.releaseId !== undefined && (typeof t.releaseId !== 'string' || !slug.test(t.releaseId))) throw new Error('Invalid related release ID');
  }
  return tracks;
}
export function loadMusicCatalog(root) {
  const releases = [], ids = new Set();
  for (const category of categories) {
    for (const entry of readdirSync(join(root, category), {withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))) {
      if (entry.name.startsWith('.')) continue;
      if (!entry.isDirectory()) throw new Error(`Unexpected music entry: ${entry.name}`);
      const dir = join(root, category, entry.name);
      const r = validateRelease(JSON.parse(readFileSync(join(dir,'release.json'),'utf8')),category,entry.name);
      if (ids.has(r.id)) throw new Error(`Duplicate release ID: ${r.id}`); ids.add(r.id);
      const bodies = Object.fromEntries(['en','es'].map(l => [l,readFileSync(join(dir,`${l}.mdx`),'utf8').trim()]));
      if (r.status === 'published' && (!bodies.en || !bodies.es)) throw new Error(`Missing editorial content: ${r.id}`);
      const tracklist = category === 'dj-sets' ? validateTracklist(JSON.parse(readFileSync(join(dir,'tracklist.json'),'utf8')),r.durationSeconds) : [];
      if (r.status === 'published' && category === 'dj-sets' && !tracklist.length) throw new Error(`Missing tracklist: ${r.id}`);
      releases.push({...r,bodies,tracklist});
    }
  }
  for (const r of releases) for (const t of r.tracklist) if (t.releaseId && !ids.has(t.releaseId)) throw new Error(`Unknown related release: ${t.releaseId}`);
  return releases;
}
export function publishedMusic(releases, now = new Date()) {
  const today = now.toISOString().slice(0,10);
  return releases.filter(r => r.status === 'published' && r.publishedAt <= today).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)||a.id.localeCompare(b.id));
}
