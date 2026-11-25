export function move(code:string,offset:number):string|null;
export function options(code:string):{code:string;kind:string}[];
export function advanced(code:string):{offset:number;code:string|null}[];
export function scale(code:string):number[];
export function shared(a:string,b:string):number;
export {relation} from './harmony.mjs';
