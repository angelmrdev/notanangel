'use client';

import { useState } from 'react';
import s from './module06-sync-visuals.module.css';

type Lang = 'en' | 'es';
type Mode = 'off' | 'bpm' | 'beat';
const tr = (lang: Lang, en: string, es: string) => lang === 'es' ? es : en;

function SyncComparison({ lang }: { lang: Lang }) {
  const [mode, setMode] = useState<Mode>('off');
  const [gridValid, setGridValid] = useState(true);
  const [shift, setShift] = useState(20);
  const tempoA = 128;
  const tempoB = mode === 'off' ? 124 : tempoA;
  const drift = mode === 'off' ? 3 : 0;
  const phase = mode === 'beat' && gridValid ? 0 : shift;
  return <figure className={s.frame}>
    <figcaption className={s.heading}>{tr(lang, 'Tempo match ≠ beat alignment', 'Igualar BPM ≠ alinear golpes')}</figcaption>
    <p className={s.small}>{tr(lang, 'Conceptual model: A is the reference at 128 BPM, B begins at 124 BPM. Toggle a typical sync behaviour and move the incoming beat. Exact features vary by controller/software.', 'Modelo conceptual: A es la referencia a 128 BPM y B comienza a 124 BPM. Alterna los comportamientos habituales de Sync y mueve el golpe entrante. Las funciones exactas dependen del equipo y el software.')}</p>
    <div className={s.controls} role="group" aria-label={tr(lang, 'Synchronization mode', 'Modo de sincronización')}>
      {(['off','bpm','beat'] as const).map(x => <button type="button" key={x} aria-pressed={mode === x} onClick={() => setMode(x)}>{x === 'off' ? tr(lang,'Off','Desactivado') : x === 'bpm' ? 'BPM Sync' : 'Beat Sync'}</button>)}
    </div>
    <div className={s.metrics}><span><strong>Deck A</strong> {tempoA} BPM</span><span><strong>Deck B</strong> {tempoB} BPM</span></div>
    <label className={s.toggle}><input type="checkbox" checked={gridValid} onChange={e => setGridValid(e.target.checked)}/>{tr(lang,'Beatgrid is correctly positioned', 'El beatgrid está bien colocado')}</label>
    <label className={s.range}>{tr(lang,'Original B beat offset', 'Desfase inicial de B')} <output>{shift} ms</output><input type="range" min={-30} max={30} step={5} value={shift} onChange={e => setShift(Number(e.target.value))}/></label>
    <div className={s.legend}><span className={s.keyA}>{tr(lang,'A: master', 'A: referencia')}</span><span className={s.keyB}>{tr(lang,'B: incoming', 'B: entrante')}</span></div>
    <div className={s.beatRows} role="img" aria-label={tr(lang, 'Simplified position of eight corresponding beats on two decks', 'Posición simplificada de ocho golpes correspondientes de ambos decks')}>
      <div>{Array.from({length:8}, (_,i) => <span className={s.beatA} key={i}>{i+1}</span>)}</div>
      <div>{Array.from({length:8}, (_,i) => <span className={s.beatB} key={i} style={{transform:`translateX(${phase + i*drift}px)`}}>{i+1}</span>)}</div>
    </div>
    <p className={s.feedback}>{mode === 'off' ? tr(lang,'With Sync off, B can drift because the sustained tempos differ.','Sin Sync, B puede derivar porque los tempos sostenidos son distintos.') : mode === 'bpm' ? tr(lang,'BPM Sync matches speed, but the original beat offset remains: a nudge may still be needed.','BPM Sync iguala la velocidad, pero el desfase original continúa: quizá necesites un toque de jog.') : gridValid ? tr(lang,'With a correct beatgrid, Beat Sync can also align phase. Listen for correct musical downbeats and phrases.','Con un beatgrid correcto, Beat Sync también puede alinear la fase. Comprueba de oído los primeros tiempos y las frases.') : tr(lang,'An incorrect beatgrid can produce the wrong apparent alignment even with Beat Sync. Check the grid and listen.','Un beatgrid incorrecto puede generar una alineación equivocada incluso con Beat Sync. Revisa la rejilla y escucha.')}</p>
    <p className={s.small}>{tr(lang,'Offsets are illustrative screen distances, not a sample-accurate audio simulation.', 'Los desplazamientos son distancias visuales ilustrativas, no una simulación de audio precisa.')}</p>
  </figure>;
}

type Fault = 'wrong-grid' | 'wrong-downbeat' | 'tempo-change' | 'sync-off';
const cases: Fault[] = ['wrong-grid','wrong-downbeat','tempo-change','sync-off'];
function Troubleshooter({lang}:{lang: Lang}) {
  const [fault,setFault]=useState<Fault>('wrong-grid');
  const [show,setShow]=useState(false);
  const options: Record<Fault,[string,string,string,string]> = {
    'wrong-grid':['Beat Sync looks aligned, but the kicks clash','Beat Sync parece alineado, pero los bombos chocan','Check whether the analysed beatgrid follows the actual kicks. Fix the grid or use a manual nudge; do not assume the display is the truth.','Comprueba si la rejilla sigue los bombos reales. Corrige el beatgrid o ajusta manualmente; la pantalla no siempre tiene razón.'],
    'wrong-downbeat':['Kicks align, but the transition sounds musically wrong','Los bombos cuadran, pero la transición suena musicalmente mal','Sync does not necessarily choose the right bar or phrase. Start B on the intended downbeat and count 8/16/32-bar phrases.','Sync no elige necesariamente el compás ni la frase correctos. Lanza B en el primer tiempo previsto y cuenta frases de 8/16/32 compases.'],
    'tempo-change':['A live or variable-tempo section moves out of time','Una sección en directo o de tempo variable se descuadra','The track may not follow a constant grid. Check dynamic analysis support, use shorter transitions or correct the timing manually.','Puede que la pista no siga una rejilla constante. Comprueba si admite análisis dinámico, acorta la transición o corrige manualmente.'],
    'sync-off':['B changes speed after turning Sync off','B cambia de velocidad al desactivar Sync','Verify the tempo-fader pickup/soft-takeover behaviour and the displayed BPM. Do not move the physical fader sharply while B is audible. Re-establish the desired speed with a small, monitored adjustment.','Comprueba el comportamiento de recogida del fader (pickup/soft takeover) y los BPM mostrados. No muevas bruscamente el fader físico con B sonando. Recupera la velocidad buscada con un ajuste pequeño y controlado.']
  };
  const item=options[fault];
  return <figure className={s.frame}>
    <figcaption className={s.heading}>{tr(lang,'When Sync does not sound right','Cuando Sync no suena bien')}</figcaption>
    <div className={s.controls}>{cases.map(c=><button key={c} type="button" aria-pressed={fault===c} onClick={()=>{setFault(c);setShow(false)}}>{c==='wrong-grid'?tr(lang,'Grid','Rejilla'):c==='wrong-downbeat'?tr(lang,'Phrase','Frase'):c==='tempo-change'?tr(lang,'Variable tempo','Tempo variable'):tr(lang,'Turn off Sync','Quitar Sync')}</button>)}</div>
    <p className={s.scenario}>{lang==='es'?item[1]:item[0]}</p>
    <button type="button" className={s.action} aria-expanded={show} onClick={()=>setShow(!show)}>{show?tr(lang,'Hide diagnosis','Ocultar diagnóstico'):tr(lang,'Reveal diagnosis','Mostrar diagnóstico')}</button>
    {show && <p className={s.feedback}>{lang==='es'?item[3]:item[2]}</p>}
  </figure>;
}

function SyncPractice({lang}:{lang:Lang}) {
  const steps=lang==='es'? [
    'Carga dos temas estables con bombos claros, por ejemplo 124 y 128 BPM. Mantén el canal B cerrado y escúchalo por CUE.',
    'Con Sync desactivado, lanza B a propósito ligeramente tarde y escucha el desfase y la posible deriva.',
    'Activa BPM Sync si tu sistema lo ofrece. Comprueba que el tempo coincide, pero observa si los bombos siguen desalineados.',
    'Corrige la posición con un toque de jog. Mantén la escucha 16–32 golpes y distingue velocidad de fase.',
    'Prueba Beat Sync con el beatgrid revisado. Compara la alineación de los golpes y la colocación de la frase musical.',
    'Desactiva Sync sin subir el volumen de B. Comprueba el tempo real, la posición del fader y su posible modo pickup antes de corregir.',
    'Repite la transición sin Sync. Decide conscientemente cuándo la ayuda automática aporta valor y cuándo debes intervenir.'
  ]:[
    'Load two steady tracks with clear kicks, e.g. 124 and 128 BPM. Keep B channel closed and monitor it in CUE.',
    'With Sync off, intentionally launch B slightly late and listen for the offset and possible drift.',
    'Enable BPM Sync if available. Confirm the tempos now match while the kicks may still be misaligned.',
    'Correct B beat position with a brief jog nudge. Listen for 16–32 beats and distinguish speed from phase.',
    'Try Beat Sync with a checked beatgrid. Compare kick alignment with the placement of the musical phrase.',
    'Turn Sync off without raising B level. Check actual BPM, physical fader position and possible pickup behaviour before correcting.',
    'Repeat the transition without Sync. Decide when automation helps and when you need manual control.'
  ];
  const [done,setDone]=useState<boolean[]>(Array(steps.length).fill(false));
  return <figure className={s.frame}><figcaption className={s.heading}>{tr(lang,'Two-deck Sync comparison drill','Práctica comparativa de Sync con dos decks')}</figcaption>
    <p className={s.small}>{tr(lang,'Private headphone practice. Every controller and DJ app implements Sync differently; follow your hardware manual and keep levels safe.', 'Ejercicio privado con auriculares. Cada controladora y aplicación implementa Sync de forma distinta; consulta el manual y mantén niveles seguros.')}</p>
    <p className={s.progress}>{done.filter(Boolean).length}/{steps.length} {tr(lang,'completed','completados')}</p>
    <ol className={s.steps}>{steps.map((step,i)=><li key={i}><label><input type="checkbox" checked={done[i]} onChange={e=>setDone(old=>old.map((v,j)=>i===j?e.target.checked:v))}/><span><strong>{String(i+1).padStart(2,'0')}</strong> {step}</span></label></li>)}</ol>
    <button className={s.action} type="button" onClick={()=>setDone(Array(steps.length).fill(false))}>{tr(lang,'Reset drill','Reiniciar práctica')}</button>
  </figure>;
}
export const SyncComparisonEn = () => <SyncComparison lang="en"/>;
export const SyncComparisonEs = () => <SyncComparison lang="es"/>;
export const SyncTroubleshooterEn = () => <Troubleshooter lang="en"/>;
export const SyncTroubleshooterEs = () => <Troubleshooter lang="es"/>;
export const SyncPracticeEn = () => <SyncPractice lang="en"/>;
export const SyncPracticeEs = () => <SyncPractice lang="es"/>;
