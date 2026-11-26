'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import s from './module07-fast-transitions-visuals.module.css';

type Lang = 'en' | 'es';
type Method = 'cut' | 'drop' | 'overlap';

type Situation = {
  title: string;
  detail: string;
  first: string;
  avoid: string;
};

const copy = {
  en: {
    caveat: 'Counting diagram only: these blocks do not analyse music or play audio. A real drop, phrase boundary and mix point must be verified by ear in your tracks.',
    timelineTitle: 'Plan a cut, drop or eight-beat overlap',
    method: 'Transition', cut: 'Hard cut', drop: 'Entry at B’s drop / musical arrival', overlap: 'Eight-beat overlap (two 4/4 bars)',
    span: 'Counted phrase', bars8: '8 bars', bars16: '16 bars', entryBeat: 'Switch on beat', bar: 'Bar',
    incomingReady: 'I have listened to the incoming section and prepared its actual downbeat/drop',
    outgoing: 'A: outgoing', incoming: 'B: incoming', overlapping: 'A + B: short overlap', switch: 'Switch / B takes lead',
    downbeat: 'Beat 1 of the bar: a stronger default anchor. Check the actual phrase and musical event.',
    offbeat: 'You selected a beat other than 1. It can be intentional, but it is not a downbeat cut. Check the rhythmic impact.',
    cutDescription: 'At the marked beat, end A and bring B in at the intended start point. Prepare B with CUE before touching the live faders.',
    dropDescription: 'At the marked beat, make B’s verified drop or musical arrival take over from A. A visual marker cannot tell you where a track’s real drop occurs.',
    dropNotReady: 'Do not assume the selected bar contains a drop. Listen to B, set a reliable cue and confirm the section first.',
    overlapDescription: 'The two bars before the handover are the proposed eight-beat overlap in 4/4. Manage vocals, kick/bass and levels; remove A as B takes over.',
    phraseCaveat: 'This example puts the handover halfway through a counted 8- or 16-bar window, not necessarily at a major phrase boundary in either song. Slide the whole window to a real phrase change before using it.',
    tip: 'Musical decision',
    decisionTitle: 'Diagnose a fast-transition situation', chooseProblem: 'What happens during your attempt?',
    firstTry: 'First thing to try', avoid: 'Do not use this as a shortcut',
    situations: [
      { title: 'Two lead vocals collide', detail: 'A is still singing when B starts its main hook.', first: 'Choose a clean cut at a musical boundary, or find an instrumental entry/exit. Shorten the vocal overlap.', avoid: 'Do not expect a filter or crossfader movement to make conflicting lyrics disappear.' },
      { title: 'The new track feels abrupt', detail: 'The energy or arrangement changes suddenly even though the beat is aligned.', first: 'Check whether a deliberate contrast is wanted. Try a short two-bar lead-in or a better-matched section; rehearse the entry.', avoid: 'Do not add a long blend automatically if the tracks have incompatible phrases.' },
      { title: 'Both kicks compete', detail: 'Two strong low ends play simultaneously during a quick overlap.', first: 'Trim the overlap or manage LOW EQ so only one bass foundation dominates at the handover.', avoid: 'Do not boost both lows or ignore the master and channel meters.' },
      { title: 'B starts with a breakdown', detail: 'A full groove cuts to a quiet section with no kick or bass.', first: 'Treat the energy drop as an artistic choice, or choose B’s later musical entry. Listen to the real arrangement.', avoid: 'Do not label a quiet section a drop or assume a hard cut will keep dancefloor energy.' },
      { title: 'The downbeat is missed', detail: 'B enters a beat or bar away from the planned phrase.', first: 'Stop rehearsing, correct B’s CUE / quantize behaviour and practise the launch into beat 1 again.', avoid: 'Do not rely on effects or rapid EQ changes to conceal a timing error.' },
    ] as Situation[],
    practiceTitle: 'Record and compare three transition methods',
    steps: [
      'Choose two tracks with steady, verified beatgrids and phrases; listen for the actual incoming musical arrival.',
      'Match tempo, check gain/headroom and prepare a reliable CUE point for B in headphones.',
      'Mark a musical boundary where A can end without cutting off an important vocal or hook.',
      'Record take A: a clean cut on the planned beat, with no effects.',
      'Record take B: an eight-beat (two-bar, 4/4) overlap with controlled bass and a clean exit for A.',
      'Record take C: a cut into B’s real drop or strong musical arrival, only if the arrangement has one.',
      'Listen back at comparable perceived loudness and check for vocal clashes, poor timing, missing kick and level jumps.',
      'Pick the most musical version; note why the other two were better or worse for this pair.',
    ],
    score: 'Completed', reset: 'Reset practice', verdict: 'Which version worked best?', undecided: 'Not decided yet',
    chooseCut: 'Clean cut', chooseOverlap: 'Eight-beat overlap', chooseDrop: 'Drop entry',
    verdictNote: 'The preferred method depends on the actual songs. This worksheet does not assess or record your audio.',
  },
  es: {
    caveat: 'Diagrama de conteo únicamente: los bloques no analizan música ni reproducen audio. Debes comprobar de oído el drop, el inicio de frase y el punto de mezcla reales.',
    timelineTitle: 'Planifica un corte, una entrada al drop o un solapamiento de ocho tiempos',
    method: 'Transición', cut: 'Corte seco', drop: 'Entrada al drop', overlap: 'Solapamiento de ocho tiempos (dos compases de 4/4)',
    span: 'Frase contada', bars8: '8 compases', bars16: '16 compases', entryBeat: 'Cambiar en el tiempo', bar: 'Compás',
    incomingReady: 'He escuchado la sección entrante y preparado su primer tiempo/drop real',
    outgoing: 'A: sale', incoming: 'B: entra', overlapping: 'A + B: solapamiento corto', switch: 'Cambio / B toma el relevo',
    downbeat: 'Tiempo 1 del compás: referencia más clara para empezar. Comprueba la frase y el acontecimiento musical real.',
    offbeat: 'Has elegido un tiempo distinto del 1. Puede ser intencionado, pero no es un corte en el primer tiempo. Escucha su impacto.',
    cutDescription: 'En el tiempo señalado, retira A y haz entrar B en el punto preparado. Deja B listo con CUE antes de tocar los faders del directo.',
    dropDescription: 'En el tiempo señalado, el drop o la llegada musical real de B toma el relevo de A. El dibujo no puede averiguar dónde está el drop de una canción.',
    dropNotReady: 'No des por hecho que aquí hay un drop. Escucha B, prepara un CUE fiable y comprueba la sección antes de mezclar.',
    overlapDescription: 'Los dos compases anteriores al cambio representan un solapamiento de ocho tiempos en 4/4. Controla las voces, el bajo y los niveles; retira A cuando B tome el relevo.',
    phraseCaveat: 'Este ejemplo sitúa el relevo a mitad de una ventana de 8 o 16 compases; no tiene por qué coincidir con una frontera de frase importante. Desplaza toda la ventana hasta el cambio musical real.',
    tip: 'Decisión musical',
    decisionTitle: 'Diagnostica una transición rápida', chooseProblem: '¿Qué ocurre al hacer la mezcla?',
    firstTry: 'Qué probar primero', avoid: 'Qué no conviene utilizar como atajo',
    situations: [
      { title: 'Se solapan dos voces principales', detail: 'A sigue cantando cuando B empieza con su estribillo.', first: 'Busca un corte limpio en un cambio musical o una entrada/salida instrumental. Acorta el solapamiento vocal.', avoid: 'No esperes que un filtro o un movimiento de crossfader elimine dos letras enfrentadas.' },
      { title: 'El tema nuevo entra demasiado brusco', detail: 'La energía o el arreglo cambian de golpe aunque los beats estén cuadrados.', first: 'Valora si buscas ese contraste. Prueba una entrada de dos compases o elige una sección más compatible.', avoid: 'No conviertas automáticamente la transición en una mezcla larga si las frases no encajan.' },
      { title: 'Compiten dos bombos', detail: 'Se oyen dos bases graves potentes a la vez durante el solapamiento.', first: 'Acorta el solapamiento o gestiona la EQ LOW para que solo una base grave domine en el relevo.', avoid: 'No subas los graves de ambos temas ni ignores los medidores.' },
      { title: 'B entra por un breakdown', detail: 'El groove de A da paso a una sección tranquila de B sin bombo ni bajo.', first: 'Usa la caída de energía si es intencionada o busca una entrada posterior de B. Escucha el arreglo real.', avoid: 'No llames drop a un pasaje tranquilo ni supongas que un corte seco mantendrá la energía.' },
      { title: 'Fallas el primer tiempo', detail: 'B entra un tiempo o compás antes o después de lo previsto.', first: 'Detén el ensayo, revisa el punto CUE y el comportamiento de Quantize, y practica la entrada en el tiempo 1.', avoid: 'No intentes ocultar un fallo de timing con efectos o cambios de EQ apresurados.' },
    ] as Situation[],
    practiceTitle: 'Graba y compara tres tipos de transición',
    steps: [
      'Elige dos temas de tempo estable y comprueba beatgrids y frases; escucha la llegada musical real de B.',
      'Cuadra BPM, revisa ganancia/margen dinámico y prepara un punto CUE fiable de B en auriculares.',
      'Marca un cambio de sección en el que A pueda salir sin cortar una voz o hook importantes.',
      'Graba la toma A: corte limpio en el tiempo elegido, sin efectos.',
      'Graba la toma B: solapamiento de ocho tiempos (dos compases de 4/4), controlando graves y salida de A.',
      'Graba la toma C: corte hacia el drop o llegada musical real de B, si el arreglo ofrece uno.',
      'Escucha las tres a sonoridad percibida similar: detecta choques de voz, errores de timing, pérdida de bombo y saltos de nivel.',
      'Elige la versión más musical y anota por qué las otras dos funcionaron mejor o peor.',
    ],
    score: 'Completados', reset: 'Reiniciar práctica', verdict: '¿Qué versión funcionó mejor?', undecided: 'Aún no lo he decidido',
    chooseCut: 'Corte limpio', chooseOverlap: 'Solapamiento de ocho tiempos', chooseDrop: 'Entrada al drop',
    verdictNote: 'La mejor técnica depende de las canciones reales. Esta ficha no evalúa ni graba tu audio.',
  },
};

function Panel({ title, lang, children }: { title: string; lang: Lang; children: ReactNode }) {
  const t = copy[lang];
  return <section className={s.panel} aria-label={title}>
    <h3 className={s.heading}>{title}</h3>
    {children}
    <p className={s.note}>{t.caveat}</p>
  </section>;
}

function FastTransitionMap({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const controlId = useId();
  const [method, setMethod] = useState<Method>('cut');
  const [length, setLength] = useState<8 | 16>(16);
  const [beat, setBeat] = useState(1);
  const [prepared, setPrepared] = useState(false);
  const handover = length / 2 + 1;
  const bars = Array.from({ length }, (_, index) => index + 1);
  const detail = method === 'cut' ? t.cutDescription : method === 'drop' ? t.dropDescription : t.overlapDescription;
  return <Panel title={t.timelineTitle} lang={lang}>
    <div className={s.controls}>
      <label htmlFor={`${controlId}-method`}>{t.method}
        <select id={`${controlId}-method`} value={method} onChange={event => setMethod(event.target.value as Method)}>
          <option value="cut">{t.cut}</option><option value="drop">{t.drop}</option><option value="overlap">{t.overlap}</option>
        </select>
      </label>
      <label htmlFor={`${controlId}-length`}>{t.span}
        <select id={`${controlId}-length`} value={length} onChange={event => setLength(Number(event.target.value) as 8 | 16)}>
          <option value={8}>{t.bars8}</option><option value={16}>{t.bars16}</option>
        </select>
      </label>
      <label htmlFor={`${controlId}-beat`}>{t.entryBeat}
        <select id={`${controlId}-beat`} value={beat} onChange={event => setBeat(Number(event.target.value))}>
          {[1, 2, 3, 4].map(value => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
    </div>
    {method === 'drop' && <label className={s.toggle}><input type="checkbox" checked={prepared} onChange={event => setPrepared(event.target.checked)}/>{t.incomingReady}</label>}
    <div className={s.legend} aria-hidden="true"><span><i className={s.colorA}/>{t.outgoing}</span><span><i className={s.colorBoth}/>{t.overlapping}</span><span><i className={s.colorB}/>{t.incoming}</span></div>
    <div className={s.timeline} role="list" aria-label={t.timelineTitle}>
      {bars.map(bar => {
        const isOverlap = method === 'overlap' && bar >= handover - 2 && bar < handover;
        const lead = bar >= handover ? 'b' : isOverlap ? 'both' : 'a';
        return <div key={bar} role="listitem" className={s.bar} data-lead={lead} data-switch={bar === handover} data-phrase={(bar - 1) % 8 === 0}>
          <span className={s.barNumber}>{bar}</span><span className={s.barFill} aria-hidden="true"/><span className={s.barLabel}>{lead === 'both' ? 'A+B' : lead.toUpperCase()}</span>
          {bar === handover && <span className={s.beatMarker}>{t.entryBeat} {beat}</span>}
        </div>;
      })}
    </div>
    <div className={s.readout} role="status" aria-live="polite">
      <strong>{t.bar} {handover} / {t.entryBeat.toLowerCase()} {beat}: {t.switch}</strong>
      <p>{detail}</p>
      <p className={beat === 1 ? '' : s.warning}>{beat === 1 ? t.downbeat : t.offbeat}</p>
      {method === 'drop' && !prepared && <p className={s.warning}>{t.dropNotReady}</p>}
      <p>{t.phraseCaveat}</p>
    </div>
  </Panel>;
}

function FastTransitionDiagnosis({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const selectId = useId();
  const [selected, setSelected] = useState(0);
  const problem = t.situations[selected];
  return <Panel title={t.decisionTitle} lang={lang}>
    <label className={s.singleControl} htmlFor={selectId}>{t.chooseProblem}
      <select id={selectId} value={selected} onChange={event => setSelected(Number(event.target.value))}>
        {t.situations.map((item, index) => <option value={index} key={item.title}>{item.title}</option>)}
      </select>
    </label>
    <div className={s.readout} role="status" aria-live="polite">
      <strong>{problem.title}</strong><p>{problem.detail}</p>
      <div className={s.callout}><strong>{t.firstTry}</strong><p>{problem.first}</p></div>
      <div className={s.callout}><strong>{t.avoid}</strong><p>{problem.avoid}</p></div>
    </div>
  </Panel>;
}

function FastTransitionPractice({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [done, setDone] = useState<boolean[]>(() => t.steps.map(() => false));
  const [best, setBest] = useState('');
  return <Panel title={t.practiceTitle} lang={lang}>
    <ol className={s.checklist}>{t.steps.map((step, index) => <li key={index}><label>
      <input type="checkbox" checked={done[index]} onChange={event => setDone(previous => previous.map((entry, i) => i === index ? event.target.checked : entry))}/>
      <span>{step}</span>
    </label></li>)}</ol>
    <fieldset className={s.verdict}><legend>{t.verdict}</legend>
      {[['', t.undecided], ['cut', t.chooseCut], ['overlap', t.chooseOverlap], ['drop', t.chooseDrop]].map(([value, label]) =>
        <label key={value}><input type="radio" name={`best-${lang}`} checked={best === value} onChange={() => setBest(value)}/>{label}</label>
      )}
    </fieldset>
    <p>{t.verdictNote}</p>
    <div className={s.footer}><strong aria-live="polite">{t.score}: {done.filter(Boolean).length}/{t.steps.length}</strong>
      <button type="button" onClick={() => { setDone(t.steps.map(() => false)); setBest(''); }}>{t.reset}</button>
    </div>
  </Panel>;
}

export function FastTransitionMapEn() { return <FastTransitionMap lang="en"/>; }
export function FastTransitionMapEs() { return <FastTransitionMap lang="es"/>; }
export function FastTransitionDiagnosisEn() { return <FastTransitionDiagnosis lang="en"/>; }
export function FastTransitionDiagnosisEs() { return <FastTransitionDiagnosis lang="es"/>; }
export function FastTransitionPracticeEn() { return <FastTransitionPractice lang="en"/>; }
export function FastTransitionPracticeEs() { return <FastTransitionPractice lang="es"/>; }
