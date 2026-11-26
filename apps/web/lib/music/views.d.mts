import type { MusicCategory, MusicEntry } from './catalog.mjs';
export function musicView(entries: MusicEntry[], category?: MusicCategory, now?: Date): {groups: {category: MusicCategory; entries: MusicEntry[]}[]; selected: MusicEntry[]; featured?: MusicEntry};
export function hasDownload(entry: MusicEntry): boolean;
