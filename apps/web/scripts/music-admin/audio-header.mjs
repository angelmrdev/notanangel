import {open} from 'node:fs/promises';

// A bounded signature check, not a decoder or a quality/metadata assessment.
export async function verifyAudioHeader(file, format, bytes) {
 const handle=await open(file,'r');
 try {
  const read=async(position,length)=>{
   const buffer=Buffer.alloc(Math.min(length,Math.max(0,bytes-position)));
   const {bytesRead}=await handle.read(buffer,0,buffer.length,position);
   return buffer.subarray(0,bytesRead);
  };
  const header=await read(0,12);
  if(format==='wav') {
   if(header.length!==12 || !['RIFF','RF64','BW64','RIFX'].includes(header.toString('ascii',0,4)) || header.toString('ascii',8,12)!=='WAVE') throw Error('Expected WAVE container');
   return;
  }
  if(format!=='mp3')throw Error('Unsupported audio format');
  let offset=0;
  if(header.toString('ascii',0,3)==='ID3') {
   if(header.length<10 || ![2,3,4].includes(header[3]) || header.subarray(6,10).some(b=>b>127))throw Error('Invalid ID3 header');
   offset=10+header.subarray(6,10).reduce((n,b)=>n*128+b,0)+(header[3]===4&&(header[5]&16)?10:0);
  }
  if(offset>=bytes)throw Error('No MPEG audio after ID3');
  const data=await read(offset,65536);
  for(let i=0;i+3<data.length;i++) {
   const a=data[i],b=data[i+1],c=data[i+2];
   if(a===255 && (b&224)===224 && (b&24)!==8 && (b&6)===2 && (c&240)!==240 && (c&12)!==12) return;
  }
  throw Error('No MPEG Layer III signature near audio start');
 }finally{await handle.close();}
}
