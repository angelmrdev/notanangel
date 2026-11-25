import type {MusicalKey} from './harmony.mjs';
export function pitch(note:string):number;
export function spellings(k:MusicalKey):string[];
export function localized(note:string,es:boolean):string;
export function notes(k:MusicalKey):string[];
export function searchKeys(query:string):MusicalKey[];
