'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import s from './module07-eq-phrases-visuals.module.css';

type Lang = 'en' | 'es';
type Deck = 'a' | 'b';
type Stage = 1 | 5 | 9 | 13 | 16;

const copy = {
 en: {
  note: 'Educational visual only: percentages describe fader positions, not perceived loudness. EQ values are illustrative settings, not measured audio or guaranteed frequency isolation.',
  phrase: 'Map a phrase-led EQ transition', choose: 'Overlap length', handoff: 'Bass handover', boundary: 'Phrase boundary', switch: 'Low-frequency handover', outgoing: 'A: outgoing', incoming: 'B: incoming', bass: 'Bass lead',
  first: 'Use the first eight bars to bring B in quietly with reduced LOW. Exchange the dominant bass on a musically suitable downbeat, then complete A’s exit.',
  stageTitle: 'Two-deck phrase and EQ laboratory', stage: 'Practice position', mixer: 'Illustrative channel settings', channel: 'Channel fader', low: 'LOW EQ',
  alert: 'Listening diagnosis', clash: 'Both active channels have strong LOW settings. Listen for competing kicks and basslines; consider reducing one LOW band.',
  empty: 'Both active tracks have strongly reduced LOW. The mix may lose weight; restore the incoming track’s low end when appropriate.',
  late: 'You are near the end of the overlap but the incoming channel remains quiet. Give B time to take over or choose a shorter, intentional transition.',
  early: 'B is audible before the phrase change. That can work if its intro fits, but listen for a competing vocal, hook or fill.',
  balanced: 'The controls do not show an obvious LOW overlap. Check phrase alignment, channel meters and the real sound before judging the result.',
  reset: 'Reset example', practice: 'Phrase-led mixing checklist', progress: 'Completed',
  task: ['Select two tracks with similar, steady tempos and clear 8-bar phrases.', 'Check their loud sections and set gain/headroom before mixing.', 'Mark the outgoing phrase change and the matching incoming cue point.', 'Prepare B in headphones with LOW reduced and its channel fader down.', 'Launch B on the intended downbeat; verify the beats stay aligned.', 'Open B gradually while A still carries the main groove.', 'On a suitable new phrase, reduce A’s LOW and restore B’s LOW.', 'Complete the channel handover without an accidental level increase.', 'Record the attempt and compare phrase timing, tonal clarity and energy.'],
 },
 es: {
  note: 'Recurso visual educativo: los porcentajes indican posiciones de fader, no sonoridad percibida. Los valores de EQ son ajustes ilustrativos, no audio medido ni aislamiento garantizado de frecuencias.',
  phrase: 'Planifica una transición con EQ y frases', choose: 'Duración del solapamiento', handoff: 'Relevo de graves', boundary: 'Inicio de frase', switch: 'Relevo de frecuencias graves', outgoing: 'A: saliente', incoming: 'B: entrante', bass: 'Grave principal',
  first: 'Utiliza los ocho primeros compases para introducir B de forma controlada y con LOW reducido. Intercambia el grave dominante en un primer tiempo musicalmente adecuado y termina retirando A.',
  stageTitle: 'Laboratorio de dos decks: frases y EQ', stage: 'Momento de práctica', mixer: 'Ajustes ilustrativos de los canales', channel: 'Fader de canal', low: 'EQ LOW',
  alert: 'Diagnóstico de escucha', clash: 'Ambos canales activos tienen LOW elevado. Escucha si compiten bombos y bajos; considera recortar los graves de uno.',
  empty: 'Ambos canales activos tienen los graves muy recortados. La mezcla puede perder peso; recupera los graves de B cuando corresponda.',
  late: 'Estás cerca del final del solapamiento y B sigue muy bajo. Dale tiempo para tomar el relevo o plantea una transición corta intencionada.',
  early: 'B ya suena antes del cambio de frase. Puede funcionar si su intro encaja, pero escucha si se solapan voces, melodías o fills.',
  balanced: 'Los controles no indican un solapamiento evidente de graves. Comprueba las frases, los medidores y el audio real antes de valorar la mezcla.',
  reset: 'Restablecer ejemplo', practice: 'Checklist: mezcla por frases', progress: 'Completados',
  task: ['Escoge dos temas de tempo estable y parecido con frases claras de ocho compases.', 'Revisa sus partes fuertes y ajusta ganancia y margen antes de mezclar.', 'Marca el cambio de frase de A y el punto CUE equivalente de B.', 'Prepara B en auriculares con LOW reducido y su fader de canal cerrado.', 'Lanza B en el primer tiempo previsto y verifica que los golpes siguen alineados.', 'Abre B progresivamente mientras A mantiene el groove principal.', 'En una frase adecuada, reduce LOW de A y recupera LOW de B.', 'Completa el relevo de canales sin provocar un salto accidental de nivel.', 'Graba el ensayo y compara timing, claridad de frecuencias y energía.'],
 }
};

function Panel({title, lang, children}: {title:string;lang:Lang;children:ReactNode}) {
 return <section className={s.panel} aria-label={title}>
  <h3 className={s.title}>{title}</h3>{children}
  <p className={s.note}>{copy[lang].note}</p>
 </section>;
}

function PhraseEQMap({lang}: {lang:Lang}) {
 const [length, setLength] = useState<16 | 32>(16);
 const [handover, setHandover] = useState(9);
 const t = copy[lang];
 const bars = Array.from({length},(_,i)=>i+1);
 const options = length === 16 ? [9] : [9,17,25];
 return <Panel title={t.phrase} lang={lang}>
  <p>{t.first}</p>
  <div className={s.controls}>
   <label>{t.choose}<select value={length} onChange={e=>{
    const next = Number(e.target.value) as 16 | 32; setLength(next); setHandover(next===16?9:17);
   }}><option value={16}>16 {lang==='es'?'compases':'bars'}</option><option value={32}>32 {lang==='es'?'compases':'bars'}</option></select></label>
   <label>{t.handoff}<select value={handover} onChange={e=>setHandover(Number(e.target.value))}>
    {options.map(n=><option value={n} key={n}>{lang==='es'?'Compás':'Bar'} {n}</option>)}
   </select></label>
  </div>
  <div className={s.legend}>
   <span><i className={s.legendA}/>{t.outgoing}</span>
   <span><i className={s.legendB}/>{t.incoming}</span>
  </div>
  <div className={s.bars} role="list" aria-label={lang==='es'?'Mapa de compases y relevo de graves':'Bars and low-frequency handover map'}>
   {bars.map(n=><div key={n} role="listitem" className={s.bar} data-boundary={(n-1)%8===0} data-handoff={n===handover}>
    <span className={s.barIndex}>{n}</span>
    <div className={s.barTracks} aria-hidden="true"><span className={s.trackA}/><span className={s.trackB}/></div>
    <span className={s.barLead}>{n<handover?'A':'B'}</span>
   </div>)}
  </div>
  <div className={s.status} role="status"><strong>{t.switch}: {lang==='es'?'compás':'bar'} {handover}</strong>
   <p>{lang==='es'?'Las marcas de cada ocho compases sirven para practicar; escucha siempre el arreglo real de las dos canciones.':'Eight-bar boundaries are a practice aid; always listen to the actual arrangement of both tracks.'}</p></div>
 </Panel>;
}

const preset: Record<Stage, {a:number;b:number;lowA:number;lowB:number}> = {
 1:{a:100,b:0,lowA:0,lowB:-12},
 5:{a:100,b:45,lowA:0,lowB:-12},
 9:{a:85,b:75,lowA:-12,lowB:0},
 13:{a:35,b:100,lowA:-12,lowB:0},
 16:{a:0,b:100,lowA:-12,lowB:0},
};

function MixerSlider({label,value,min,max,suffix,onChange}: {
 label:string; value:number; min:number;max:number;suffix:string;onChange:(next:number)=>void;
}) {
 const id=useId();
 return <div className={s.sliderRow}><label htmlFor={id}>{label}</label>
  <input id={id} type="range" min={min} max={max} step="1" value={value} onChange={e=>onChange(Number(e.target.value))}/>
  <output htmlFor={id}>{value>0&&suffix===' dB'?'+':''}{value}{suffix}</output>
 </div>;
}

function ChannelControls({deck,lang,level,low,onLevel,onLow}: {
 deck:Deck;lang:Lang;level:number;low:number;onLevel:(next:number)=>void;onLow:(next:number)=>void;
}) {
 const t=copy[lang];
 return <fieldset className={s.deck}><legend>{deck==='a'?t.outgoing:t.incoming}</legend>
  <MixerSlider label={t.channel} value={level} min={0} max={100} suffix="%" onChange={onLevel}/>
  <MixerSlider label={t.low} value={low} min={-12} max={0} suffix=" dB" onChange={onLow}/>
 </fieldset>;
}

function PhraseBlendLab({lang}: {lang:Lang}) {
 const t=copy[lang];
 const [stage,setStage] = useState<Stage>(1);
 const [levelA,setLevelA] = useState(100);
 const [levelB,setLevelB] = useState(0);
 const [lowA,setLowA] = useState(0);
 const [lowB,setLowB] = useState(-12);
 const apply = (next:Stage) => {
  const p=preset[next];setStage(next);setLevelA(p.a);setLevelB(p.b);setLowA(p.lowA);setLowB(p.lowB);
 };
 const bothAudible=levelA>=25 && levelB>=25;
 const clash=bothAudible && lowA>=-3 && lowB>=-3;
 const empty=bothAudible && lowA<=-9 && lowB<=-9;
 const late=stage>=13 && levelB<40;
 const early=stage<9 && levelB>=75;
 const message = clash?t.clash:empty?t.empty:late?t.late:early?t.early:t.balanced;
 return <Panel title={t.stageTitle} lang={lang}>
  <p>{lang==='es'?'Selecciona un momento de una mezcla de 16 compases y modifica faders y graves. El diagnóstico es orientativo: una EQ no corrige una entrada fuera de frase.':'Select a point in a 16-bar blend, then adjust channel faders and low EQ. Diagnosis is conceptual: EQ cannot fix a poorly timed phrase entry.'}</p>
  <div className={s.stageLabel}>{t.stage}</div>
  <div className={s.stages} role="group" aria-label={t.stage}>
   {([1,5,9,13,16] as Stage[]).map(n=><button type="button" key={n} aria-pressed={stage===n} onClick={()=>apply(n)}>{lang==='es'?'Compás':'Bar'} {n}</button>)}
  </div>
  <p className={s.mixerTitle}>{t.mixer}</p>
  <div className={s.decks}>
   <ChannelControls deck="a" lang={lang} level={levelA} low={lowA} onLevel={setLevelA} onLow={setLowA}/>
   <ChannelControls deck="b" lang={lang} level={levelB} low={lowB} onLevel={setLevelB} onLow={setLowB}/>
  </div>
  <div className={s.status} role="status" aria-live="polite" data-warning={clash||empty||late||early}>
   <strong>{t.alert}</strong><p>{message}</p>
  </div>
  <button type="button" className={s.reset} onClick={()=>apply(1)}>{t.reset}</button>
 </Panel>;
}

function EQPhrasePractice({lang}: {lang:Lang}) {
 const t=copy[lang];
 const [done,setDone]=useState<boolean[]>(()=>t.task.map(()=>false));
 return <Panel title={t.practice} lang={lang}>
  <p>{lang==='es'?'Realiza los pasos con el equipo real y marca únicamente lo que hayas practicado.':'Complete each step on real equipment and check off only what you actually practised.'}</p>
  <ol className={s.checklist}>{t.task.map((task,i)=><li key={i}><label>
   <input type="checkbox" checked={done[i]} onChange={e=>setDone(current=>current.map((v,j)=>j===i?e.target.checked:v))}/>
   <span>{task}</span>
  </label></li>)}</ol>
  <div className={s.checkFooter}><strong aria-live="polite">{t.progress}: {done.filter(Boolean).length}/{t.task.length}</strong>
   <button type="button" onClick={()=>setDone(t.task.map(()=>false))}>{t.reset}</button></div>
 </Panel>;
}

export function PhraseEQMapEn(){return <PhraseEQMap lang="en"/>;}
export function PhraseEQMapEs(){return <PhraseEQMap lang="es"/>;}
export function PhraseBlendLabEn(){return <PhraseBlendLab lang="en"/>;}
export function PhraseBlendLabEs(){return <PhraseBlendLab lang="es"/>;}
export function EQPhrasePracticeEn(){return <EQPhrasePractice lang="en"/>;}
export function EQPhrasePracticeEs(){return <EQPhrasePractice lang="es"/>;}
