"use client";
import { useState, useRef } from "react";
import { tapTempo } from "@/lib/tools/tempo.mjs";
import { ToolPanel, ToolResult } from "../tool-shell";
import styles from "../tools.module.css";
import type { ToolLocale } from "@/lib/tools/catalog";
const fmt = (v:number, locale:ToolLocale) => v.toLocaleString(locale,{maximumFractionDigits:2});
export function TapBpm({locale}:{locale:ToolLocale}) {
 const es=locale==='es'; const taps=useRef<number[]>([]); const [samples,setSamples]=useState<number[]>([]); const [windowSize,setWindowSize]=useState(16); const [factor,setFactor]=useState(1); const [message,setMessage]=useState('');
 const recent=samples.slice(-windowSize); const raw=tapTempo(recent); const bpm=raw===null?null:raw*factor;
 const gaps=recent.slice(1).map((t,i)=>t-recent[i]); const mean=gaps.length?gaps.reduce((a,b)=>a+b,0)/gaps.length:0; const deviation=mean?Math.sqrt(gaps.reduce((a,b)=>a+(b-mean)**2,0)/gaps.length)/mean*100:0;
 function reset(){taps.current=[];setSamples([]);setFactor(1);setMessage('');}
 function tap(){const now=performance.now();const last=taps.current.at(-1);if(last!==undefined&&now-last<60)return;if(last!==undefined&&now-last>5000){taps.current=[];setFactor(1);}taps.current=[...taps.current,now].slice(-32);setSamples(taps.current);setMessage('');}
 async function copy(){if(bpm===null)return;try{await navigator.clipboard.writeText(String(Math.round(bpm*100)/100));setMessage(es?'BPM copiado':'BPM copied');}catch{setMessage(es?'No se pudo copiar. Selecciona el resultado manualmente.':'Copy failed. Select the result manually.');}}
 return <ToolPanel><div className={styles.controls}>
 <ToolResult label={es?'Tempo estimado':'Estimated tempo'}>{bpm===null?'—':`${fmt(bpm,locale)} BPM`}</ToolResult>
 <button type="button" className={styles.tap} onClick={tap} onKeyDown={e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();if(!e.repeat)tap();}}} onKeyUp={e=>{if(e.key===' '||e.key==='Enter')e.preventDefault();}}>{es?'PULSA AL RITMO':'TAP THE BEAT'}</button>
 <p>{es?'Pulsa una vez por pulso. Con el botón enfocado, usa Espacio o Intro. Después de cinco segundos, la siguiente pulsación inicia una medición nueva; el resultado anterior permanece visible hasta entonces.':'Tap once per beat. With the pad focused, use Space or Enter. After five seconds, the next tap starts a new measurement; the previous result stays visible until then.'}</p>
 <div className={styles.grid}><label className={styles.field}>{es?'Ventana de pulsaciones':'Tap window'}<select value={windowSize} onChange={e=>setWindowSize(Number(e.target.value))}>{[4,8,16,32].map(n=><option key={n} value={n}>{n}</option>)}</select></label><label className={styles.field}>{es?'Interpretación del pulso':'Pulse interpretation'}<select value={factor} onChange={e=>setFactor(Number(e.target.value))}><option value={0.5}>½×</option><option value={1}>1×</option><option value={2}>2×</option></select></label></div>
 <div className={styles.grid}><ToolResult label={es?'Mitad del tempo medido':'Half of tapped tempo'}>{raw===null?'—':fmt(raw/2,locale)}</ToolResult><ToolResult label={es?'Doble del tempo medido':'Double tapped tempo'}>{raw===null?'—':fmt(raw*2,locale)}</ToolResult><ToolResult label={es?'Intervalo por pulso':'Beat interval'}>{bpm===null?'—':`${fmt(60000/bpm,locale)} ms`}</ToolResult></div>
 <p>{es?'Pulsaciones utilizadas':'Taps used'}: {recent.length} · {es?'Variación relativa de intervalos':'Relative interval variation'}: {gaps.length<3?'—':`${fmt(deviation,locale)}%`}</p><p>{es?'Una variación baja indica pulsaciones regulares, no garantiza que hayas elegido el pulso correcto.':'Low variation indicates regular tapping, not necessarily the correct musical pulse.'}</p>
 <div className={styles.grid}><button type="button" className={styles.action} onClick={reset}>{es?'Reiniciar':'Reset'}</button><button type="button" className={styles.action} disabled={bpm===null} onClick={copy}>{es?'Copiar BPM':'Copy BPM'}</button></div><p role="status">{message}</p></div></ToolPanel>;
}
export { BpmCalculator } from './pitch-calculator';
export { BpmToMs } from './delay-calculator';
