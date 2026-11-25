export type MusicalKey={code:string;note:string;minor:boolean;open:string};
export const keys:MusicalKey[];
export function relation(a:string,b:string):'same'|'relative'|'adjacent'|'other';
