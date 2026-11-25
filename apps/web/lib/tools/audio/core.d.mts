export const LIMITS: Readonly<{bytes:number;seconds:number;rate:number;bins:number}>;
export function validateAudio(length:number,rate:number,channels:number):void;
export function waveform(channels:Float32Array[],bins?:number):Float32Array;
export function resample(input:Float32Array,from:number,to?:number):Float32Array;
export interface PreparedAudio {samples:Float32Array;peaks:Float32Array;sampleRate:number;duration:number;channels:number;decodedSampleRate:number;rms:number;downmix:'strongest-channel'|'average'}
export function prepare(channels:Float32Array[],rate:number,progress?:(fraction:number)=>void):PreparedAudio;
