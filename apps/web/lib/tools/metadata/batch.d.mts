import type {Tags} from './core.mjs';
export function parsePreset(text:string):Tags;
export function outputName(name:string,format:'mp3'|'wav'):string;
export function uniqueNames(names:string[]):string[];
export function zipFiles(files:{name:string;bytes:Uint8Array}[]):Blob;
