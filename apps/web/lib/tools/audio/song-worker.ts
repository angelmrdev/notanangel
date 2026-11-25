import {analyzeSong} from './song.mjs';
self.onmessage=(event:MessageEvent<{samples:Float32Array;rate:number}>)=>{try{const result=analyzeSong(event.data.samples,event.data.rate,fraction=>self.postMessage({fraction}));self.postMessage({result});}catch{self.postMessage({error:true});}};
