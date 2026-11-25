import type {PreparedAudio} from './core.mjs';
import type {TempoEstimate} from './tempo.mjs';
import type {KeyEstimate} from './key.mjs';
import type {MusicalKey} from '../harmony.mjs';
export interface SongAnalysis {tempo:TempoEstimate|null;key:KeyEstimate|null}
export interface SongReport extends SongAnalysis {version:number;duration:number;channels:number;decodedSampleRate:number;analysisSampleRate:number;rms:number;musicalKey:MusicalKey|null;compatible:string[];phrases:{bars:number;seconds:number}[]}
export function analyzeSong(samples:Float32Array,rate:number,progress?:(fraction:number)=>void):SongAnalysis;
export function phraseTimes(bpm:number|undefined):{bars:number;seconds:number}[];
export function report(audio:PreparedAudio,analysis:SongAnalysis):SongReport;
export function reportCsv(r:SongReport):string;
