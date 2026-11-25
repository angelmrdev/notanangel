// Envelope novelty and normalized autocorrelation; tempo is a hypothesis, not a beat grid.
export function detectTempo(samples, rate) {
 const hop=Math.round(rate/100), n=Math.floor(samples.length/hop), hz=rate/hop;
 if(n<800)return null;
 const onset=new Float32Array(n); let previous=0, mean=0;
 for(let i=0;i<n;i++){let e=0;for(let j=i*hop;j<(i+1)*hop;j++)e+=samples[j]**2;const level=Math.log1p(100*Math.sqrt(e/hop));onset[i]=Math.max(0,level-previous);previous=level;mean+=onset[i];}
 mean/=n;let energy=0;for(let i=0;i<n;i++){onset[i]-=mean;energy+=onset[i]**2;}if(energy<1e-5)return null;
 const min=Math.floor(hz*60/220),max=Math.ceil(hz*60/55), scores=new Float64Array(max+2);
 for(let lag=min-1;lag<=max+1;lag++){let ab=0,a=0,b=0;for(let i=lag;i<n;i++){const x=onset[i],y=onset[i-lag];ab+=x*y;a+=x*x;b+=y*y;}scores[lag]=ab/Math.sqrt(a*b||1);}
 const candidates=[];for(let l=min;l<=max;l++){const s=scores[l];if(s<.12||s<scores[l-1]||s<scores[l+1])continue;const den=scores[l-1]-2*s+scores[l+1];const offset=den?Math.max(-.5,Math.min(.5,.5*(scores[l-1]-scores[l+1])/den)):0;const bpm=60*hz/(l+offset);if(bpm<55||bpm>220)continue;candidates.push({bpm:Math.round(bpm*10)/10,strength:s,rank:s*(bpm>=85&&bpm<=160?1:.86)});}
 candidates.sort((a,b)=>b.rank-a.rank);if(!candidates.length)return null;const best=candidates[0];return {bpm:best.bpm,strength:best.strength,candidates:candidates.slice(0,5).map(({bpm,strength})=>({bpm,strength}))};
}
