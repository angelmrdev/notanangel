import type { MusicEntry, MusicLocale, MusicTrack } from './catalog.mjs';
export interface SetTrackRow extends MusicTrack { number:number; timeLabel?:string; href?:string }
export function timestampLabel(seconds:number):string;
export function setTrackRows(entry:MusicEntry,entries:MusicEntry[],locale:MusicLocale,now?:Date):SetTrackRow[];
