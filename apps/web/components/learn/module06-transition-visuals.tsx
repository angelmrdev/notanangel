'use client';
import { useState } from 'react';
import s from './module06-transition-visuals.module.css';
type Lang='en'|'es';
const t=(l:Lang,en:string,es:string)=>l==='es'?es:en;

function EntryPlanner({lang}:{lang:Lang}){
 const [phrase,setPhrase]=useState(8);
 const [remaining,setRemaining]=useState(8);
 const [bpm,setBpm]=useState(128);
 const matched=remaining%phrase===0;
 const duration=(60/bpm)*4*phrase;
 return <figure className={s.frame}>
  <figcaption className={s.heading}>{t(lang,'Phrase-aware entry planner','Planificador de entrada por frases')}</figcaption>
  <p className={s.note}>{t(lang,'The bars below represent a steady 4/4 track. Choose how many bars remain in A’s section before its next change, and how long B’s intro lasts. This is a planning aid, not a live beatgrid.','Los compases representan un tema estable en 4/4. Elige cuántos compases faltan para el siguiente cambio de sección de A y cuánto dura la intro de B. Es una ayuda para planificar, no un beatgrid real.')}</p>
  <div className={s.controls}>
   <label>{t(lang,'B intro (bars)','Intro de B (compases)')}<select value={phrase} onChange={e=>setPhrase(Number(e.target.value))}><option value={8}>8</option><option value={16}>16</option><option value={32}>32</option></select></label>
   <label>{t(lang,'Bars until A section change','Compases hasta el cambio de A')}<select value={remaining} onChange={e=>setRemaining(Number(e.target.value))}>{[4,8,12,16,24,32].map(v=><option key={v} value={v}>{v}</option>)}</select></label>
   <label>{t(lang,'Shared playback BPM','BPM de reproducción común')}<input type="number" min={60} max={200} value={bpm} onChange={e=>setBpm(Math.max(60,Math.min(200,Number(e.target.value)||128)))}/></label>
  </div>
  <div className={s.metrics}><div className={s.metric}><small>{t(lang,'B intro duration','Duración intro B')}</small><strong>{duration.toFixed(1)} s</strong></div><div className={s.metric}><small>{t(lang,'A section in','Sección A en')}</small><strong>{((60/bpm)*4*remaining).toFixed(1)} s</strong></div><div className={s.metric}><small>{t(lang,'Section alignment','Alineación de secciones')}</small><strong>{matched?t(lang,'Aligned','Coincide'):t(lang,'Not aligned','No coincide')}</strong></div></div>
  <div className={s.timeline} aria-label={t(lang,'Eight-bar illustration','Ilustración de ocho compases')}>{Array.from({length:8},(_,i)=><div key={i} className={`${s.cell} ${i===0?s.active:''}`}>{i+1}</div>)}</div>
  <p className={s.feedback}>{matched?t(lang,'At this entry, B’s intro ends on an A section boundary (assuming regular, correctly counted phrases).','Con esta entrada, la intro de B termina en un límite de sección de A (si las frases son regulares y están bien contadas).'):t(lang,'B’s intro would end partway through A’s section cycle. Reconsider the entry point, the intro length or the transition plan.','La intro de B terminaría fuera del límite previsto de la sección de A. Replantea el punto de entrada, la duración de la intro o la transición.')} {t(lang,'Even aligned phrases can clash musically: listen for vocals, energy and arrangement.','Aunque las frases coincidan, las canciones pueden chocar musicalmente: escucha voces, energía y arreglo.')}</p>
 </figure>;
}

type Stage='prepare'|'blend'|'handover';
function TransitionSimulator({lang}:{lang:Lang}){
 const [stage,setStage]=useState<Stage>('prepare');
 const [faderB,setFaderB]=useState(0);
 const [bassB,setBassB]=useState(false);
 const [tempoOK,setTempoOK]=useState(true);
 const [phrasesOK,setPhrasesOK]=useState(true);
 const vals:Record<Stage,{a:number;b:number}>={prepare:{a:100,b:0},blend:{a:80,b:faderB},handover:{a:0,b:faderB}};
 const {a,b}=vals[stage];
 const ready=tempoOK&&phrasesOK;
 const warnings=[!tempoOK?t(lang,'B may drift: check tempo by ear.','B puede derivar: comprueba el tempo de oído.'):null,!phrasesOK?t(lang,'Recheck the planned phrase entry.','Revisa el inicio de frase elegido.'):null,stage!=='prepare'&&b===0?t(lang,'B is still closed: nothing new reaches MASTER.','B sigue cerrado: no entra en MASTER.'):null,stage==='blend'&&bassB&&a>0&&b>0?t(lang,'Both low ends overlap: check for a muddy or overloaded bass.','Se solapan los graves: comprueba si el bajo se embarra o satura.'):null,stage==='handover'&&b<70?t(lang,'A is closed; raise B gradually to a safe target level.','A está cerrado; sube B gradualmente hasta un nivel seguro.'):null].filter(Boolean);
 return <figure className={s.frame}>
  <figcaption className={s.heading}>{t(lang,'Two-channel transition rehearsal','Ensayo de transición con dos canales')}</figcaption>
  <p className={s.note}>{t(lang,'A schematic of relative channel levels. These percentages are not measured loudness, audio output or recommended gain values. Practise the actual sound on your equipment at safe levels.','Esquema de niveles relativos de canal. Los porcentajes no son sonoridad medida, audio real ni valores recomendados de ganancia. Practica con tu equipo a volumen seguro.')}</p>
  <div className={s.controls}>{(['prepare','blend','handover'] as const).map(key=><button key={key} type="button" className={s.button} aria-pressed={stage===key} onClick={()=>setStage(key)}>{key==='prepare'?t(lang,'1 · Prepare','1 · Preparar'):key==='blend'?t(lang,'2 · Blend','2 · Mezclar'):t(lang,'3 · Handover','3 · Relevo')}</button>)}</div>
  <div className={s.controls}><label>{t(lang,'Deck B channel fader (%)','Fader de canal B (%)')}<input type="range" min="0" max="100" step="10" value={faderB} onChange={e=>setFaderB(Number(e.target.value))}/><span>{faderB}%</span></label></div>
  <div className={s.stage}><div className={s.channels}><div className={s.channel}><strong>Deck A</strong><div className={s.track}><div className={s.fill} style={{width:`${a}%`}}/></div><span>{a}%</span></div><div className={s.channel}><strong>Deck B</strong><div className={s.track}><div className={`${s.fill} ${s.fillB}`} style={{width:`${b}%`}}/></div><span>{b}%</span></div></div></div>
  <div className={s.controls}><label><input type="checkbox" checked={tempoOK} onChange={e=>setTempoOK(e.target.checked)}/> {t(lang,'Tempo holds','Tempo estable')}</label><label><input type="checkbox" checked={phrasesOK} onChange={e=>setPhrasesOK(e.target.checked)}/> {t(lang,'Phrase entry checked','Entrada de frase comprobada')}</label><label><input type="checkbox" checked={bassB} onChange={e=>setBassB(e.target.checked)}/> {t(lang,'Both bass parts active','Graves de ambos activos')}</label></div>
  <p className={s.feedback} role="status">{ready?t(lang,'Preparation checks passed.','Comprobaciones de preparación correctas.'):t(lang,'Fix preparation before opening B.','Corrige la preparación antes de abrir B.')} {warnings.length?warnings.join(' '):t(lang,'Listen to the room mix: the simulator cannot judge musical fit, clipping or actual EQ balance.','Escucha la mezcla de sala: el simulador no evalúa la compatibilidad musical, la saturación ni el equilibrio real de EQ.')}</p>
 </figure>;
}
function FinalDrill({lang}:{lang:Lang}){
 const en=['Pick two steady 4/4 tracks with compatible phrasing and a simple instrumental overlap; rehearse at a safe level.','Locate a reliable downbeat and intro on B. Mark the intended entry and exit points.','Play A to MASTER. Keep B’s channel closed; use headphone CUE to prepare it.','Bring B to roughly A’s BPM; check its timing by ear over several bars.','Count A’s remaining bars and start B at the chosen phrase boundary.','Check that B remains aligned and has no competing vocal or overwhelming bass before opening its channel.','Raise B gradually during an appropriate phrase while listening to the MASTER. Manage overlapping low frequencies carefully.','Lower A gradually, then close its channel at the planned phrase change. Avoid abrupt level jumps.','Listen to the full result, note one problem (timing, phrasing, EQ or levels) and repeat without relying on the waveform.'];
 const es=['Elige dos temas estables en 4/4 con frases compatibles y un tramo instrumental fácil; ensaya a volumen seguro.','Localiza un primer tiempo fiable y una intro en B. Marca dónde quieres entrar y salir.','Reproduce A en MASTER. Mantén cerrado el canal B y prepáralo mediante CUE de auriculares.','Acerca los BPM de B a los de A; verifica de oído que aguanta varios compases.','Cuenta los compases restantes de A y lanza B en el límite de frase previsto.','Confirma que B sigue cuadrado y que no solapan voces ni graves excesivos antes de abrir su canal.','Sube B gradualmente en una frase apropiada escuchando MASTER. Gestiona con cuidado los graves superpuestos.','Baja A gradualmente y cierra su canal en el cambio de frase previsto, sin saltos bruscos de nivel.','Escucha el resultado completo, anota un problema (tiempo, frases, EQ o niveles) y repite sin depender de la forma de onda.'];
 const steps=lang==='es'?es:en;const [done,setDone]=useState<boolean[]>(Array(steps.length).fill(false));
 return <figure className={s.frame}><figcaption className={s.heading}>{t(lang,'Your first complete two-track transition','Tu primera transición completa entre dos canciones')}</figcaption><p className={s.note}>{t(lang,'Practise on your controller. This checklist does not play audio or certify that your mix sounds good.','Practica con tu controladora. Esta lista no reproduce audio ni certifica que la mezcla suene bien.')}</p><p className={s.progress}>{done.filter(Boolean).length}/{steps.length} {t(lang,'steps complete','pasos completados')}</p><ol className={s.steps}>{steps.map((step,i)=><li key={i}><label><input type="checkbox" checked={done[i]} onChange={e=>setDone(old=>old.map((v,j)=>j===i?e.target.checked:v))}/><span>{i+1}. {step}</span></label></li>)}</ol><button type="button" className={s.button} onClick={()=>setDone(Array(steps.length).fill(false))}>{t(lang,'Restart practice','Reiniciar práctica')}</button></figure>;
}
export const EntryPlannerEn=()=> <EntryPlanner lang="en"/>;
export const EntryPlannerEs=()=> <EntryPlanner lang="es"/>;
export const TransitionSimulatorEn=()=> <TransitionSimulator lang="en"/>;
export const TransitionSimulatorEs=()=> <TransitionSimulator lang="es"/>;
export const FinalDrillEn=()=> <FinalDrill lang="en"/>;
export const FinalDrillEs=()=> <FinalDrill lang="es"/>;
