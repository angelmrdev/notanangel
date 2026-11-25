type Deck = {percent:number;semitones:number;fits:boolean;min:number;max:number};
export function pitchPlan(a:number,b:number,mode:string,pitch:number,range:number,bars:number,beats:number):{target:number;a:Deck;b:Deck|null;seconds:number}|null;
