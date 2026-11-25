import {detectTempo} from './tempo.mjs';
self.onmessage=(event:MessageEvent<{samples:Float32Array;rate:number}>)=>{try{self.postMessage({result:detectTempo(event.data.samples,event.data.rate)});}catch{self.postMessage({error:true});}};
