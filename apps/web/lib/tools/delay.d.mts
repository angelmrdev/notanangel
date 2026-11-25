export const noteDenominators: number[];
export const noteFactors: number[];
export function noteMs(bpm:number, denominator:number, factor?:number):number;
export function bpmFromMs(ms:number, denominator:number, factor?:number):number;
export function cycleHz(ms:number):number;
export function barMs(bpm:number,numerator:number,denominator:number,bars?:number):number;
export function sampleCount(ms:number,rate:number):number;
