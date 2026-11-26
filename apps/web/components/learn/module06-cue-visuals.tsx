'use client';
import { useState } from 'react';
import s from './module06-cue-visuals.module.css';
type Lang = 'en' | 'es';
const t = (lang:Lang,en:string,es:string) => lang === 'es' ? es : en;
function CueRoutingLab({lang}:{lang:Lang}) {
 const [cueB,setCueB]=useState(true);
 const [channelB,setChannelB]=useState(false);
 const [blend,setBlend]=useState<'cue'|'both'|'master'>('both');
 const hearsB=cueB && blend!=='master';
 return <figure className={s.frame}>
  <figcaption className={s.heading}>{t(lang,'What reaches your headphones and the audience?','¿Qué escuchas tú y qué escucha el público?')}</figcaption>
  <p className={s.note}>{t(lang,'Simplified routing model for a controller with pre-fader CUE and a CUE/MASTER headphones blend. Exact controls and post-fader options vary by device. No audio is generated.','Modelo simplificado de una controladora con CUE pre-fader y mezcla CUE/MASTER en auriculares. Los mandos exactos y opciones posfader dependen del equipo. No se genera audio.')}</p>
  <div className={s.controls}><button type="button" aria-pressed={cueB} onClick={()=>setCueB(v=>!v)}>{t(lang,'B headphones CUE','CUE auriculares B')}: {cueB?'ON':'OFF'}</button><button type="button" aria-pressed={channelB} onClick={()=>setChannelB(v=>!v)}>{t(lang,'B channel to master','Canal B al master')}: {channelB?'ON':'OFF'}</button></div>
  <div className={s.controls} role="group" aria-label={t(lang,'Headphones blend','Mezcla de auriculares')}>{(['cue','both','master'] as const).map(b=><button type="button" key={b} aria-pressed={blend===b} onClick={()=>setBlend(b)}>{b==='cue'?'CUE':b==='both'?'CUE + MASTER':'MASTER'}</button>)}</div>
  <div className={s.signal}><div className={s.channel}><strong>{t(lang,'Audience / MASTER','Público / MASTER')}</strong><span className={`${s.pill} ${s.live}`}>A</span>{channelB&&<span className={`${s.pill} ${s.live}`}>B</span>}<span className={s.note}>{channelB?t(lang,'B is now audible in the main mix.','B ya suena en la mezcla principal.'):t(lang,'B stays out of the main mix.','B permanece fuera de la mezcla principal.')}</span></div><div className={s.channel}><strong>{t(lang,'DJ headphones','Auriculares DJ')}</strong>{blend!=='cue'&&<span className={`${s.pill} ${s.live}`}>A · MASTER</span>}{hearsB&&<span className={`${s.pill} ${s.private}`}>B · CUE</span>}{!hearsB&&blend==='cue'&&<span className={`${s.pill} ${s.muted}`}>{t(lang,'No selected cue signal','Sin señal CUE seleccionada')}</span>}</div></div>
  <p className={s.feedback}>{hearsB&&!channelB?t(lang,'This is the usual preparation state: you can rehearse B privately while A stays live.','Este es el estado habitual de preparación: ensayas B en privado mientras A sigue sonando.'):channelB?t(lang,'Check the room output: opening B makes it audible to everyone, regardless of headphones CUE.','Comprueba la salida de sala: abrir B lo hace audible al público, independientemente del CUE de auriculares.'):t(lang,'B is not audible in the headphones under this configuration. Check B CUE and the headphones blend.','Con esta configuración no escuchas B en auriculares. Revisa el CUE de B y la mezcla de auriculares.')}</p>
 </figure>;
}
function LaunchTimingLab({lang}:{lang:Lang}) {
 const [position,setPosition]=useState(1);
 const [revealed,setRevealed]=useState(false);
 const correct=position===1 || position===5;
 return <figure className={s.frame}>
 <figcaption className={s.heading}>{t(lang,'Launch B on the chosen downbeat','Lanza B en el primer tiempo elegido')}</figcaption>
 <p className={s.note}>{t(lang,'Conceptual two-bar grid in 4/4. A has bar downbeats at beats 1 and 5. Choose an entry beat for B, then check the result. This is a timing diagram, not audio playback.','Cuadrícula conceptual de dos compases en 4/4. A tiene sus primeros tiempos en los beats 1 y 5. Elige cuándo entra B y comprueba el resultado. Es un diagrama de tiempo, no reproducción de audio.')}</p>
 <div className={s.timeline} role="group" aria-label={t(lang,'Select launch beat','Selecciona el tiempo de entrada')}>{Array.from({length:8},(_,i)=><button type="button" key={i} className={[s.beat,i%4===0?s.beatDown:'',position===i+1?s.beatActive:''].join(' ')} onClick={()=>{setPosition(i+1);setRevealed(false)}} aria-pressed={position===i+1}>{i%4+1}</button>)}</div>
 <div className={s.controls}><button type="button" className={s.action} aria-expanded={revealed} onClick={()=>setRevealed(v=>!v)}>{revealed?t(lang,'Hide check','Ocultar comprobación'):t(lang,'Check launch','Comprobar entrada')}</button></div>
 {revealed&&<p className={s.feedback}>{correct?t(lang,'B starts on A’s beat 1 in this simplified example. Now check phrase placement and actual audio by ear.','B entra en el tiempo 1 de A en este ejemplo. Ahora comprueba de oído la frase y el audio real.'):t(lang,'B enters mid-bar. Even at identical BPM, the numbered bar beats will not match. Re-cue B for the intended downbeat.','B entra a mitad de compás. Incluso con BPM idénticos, no coincidirán los tiempos numerados del compás. Vuelve a poner B en CUE para el primer tiempo previsto.')}</p>}
 </figure>;
}
function CuePreparationDrill({lang}:{lang:Lang}) {
 const en=['Start Deck A on the master output at a safe listening level.','Load B and close its channel fader; verify B is not audible on the main output.','Activate headphone CUE for B and adjust headphones level and CUE/MASTER blend.','Find B’s first useful downbeat using listening and counting; set a temporary cue or hot cue as available.','Rehearse the start in headphones and check that B starts where expected.','Count A’s bars and identify a suitable entry at a musical section boundary.','Launch B on the intended beat while keeping it out of master, and listen for offset or drift.','Only when ready, bring B into the master gradually and verify meters, EQ and musical fit.'];
 const es=['Pon el deck A en el master con un nivel de escucha seguro.','Carga B y cierra su fader de canal; comprueba que B no suena por la salida principal.','Activa el CUE de auriculares de B y ajusta nivel y mezcla CUE/MASTER.','Busca el primer tiempo útil de B escuchando y contando; coloca un CUE temporal o hot cue si está disponible.','Ensaya el inicio por auriculares y comprueba que B arranca donde esperabas.','Cuenta los compases de A y localiza una entrada adecuada en un cambio de sección musical.','Lanza B en el tiempo previsto manteniéndolo fuera del master y escucha desfases o deriva.','Solo cuando esté listo, introduce B progresivamente en el master y comprueba medidores, EQ y encaje musical.'];
 const steps=lang==='es'?es:en;
 const [checked,setChecked]=useState<boolean[]>(Array(steps.length).fill(false));
 return <figure className={s.frame}><figcaption className={s.heading}>{t(lang,'Private cue-to-live rehearsal','Ensayo de preescucha a mezcla en directo')}</figcaption><p className={s.note}>{t(lang,'Use two tracks with clear drums. No audience is required. Keep headphone volume comfortable and confirm master routing before opening B.','Usa dos canciones con batería clara. No necesitas público. Mantén un volumen cómodo en los auriculares y comprueba la salida master antes de abrir B.')}</p><p className={s.progress}>{checked.filter(Boolean).length}/{steps.length} {t(lang,'steps complete','pasos completados')}</p><ol className={s.steps}>{steps.map((step,i)=><li key={i}><label><input type="checkbox" checked={checked[i]} onChange={e=>setChecked(a=>a.map((v,j)=>j===i?e.target.checked:v))}/><span>{i+1}. {step}</span></label></li>)}</ol><button type="button" className={s.action} onClick={()=>setChecked(Array(steps.length).fill(false))}>{t(lang,'Reset exercise','Reiniciar ejercicio')}</button></figure>;
}
export const CueRoutingLabEn=()=> <CueRoutingLab lang="en"/>;
export const CueRoutingLabEs=()=> <CueRoutingLab lang="es"/>;
export const LaunchTimingLabEn=()=> <LaunchTimingLab lang="en"/>;
export const LaunchTimingLabEs=()=> <LaunchTimingLab lang="es"/>;
export const CuePreparationDrillEn=()=> <CuePreparationDrill lang="en"/>;
export const CuePreparationDrillEs=()=> <CuePreparationDrill lang="es"/>;
