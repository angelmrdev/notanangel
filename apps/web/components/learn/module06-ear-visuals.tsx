'use client';

import { useState } from 'react';
import s from './module06-ear-visuals.module.css';

type Lang = 'en' | 'es';
const t = (l: Lang, en: string, es: string) => l === 'es' ? es : en;
type Case = 'aligned' | 'early' | 'late' | 'drift';

function Frame({title, note, children}: {title: string; note: string; children: React.ReactNode}) {
  return <figure className={s.frame}><figcaption className={s.heading}>{title}</figcaption>{children}<p className={s.note}>{note}</p></figure>;
}

function KickTimeline({lang}: {lang: Lang}) {
  const [scenario, setScenario] = useState<Case>('early');
  const [reveal, setReveal] = useState(false);
  const choices: Case[] = ['aligned','early','late','drift'];
  const offset = (i: number) => scenario === 'aligned' ? 0 : scenario === 'early' ? -18 : scenario === 'late' ? 18 : i * 5;
  const explanation: Record<Case,[string,string]> = {
    aligned: ['The beats land together: keep listening before introducing the track.', 'Los golpes coinciden: sigue escuchando antes de introducir el tema.'],
    early: ['Deck B is ahead: briefly slow B to move its beats later.', 'El deck B va adelantado: frénalo momentáneamente para retrasar sus golpes.'],
    late: ['Deck B is behind: briefly speed B up to move its beats earlier.', 'El deck B va atrasado: aceléralo momentáneamente para adelantar sus golpes.'],
    drift: ['The gap grows: correct B’s sustained tempo first, then nudge to realign.', 'La separación crece: corrige primero el tempo sostenido de B y luego su posición.'],
  };
  return <Frame title={t(lang,'Which deck is leading?','¿Qué deck va por delante?')} note={t(lang,'These are simplified timing markers, not recorded audio. Predict the diagnosis before revealing the explanation. Negative B offset means it plays earlier.', 'Son marcas de tiempo simplificadas, no audio grabado. Intenta diagnosticar antes de revelar la explicación. Un desplazamiento negativo de B significa que suena antes.')}>
    <div className={s.options}>{choices.map(c=><button type="button" key={c} aria-pressed={scenario===c} onClick={()=>{setScenario(c);setReveal(false);}}>{c==='aligned'?t(lang,'Aligned','Alineado'):c==='early'?t(lang,'B early','B adelantado'):c==='late'?t(lang,'B late','B atrasado'):t(lang,'Drifting','Deriva')}</button>)}</div>
    <div className={s.legend}><span><i className={s.colorA}/>{t(lang,'A: reference','A: referencia')}</span><span><i className={s.colorB}/>{t(lang,'B: incoming','B: entrante')}</span></div>
    <div className={s.timeline} role="img" aria-label={t(lang,'Eight reference beats on deck A and eight corresponding beats on B with the selected timing difference.','Ocho golpes de referencia del deck A y ocho golpes correspondientes de B con la diferencia temporal elegida.')}>
      <div className={s.beats}>{Array.from({length:8},(_,i)=><span className={s.a} key={i}>{i+1}</span>)}</div>
      <div className={s.beats}>{Array.from({length:8},(_,i)=><span className={s.b} style={{transform:`translateX(${offset(i)}px)`}} key={i}>{i+1}</span>)}</div>
    </div>
    <button className={s.action} type="button" aria-expanded={reveal} onClick={()=>setReveal(v=>!v)}>{reveal?t(lang,'Hide diagnosis','Ocultar diagnóstico'):t(lang,'Reveal diagnosis','Ver diagnóstico')}</button>
    {reveal&&<p className={s.result}>{explanation[scenario][lang==='es'?1:0]}</p>}
  </Frame>;
}

type Diagnosis = 'constant'|'growing'|'unsteady';
function DecisionLab({lang}: {lang:Lang}) {
  const [choice,setChoice] = useState<Diagnosis>('constant');
  const [answer,setAnswer] = useState(false);
  const data: Record<Diagnosis,{en:string;es:string;fixEn:string;fixEs:string}> = {
    constant: {en:'Two kicks stay separated by the same small gap.',es:'Los dos bombos mantienen la misma separación.',fixEn:'Tempo may already match. Make a gentle jog nudge to correct phase, then listen again.',fixEs:'Puede que el tempo ya coincida. Corrige la fase con un toque suave al jog y vuelve a escuchar.'},
    growing: {en:'They meet briefly, then separate more every eight beats.',es:'Coinciden un instante, pero se separan más cada ocho pulsos.',fixEn:'There is likely a tempo difference. Make a small lasting fader adjustment, then nudge once to align.',fixEs:'Probablemente hay diferencia de tempo. Haz un pequeño ajuste sostenido del fader y después alinea con el jog.'},
    unsteady: {en:'The spacing seems to change irregularly.',es:'La separación cambia de forma irregular.',fixEn:'Check whether the music has a steady pulse, the correct beat was chosen, or the recording has live/variable timing. Do not force the fader.',fixEs:'Comprueba que el pulso sea estable, que elegiste el golpe correcto o si la grabación tiene tempo variable. No fuerces el fader.'}
  };
  return <Frame title={t(lang,'Listen → diagnose → correct','Escucha → diagnostica → corrige')} note={t(lang,'The correct response comes from repeated listening, not just a BPM display.','La decisión correcta depende de escuchar repetidamente, no solo de un indicador de BPM.')}>
    <div className={s.options}>{(['constant','growing','unsteady'] as const).map(c=><button type="button" key={c} aria-pressed={choice===c} onClick={()=>{setChoice(c);setAnswer(false);}}>{c==='constant'?t(lang,'Fixed gap','Separación fija'):c==='growing'?t(lang,'Growing gap','Separación creciente'):t(lang,'Irregular','Irregular')}</button>)}</div>
    <p className={s.prompt}>{lang==='es'?data[choice].es:data[choice].en}</p>
    <button className={s.action} type="button" aria-expanded={answer} onClick={()=>setAnswer(v=>!v)}>{answer?t(lang,'Hide correction','Ocultar corrección'):t(lang,'Show suggested correction','Mostrar corrección sugerida')}</button>
    {answer&&<p className={s.result}>{lang==='es'?data[choice].fixEs:data[choice].fixEn}</p>}
  </Frame>;
}

function EarDrill({lang}: {lang:Lang}) {
  const steps = lang==='es' ? [
    ['Preparar','Escoge dos temas con percusión regular y tempos cercanos. Pon Sync desactivado.'],
    ['Referencia','Reproduce A por MASTER a nivel cómodo. Marca su pulso contando 1-2-3-4.'],
    ['Preescucha','Carga B con el fader de canal cerrado; escucha B en CUE, preferiblemente mezclado con A en auriculares.'],
    ['Lanzar','Inicia B sobre un primer golpe claro de A. Si falla, repite sin tocar todavía el fader de tempo.'],
    ['Alinear','Escucha los bombos: si B se adelanta, frénalo brevemente; si va tarde, aceléralo brevemente.'],
    ['Mantener','Escucha durante 16–32 beats. Si deriva, ajusta muy poco el fader de tempo y alinea otra vez.'],
    ['Verificar','Repite con los ojos fuera de la pantalla. Solo al final mira los BPM y las formas de onda para contrastar.']
  ] : [
    ['Prepare','Choose two tracks with steady drums and similar tempos. Turn Sync off.'],
    ['Reference','Play A to MASTER at a comfortable level. Count its pulse: 1-2-3-4.'],
    ['Headphones','Load B with its channel fader closed; cue B in headphones, ideally blended with A.'],
    ['Launch','Start B on a clear first beat of A. If it misses, retry before changing the tempo fader.'],
    ['Align','Listen to the kicks: if B is early, slow it briefly; if B is late, speed it briefly.'],
    ['Hold','Listen for 16–32 beats. If it drifts, move the tempo fader a tiny amount and realign.'],
    ['Verify','Repeat without looking at the screen. Only then check BPM and waveforms for comparison.']
  ];
  const [done,setDone] = useState<boolean[]>(Array(7).fill(false));
  return <Frame title={t(lang,'Seven-step ear-training lab','Laboratorio de oído en siete pasos')} note={t(lang,'Use only tracks you can legally access on your equipment. Keep headphone levels moderate; this is a private cue exercise, not a live transition.','Usa temas a los que tengas acceso legítimo en tu equipo. Mantén los auriculares a volumen moderado: es un ejercicio de preescucha, no una transición en directo.')}>
    <div className={s.progress}>{done.filter(Boolean).length} / {steps.length} {t(lang,'steps completed','pasos completados')}</div>
    <ol className={s.steps}>{steps.map(([name,body],i)=><li key={name}><label><input type="checkbox" checked={done[i]} onChange={e=>setDone(prev=>prev.map((v,j)=>i===j?e.target.checked:v))}/><span><strong>{String(i+1).padStart(2,'0')} · {name}</strong><small>{body}</small></span></label></li>)}</ol>
    <button className={s.action} type="button" onClick={()=>setDone(Array(7).fill(false))}>{t(lang,'Reset practice','Reiniciar práctica')}</button>
  </Frame>;
}

export const EarKickTimelineEn = ()=><KickTimeline lang="en"/>;
export const EarKickTimelineEs = ()=><KickTimeline lang="es"/>;
export const EarDecisionLabEn = ()=><DecisionLab lang="en"/>;
export const EarDecisionLabEs = ()=><DecisionLab lang="es"/>;
export const EarPracticeEn = ()=><EarDrill lang="en"/>;
export const EarPracticeEs = ()=><EarDrill lang="es"/>;
