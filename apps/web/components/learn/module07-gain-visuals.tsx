'use client';

import { useState } from 'react';
import s from './module07-gain-visuals.module.css';

type Lang = 'en' | 'es';
type Stage = 'trim' | 'channel' | 'master';
const copy = {
 en: {
  note:'Illustrative teaching model only. These controls do not process audio or emulate a specific mixer. Real metering, signal routing, summation and peak behaviour depend on the hardware/software and source material.',
  safe:'Begin with monitoring at a comfortable level. Never raise output volume to compensate for clipping upstream.',
  reset:'Reset', stages:'Follow the signal path', a:'Deck A', b:'Deck B',
  stageText:{trim:['1 · TRIM / GAIN','Sets the input level feeding the channel. Watch the channel meter; excessive gain can distort before the master.'],channel:['2 · CHANNEL FADER','Controls how much of that channel enters the mix. Lowering it can reduce overlap, but cannot undo clipping that occurred upstream.'],master:['3 · MASTER / OUTPUT','Controls the output level to the sound system. It is not a replacement for sensible channel gain; downstream devices also need headroom.']},
  channelMeter:'Illustrative channel peak', mixMeter:'Conservative overlap ceiling', clipping:'Potential clipping risk', watch:'Little theoretical peak margin', margin:'Illustrative margin remains', meterNote:'Assumes two equal-length illustrative signals with nominal input peaks of −12 dBFS; worst-case coherent addition (+6.02 dB for two equal peaks). This is a deliberately conservative bound, NOT a prediction of recorded music loudness or your mixer meters. Fader and trim values are approximate dB adjustments; some hardware does not use linear-dB fader scales.',
  gain:'Trim', fader:'Channel fader', master:'Master output', result:'Illustrative output ceiling', check:'Guided level-matching practice', done:'Completed', scenario:'Try a scenario',
  scenes:['Both tracks entering','Deck B quietly cued','Too much trim','Reduce both channels'],
  steps:['Set headphone/monitor levels low before playback.','Play a representative loud section of deck A and inspect its channel meter.','Adjust A’s TRIM to avoid clipping and allow margin for louder passages.','Cue deck B privately and repeat the check using a similarly loud section.','Compare perceived loudness with the same monitoring level. Do not match only by peak readings.','Bring B in gradually; monitor both individual channels and the master during overlap.','If levels jump, reassess channel balance and arrangement. Lower excessive input gain instead of merely turning down the master.','Record and replay the transition at a safe level; document what you changed.']
 },
 es: {
  note:'Modelo didáctico ilustrativo. No procesa audio ni emula una mesa concreta. Los medidores, el ruteo, la suma y los picos reales dependen del equipo, software y material sonoro.',
  safe:'Empieza con monitores y auriculares a un volumen cómodo. No subas la salida para compensar una saturación anterior.',
  reset:'Restablecer', stages:'Sigue el recorrido de la señal', a:'Deck A', b:'Deck B',
  stageText:{trim:['1 · TRIM / GAIN','Ajusta el nivel de entrada del canal. Observa su medidor: una ganancia excesiva puede distorsionar antes del máster.'],channel:['2 · FADER DE CANAL','Controla cuánto entra ese canal en la mezcla. Bajarlo reduce el solapamiento, pero no repara una saturación que ya ocurrió antes.'],master:['3 · MASTER / SALIDA','Controla el nivel hacia el sistema de sonido. No sustituye a una ganancia de canal correcta; el equipo posterior también necesita margen.']},
  channelMeter:'Pico ilustrativo por canal', mixMeter:'Límite conservador de solapamiento', clipping:'Posible riesgo de saturación', watch:'Escaso margen teórico de pico', margin:'Queda margen ilustrativo', meterNote:'Parte de dos señales ilustrativas con picos de entrada de −12 dBFS; suma coherente de peor caso (+6,02 dB con picos iguales). Es un límite deliberadamente conservador, NO una predicción del volumen musical ni de los medidores reales. Los faders y trim se representan con ajustes aproximados en dB; las escalas de algunos equipos no equivalen a dB lineales.',
  gain:'Ganancia',fader:'Fader de canal',master:'Salida máster',result:'Límite ilustrativo de salida',check:'Práctica guiada de igualación',done:'Completados',scenario:'Prueba un escenario',
  scenes:['Entran ambos temas','Deck B en preescucha','Demasiada ganancia','Bajar ambos canales'],
  steps:['Baja el volumen de auriculares y monitores antes de reproducir.','Reproduce un tramo fuerte representativo de A y observa su medidor de canal.','Ajusta TRIM en A para evitar saturación y reservar margen para pasajes más fuertes.','Preescucha B y repite el chequeo con una sección de intensidad comparable.','Compara la sonoridad percibida al mismo volumen de escucha; no te guíes solo por los picos.','Introduce B gradualmente; observa medidores de canal y de máster durante el solapamiento.','Si el nivel salta, revisa el balance y el arreglo musical. Reduce ganancia excesiva en origen en vez de limitarte a bajar el máster.','Graba y escucha la transición a volumen seguro; apunta los ajustes que hayas hecho.']
 }
};
function Shell({lang,title,children}:{lang:Lang;title:string;children:React.ReactNode}){return <figure className={s.panel}><figcaption className={s.title}>{title}</figcaption>{children}<small className={s.note}>{copy[lang].note}</small></figure>;}
function GainPath({lang}:{lang:Lang}){
 const [stage,setStage]=useState<Stage>('trim');const t=copy[lang];
 return <Shell lang={lang} title={t.stages}><div className={s.path} role="group" aria-label={t.stages}>{(['trim','channel','master'] as Stage[]).map((k,i)=><button type="button" key={k} aria-pressed={stage===k} onClick={()=>setStage(k)}><span>{i+1}</span>{t.stageText[k][0]}</button>)}</div><div className={s.box} role="status"><strong>{t.stageText[stage][0]}</strong><p>{t.stageText[stage][1]}</p></div><p className={s.warning}>{t.safe}</p></Shell>;
}
const presets:[number,number,number,number,number][] = [[0,0,0,0,0],[0,0,-60,0,0],[14,14,0,0,0],[0,0,-6,-6,0]];
function GainOverlapLab({lang}:{lang:Lang}){
 const t=copy[lang];const [v,setV]=useState<number[]>([0,0,0,0,0]);const [scene,setScene]=useState(0);
 const set=(index:number,n:number)=>setV(old=>old.map((x,i)=>i===index?n:x));
 const a=-12+v[0]+v[2];const b=-12+v[1]+v[3];
 const channelPeak=Math.max(-80,-12+Math.max(v[0],v[1]));
 // Worst-case coherent peak sum in linear amplitude. This is an upper bound, not a realistic loudness meter.
 const sum=20*Math.log10(Math.pow(10,a/20)+Math.pow(10,b/20))+v[4];
 const rounded=(n:number)=>n.toFixed(1).replace('-', '−');
 const severity=sum>=0?'danger':sum>-6?'warn':'good';
 const scenario=(idx:number)=>{setScene(idx);setV([...presets[idx]]);};
 return <Shell lang={lang} title={lang==='es'?'Laboratorio de niveles con dos decks':'Two-deck level laboratory'}>
  <div className={s.selectGroup}><label htmlFor={`gain-scene-${lang}`}>{t.scenario}</label><select id={`gain-scene-${lang}`} value={scene} onChange={e=>scenario(Number(e.target.value))}>{t.scenes.map((x,i)=><option key={x} value={i}>{x}</option>)}</select></div>
  <div className={s.two}>{([0,1] as const).map((deck)=><section className={s.deck} key={deck}><h4>{deck===0?t.a:t.b}</h4>{[deck,deck+2].map((idx)=><label className={s.range} key={idx}><span>{idx<2?t.gain:t.fader}</span><output>{v[idx]} dB</output><input type="range" min={idx<2?-12:-60} max={idx<2?18:0} step={idx<2?1:3} value={v[idx]} onChange={e=>set(idx,Number(e.target.value))}/></label>)}<span className={s.small}>{t.channelMeter}: <b>{rounded(-12+v[deck])} dBFS</b></span></section>)}</div>
  <label className={s.range}><span>{t.master}</span><output>{v[4]} dB</output><input type="range" min="-24" max="6" step="1" value={v[4]} onChange={e=>set(4,Number(e.target.value))}/></label>
  <div className={s.box} data-severity={severity} role="status"><strong>{t.result}: {rounded(sum)} dBFS</strong><div className={s.meter} aria-hidden="true"><span style={{width:`${Math.min(100,Math.max(0,(sum+40)/40*100))}%`}}/></div><p>{severity==='danger'?t.clipping:severity==='warn'?t.watch:t.margin}</p><span className={s.small}>{t.channelMeter}: {rounded(channelPeak)} dBFS · {t.mixMeter}</span></div>
  <p className={s.small}>{t.meterNote}</p><button type="button" className={s.btn} onClick={()=>scenario(0)}>{t.reset}</button><p className={s.warning}>{t.safe}</p>
 </Shell>;
}
function GainPractice({lang}:{lang:Lang}){
 const t=copy[lang];const [done,setDone]=useState<boolean[]>(Array(t.steps.length).fill(false));
 return <Shell lang={lang} title={t.check}><ol className={s.steps}>{t.steps.map((step,i)=><li key={i}><label><input type="checkbox" checked={done[i]} onChange={e=>setDone(old=>old.map((x,j)=>i===j?e.target.checked:x))}/><span>{step}</span></label></li>)}</ol><div className={s.footer}><strong aria-live="polite">{t.done}: {done.filter(Boolean).length}/{t.steps.length}</strong><button className={s.btn} type="button" onClick={()=>setDone(Array(t.steps.length).fill(false))}>{t.reset}</button></div><p className={s.warning}>{t.safe}</p></Shell>;
}
export function GainPathEn(){return <GainPath lang="en"/>;}
export function GainPathEs(){return <GainPath lang="es"/>;}
export function GainOverlapLabEn(){return <GainOverlapLab lang="en"/>;}
export function GainOverlapLabEs(){return <GainOverlapLab lang="es"/>;}
export function GainPracticeEn(){return <GainPractice lang="en"/>;}
export function GainPracticeEs(){return <GainPractice lang="es"/>;}
