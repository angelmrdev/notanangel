import {detectTempo} from './tempo.mjs';
import {detectKey} from './key.mjs';
import {keys,relation} from '../harmony.mjs';
export function analyzeSong(samples,rate,progress=()=>{}) {
 const tempo=detectTempo(samples,rate); progress(.5);
 const key=detectKey(samples,rate); progress(1); return {tempo,key};
}
export function phraseTimes(bpm){return Number.isFinite(bpm)&&bpm>0?[1,4,8,16,32].map(bars=>({bars,seconds:bars*240/bpm})):[];}
export function report(audio,analysis){const k=keys.find(k=>k.code===analysis.key?.code);return {version:1,duration:audio.duration,channels:audio.channels,decodedSampleRate:audio.decodedSampleRate,analysisSampleRate:audio.sampleRate,rms:audio.rms,tempo:analysis.tempo,key:analysis.key,musicalKey:k??null,compatible:k?keys.filter(x=>relation(k.code,x.code)!=='other').map(x=>x.code):[],phrases:phraseTimes(analysis.tempo?.bpm)};}
export function reportCsv(r){const rows=[['field','value'],...Object.entries(r).map(([k,v])=>[k,v===null?'':typeof v==='object'?JSON.stringify(v):String(v)])];return rows.map(row=>row.map(v=>'"'+v.replaceAll('"','""')+'"').join(',')).join('\r\n');}
