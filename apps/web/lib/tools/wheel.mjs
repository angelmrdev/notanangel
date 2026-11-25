import {keys,relation} from './harmony.mjs';
export function move(code,offset){const k=keys.find(k=>k.code===code);if(!k||!Number.isInteger(offset))return null;return `${((parseInt(code)-1+offset)%12+12)%12+1}${code.slice(-1)}`;}
export function options(code){if(!keys.some(k=>k.code===code))return [];return [0,-1,1].map(n=>({code:move(code,n),kind:n===0?'same':'adjacent'})).concat([{code:code.slice(0,-1)+(code.endsWith('A')?'B':'A'),kind:'relative'}]);}
export function advanced(code){return [2,-5,-3].map(offset=>({offset,code:move(code,offset)}));}
const pc={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
export function scale(code){const k=keys.find(k=>k.code===code);if(!k)return [];const root=(pc[k.note[0]]+(k.note.endsWith('#')?1:k.note.endsWith('b')?-1:0)+12)%12;return (k.minor?[0,2,3,5,7,8,10]:[0,2,4,5,7,9,11]).map(n=>(root+n)%12);}
export function shared(a,b){return scale(a).filter(n=>scale(b).includes(n)).length;}
export {relation};
