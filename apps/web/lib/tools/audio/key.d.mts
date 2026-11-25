export interface KeyEstimate {code:string;chroma:number[];candidates:{code:string;score:number}[];ambiguous:boolean}
export function detectKey(samples:Float32Array,rate:number):KeyEstimate|null;
