import 'server-only';
import { resolve } from 'node:path';
import { loadMusicCatalog, publishedMusic } from './catalog.mjs';
import type { MusicCategory } from './catalog.mjs';
export function readAllMusic() { return loadMusicCatalog(resolve(process.cwd(), 'content/music')); }
export function getPublishedMusic(category?: MusicCategory, now = new Date()) {
  return publishedMusic(readAllMusic(), now).filter(r => !category || r.category === category);
}
export function getPublishedRelease(category: MusicCategory, slug: string) {
  return getPublishedMusic(category).find(r => r.slug === slug);
}
