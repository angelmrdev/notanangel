import {keys} from './harmony.mjs';
const letters=['C','D','E','F','G','A','B'], natural=[0,2,4,5,7,9,11], sol=['Do','Re','Mi','Fa','Sol','La','Si'];
const mod=n=>(n%12+12)%12;
export function pitch(note){return mod(natural[letters.indexOf(note[0])]+[...note.slice(1)].reduce((a,c)=>a+(c==='#'?1:-1),0));}
export function spellings(k){return letters.flatMap(l=>['','#','b'].map(a=>l+a)).filter(n=>pitch(n)===pitch(k.note));}
export function localized(note,es){return (es?sol[letters.indexOf(note[0])]:note[0])+note.slice(1).replaceAll('#','♯').replaceAll('b','♭');}
export function notes(k){const start=letters.indexOf(k.note[0]);return (k.minor?[0,2,3,5,7,8,10]:[0,2,4,5,7,9,11]).map((step,i)=>{const j=(start+i)%7;const delta=mod(pitch(k.note)+step-natural[j]);return letters[j]+(delta<=6?'#'.repeat(delta):'b'.repeat(12-delta));});}
function normalize(s){return s.trim().replaceAll('♯','#').replaceAll('♭','b').replace(/sostenido|sharp/gi,'#').replace(/bemol|flat/gi,'b').replace(/\s+/g,'').toLowerCase();}
export function searchKeys(query){const q=normalize(query);if(!q)return keys;return keys.filter(k=>[k.code,k.open,...spellings(k).flatMap(n=>[n,localized(n,true)].flatMap(s=>k.minor?[s+'m',s+'min',s+'minor',s+'menor',s]:[s,s+'maj',s+'major',s+'mayor']))].some(s=>normalize(s)===q));}
