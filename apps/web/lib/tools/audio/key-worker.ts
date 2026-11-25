import {detectKey} from './key.mjs';
self.onmessage=(event:MessageEvent<{samples:Float32Array;rate:number}>)=>{try{self.postMessage({result:detectKey(event.data.samples,event.data.rate)});}catch{self.postMessage({error:true});}};
