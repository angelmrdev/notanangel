'use client';
import { useState } from 'react';
import s from './module06-alignment-visuals.module.css';
type Lang = 'en' | 'es';
const t = (lang:Lang,en:string,es:string) => lang==='es'?es:en;
const beats = Array.from({length:32},(_,i)=>i);
function BarPhraseMap({lang}:{lang:Lang}) {
  const [layer,setLayer] = useState<'beat'|'bar'|'phrase'>('bar');
  return <figure className={s.frame}><figcaption className={s.heading}>{t(lang,'One timeline, three levels of alignment','Una línea temporal, tres niveles de alineación')}</figcaption>
    <p className={s.note}>{t(lang,'Example: common 4/4 dance music. Each cell is one beat; four beats form a bar, eight bars form this example phrase. Musical structures vary.','Ejemplo: música de baile habitual en 4/4. Cada casilla es un tiempo; cuatro tiempos forman un compás y ocho compases forman esta frase de ejemplo. Las estructuras musicales varían.')}</p>
    <div className={s.controls} role="group" aria-label={t(lang,'Highlight level','Nivel destacado')}>{(['beat','bar','phrase'] as const).map(x=><button key={x} type="button" aria-pressed={layer===x} onClick={()=>setLayer(x)}>{x==='beat'?t(lang,'Beat','Tiempo'):x==='bar'?t(lang,'Bar 1','Compás 1'):t(lang,'Phrase start','Inicio de frase')}</button>)}</div>
    <div className={s.grid} role="img" aria-label={t(lang,'Eight bars of four beats, with downbeats and phrase start highlighted','Ocho compases de cuatro tiempos, destacando primeros tiempos e inicio de frase')}>{beats.map(i=><span key={i} className={[s.cell,(layer==='phrase'&&i===0)||(layer==='bar'&&i%4===0)?s.down:'',(layer==='beat'&&i%4===0)?s.accent:''].join(' ')}>{i%4+1}</span>)}</div>
    <p className={s.legend}>{t(lang,'Read left to right: 8 bars × 4 beats = 32 beats. Bar downbeats are the first beat of each group of four.','Lee de izquierda a derecha: 8 compases × 4 tiempos = 32 tiempos. El primer tiempo de cada compás es el 1 de cada grupo de cuatro.')}</p>
    <p className={s.feedback}>{layer==='beat'?t(lang,'Beat alignment: individual kicks coincide in time, even if the other track begins on the wrong numbered beat.','Alineación de beats: los golpes coinciden temporalmente, aunque el otro tema empiece en un tiempo equivocado.'):layer==='bar'?t(lang,'Bar alignment: the beat 1 of Deck B lands on beat 1 of Deck A, not on 2, 3 or 4.','Alineación de compases: el tiempo 1 de B coincide con el 1 de A, no con el 2, 3 o 4.'):t(lang,'Phrase alignment: both tracks reach their intended musical section starts together; counting and listening to changes matter.','Alineación de frases: ambos temas llegan juntos a los inicios de las secciones previstas; importan el conteo y los cambios que escuchas.')}</p>
  </figure>;
}
type Case = 'aligned'|'wrong-beat'|'wrong-bar'|'wrong-phrase'|'drift';
function AlignmentDiagnosis({lang}:{lang:Lang}){
 const [scenario,setScenario]=useState<Case>('wrong-bar');
 const [revealed,setRevealed]=useState(false);
 const labels:Record<Case,[string,string,string,string]>={
  aligned:['Everything lines up','Todo encaja','The kicks, downbeats and chosen phrase starts are together. Keep listening across the section.','Los bombos, primeros tiempos e inicios de frase elegidos coinciden. Sigue escuchando durante la sección.'],
  'wrong-beat':['Kicks double or flam','Los bombos hacen doble golpe','Correct the short-term offset with a careful launch or jog nudge. Recheck the tempo if the error grows.','Corrige el desfase corto lanzando en el momento adecuado o con un toque de jog. Revisa el tempo si el error aumenta.'],
  'wrong-bar':['Beats match; beat 1 does not','Los beats cuadran, pero los unos no','Restart or cue B on the intended beat 1. A jog nudge of a few milliseconds will not fix a one-beat or multi-beat structural error.','Vuelve a lanzar B desde el tiempo 1 previsto. Un toque de jog de milisegundos no corrige un error estructural de uno o varios tiempos.'],
  'wrong-phrase':['Bars match; sections clash','Los compases cuadran, pero chocan las secciones','Choose another phrase start or move the entry by complete bars; this is an arrangement decision, not an automatic Sync fix.','Elige otro comienzo de frase o desplaza la entrada por compases enteros; es una decisión musical, no un arreglo automático de Sync.'],
  drift:['Starts together, then separates','Empiezan juntos y se separan','Check sustained BPM, variable tempo and beatgrid accuracy. A temporary nudge cannot solve continuing speed mismatch.','Comprueba BPM sostenidos, tempo variable y precisión de la rejilla. Un toque momentáneo no resuelve una diferencia continua de velocidad.']
 };
 const data=labels[scenario];
 return <figure className={s.frame}><figcaption className={s.heading}>{t(lang,'Diagnose the level, choose the correction','Diagnostica el nivel y elige la corrección')}</figcaption><p className={s.note}>{t(lang,'Choose a symptom, decide what you would adjust, then reveal a suggested diagnosis.','Elige un síntoma, decide qué ajustarías y después revela el diagnóstico sugerido.')}</p>
 <div className={s.controls} role="group" aria-label={t(lang,'Alignment scenario','Caso de alineación')}>{(Object.keys(labels) as Case[]).map(k=><button type="button" key={k} aria-pressed={k===scenario} onClick={()=>{setScenario(k);setRevealed(false)}}>{lang==='es'?labels[k][1]:labels[k][0]}</button>)}</div>
 <button type="button" className={s.action} aria-expanded={revealed} onClick={()=>setRevealed(v=>!v)}>{revealed?t(lang,'Hide explanation','Ocultar explicación'):t(lang,'Reveal diagnosis','Ver diagnóstico')}</button>{revealed&&<p className={s.feedback}>{lang==='es'?data[3]:data[2]}</p>}
 </figure>;
}
function PhraseEntryLab({lang}:{lang:Lang}){
 const [start,setStart]=useState(1);
 const [phraseBars,setPhraseBars]=useState(8);
 const onStart=(v:number)=>setStart(Math.max(1,Math.min(17,v)));
 const isPhrase=(start-1)%phraseBars===0;
 return <figure className={s.frame}><figcaption className={s.heading}>{t(lang,'Choose the incoming entry bar','Elige el compás de entrada')}</figcaption>
 <p className={s.note}>{t(lang,'Conceptual exercise: Deck A starts a new phrase at bar 1. Move Deck B’s entry. This checks structural alignment only; it does not simulate real audio.','Ejercicio conceptual: A empieza una frase en el compás 1. Mueve la entrada de B. Solo comprobamos la estructura; no se simula audio real.')}</p>
 <div className={s.controls} role="group" aria-label={t(lang,'Phrase length','Longitud de frase')}>{[8,16].map(n=><button key={n} type="button" aria-pressed={phraseBars===n} onClick={()=>{setPhraseBars(n);onStart(1)}}>{n} {t(lang,'bars','compases')}</button>)}</div>
 <label className={s.range}>{t(lang,'Incoming entry relative to A: bar','Entrada de B respecto a A: compás')} <output>{start}</output><input type="range" min="1" max="17" step="1" value={start} onChange={e=>onStart(Number(e.target.value))}/></label>
 <div className={s.grid}>{Array.from({length:16},(_,i)=><span key={i} className={[s.cell,i+1===start?s.accent:'',i%phraseBars===0?s.down:''].join(' ')}>{i+1}</span>)}</div>
 <p className={s.feedback}>{isPhrase?t(lang,'This entry lands at a matching phrase boundary in the simplified example. Verify the tracks’ actual musical changes by ear.','Esta entrada coincide con un límite de frase en el ejemplo simplificado. Verifica de oído los cambios musicales reales.'):t(lang,'The beat or bar can be perfectly synchronized, but the chosen entry is inside a phrase. Move to a phrase boundary if you want the section changes together.','El beat o el compás pueden estar perfectamente sincronizados, pero la entrada cae dentro de una frase. Desplázala al límite de frase si quieres juntar los cambios de sección.')}</p>
 </figure>;
}
function AlignmentPractice({lang}:{lang:Lang}){
 const steps=lang==='es'?[
 'Elige dos canciones con batería clara y secciones reconocibles; identifica el compás 1 de cada una.',
 'En A, escucha un cambio musical claro y cuenta 1-2-3-4 durante ocho compases.',
 'Pon B en CUE con el canal cerrado. Identifica su primer tiempo del compás y marca ese punto de inicio.',
 'Con los BPM igualados, lanza B a propósito en el tiempo 2 de A; escucha por qué cuadrar el tempo no basta.',
 'Vuelve a lanzar B con el tiempo 1 de A. Comprueba que los primeros tiempos de ambos compases coinciden.',
 'Repite la prueba desde el comienzo de una frase de ocho compases. Escucha si los cambios musicales llegan juntos.',
 'Prueba una entrada desplazada cuatro compases y describe qué sigue cuadrado y qué ha dejado de coincidir.',
 'Haz una repetición sin mirar la pantalla: cuenta en voz baja y verifica el resultado en auriculares.'
 ]:[
 'Choose two tracks with clear drums and recognizable sections; identify bar 1 in each.',
 'On A, listen for a clear arrangement change and count 1-2-3-4 for eight bars.',
 'Cue B with its channel closed. Identify B’s bar downbeat and mark the intended launch point.',
 'With BPM matched, deliberately launch B on beat 2 of A; hear why tempo matching alone is not enough.',
 'Launch B again on A’s beat 1. Verify both bar downbeats now coincide.',
 'Repeat from the beginning of an eight-bar phrase; listen for arrangement changes arriving together.',
 'Try an entry offset by four bars and describe what remains aligned and what no longer matches.',
 'Repeat without watching the screen: count quietly and verify in headphones.'
 ];
 const [done,setDone]=useState<boolean[]>(Array(steps.length).fill(false));
 return <figure className={s.frame}><figcaption className={s.heading}>{t(lang,'Two-deck counting and alignment drill','Ejercicio de conteo y alineación con dos decks')}</figcaption><p className={s.note}>{t(lang,'Keep incoming B out of the main mix until you are comfortable. Practice at safe headphone levels.','Mantén B fuera de la mezcla principal hasta dominar el ejercicio. Practica con volumen seguro en auriculares.')}</p><p className={s.progress}>{done.filter(Boolean).length}/{steps.length} {t(lang,'steps complete','pasos completados')}</p><ol className={s.steps}>{steps.map((st,i)=><li key={i}><label><input type="checkbox" checked={done[i]} onChange={e=>setDone(v=>v.map((x,j)=>i===j?e.target.checked:x))}/><span><strong>{i+1}.</strong> {st}</span></label></li>)}</ol><button type="button" className={s.action} onClick={()=>setDone(Array(steps.length).fill(false))}>{t(lang,'Reset practice','Reiniciar práctica')}</button></figure>;
}
export const BarPhraseMapEn=()=> <BarPhraseMap lang="en"/>;
export const BarPhraseMapEs=()=> <BarPhraseMap lang="es"/>;
export const AlignmentDiagnosisEn=()=> <AlignmentDiagnosis lang="en"/>;
export const AlignmentDiagnosisEs=()=> <AlignmentDiagnosis lang="es"/>;
export const PhraseEntryLabEn=()=> <PhraseEntryLab lang="en"/>;
export const PhraseEntryLabEs=()=> <PhraseEntryLab lang="es"/>;
export const AlignmentPracticeEn=()=> <AlignmentPractice lang="en"/>;
export const AlignmentPracticeEs=()=> <AlignmentPractice lang="es"/>;
