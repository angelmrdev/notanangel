'use client';

import { useState } from 'react';
import s from './module06-tempo-visuals.module.css';

type Lang = 'en' | 'es';
const copy = (lang: Lang, en: string, es: string) => lang === 'es' ? es : en;
const fmt = (n: number, lang: Lang) => n.toLocaleString(lang === 'es' ? 'es-ES' : 'en-US', { maximumFractionDigits: 2 });

function Figure({ title, caption, children }: { title: string; caption: string; children: React.ReactNode }) {
  return <figure className={s.figure}><figcaption className={s.title}>{title}</figcaption><div>{children}</div><p className={s.caption}>{caption}</p></figure>;
}

function TempoFaderLab({ lang }: { lang: Lang }) {
  const [original, setOriginal] = useState(136);
  const [target, setTarget] = useState(128);
  const delta = (target / original - 1) * 100;
  const withinNarrowRange = Math.abs(delta) <= 6;
  return <Figure title={copy(lang, 'Try the tempo fader', 'Prueba el fader de tempo')} caption={copy(lang, 'A mathematical illustration: your real deck can round the BPM and percentage. This does not align the beat positions.', 'Ilustración matemática: tu deck puede redondear los BPM y el porcentaje. Esto no alinea las posiciones de los golpes.')}>
    <div className={s.inputs}>
      <label>{copy(lang, 'Starting BPM', 'BPM originales')}<input type="number" min={40} max={250} step={1} value={original} onChange={e => setOriginal(Math.max(40, Math.min(250, Number(e.target.value) || 40)))} /></label>
      <label>{copy(lang, 'Target BPM', 'BPM objetivo')}<input type="number" min={40} max={250} step={1} value={target} onChange={e => setTarget(Math.max(40, Math.min(250, Number(e.target.value) || 40)))} /></label>
    </div>
    <div className={s.readout}><span>{copy(lang, 'Fader adjustment', 'Ajuste del fader')}</span><strong>{delta >= 0 ? '+' : ''}{fmt(delta, lang)} %</strong><span>{fmt(original, lang)} BPM → {fmt(target, lang)} BPM</span></div>
    <div className={s.scale} aria-label={copy(lang, 'Illustrative plus or minus sixteen percent fader scale', 'Escala ilustrativa del fader de más o menos dieciséis por ciento')}><span>−16%</span><div className={s.track}><i className={s.center} /><i className={s.handle} style={{ left: `${Math.max(0, Math.min(100, (delta + 16) / 32 * 100))}%` }} /></div><span>+16%</span></div>
    <p className={s.feedback}>{Math.abs(delta) > 16 ? copy(lang, 'Outside the illustrated ±16% range; consider a different song pairing.', 'Fuera del rango ilustrado de ±16 %; considera otra combinación de canciones.') : withinNarrowRange ? copy(lang, 'Within a typical ±6% range.', 'Dentro de un rango habitual de ±6 %.') : copy(lang, 'Needs more reach than ±6%: check your deck range and listen for artifacts.', 'Necesita más margen que ±6 %: comprueba el rango y escucha posibles artefactos.')}</p>
    <button type="button" className={s.reset} onClick={() => { setOriginal(136); setTarget(128); }}>{copy(lang, 'Reset example', 'Restablecer ejemplo')}</button>
  </Figure>;
}

function KeyLockMap({ lang }: { lang: Lang }) {
  const [enabled, setEnabled] = useState(true);
  return <Figure title={copy(lang, 'What changes when Key Lock is enabled?', '¿Qué cambia al activar Key Lock?')} caption={copy(lang, 'Conceptual comparison only. Pitch preservation is an algorithmic approximation; it can introduce artifacts, especially at large speed changes.', 'Comparación conceptual. La conservación del tono es una aproximación algorítmica; puede introducir artefactos, especialmente con grandes cambios de velocidad.')}>
    <div className={s.toggle}><span>{copy(lang, 'Key Lock / Master Tempo', 'Key Lock / Master Tempo')}</span><button type="button" aria-pressed={enabled} onClick={() => setEnabled(v => !v)}>{enabled ? 'ON' : 'OFF'}</button></div>
    <div className={s.cards}><div><b>{copy(lang, 'Playback tempo', 'Tempo de reproducción')}</b><strong>120 → 126 BPM</strong><small>{copy(lang, 'Both states: +5% faster', 'En ambos estados: +5 % más rápido')}</small></div><div><b>{copy(lang, 'Perceived pitch', 'Tono percibido')}</b><strong>{enabled ? copy(lang, 'Approximately preserved', 'Aproximadamente conservado') : copy(lang, 'Rises with speed', 'Sube con la velocidad')}</strong><small>{enabled ? copy(lang, 'Processing may sound unnatural', 'El procesado puede sonar poco natural') : copy(lang, 'Traditional speed/pitch coupling', 'Velocidad y tono ligados')}</small></div></div>
    <p className={s.feedback}>{copy(lang, 'Neither setting fixes a wrong beatgrid, beat offset or incompatible musical key.', 'Ningún ajuste corrige un beatgrid erróneo, un desfase entre golpes o tonalidades incompatibles.')}</p>
  </Figure>;
}

function OffsetDriftLab({ lang }: { lang: Lang }) {
  const [scenario, setScenario] = useState<'aligned' | 'offset' | 'drift'>('offset');
  const offset = (i: number) => scenario === 'aligned' ? 0 : scenario === 'offset' ? 16 : i * 5;
  return <Figure title={copy(lang, 'Diagnose by listening: offset or drift?', 'Diagnostica escuchando: ¿desfase o deriva?')} caption={copy(lang, 'The bars illustrate timing, not a literal audio waveform. In a real mix, listen for the kick alignment over several bars.', 'Las barras ilustran los tiempos, no una forma de onda real. En una mezcla, escucha la coincidencia de bombos durante varios compases.')}>
    <div className={s.choice}>{(['aligned', 'offset', 'drift'] as const).map(v => <button key={v} type="button" aria-pressed={scenario === v} onClick={() => setScenario(v)}>{v === 'aligned' ? copy(lang, 'Aligned', 'Alineados') : v === 'offset' ? copy(lang, 'Fixed offset', 'Desfase fijo') : copy(lang, 'Increasing drift', 'Deriva creciente')}</button>)}</div>
    <div className={s.beatLegend}><span><i className={s.aMarker}/> {copy(lang, 'Deck A', 'Deck A')}</span><span><i className={s.bMarker}/> {copy(lang, 'Deck B', 'Deck B')}</span></div>
    <div className={s.beatRows}><div className={s.beatRow}>{Array.from({length: 8}, (_,i) => <span key={i} className={s.beatA}>{i + 1}</span>)}</div><div className={s.beatRow}>{Array.from({length: 8}, (_,i) => <span key={i} className={s.beatB} style={{transform: `translateX(${offset(i)}px)`}}>{i + 1}</span>)}</div></div>
    <p className={s.feedback}>{scenario === 'aligned' ? copy(lang, 'The beats coincide: keep listening before you mix.', 'Los golpes coinciden: sigue escuchando antes de mezclar.') : scenario === 'offset' ? copy(lang, 'Same speed, fixed gap: use a small temporary jog nudge.', 'Misma velocidad, separación fija: corrige con un toque momentáneo al jog.') : copy(lang, 'Gap grows over time: adjust the sustained tempo fader, then nudge to realign.', 'La separación crece: ajusta el tempo sostenido y después corrige la posición con el jog.')}</p>
  </Figure>;
}

function DeckPracticeCard({ lang }: { lang: Lang }) {
  const steps = lang === 'es' ? ['A: 124 BPM al MASTER y volumen moderado.', 'B: 126 BPM con el fader de canal cerrado y CUE en auriculares.', 'Sync desactivado en B; baja a 124 BPM (≈ −1,59 %).', 'Lanza B sobre un pulso y corrige un desfase fijo con el jog.', 'Escucha 16–32 pulsos: si se separan, reajusta el tempo.', 'Repite con Key Lock activado y desactivado.'] : ['A: 124 BPM to MASTER at a safe monitoring volume.', 'B: 126 BPM with channel fader down and headphone CUE enabled.', 'Sync off on B; lower to 124 BPM (≈ −1.59%).', 'Start B on a beat and correct fixed offset with the jog.', 'Listen for 16–32 beats; if they drift, readjust sustained tempo.', 'Repeat with Key Lock on and off.'];
  return <Figure title={copy(lang, 'Two-deck practice checklist', 'Lista de práctica con dos decks')} caption={copy(lang, 'This is a private monitoring exercise, not yet a public-facing transition. Controller and software controls vary.', 'Ejercicio de preescucha, todavía no una transición de cara al público. Los controles dependen del equipo y software.')}><ol className={s.checklist}>{steps.map((step,i) => <li key={step}><span>{String(i + 1).padStart(2,'0')}</span>{step}</li>)}</ol></Figure>;
}

export function TempoFaderLabEn() { return <TempoFaderLab lang="en" />; }
export function TempoFaderLabEs() { return <TempoFaderLab lang="es" />; }
export function KeyLockMapEn() { return <KeyLockMap lang="en" />; }
export function KeyLockMapEs() { return <KeyLockMap lang="es" />; }
export function OffsetDriftLabEn() { return <OffsetDriftLab lang="en" />; }
export function OffsetDriftLabEs() { return <OffsetDriftLab lang="es" />; }
export function DeckPracticeCardEn() { return <DeckPracticeCard lang="en" />; }
export function DeckPracticeCardEs() { return <DeckPracticeCard lang="es" />; }
