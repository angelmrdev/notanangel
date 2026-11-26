'use client';
import { useState } from 'react';
import s from './module06-drift-visuals.module.css';
type Lang = 'en' | 'es';
const tr = (lang: Lang, en: string, es: string) => lang === 'es' ? es : en;
const n = (value: number, digits = 2) => Number.isFinite(value) ? value.toFixed(digits) : '—';

function DriftTempoLab({lang}:{lang:Lang}) {
 const [bpmA,setBpmA] = useState(128);
 const [bpmB,setBpmB] = useState(127.5);
 const [seconds,setSeconds] = useState(30);
 const safeA = Math.min(200,Math.max(60,bpmA||128));
 const safeB = Math.min(200,Math.max(60,bpmB||128));
 const safeSeconds = Math.min(120,Math.max(0,seconds||0));
 const beats = (safeB-safeA)*safeSeconds/60;
 const secondsOffset = (safeB-safeA)*safeSeconds/safeA;
 const direction = Math.abs(beats)<0.005 ? tr(lang,'No growing offset at these tempos.','No hay desfase creciente con estos tempos.') : beats>0 ? tr(lang,'B accumulates beats ahead of A. Reduce B tempo slightly; then re-align its position.','B va acumulando adelanto frente a A. Reduce ligeramente el tempo de B y luego reajusta la posición.') : tr(lang,'B falls increasingly behind A. Raise B tempo slightly; then re-align its position.','B se va quedando cada vez más atrás de A. Sube ligeramente el tempo de B y luego reajusta la posición.');
 const correction = ((safeA/safeB)-1)*100;
 return <figure className={s.frame}>
  <figcaption className={s.heading}>{tr(lang,'Tempo mismatch → cumulative drift','Diferencia de tempo → deriva acumulada')}</figcaption>
  <p className={s.note}>{tr(lang,'Constant-tempo, four-beat music model. Both decks start on the same beat; moving the pitch fader changes the rate, while nudging changes the position. The model does not represent live audio, swing or variable BPM.','Modelo de canciones en 4/4 con tempo constante. Ambos decks comienzan en el mismo golpe; el fader cambia la velocidad y un toque de jog cambia la posición. No reproduce audio real ni modela swing o BPM variables.')}</p>
  <div className={s.controls}>
   <label>{tr(lang,'Deck A (BPM)','Deck A (BPM)')}<input aria-label={tr(lang,'Deck A BPM','BPM de deck A')} type="number" min="60" max="200" step="0.1" value={bpmA} onChange={e=>setBpmA(Number(e.target.value))}/></label>
   <label>{tr(lang,'Deck B (BPM)','Deck B (BPM)')}<input aria-label={tr(lang,'Deck B BPM','BPM de deck B')} type="number" min="60" max="200" step="0.1" value={bpmB} onChange={e=>setBpmB(Number(e.target.value))}/></label>
   <label>{tr(lang,'Listening interval (s)','Tiempo de escucha (s)')}<input aria-label={tr(lang,'Listening duration seconds','Duración de escucha en segundos')} type="number" min="0" max="120" step="5" value={seconds} onChange={e=>setSeconds(Number(e.target.value))}/></label>
  </div>
  <div className={s.metrics}><div className={s.metric}><small>{tr(lang,'Tempo difference B − A','Diferencia B − A')}</small><strong>{n(safeB-safeA,1)} BPM</strong></div><div className={s.metric}><small>{tr(lang,'Beat displacement over interval','Desplazamiento en golpes')}</small><strong>{n(beats)} {tr(lang,'beats','beats')}</strong></div><div className={s.metric}><small>{tr(lang,'Approx. timing offset at A tempo','Desfase temporal aprox. a tempo A')}</small><strong>{n(secondsOffset*1000,0)} ms</strong></div></div>
  <p className={s.feedback}>{direction} {tr(lang,'To bring B’s current BPM to A, the required additional tempo change is approximately','Para llevar el BPM actual de B al de A, el ajuste adicional aproximado de tempo es')} <strong>{n(correction,2)}%</strong>. {tr(lang,'This assumes a linear tempo control and does not account for pitch-range limits.','Se presupone un control lineal de tempo; no considera los límites del rango del pitch.')}</p>
  <button type="button" className={s.button} onClick={()=>{setBpmA(128);setBpmB(127.5);setSeconds(30)}}>{tr(lang,'Reset example','Restablecer ejemplo')}</button>
 </figure>;
}
const scenarios = [
 {en:'The kicks are consistently 80 ms apart, unchanged after 16 bars.',es:'Los bombos están separados unos 80 ms y siguen igual tras 16 compases.',answer:'offset'},
 {en:'The kicks start together, then separate more every eight bars.',es:'Los bombos arrancan juntos y se van separando más cada ocho compases.',answer:'drift'},
 {en:'The drums sound close but Deck B’s beat 1 is on A’s beat 3.',es:'Los golpes suenan próximos, pero el tiempo 1 de B cae sobre el 3 de A.',answer:'structure'},
 {en:'B stays close for one phrase, but its acoustic drums speed up during the next section.',es:'B se mantiene cerca una frase, pero su batería acústica acelera en la sección siguiente.',answer:'variable'},
] as const;
type Diagnosis = 'offset'|'drift'|'structure'|'variable';
function DriftDiagnosis({lang}:{lang:Lang}) {
 const [scenario,setScenario]=useState(0);
 const [answer,setAnswer]=useState<Diagnosis|null>(null);
 const choices: {id:Diagnosis;en:string;es:string}[] = [
  {id:'offset',en:'Constant position offset → gentle nudge',es:'Desfase constante → pequeño ajuste de jog'},
  {id:'drift',en:'Progressive drift → adjust tempo, then nudge',es:'Deriva progresiva → ajustar tempo y después jog'},
  {id:'structure',en:'Wrong bar alignment → re-cue at a downbeat',es:'Compás incorrecto → volver a entrar en el primer tiempo'},
  {id:'variable',en:'Variable tempo → monitor and adjust by ear',es:'Tempo variable → escuchar y corregir según evolucione'},
 ];
 const item=scenarios[scenario];
 return <figure className={s.frame}>
  <figcaption className={s.heading}>{tr(lang,'Listen, diagnose, decide','Escucha, diagnostica y decide')}</figcaption>
  <p className={s.note}>{tr(lang,'Read each listening scenario, choose the cause and reveal the correction. These are descriptions of what you hear, not playable sound examples.','Lee cada situación de escucha, elige la causa y comprueba la corrección. Son descripciones, no ejemplos de sonido reproducible.')}</p>
  <div className={s.controls}>{scenarios.map((_,i)=><button type="button" key={i} className={s.button} aria-pressed={scenario===i} onClick={()=>{setScenario(i);setAnswer(null)}}>{tr(lang,'Case','Caso')} {i+1}</button>)}</div>
  <p><strong>{lang==='es'?item.es:item.en}</strong></p>
  <div className={s.options}>{choices.map(choice=><button type="button" className={s.button} key={choice.id} aria-pressed={answer===choice.id} onClick={()=>setAnswer(choice.id)}>{lang==='es'?choice.es:choice.en}</button>)}</div>
  {answer&&<p className={s.feedback} role="status"><strong>{answer===item.answer?tr(lang,'Correct diagnosis.','Diagnóstico correcto.'):tr(lang,'Try again.','Revisa el diagnóstico.')}</strong> {lang==='es'?choices.find(c=>c.id===item.answer)?.es:choices.find(c=>c.id===item.answer)?.en}. {tr(lang,'Check your conclusion using real sound before committing to a correction.','Confirma con el audio real antes de hacer la corrección.')}</p>}
 </figure>;
}
function DriftPractice({lang}:{lang:Lang}) {
 const en=['Choose two steady 4/4 tracks with clear kicks; keep B in headphone CUE with its channel closed.','Match their BPM approximately and start B on the intended beat of A.','Listen for 8–16 bars without touching the controls. Decide: fixed offset or growing separation?','If the gap grows, determine whether B is gradually faster or slower than A.','Adjust B’s tempo in small increments toward A; leave the channel fader closed.','Use a gentle jog/pitch bend to remove the remaining position offset.','Listen another 16–32 bars. Repeat small corrections until the kicks hold together.','Try a deliberately wrong BPM (e.g. 127.5 vs 128), then repeat the diagnosis without looking at waveforms.'];
 const es=['Elige dos temas estables en 4/4 con bombos claros; mantén B en CUE de auriculares y su canal cerrado.','Iguala aproximadamente los BPM e inicia B en el tiempo previsto de A.','Escucha 8–16 compases sin tocar controles. Decide: ¿desfase fijo o separación creciente?','Si la separación aumenta, determina si B va cada vez más rápido o más lento que A.','Ajusta poco a poco el tempo de B hacia el de A; deja su fader de canal cerrado.','Usa un toque suave de jog/pitch bend para eliminar el desfase de posición restante.','Escucha otros 16–32 compases. Repite correcciones pequeñas hasta que los bombos aguanten juntos.','Prueba BPM erróneos a propósito (por ejemplo, 127,5 frente a 128) y repite el diagnóstico sin mirar las formas de onda.'];
 const steps=lang==='es'?es:en;
 const [done,setDone]=useState<boolean[]>(Array(steps.length).fill(false));
 return <figure className={s.frame}><figcaption className={s.heading}>{tr(lang,'Two-deck drift correction drill','Práctica de corrección de deriva con dos decks')}</figcaption><p className={s.note}>{tr(lang,'A checklist for practising with your actual DJ controller. No sound is generated by this widget.','Lista para practicar con tu controladora real. Este recurso no genera sonido.')}</p><p className={s.progress}>{done.filter(Boolean).length}/{steps.length} {tr(lang,'complete','completados')}</p><ol className={s.steps}>{steps.map((step,i)=><li key={i}><label><input type="checkbox" checked={done[i]} onChange={e=>setDone(old=>old.map((v,j)=>j===i?e.target.checked:v))}/><span>{i+1}. {step}</span></label></li>)}</ol><button type="button" className={s.button} onClick={()=>setDone(Array(steps.length).fill(false))}>{tr(lang,'Restart exercise','Reiniciar ejercicio')}</button></figure>;
}
export const DriftTempoLabEn=()=> <DriftTempoLab lang="en"/>;
export const DriftTempoLabEs=()=> <DriftTempoLab lang="es"/>;
export const DriftDiagnosisEn=()=> <DriftDiagnosis lang="en"/>;
export const DriftDiagnosisEs=()=> <DriftDiagnosis lang="es"/>;
export const DriftPracticeEn=()=> <DriftPractice lang="en"/>;
export const DriftPracticeEs=()=> <DriftPractice lang="es"/>;
