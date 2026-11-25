import { LIMITS, validateAudio, type PreparedAudio } from './core.mjs';
export async function prepareFile(file:File, options:{signal?:AbortSignal;onProgress?:(fraction:number)=>void} = {}):Promise<PreparedAudio> {
  const {signal,onProgress} = options;
  signal?.throwIfAborted();
  if (!file.size || file.size > LIMITS.bytes) throw new Error('file-size-limit');
  const context = new AudioContext();
  let channels:Float32Array[], rate:number;
  try {
    const bytes = await file.arrayBuffer(); signal?.throwIfAborted();
    const decoded = await context.decodeAudioData(bytes); signal?.throwIfAborted();
    validateAudio(decoded.length,decoded.sampleRate,decoded.numberOfChannels);
    rate = decoded.sampleRate;
    channels = Array.from({length:decoded.numberOfChannels},(_,i)=>decoded.getChannelData(i).slice());
  } finally { await context.close(); }
  signal?.throwIfAborted(); onProgress?.(.2);
  return new Promise((resolve,reject)=>{
    const worker = new Worker(new URL('./worker.ts',import.meta.url),{type:'module'});
    const cleanup = ()=>{worker.terminate();signal?.removeEventListener('abort',abort);};
    const abort = ()=>{cleanup();reject(signal?.reason ?? new DOMException('Aborted','AbortError'));};
    signal?.addEventListener('abort',abort,{once:true});
    if(signal?.aborted){abort();return;}
    worker.onerror = ()=>{cleanup();reject(new Error('worker-failed'));};
    worker.onmessageerror = ()=>{cleanup();reject(new Error('worker-message-failed'));};
    worker.onmessage = ({data})=>{
      if(data.type==='progress') onProgress?.(.2+.8*data.fraction);
      else if(data.type==='result'){cleanup();resolve(data.result as PreparedAudio);}
      else if(data.type==='error'){cleanup();reject(new Error(data.message));}
    };
    try {worker.postMessage({channels,rate},channels.map(c=>c.buffer));} catch(error){cleanup();reject(error);}
  });
}
