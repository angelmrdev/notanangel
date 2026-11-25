export const noteDenominators = [1,2,4,8,16,32,64,128];
export const noteFactors = [1,1.5,2/3];
export function noteMs(bpm, denominator, factor=1) { return 60000/bpm*4/denominator*factor; }
export function bpmFromMs(ms, denominator, factor=1) { return 60000/ms*4/denominator*factor; }
export function cycleHz(ms) { return 1000/ms; }
export function barMs(bpm, numerator, denominator, bars=1) { return noteMs(bpm,denominator)*numerator*bars; }
export function sampleCount(ms, rate) { return Math.round(ms*rate/1000); }
