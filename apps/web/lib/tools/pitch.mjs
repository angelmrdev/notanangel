export function pitchPlan(a,b,mode,pitch,range,bars,beats) {
 if (!Number.isFinite(a)||a<1||a>1000||!Number.isFinite(range)||range<=0||range>=100||!Number.isInteger(bars)||bars<1||!Number.isInteger(beats)||beats<1) return null;
 if (!['target','mid','balanced','reverse'].includes(mode)) return null;
 if(mode==='reverse'?(!Number.isFinite(pitch)||pitch<=-100||pitch>100):(!Number.isFinite(b)||b<1||b>1000))return null;
 const target=mode==='reverse'?a*(1+pitch/100):mode==='mid'?(a+b)/2:mode==='balanced'?2*a*b/(a+b):b;
 const deck=source=>{const ratio=target/source;const percent=(ratio-1)*100;return {percent,semitones:12*Math.log2(ratio),fits:Math.abs(percent)<=range+1e-9,min:source*(1-range/100),max:source*(1+range/100)};};
 return {target,a:deck(a),b:mode==='mid'||mode==='balanced'?deck(b):null,seconds:60*bars*beats/target};
}
