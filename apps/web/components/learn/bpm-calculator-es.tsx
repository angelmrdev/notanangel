"use client";
import { useState } from 'react';
import s from './rhythm-bpm-visuals.module.css';

/** Interactive, self-contained teaching calculator. Pure arithmetic, no audio capture. */
export function BPMCalculatorEs(){
 const [bpm,setBpm]=useState('120');
 const [seconds,setSeconds]=useState('15');
 const rate=Number(bpm),duration=Number(seconds);
 const valid=Number.isFinite(rate)&&Number.isFinite(duration)&&rate>=30&&rate<=300&&duration>0&&duration<=120;
 const secPerBeat=valid?60/rate:0, beats=valid?rate*duration/60:0;
 return <section className={s.calculator} aria-labelledby="bpm-calculator-es-title"><div className={s.calculatorHead}><strong id="bpm-calculator-es-title">CALCULADORA DE BPM</strong><p>Explora un pulso musical constante: esta herramienta no analiza canciones reales.</p></div>
 <div className={s.calculatorInputs}><label>BPM <input inputMode="decimal" type="number" min="30" max="300" step="1" value={bpm} onChange={e=>setBpm(e.target.value)}/></label><label>Intervalo de conteo (segundos) <input inputMode="decimal" type="number" min="1" max="120" step="1" value={seconds} onChange={e=>setSeconds(e.target.value)}/></label></div>
 {!valid?<p className={s.calcError} role="status">Introduce entre 30 y 300 BPM y un intervalo mayor que 0 y de 120 segundos como máximo.</p>:<div className={s.calculatorResults} aria-live="polite"><div><small>SEGUNDOS POR PULSO</small><strong>{secPerBeat.toFixed(3)} s</strong></div><div><small>PULSOS ESTIMADOS</small><strong>{beats.toFixed(2)}</strong></div><div><small>TIEMPO DE 4 PULSOS</small><strong>{(4*secPerBeat).toFixed(2)} s</strong></div></div>}
 <p className={s.note}>Fórmula: segundos por pulso = 60 ÷ BPM. Intervalos de pulso esperados = BPM × segundos ÷ 60. Un resultado decimal no equivale a ese número de golpes físicos completos.</p></section>;
}
