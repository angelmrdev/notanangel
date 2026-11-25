import { prepare } from './core.mjs';
const scope = self as unknown as { onmessage: ((event: MessageEvent<{channels:Float32Array[];rate:number}>)=>void)|null; postMessage:(data:unknown, transfer?:Transferable[])=>void };
scope.onmessage = ({data}) => {
  try {
    const result = prepare(data.channels,data.rate,fraction=>scope.postMessage({type:'progress',fraction}));
    scope.postMessage({type:'result',result},[result.samples.buffer,result.peaks.buffer]);
  } catch (error) { scope.postMessage({type:'error',message:error instanceof Error ? error.message : 'analysis-failed'}); }
};
