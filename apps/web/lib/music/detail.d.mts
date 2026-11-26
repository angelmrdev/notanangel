import type { MusicEntry, MusicLocale, MusicDownload } from './catalog.mjs';
import type { Metadata } from 'next';
export function availableDownloads(entry:MusicEntry):MusicDownload[];
export function relatedMusic(entry:MusicEntry,entries:MusicEntry[],now?:Date):MusicEntry[];
export function durationLabel(seconds:number):string;
export function releaseMetadata(entry:MusicEntry,locale:MusicLocale):Metadata;
export function recordingData(entry:MusicEntry,locale:MusicLocale):Record<string,unknown>;
