const minor=['Ab','Eb','Bb','F','C','G','D','A','E','B','F#','C#'];
const major=['B','F#','Db','Ab','Eb','Bb','F','C','G','D','A','E'];
export const keys=Array.from({length:12},(_,i)=>['A','B'].map(mode=>({code:`${i+1}${mode}`,note:(mode==='A'?minor:major)[i],minor:mode==='A',open:`${(i+5)%12+1}${mode==='A'?'m':'d'}`}))).flat();
export function relation(a,b){const x=keys.find(k=>k.code===a),y=keys.find(k=>k.code===b);if(!x||!y)return 'other';if(a===b)return 'same';const n=parseInt(a),m=parseInt(b);if(n===m)return 'relative';if(x.minor===y.minor&&[1,11].includes((m-n+12)%12))return 'adjacent';return 'other';}
