"use client";
import { useState } from 'react';
import s from './rhythm-bpm-visuals.module.css';

/** Interactive, self-contained teaching calculator. Pure arithmetic, no audio capture. */
export function BPMCalculator(){
 const [bpm,setBpm]=useState('120');
 const [seconds,setSeconds]=useState('15');
 const rate=Number(bpm),duration=Number(seconds);
 const valid=Number.isFinite(rate)&&Number.isFinite(duration)&&rate>=30&&rate<=300&&duration>0&&duration<=120;
 const secPerBeat=valid?60/rate:0, beats=valid?rate*duration/60:0;
 return <section className={s.calculator} aria-labelledby="bpm-calculator-title"><div className={s.calculatorHead}><strong id="bpm-calculator-title">BPM CALCULATOR</strong><p>Explore a steady musical pulse — this does not analyze an actual song.</p></div>
 <div className={s.calculatorInputs}><label>BPM <input inputMode="decimal" type="number" min="30" max="300" step="1" value={bpm} onChange={e=>setBpm(e.target.value)}/></label><label>Counting window (seconds) <input inputMode="decimal" type="number" min="1" max="120" step="1" value={seconds} onChange={e=>setSeconds(e.target.value)}/></label></div>
 {!valid?<p className={s.calcError} role="status">Enter a BPM between 30 and 300, and a duration greater than 0 and no more than 120 seconds.</p>:<div className={s.calculatorResults} aria-live="polite"><div><small>SECONDS PER BEAT</small><strong>{secPerBeat.toFixed(3)} s</strong></div><div><small>EXPECTED BEATS</small><strong>{beats.toFixed(2)}</strong></div><div><small>TIME FOR 4 BEATS</small><strong>{(4*secPerBeat).toFixed(2)} s</strong></div></div>}
 <p className={s.note}>Formula: seconds per beat = 60 ÷ BPM. Expected beat intervals in a window = BPM × seconds ÷ 60. A fractional result is not a count of complete physical taps.</p></section>;
}
