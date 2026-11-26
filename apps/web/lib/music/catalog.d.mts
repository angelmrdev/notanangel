export type MusicCategory = 'dj-edits' | 'dj-mixes' | 'dj-sets';
export type MusicLocale = 'en' | 'es';
export interface MusicTrack { title: string; artist: string; startSeconds?: number; releaseId?: string }
export interface MusicDownload { id: string; format: 'mp3' | 'wav'; label: string; rights: 'pending' | 'authorized' | 'blocked'; enabled: boolean; bytes?: number }
export interface MusicMetadata { title: string; description: string; metaTitle: string; metaDescription: string; coverAlt: string }
export interface MusicRelease { id: string; slug: string; category: MusicCategory; status: 'draft' | 'published'; publishedAt?: string; featured?: boolean; locales: Record<MusicLocale,MusicMetadata>; artists: string[]; genres: string[]; youtubeId?: string; cover?: string; thumbnail?: string; ogImage?: string; durationSeconds?: number; bpm?: number; key?: string; originalTracks: MusicTrack[]; downloadFilename?: string; downloads: MusicDownload[] }
export interface MusicEntry extends MusicRelease { bodies: Record<MusicLocale,string>; tracklist: MusicTrack[] }
export const categories: readonly MusicCategory[];
export function musicPath(locale: MusicLocale, category?: MusicCategory, releaseSlug?: string): string;
export function validateRelease(r: unknown, category: MusicCategory, folder: string): MusicRelease;
export function validateTracklist(tracks: unknown, duration?: number): MusicTrack[];
export function loadMusicCatalog(root: string): MusicEntry[];
export function publishedMusic(releases: MusicEntry[], now?: Date): MusicEntry[];
