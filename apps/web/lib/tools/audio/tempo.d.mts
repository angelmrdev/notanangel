export interface TempoEstimate {bpm:number;strength:number;candidates:{bpm:number;strength:number}[]}
export function detectTempo(samples:Float32Array,rate:number):TempoEstimate|null;
