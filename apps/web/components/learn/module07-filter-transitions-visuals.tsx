'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import s from './module07-filter-transitions-visuals.module.css';

type Lang = 'en' | 'es';
type Mode = 'off' | 'hpf' | 'lpf';
type Strategy = 'outgoing-hpf' | 'incoming-lpf';
type Depth = 'subtle' | 'strong';

const i18n = {
 en: {
  caveat: 'Conceptual visualisation only. The curve is not a measurement or a prediction of your mixer, track, acoustics or loudness. Check the actual sound and channel/master meters.',
  explore: 'Explore filter direction and resonance', mode: 'Filter mode', off: 'Bypass / neutral', hpf: 'High-pass (HPF)', lpf: 'Low-pass (LPF)', cutoff: 'Illustrative cutoff position', resonance: 'Resonance emphasis', little: 'Low', more: 'Higher', bass: 'LOW / bass', middle: 'MID', treble: 'HIGH / treble', passed: 'Relatively preserved', reduced: 'Attenuated', response: 'Qualitative frequency response',
  descriptionOff: 'A neutral filter does not intentionally attenuate a frequency region.',
  descriptionHpf: 'High-pass progressively reduces lower frequencies and leaves more of the higher frequencies. Too much can remove the kick and bass that support the groove.',
  descriptionLpf: 'Low-pass progressively reduces higher frequencies and leaves more of the lower frequencies. Too much can hide hats, vocal definition and the brightness of a hook.',
  resonanceNote: 'Stronger resonance may emphasise frequencies near the cutoff and can create a noticeable peak. It can increase perceived harshness or level; use sparingly.',
  noResonance: 'Resonance is not necessarily controlled the same way on every device. Start low if it is adjustable.',
  plan: 'Plan a restrained filter sweep', bars: 'Overlap length', approach: 'Approach', outgoing: 'Gently high-pass outgoing A', incoming: 'Gently low-pass incoming B', start: 'Begin sweep at bar', depth: 'Sweep depth', subtle: 'Gentle', strong: 'Pronounced (compare only)', lead: 'Deck with main musical focus', cue: 'Phrase landmark', neutral: 'Neutral', movement: 'Sweep', exit: 'Fade / handover', bar: 'Bar',
  planA: 'A remains the main track at first. As B gains its full bass and takes over on a useful phrase, a gentle HPF on outgoing A may reduce low-frequency competition. Lower A’s channel fader to finish.',
  planB: 'B enters with its highs slightly softened. Open B gradually and release its LPF towards neutral near the handover, while A exits. Avoid leaving the new main track muted or dull.',
  warningStrong: 'A pronounced sweep may remove too much musical information or make resonance conspicuous. Compare against a gentler version before using it in a set.',
  warningTiming: 'This is a counting template, not an automatic mixing recommendation. Check your tracks’ actual phrases and arrangement; filters cannot repair bad timing.',
  warningEnd: 'Return the filter to neutral once the filtered deck is safely out of the audible mix. Do not cause an audible jump by resetting it while the channel is open.',
  check: 'A/B listening practice: unfiltered vs filtered', steps: [
   'Choose two steady-tempo tracks with compatible 8-bar phrases and an instrumental overlap.',
   'Set TRIM/GAIN and channel levels with both filters neutral; monitor the real meters.',
   'Record a first transition using only phrase timing, faders and the necessary EQ.',
   'Rehearse the same entry and handover with a gentle HPF on outgoing A.',
   'Record another attempt using a gentle LPF on incoming B instead, if its arrangement benefits.',
   'Compare all takes at a similar perceived level; do not mistake a louder sweep for a better one.',
   'Listen for lost bass, dull vocals, harsh resonance and an obvious filter-reset jump.',
   'Choose the version that sounds clearer and more musical—even if it uses no filter.'
  ], done: 'Steps completed', reset: 'Reset',
 },
 es: {
  caveat: 'Representación conceptual. La curva no mide ni predice la respuesta de tu mesa, las canciones, la acústica o la sonoridad. Comprueba el audio real y los medidores de canal y MASTER.',
  explore: 'Explora filtros y resonancia', mode: 'Modo de filtro', off: 'Sin filtro / neutro', hpf: 'Paso alto (HPF)', lpf: 'Paso bajo (LPF)', cutoff: 'Posición ilustrativa de corte', resonance: 'Énfasis de resonancia', little: 'Baja', more: 'Mayor', bass: 'GRAVES', middle: 'MEDIOS', treble: 'AGUDOS', passed: 'Relativamente conservadas', reduced: 'Atenuadas', response: 'Respuesta de frecuencias conceptual',
  descriptionOff: 'Un filtro en posición neutra no atenúa intencionadamente ninguna zona del espectro.',
  descriptionHpf: 'El paso alto reduce progresivamente las frecuencias bajas y deja pasar en mayor medida las altas. Si te pasas, puedes perder el bombo y el bajo que sostienen el groove.',
  descriptionLpf: 'El paso bajo reduce progresivamente las frecuencias altas y conserva en mayor medida las bajas. Si te pasas, puedes ocultar los charles, la definición vocal y el brillo del hook.',
  resonanceNote: 'Una resonancia intensa puede reforzar frecuencias cercanas al corte y crear un pico audible. Puede aumentar la aspereza o el nivel percibido; úsala con moderación.',
  noResonance: 'La resonancia no se controla del mismo modo en todos los equipos. Si es ajustable, empieza con un valor bajo.',
  plan: 'Planifica un barrido de filtro moderado', bars: 'Duración del solapamiento', approach: 'Estrategia', outgoing: 'Paso alto suave en A, que sale', incoming: 'Paso bajo suave en B, que entra', start: 'Comenzar barrido en el compás', depth: 'Intensidad del barrido', subtle: 'Suave', strong: 'Marcada (solo comparar)', lead: 'Deck protagonista', cue: 'Referencia de frase', neutral: 'Neutro', movement: 'Barrido', exit: 'Salida / relevo', bar: 'Compás',
  planA: 'A empieza como tema principal. Mientras B recupera sus graves y toma el relevo en un cambio de frase adecuado, un paso alto suave en A puede reducir la competencia en bajas frecuencias. Termina retirando A con su fader.',
  planB: 'B entra con los agudos ligeramente suavizados. Abre B poco a poco y devuelve su paso bajo hacia neutro cerca del relevo, mientras sale A. Evita que el nuevo tema principal quede apagado.',
  warningStrong: 'Un barrido marcado puede eliminar demasiada información musical o hacer muy evidente la resonancia. Compáralo con una versión más suave antes de aplicarlo en una sesión.',
  warningTiming: 'Esto es un esquema para contar compases, no una receta automática. Escucha las frases y arreglos reales: los filtros no corrigen un mal timing.',
  warningEnd: 'Devuelve el filtro a neutro cuando el canal filtrado ya esté fuera de la mezcla audible. No provoques un salto de sonido al restablecerlo con el fader abierto.',
  check: 'Práctica A/B: mezcla sin filtro frente a mezcla filtrada', steps: [
   'Elige dos temas de tempo estable, frases compatibles de ocho compases y una zona instrumental de solapamiento.',
   'Ajusta TRIM/GAIN y faders con ambos filtros neutros; comprueba los medidores reales.',
   'Graba una primera transición usando frases, faders y la EQ necesaria, pero sin filtros.',
   'Ensaya la misma entrada y el mismo relevo con un paso alto suave en A, el tema saliente.',
   'Graba otro intento con un paso bajo suave en B, el tema entrante, si su arreglo lo admite.',
   'Compara las versiones a un volumen percibido parecido; más volumen no significa mejor barrido.',
   'Escucha si pierdes bajos, apagas voces, creas resonancia áspera o provocas un salto al resetear el filtro.',
   'Elige la versión más clara y musical, aunque sea la que no usa ningún filtro.'
  ], done: 'Pasos completados', reset: 'Reiniciar',
 }
} as const;

function Panel({title,lang,children}: {title:string;lang:Lang;children:ReactNode}) {
 return <section className={s.panel} aria-label={title}>
  <h3 className={s.title}>{title}</h3>
  {children}
  <p className={s.note}>{i18n[lang].caveat}</p>
 </section>;
}

/** Stylised response only: logarithmic-looking horizontal axis with arbitrary gain units. */
function makeResponse(mode:Mode, cutoff:number, resonance:boolean) {
 const left=40, top=22, width=520, height=150;
 const points=Array.from({length:61},(_,index)=>{
  const x=index/60*100;
  const logistic=1/(1+Math.exp(-(x-cutoff)/6));
  let level=mode==='off'?1:mode==='hpf'?logistic:1-logistic;
  if(resonance && mode!=='off') level+=0.105*Math.exp(-Math.pow((x-cutoff)/8,2));
  level=Math.max(0,Math.min(1.15,level));
  return `${index===0?'M':'L'}${(left+(x/100)*width).toFixed(2)},${(top+(1.15-level)/1.15*height).toFixed(2)}`;
 });
 return points.join(' ');
}

function FilterResponseExplorer({lang}: {lang:Lang}) {
 const t=i18n[lang];
 const [mode,setMode]=useState<Mode>('off');
 const [cutoff,setCutoff]=useState(50);
 const [resonance,setResonance]=useState(false);
 const id=useId();
 const text=mode==='off'?t.descriptionOff:mode==='hpf'?t.descriptionHpf:t.descriptionLpf;
 return <Panel title={t.explore} lang={lang}>
  <div className={s.controls}>
   <fieldset className={s.modeGroup}><legend>{t.mode}</legend>
    {(['off','hpf','lpf'] as Mode[]).map(value=><label key={value}><input type="radio" name={`${id}-mode`} value={value} checked={mode===value} onChange={()=>setMode(value)}/><span>{value==='off'?t.off:value==='hpf'?t.hpf:t.lpf}</span></label>)}
   </fieldset>
   <div className={s.parameterControls}>
    <label htmlFor={`${id}-cutoff`}>{t.cutoff} <output htmlFor={`${id}-cutoff`}>{cutoff}%</output></label>
    <input id={`${id}-cutoff`} type="range" min="10" max="90" step="5" value={cutoff} disabled={mode==='off'} onChange={event=>setCutoff(Number(event.target.value))}/>
    <label className={s.toggle}><input type="checkbox" checked={resonance} disabled={mode==='off'} onChange={event=>setResonance(event.target.checked)}/><span>{t.resonance}: {resonance?t.more:t.little}</span></label>
   </div>
  </div>
  <div className={s.plot} role="img" aria-label={`${t.response}: ${mode==='off'?t.off:mode==='hpf'?t.hpf:t.lpf}; ${t.cutoff} ${cutoff}%.`}>
   <svg viewBox="0 0 600 216" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
    <line x1="40" y1="22" x2="40" y2="172" className={s.axis}/><line x1="40" y1="172" x2="560" y2="172" className={s.axis}/>
    <line x1="40" y1="42" x2="560" y2="42" className={s.gridLine}/>
    <line x1="40" y1="97" x2="560" y2="97" className={s.gridLine}/>
    {mode!=='off'&&<line x1={40+cutoff*5.2} y1="22" x2={40+cutoff*5.2} y2="172" className={s.cutoffLine}/>}
    <path d={makeResponse(mode,cutoff,resonance)} className={s.responseLine}/>
    <text x="40" y="202" textAnchor="start">{t.bass}</text>
    <text x="300" y="202" textAnchor="middle">{t.middle}</text>
    <text x="560" y="202" textAnchor="end">{t.treble}</text>
   </svg>
  </div>
  <div className={s.readout} role="status"><strong>{mode==='off'?t.off:mode==='hpf'?t.hpf:t.lpf}</strong><p>{text}</p><p>{resonance&&mode!=='off'?t.resonanceNote:t.noResonance}</p></div>
 </Panel>;
}

function FilterSweepPlanner({lang}: {lang:Lang}) {
 const t=i18n[lang];
 const [length,setLength]=useState<8|16>(16);
 const [strategy,setStrategy]=useState<Strategy>('outgoing-hpf');
 const [start,setStart]=useState(9);
 const [depth,setDepth]=useState<Depth>('subtle');
 const handover=length===16?9:5;
 const last=Math.min(length,start+3);
 const bars=Array.from({length},(_,index)=>index+1);
 const info=strategy==='outgoing-hpf'?t.planA:t.planB;
 return <Panel title={t.plan} lang={lang}>
  <div className={s.plannerControls}>
   <label>{t.bars}<select value={length} onChange={event=>{
    const next=Number(event.target.value) as 8|16;setLength(next);setStart(next===16?9:5);
   }}><option value={8}>8 {lang==='es'?'compases':'bars'}</option><option value={16}>16 {lang==='es'?'compases':'bars'}</option></select></label>
   <label>{t.approach}<select value={strategy} onChange={event=>setStrategy(event.target.value as Strategy)}>
    <option value="outgoing-hpf">{t.outgoing}</option><option value="incoming-lpf">{t.incoming}</option>
   </select></label>
   <label>{t.start}<select value={start} onChange={event=>setStart(Number(event.target.value))}>
    {[1,5,...(length===16?[9,13]:[])].map(value=><option key={value} value={value}>{t.bar} {value}</option>)}
   </select></label>
   <label>{t.depth}<select value={depth} onChange={event=>setDepth(event.target.value as Depth)}>
    <option value="subtle">{t.subtle}</option><option value="strong">{t.strong}</option>
   </select></label>
  </div>
  <div className={s.legend}><span><i className={s.legendA}/>{t.neutral}</span><span><i className={s.legendSweep}/>{t.movement}</span><span><i className={s.legendB}/>{t.exit}</span></div>
  <div className={s.timeline} role="list" aria-label={t.plan}>
   {bars.map(bar=>{
    const sweeping=bar>=start&&bar<=last;
    const ending=bar>last;
    return <div role="listitem" key={bar} className={s.bar} data-sweep={sweeping} data-ending={ending} data-phrase={(bar-1)%8===0}>
     <span className={s.barNumber}>{bar}</span><span className={s.barIndicator} aria-hidden="true"/>
     <span className={s.barFocus}>{bar<handover?'A':'B'}</span>
    </div>;
   })}
  </div>
  <div className={s.readout} role="status" aria-live="polite"><strong>{t.lead}: {t.bar} {handover} → B</strong><p>{info}</p>
   {depth==='strong'&&<p className={s.warning}>{t.warningStrong}</p>}
   <p>{t.warningTiming}</p><p>{t.warningEnd}</p>
  </div>
 </Panel>;
}

function FilterPractice({lang}: {lang:Lang}) {
 const t=i18n[lang];
 const [done,setDone]=useState<boolean[]>(()=>t.steps.map(()=>false));
 return <Panel title={t.check} lang={lang}>
  <ol className={s.checklist}>{t.steps.map((step,index)=><li key={index}><label>
   <input type="checkbox" checked={done[index]} onChange={event=>setDone(old=>old.map((value,i)=>i===index?event.target.checked:value))}/><span>{step}</span>
  </label></li>)}</ol>
  <div className={s.checkFooter}><strong aria-live="polite">{t.done}: {done.filter(Boolean).length}/{t.steps.length}</strong>
   <button type="button" onClick={()=>setDone(t.steps.map(()=>false))}>{t.reset}</button></div>
 </Panel>;
}

export function FilterResponseExplorerEn(){return <FilterResponseExplorer lang="en"/>;}
export function FilterResponseExplorerEs(){return <FilterResponseExplorer lang="es"/>;}
export function FilterSweepPlannerEn(){return <FilterSweepPlanner lang="en"/>;}
export function FilterSweepPlannerEs(){return <FilterSweepPlanner lang="es"/>;}
export function FilterPracticeEn(){return <FilterPractice lang="en"/>;}
export function FilterPracticeEs(){return <FilterPractice lang="es"/>;}
