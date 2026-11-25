import {keys} from '../harmony.mjs';
import {pitch} from '../converter.mjs';
const major=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88];
const minor=[6.33,2.68,3.52,5.38,2.60,3.53,2.54,4.75,3.98,2.69,3.34,3.17];
function correlation(a,b){const x=a.reduce((s,v)=>s+v,0)/12,y=b.reduce((s,v)=>s+v,0)/12;let ab=0,aa=0,bb=0;for(let i=0;i<12;i++){const u=a[i]-x,v=b[i]-y;ab+=u*v;aa+=u*u;bb+=v*v;}return ab/Math.sqrt(aa*bb||1);}
export function detectKey(samples,rate){
 const n=8192;if(!Number.isFinite(rate)||rate<8000||samples.length<rate*4)return null;
 const re=new Float64Array(n),im=new Float64Array(n),win=Float64Array.from({length:n},(_,i)=>.5-.5*Math.cos(2*Math.PI*i/(n-1))),chroma=Array(12).fill(0);let frames=0;
 const hop=Math.max(n,Math.ceil((samples.length-n)/600));
 for(let start=0;start+n<=samples.length;start+=hop){let energy=0;for(let i=0;i<n;i++){const v=samples[start+i];energy+=v*v;re[i]=v*win[i];im[i]=0;}if(energy/n<1e-8)continue;
 for(let i=1,j=0;i<n;i++){let bit=n>>1;for(;j&bit;bit>>=1)j^=bit;j^=bit;if(i<j){const t=re[i];re[i]=re[j];re[j]=t;}}
 for(let len=2;len<=n;len*=2){const a=-2*Math.PI/len;for(let i=0;i<n;i+=len){for(let j=0;j<len/2;j++){const c=Math.cos(a*j),s=Math.sin(a*j),k=i+j,l=k+len/2,u=re[l]*c-im[l]*s,v=re[l]*s+im[l]*c;re[l]=re[k]-u;im[l]=im[k]-v;re[k]+=u;im[k]+=v;}}}
 const mag=Float64Array.from(re.slice(0,n/2),(v,i)=>Math.hypot(v,im[i]));const local=Array(12).fill(0);let max=0;const lo=Math.max(2,Math.ceil(65*n/rate)),hi=Math.min(n/2-2,Math.floor(2000*n/rate));for(let k=lo;k<=hi;k++)max=Math.max(max,mag[k]);
 for(let k=lo;k<=hi;k++){const m=mag[k];if(m<max*.04||m<=mag[k-1]||m<mag[k+1])continue;const d=mag[k-1]-2*m+mag[k+1];const offset=d?Math.max(-.5,Math.min(.5,.5*(mag[k-1]-mag[k+1])/d)):0;const midi=69+12*Math.log2((k+offset)*rate/n/440);const note=Math.round(midi);if(Math.abs(midi-note)>.4)continue;local[(note%12+12)%12]+=m;}
 const total=local.reduce((a,b)=>a+b,0);if(total>0){frames++;local.forEach((v,i)=>chroma[i]+=v/total);}}
 if(frames<4)return null;const sum=chroma.reduce((a,b)=>a+b,0);const profile=chroma.map(v=>v/sum);if(profile.filter(v=>v>.035).length<3)return null;
 const candidates=keys.map(k=>({code:k.code,score:correlation(profile,Array.from({length:12},(_,i)=>(k.minor?minor:major)[(i-pitch(k.note)+12)%12]))})).sort((a,b)=>b.score-a.score);if(candidates[0].score<.35)return null;return {code:candidates[0].code,chroma:profile,candidates:candidates.slice(0,5),ambiguous:candidates[0].score-candidates[1].score<.12};
}
