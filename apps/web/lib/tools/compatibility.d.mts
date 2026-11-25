export type Comparison={kind:'same'|'relative'|'adjacent'|'parallel'|'creative'|'other';delta:number;common:number[];onlyA:number[];onlyB:number[]};
export function compare(a:string,b:string):Comparison|null;
