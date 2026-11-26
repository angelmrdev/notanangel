'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import s from './module07-final-lab-visuals.module.css';

type Locale = 'en' | 'es';
type Technique = 'eq' | 'bass' | 'cut';
type Scores = Record<Technique, number[]>;

const texts = {
  en: {
    caveat: 'Educational planning tool only. It does not read, analyse, measure or play actual audio. Check phrasing, loudness and cues with your own ears and hardware.',
    planTitle: 'Plan three different transitions',
    technique: 'Technique', eq: 'Long EQ blend', bass: 'Bass handoff', cut: 'Clean cut',
    bars: 'Practice window', bars8: '8 bars', bars16: '16 bars',
    swap: 'Bass handoff at bar', a: 'Deck A carries the outgoing section', b: 'Deck B takes over', both: 'Two decks overlap',
    bar: 'Bar', takeover: 'Handover', aLow: 'LOW A', bLow: 'LOW B',
    eqStory: 'Introduce B progressively with its low end controlled. Make room with EQ and faders. Complete the handover at a real phrase boundary, not simply because the diagram ends.',
    bassStory: 'Keep A as the main low-frequency foundation first. At the chosen handoff, reduce A LOW while restoring B LOW without a long period where both bass-heavy tracks are wide open.',
    cutStory: 'B should be pre-cued and level-checked in headphones. Stop A contributing and introduce B at the intended musical boundary: avoid overlapping two strong vocals just to create a blend.',
    note: 'A bar grid can show timing, but it cannot tell whether your tracks have compatible arrangements. Bar numbers here are an exercise, not automatically valid cue points.',
    scoreTitle: 'Score your own three recordings', chooseTake: 'Recording to review',
    criteria: ['Beat / entry timing', 'Phrase and musical structure', 'Bass and tonal balance', 'Controlled levels', 'Musical intention / energy'],
    rating: 'Rating', unrated: 'Not rated', retry: 'Redo', pass: 'Acceptable', good: 'Good', excellent: 'Very good',
    scored: 'Criteria scored', points: 'Points', total: 'out of 20',
    feedbackEmpty: 'Listen to the recording first. Rate each criterion after comparing it with the same passage in the other takes.',
    feedbackPartial: 'Continue reviewing the remaining criteria before drawing a conclusion.',
    feedbackLow: 'A rehearsal still needs attention. Identify the lowest-rated criterion and repeat the take with one deliberate change.',
    feedbackMid: 'A usable starting point. Listen again for the weakest aspect and compare all three methods.',
    feedbackHigh: 'Consistent practice take. Compare it against the other techniques; the highest score does not automatically mean the best artistic choice.',
    resetTake: 'Clear ratings for this take',
    checklistTitle: 'Final recording workflow', completed: 'Steps completed', reset: 'Reset checklist',
    tasks: [
      'Choose two or three authorised tracks with clear sections; confirm that all three techniques suit the selected pair or prepare a second pair.',
      'Identify the real phrase boundaries, suitable instrumental sections and the intended entry of B by listening.',
      'Check headphone CUE, beatmatching and the chosen launch points; keep playback at a safe listening level.',
      'Match input levels using channel meters and leave headroom on the master; avoid clipping.',
      'Record take A: a controlled, phrase-aligned EQ blend with a clean outgoing channel.',
      'Record take B: a bass handoff where only one strong low-frequency foundation dominates at a time.',
      'Record take C: a precise, deliberate clean cut at a musical boundary without covering it with effects.',
      'Play the recordings back at similar perceived loudness; do not judge the louder one as automatically better.',
      'Score timing, phrases, tonal balance, levels and musical intention; identify one improvement per take.',
      'Repeat the weakest take once, compare before/after and record which technique fits each pairing best.',
    ],
    finish: 'Completion means you have rehearsed, listened and made a musical choice. It is not a certification or an audio-quality measurement.',
  },
  es: {
    caveat: 'Herramienta didáctica de planificación. No lee, analiza, mide ni reproduce audio real. Comprueba frases, niveles y puntos CUE con tus oídos y equipo.',
    planTitle: 'Planifica tres transiciones diferentes',
    technique: 'Técnica', eq: 'Mezcla larga con EQ', bass: 'Intercambio de graves', cut: 'Corte limpio',
    bars: 'Ventana de práctica', bars8: '8 compases', bars16: '16 compases',
    swap: 'Relevo de graves en el compás', a: 'Deck A mantiene la sección saliente', b: 'Deck B toma el relevo', both: 'Se solapan ambos decks',
    bar: 'Compás', takeover: 'Relevo', aLow: 'LOW A', bLow: 'LOW B',
    eqStory: 'Introduce B progresivamente con los graves controlados. Haz espacio mediante EQ y faders. Termina el relevo en una frontera musical real, no porque acabe el dibujo.',
    bassStory: 'Al principio, A mantiene la base grave principal. En el momento elegido, reduce LOW de A mientras devuelves LOW de B, evitando dejar ambos graves potentes completamente abiertos durante mucho tiempo.',
    cutStory: 'B debe estar preparado y nivelado en auriculares. Retira A y lanza B en el cambio musical previsto: no superpongas dos voces principales solo para forzar una mezcla.',
    note: 'La cuadrícula sirve para contar, pero no determina si los arreglos son compatibles. Los compases mostrados son un ejercicio, no puntos CUE válidos automáticamente.',
    scoreTitle: 'Evalúa tus tres grabaciones', chooseTake: 'Grabación que vas a revisar',
    criteria: ['Cuadre y precisión de entrada', 'Fraseo y estructura musical', 'Graves y equilibrio tonal', 'Control de niveles', 'Intención musical y energía'],
    rating: 'Valoración', unrated: 'Sin evaluar', retry: 'Repetir', pass: 'Aceptable', good: 'Bien', excellent: 'Muy bien',
    scored: 'Criterios evaluados', points: 'Puntos', total: 'de 20',
    feedbackEmpty: 'Escucha primero la grabación. Puntúa cada criterio después de compararlo con el mismo pasaje de las otras tomas.',
    feedbackPartial: 'Completa los criterios restantes antes de sacar conclusiones.',
    feedbackLow: 'Esta toma necesita mejorar. Localiza el criterio más bajo y repítela cambiando una sola cosa deliberadamente.',
    feedbackMid: 'Punto de partida válido. Vuelve a escuchar su aspecto más débil y compara los tres métodos.',
    feedbackHigh: 'Ensayo consistente. Compáralo con las otras técnicas: la mayor nota no siempre implica la mejor elección artística.',
    resetTake: 'Borrar valoración de esta toma',
    checklistTitle: 'Práctica final de grabación', completed: 'Pasos completados', reset: 'Reiniciar lista',
    tasks: [
      'Elige dos o tres temas que puedas utilizar legítimamente y con secciones claras; comprueba que las tres técnicas encajen o prepara una segunda pareja.',
      'Identifica de oído los cambios reales de frase, los pasajes instrumentales y el punto de entrada de B.',
      'Comprueba CUE de auriculares, beatmatching y puntos de lanzamiento; usa un volumen de escucha seguro.',
      'Iguala niveles de entrada con los medidores y deja margen en el máster; evita el clipping.',
      'Graba la toma A: mezcla progresiva con EQ, frases alineadas y salida limpia de A.',
      'Graba la toma B: intercambio de graves manteniendo una sola base grave dominante en cada momento.',
      'Graba la toma C: corte preciso e intencional en un cambio musical, sin taparlo con efectos.',
      'Escucha las grabaciones a sonoridad percibida similar; no confundas más volumen con mejor mezcla.',
      'Evalúa timing, frases, balance tonal, niveles e intención; apunta una mejora por toma.',
      'Repite una vez la peor toma, compara antes/después y decide qué técnica sirve mejor a cada pareja.',
    ],
    finish: 'Completar la lista significa que has practicado, escuchado y tomado una decisión musical. No equivale a una certificación ni a un análisis de calidad de audio.',
  },
} as const;

function Panel({ locale, title, children }: { locale: Locale; title: string; children: ReactNode }) {
  return <section className={s.panel} aria-label={title}>
    <h3 className={s.heading}>{title}</h3>
    {children}
    <p className={s.footnote}>{texts[locale].caveat}</p>
  </section>;
}

function TransitionLabPlanner({ locale }: { locale: Locale }) {
  const t = texts[locale];
  const id = useId();
  const [technique, setTechnique] = useState<Technique>('eq');
  const [length, setLength] = useState<8 | 16>(16);
  const [swapBar, setSwapBar] = useState(9);
  const handoff = Math.max(2, Math.min(length, swapBar));
  const blocks = Array.from({ length: length + 1 }, (_, i) => i + 1);
  const story = technique === 'eq' ? t.eqStory : technique === 'bass' ? t.bassStory : t.cutStory;
  return <Panel locale={locale} title={t.planTitle}>
    <div className={s.controls}>
      <label htmlFor={`${id}-tech`}>{t.technique}
        <select id={`${id}-tech`} value={technique} onChange={e => setTechnique(e.target.value as Technique)}>
          <option value="eq">{t.eq}</option><option value="bass">{t.bass}</option><option value="cut">{t.cut}</option>
        </select>
      </label>
      <label htmlFor={`${id}-bars`}>{t.bars}
        <select id={`${id}-bars`} value={length} onChange={e => { const next = Number(e.target.value) as 8 | 16; setLength(next); setSwapBar(next / 2 + 1); }}>
          <option value={8}>{t.bars8}</option><option value={16}>{t.bars16}</option>
        </select>
      </label>
      {technique === 'bass' && <label htmlFor={`${id}-swap`}>{t.swap}
        <select id={`${id}-swap`} value={handoff} onChange={e => setSwapBar(Number(e.target.value))}>
          {Array.from({ length: length - 1 }, (_, i) => i + 2).map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </label>}
    </div>
    <div className={s.legend} aria-label={locale === 'es' ? 'Leyenda del diagrama' : 'Diagram legend'}>
      <span><i className={s.a} />{t.a}</span><span><i className={s.both} />{t.both}</span><span><i className={s.b} />{t.b}</span>
    </div>
    <div className={s.timeline} role="img" aria-label={`${locale === 'es' ? 'Ventana de' : 'Window of'} ${length} ${locale === 'es' ? 'compases y relevo en el siguiente' : 'bars with a handover on the following bar'}`}>
      {blocks.map(bar => {
        const last = bar === length + 1;
        const stage = last ? 'b' : technique === 'cut' ? 'a' : 'both';
        return <div key={bar} className={s.block} data-stage={stage} data-boundary={last}>
          <span className={s.barLabel}>{last ? t.takeover : `${t.bar} ${bar}`}</span>
          <span className={s.barFill} />
          {technique === 'bass' && !last && <small>{bar < handoff ? t.aLow : t.bLow}</small>}
        </div>;
      })}
    </div>
    <div className={s.explanation} role="status"><strong>{t[technique]}</strong><p>{story}</p><small>{t.note}</small></div>
  </Panel>;
}

const emptyScores: Scores = { eq: [0, 0, 0, 0, 0], bass: [0, 0, 0, 0, 0], cut: [0, 0, 0, 0, 0] };
function TransitionLabScorecard({ locale }: { locale: Locale }) {
  const t = texts[locale];
  const id = useId();
  const [technique, setTechnique] = useState<Technique>('eq');
  const [scores, setScores] = useState<Scores>(emptyScores);
  const values = scores[technique];
  const completed = values.filter(n => n > 0).length;
  const total = values.reduce((sum, value) => sum + value, 0);
  const feedback = completed === 0 ? t.feedbackEmpty : completed < 5 ? t.feedbackPartial : total <= 10 ? t.feedbackLow : total <= 16 ? t.feedbackMid : t.feedbackHigh;
  const options = [t.unrated, t.retry, t.pass, t.good, t.excellent];
  return <Panel locale={locale} title={t.scoreTitle}>
    <label className={s.singleControl} htmlFor={`${id}-take`}>{t.chooseTake}
      <select id={`${id}-take`} value={technique} onChange={e => setTechnique(e.target.value as Technique)}>
        <option value="eq">A — {t.eq}</option><option value="bass">B — {t.bass}</option><option value="cut">C — {t.cut}</option>
      </select>
    </label>
    <div className={s.ratings}>
      {t.criteria.map((criterion, index) => <label key={criterion} htmlFor={`${id}-score-${index}`}>
        <span>{criterion}</span>
        <select id={`${id}-score-${index}`} value={values[index]} onChange={e => {
          const next = Number(e.target.value);
          setScores(previous => ({ ...previous, [technique]: previous[technique].map((v, i) => i === index ? next : v) }));
        }}>
          {options.map((label, n) => <option key={n} value={n}>{n === 0 ? label : `${n} — ${label}`}</option>)}
        </select>
      </label>)}
    </div>
    <div className={s.explanation} role="status">
      <strong>{t.scored}: {completed}/5</strong>
      <strong>{t.points}: {total} {t.total}</strong>
      <p>{feedback}</p>
    </div>
    <button className={s.reset} type="button" onClick={() => setScores(previous => ({ ...previous, [technique]: [0, 0, 0, 0, 0] }))}>{t.resetTake}</button>
  </Panel>;
}

function TransitionLabChecklist({ locale }: { locale: Locale }) {
  const t = texts[locale];
  const [checked, setChecked] = useState<boolean[]>(() => t.tasks.map(() => false));
  const count = checked.filter(Boolean).length;
  return <Panel locale={locale} title={t.checklistTitle}>
    <ol className={s.checklist}>
      {t.tasks.map((task, index) => <li key={task}>
        <label><input type="checkbox" checked={checked[index]} onChange={e => setChecked(old => old.map((v, i) => index === i ? e.target.checked : v))}/><span>{task}</span></label>
      </li>)}
    </ol>
    <div className={s.footer}>
      <strong aria-live="polite">{t.completed}: {count}/{t.tasks.length}</strong>
      <button className={s.reset} type="button" onClick={() => setChecked(t.tasks.map(() => false))}>{t.reset}</button>
    </div>
    {count === t.tasks.length && <p className={s.explanation} role="status">{t.finish}</p>}
  </Panel>;
}

export function TransitionLabPlannerEn() { return <TransitionLabPlanner locale="en" />; }
export function TransitionLabPlannerEs() { return <TransitionLabPlanner locale="es" />; }
export function TransitionLabScorecardEn() { return <TransitionLabScorecard locale="en" />; }
export function TransitionLabScorecardEs() { return <TransitionLabScorecard locale="es" />; }
export function TransitionLabChecklistEn() { return <TransitionLabChecklist locale="en" />; }
export function TransitionLabChecklistEs() { return <TransitionLabChecklist locale="es" />; }
