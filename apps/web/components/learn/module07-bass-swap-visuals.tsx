'use client';

import { useState } from 'react';
import s from './module07-bass-swap-visuals.module.css';

type Lang = 'en' | 'es';
type Shape = 'cut' | 'smooth' | 'overlap';
const words = {
  en: {
    note: 'Conceptual visual only: the controls do not process or play audio. EQ cutoff, slope, phase, musical arrangement and actual perceived bass depend on your equipment and tracks.',
    title: 'Plan a low-frequency handover', bars: 'Overlap length', change: 'Handover bar', shape: 'Handover style',
    cut: 'Alternating bass', smooth: 'Gradual exchange', overlap: 'Both basses open', a: 'Deck A · outgoing', b: 'Deck B · incoming',
    section: 'Bar', marker: 'Handover', statusGood: 'One dominant low end around the handover — now confirm by ear.',
    statusWarn: 'Both bass bands stay open together. The low end can become crowded; listen carefully and manage levels.',
    statusCut: 'Abrupt change: useful for a clearly marked downbeat, but it can sound empty or harsh if timed badly.',
    phase: 'Entry / handover / exit', caution: 'A “full low EQ” position does not mean a fixed amount of bass. This graphic shows intent, not measured energy.',
    modes: 'Bass-swap diagnostics', diagnose: ['Two full basslines collide', 'Bass disappears on the drop', 'Bass swap sounds late', 'Blend still feels messy'],
    observation: 'What you hear', answer: 'First action',
    questions: [
      ['Boomy, undefined kick/bass during overlap', 'Reduce the incoming LOW before B enters; plan a distinct handover and check the MASTER meter.'],
      ['The kick loses weight exactly where energy should land', 'Check if both LOW controls are reduced at the handover; move the exchange to a musical downbeat.'],
      ['A clear beat is aligned, but the bass change arrives a bar late', 'Count bars, identify the phrase boundary and rehearse the swap on that downbeat.'],
      ['The kick changes cleanly, but vocals, mids or levels fight', 'Review phrasing, gain staging and midrange overlap. A bass swap cannot solve every clash.'],
    ],
    worksheet: 'Bass-swap rehearsal: two decks', completed: 'Steps complete', reset: 'Reset checklist',
    steps: [
      'Select two tracks with compatible tempo and an obvious phrase boundary; check the arrangement of both low ends.',
      'Level-match each deck at a representative loud passage; keep monitoring comfortable.',
      'Cue B in headphones and find the first beat of its 8- or 16-bar entry.',
      'Start with A’s LOW at its normal position and B’s LOW reduced. Keep B’s channel level appropriate.',
      'Bring B in on a phrase boundary and listen to the mids/highs while A carries the bass.',
      'At the planned downbeat, hand bass dominance to B; use the mixer’s real EQ response, not a presumed dial position.',
      'Lower or remove A as its phrase ends; avoid overboosting LOW or allowing the master to clip.',
      'Record at a safe level, listen back, and compare an abrupt and a progressive handover.',
    ],
  },
  es: {
    note: 'Visualización conceptual: los controles no procesan ni reproducen audio. El corte, pendiente, fase, arreglo musical y grave percibido reales dependen del equipo y las canciones.',
    title: 'Planifica el relevo de graves', bars: 'Duración del solapamiento', change: 'Compás del relevo', shape: 'Tipo de intercambio',
    cut: 'Relevo directo', smooth: 'Intercambio progresivo', overlap: 'Ambos graves abiertos', a: 'Deck A · saliente', b: 'Deck B · entrante',
    section: 'Compás', marker: 'Relevo', statusGood: 'Un grave dominante durante el relevo. Ahora compruébalo escuchando.',
    statusWarn: 'Los dos graves quedan abiertos. El extremo grave puede acumularse: escucha y controla los niveles.',
    statusCut: 'Cambio brusco: puede funcionar en un primer tiempo marcado, pero sonar vacío o agresivo si se hace mal.',
    phase: 'Entrada / relevo / salida', caution: 'Poner LOW al máximo no equivale a una cantidad fija de graves. La gráfica representa la intención, no energía medida.',
    modes: 'Diagnóstico de bass swap', diagnose: ['Chocan dos líneas de bajo', 'Desaparecen graves en el drop', 'El relevo suena tarde', 'La mezcla sigue sonando confusa'],
    observation: 'Qué escuchas', answer: 'Primera acción',
    questions: [
      ['Bombo y bajo embarrados durante el solapamiento', 'Reduce LOW en el deck entrante antes de empezar, programa un relevo claro y vigila el máster.'],
      ['El bombo pierde fuerza justo al llegar el momento importante', 'Comprueba si ambos LOW están reducidos y mueve el intercambio a un primer tiempo musical.'],
      ['Los golpes cuadran, pero el cambio de graves llega un compás tarde', 'Cuenta compases, identifica el límite de frase y ensaya el relevo en ese primer tiempo.'],
      ['El bombo cambia bien, pero chocan voces, medios o niveles', 'Revisa frases, ganancia y solapamiento de medios. El bass swap no soluciona todos los choques.'],
    ],
    worksheet: 'Ensayo de bass swap con dos decks', completed: 'Pasos realizados', reset: 'Reiniciar práctica',
    steps: [
      'Elige dos canciones con tempo compatible y un límite de frase claro; escucha cómo se comportan sus graves.',
      'Iguala niveles en un pasaje fuerte representativo y ajusta el volumen de escucha a un nivel cómodo.',
      'Preescucha B y localiza el primer golpe de una entrada de 8 o 16 compases.',
      'Deja LOW de A en su posición normal y reduce LOW de B. Ajusta correctamente el fader de B.',
      'Introduce B en un límite de frase y escucha medios y agudos mientras A conserva el grave.',
      'En el primer tiempo previsto, entrega el protagonismo grave a B; guíate por cómo responde la EQ real.',
      'Retira A cuando termine su frase, sin sobrepotenciar LOW ni saturar el máster.',
      'Graba a un nivel seguro, escucha y compara un relevo directo con otro progresivo.',
    ],
  },
};
function Panel({lang,title,children}:{lang:Lang;title:string;children:React.ReactNode}) {return <figure className={s.panel}><figcaption className={s.title}>{title}</figcaption>{children}<small className={s.note}>{words[lang].note}</small></figure>;}
function BassSwapPlanner({lang}:{lang:Lang}) {
  const t=words[lang];const [bars,setBars]=useState<8|16>(8);const [at,setAt]=useState(5);const [mode,setMode]=useState<Shape>('smooth');
  const changeBars=(n:8|16)=>{setBars(n);setAt(n===8?5:9);};
  // Percentages are deliberately diagrammatic; they do NOT model real EQ filters.
  const positions=Array.from({length:bars},(_,i)=>{
    const bar=i+1;
    if(mode==='overlap')return {bar,a:100,b:100};
    if(mode==='cut')return {bar,a:bar<at?100:0,b:bar<at?0:100};
    const width=2;const progress=Math.max(0,Math.min(1,(bar-at+width)/ (2*width)));
    return {bar,a:Math.round((1-progress)*100),b:Math.round(progress*100)};
  });
  return <Panel lang={lang} title={t.title}>
    <div className={s.controls}><label>{t.bars}<select value={bars} onChange={e=>changeBars(Number(e.target.value) as 8|16)}><option value={8}>8</option><option value={16}>16</option></select></label><label>{t.change}<select value={at} onChange={e=>setAt(Number(e.target.value))}>{Array.from({length:bars},(_,i)=><option value={i+1} key={i}>{i+1}</option>)}</select></label><label>{t.shape}<select value={mode} onChange={e=>setMode(e.target.value as Shape)}><option value="cut">{t.cut}</option><option value="smooth">{t.smooth}</option><option value="overlap">{t.overlap}</option></select></label></div>
    <div className={s.legend}><span><i className={s.swatchA}/>{t.a}</span><span><i className={s.swatchB}/>{t.b}</span></div>
    <div className={s.timeline} role="group" aria-label={t.phase}>{positions.map(p=><div className={s.bar} key={p.bar} data-change={p.bar===at} aria-label={`${t.section} ${p.bar}: A ${p.a}%, B ${p.b}%`}><div className={s.stack}><span className={s.a} style={{height:`${p.a}%`}}/><span className={s.b} style={{height:`${p.b}%`}}/></div><small>{p.bar}</small></div>)}</div>
    <div role="status" className={s.result} data-warning={mode==='overlap'}><strong>{mode==='overlap'?t.statusWarn:mode==='cut'?t.statusCut:t.statusGood}</strong><p>{t.caution}</p></div>
  </Panel>;
}
function BassSwapDiagnosis({lang}:{lang:Lang}) {
  const t=words[lang];const [which,setWhich]=useState(0);
  return <Panel lang={lang} title={t.modes}><div className={s.pills} role="group" aria-label={t.modes}>{t.diagnose.map((item,i)=><button type="button" key={item} aria-pressed={which===i} onClick={()=>setWhich(i)}>{item}</button>)}</div><div className={s.result} role="status"><b>{t.observation}</b><p>{t.questions[which][0]}</p><b>{t.answer}</b><p>{t.questions[which][1]}</p></div></Panel>;
}
function BassSwapPractice({lang}:{lang:Lang}) {
  const t=words[lang];const [checked,setChecked]=useState<boolean[]>(Array(t.steps.length).fill(false));
  return <Panel lang={lang} title={t.worksheet}><ol className={s.steps}>{t.steps.map((step,i)=><li key={i}><label><input type="checkbox" checked={checked[i]} onChange={e=>setChecked(old=>old.map((v,j)=>i===j?e.target.checked:v))}/>{step}</label></li>)}</ol><div className={s.footer}><strong aria-live="polite">{t.completed}: {checked.filter(Boolean).length}/{t.steps.length}</strong><button type="button" onClick={()=>setChecked(Array(t.steps.length).fill(false))}>{t.reset}</button></div></Panel>;
}
export function BassSwapPlannerEn(){return <BassSwapPlanner lang="en"/>;}
export function BassSwapPlannerEs(){return <BassSwapPlanner lang="es"/>;}
export function BassSwapDiagnosisEn(){return <BassSwapDiagnosis lang="en"/>;}
export function BassSwapDiagnosisEs(){return <BassSwapDiagnosis lang="es"/>;}
export function BassSwapPracticeEn(){return <BassSwapPractice lang="en"/>;}
export function BassSwapPracticeEs(){return <BassSwapPractice lang="es"/>;}
