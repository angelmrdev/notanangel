import type { ReactNode } from 'react';
import { BPMCalculator } from './bpm-calculator';
import s from './rhythm-bpm-visuals.module.css';

function Figure({ title, description, note, children }: { title: string; description: string; note: string; children: ReactNode }) {
 return <figure className={s.figure}><figcaption className={s.heading}>{title}<span>{description}</span></figcaption>{children}<p className={s.note}>{note}</p></figure>;
}
export function TempoPulseComparison(){
 const tempos=[60,120,180];
 return <Figure title="BPM IS A RATE" description="Four seconds of steady beats at three different speeds" note="Each dot represents one beat. The same four-second window contains 4 beats at 60 BPM, 8 at 120 BPM and 12 at 180 BPM.">
  <div className={s.pulseCompare} role="group" aria-label="Four seconds: 60 BPM has four pulses spaced one second apart; 120 BPM eight pulses spaced half a second apart; 180 BPM twelve pulses spaced a third of a second apart.">
    {tempos.map(bpm=><div className={s.pulseRow} key={bpm}><strong>{bpm} <small>BPM</small></strong><div className={s.pulseTrack}>
     {Array.from({length:bpm/15},(_,i)=><span key={i} className={s.pulseDot} style={{left:`${(i/(bpm/15))*100}%`}}/>)}
    </div><span className={s.pulseTime}>{(60/bpm).toFixed(2)}s/beat</span></div>)}
  </div><div className={s.timeAxis}><span>0s</span><span>1s</span><span>2s</span><span>3s</span><span>4s</span></div>
 </Figure>;
}
export function PulseAndRhythmLayers(){
 const rows=[['PULSE',[1,1,1,1,1,1,1,1],'beat'],['KICK',[1,0,0,0,1,0,0,0],'kick'],['SNARE',[0,0,1,0,0,0,1,0],'snare'],['HATS',[1,1,1,1,1,1,1,1],'hats']];
 return <Figure title="A STEADY PULSE, A CHANGING RHYTHM" description="One 4/4 bar illustrated with eight eighth-note positions" note="This is an illustrative drum pattern. Adding hi-hat notes or moving the snare does not automatically change BPM.">
  <div className={s.layerChart} role="group" aria-label="A steady beat at positions 1, 3, 5 and 7, with independent drum events distributed over eight subdivisions.">
   <div className={s.layerLabel}>POSITION</div><div className={s.eightGrid}>{['1','&','2','&','3','&','4','&'].map((x,i)=><span key={i}>{x}</span>)}</div>
   {rows.map(([name,arr,tone])=><div className={s.layerRow} key={String(name)}><strong>{name}</strong><div className={s.eightGrid}>{(arr as number[]).map((v,i)=><span key={i} className={v? s.layerHit:s.layerMiss} data-tone={tone}>{v?'●':'·'}</span>)}</div></div>)}
  </div>
 </Figure>;
}
export function HalfDoubleTempo(){
 return <Figure title="ONE RHYTHM · TWO BEAT INTERPRETATIONS" description="70 BPM and 140 BPM refer to related pulse levels" note="A software reading at half or double the tempo can still correspond to a consistent rhythmic structure. Confirm the counted pulse by listening.">
  <div className={s.halfGrid}><div><strong>70 BPM · slower count</strong><div className={s.pulseRowDemo}>{Array.from({length:8},(_,i)=><span className={s.slowDot} key={i}>1</span>)}</div><small>One beat approximately every 857 ms</small></div><div><strong>140 BPM · faster count</strong><div className={s.pulseRowDemo}>{Array.from({length:16},(_,i)=><span className={i%2===0?s.fastStrong:s.fastWeak} key={i}>{i%2===0?'1':'&'}</span>)}</div><small>One counted beat approximately every 429 ms</small></div></div>
 </Figure>;
}
export function BeatgridAlignmentExamples(){
 const peaks=[10,21,35,47,60,72,85,97];
 const variants=[{label:'ALIGNED',offset:0,step:1,explain:'Markers meet the chosen beat onsets.'},{label:'OFFSET',offset:5,step:1,explain:'Markers are consistently late.'},{label:'HALF-TIME',offset:0,step:2,explain:'Markers count every second pulse.'}];
 return <Figure title="CHECK THE BEATGRID, NOT ONLY THE BPM" description="Illustrative waveform peaks and grid marker positions" note="These are synthetic teaching patterns, not screenshots of any DJ software or real recordings. Beatgrid error can also drift over time.">
  <div className={s.gridExamples}>{variants.map(v=><div key={v.label} className={s.gridExample}><div><strong>{v.label}</strong><small>{v.explain}</small></div><div className={s.wave} role="img" aria-label={`${v.label}: ${v.explain}`}>
   {peaks.map((x,i)=><span key={i} className={s.wavePeak} style={{left:`${x}%`,height:`${20+(i%3)*12}px`}}/>)}
   {peaks.filter((_,i)=>i%v.step===0).map((x,i)=><span key={i} className={s.waveMarker} style={{left:`${x+v.offset}%`}}/>)}
  </div></div>)}</div>
 </Figure>;
}
export function BeatBarPhraseHierarchy(){
 return <Figure title="BPM → BEATS → BARS → PHRASES" description="Speed, grouping and musical form answer different questions" note="Illustrative 4/4 example with four bars. A musical phrase does not always last four bars, and BPM cannot identify phrase boundaries on its own.">
  <div className={s.hierarchy}><div className={s.hierarchyTop}><b>128 BPM</b><span>Rate of the chosen pulse</span></div><div className={s.barGroups}>{[0,1,2,3].map(bar=><div key={bar} className={s.barGroup}><span>BAR {bar+1}</span><div>{[1,2,3,4].map(beat=><strong key={beat} data-strong={beat===1}>{beat}</strong>)}</div></div>)}</div><div className={s.hierarchyBottom}>FOUR-BAR GROUP · Listening reference, not a universal phrase length</div></div>
 </Figure>;
}
export function TempoPracticeWorksheet(){
 const tasks=[['Find the pulse','Listen without looking at a BPM display. Tap a steady beat.'],['Count 15 seconds','How many complete beat intervals did you observe?'],['Estimate BPM','Multiply the count by four; note measurement uncertainty.'],['Test double or half','Could the same groove also be felt at half or twice that rate?'],['Compare feel','Choose another track at a similar BPM but with a different rhythm.']];
 return <Figure title="TEMPO LISTENING WORKSHEET" description="Five repeatable practice prompts" note="Print this page or copy the prompts into your DJ library notes; no personal data is collected or stored.">
  <ol className={s.worksheet}>{tasks.map(([title,desc],i)=><li key={title}><span className={s.number}>{String(i+1).padStart(2,'0')}</span><div><strong>{title}</strong><p>{desc}</p><div className={s.writeLine} aria-hidden="true"/></div></li>)}</ol>
 </Figure>;
}
export function SameTempoDifferentGrooves(){
 const rows=[{label:'STRAIGHT 4-ON-FLOOR',kick:[1,0,1,0,1,0,1,0],clap:[0,0,1,0,0,0,1,0],hat:[1,1,1,1,1,1,1,1]},{label:'SYNCOPATED EXAMPLE',kick:[1,0,0,1,1,0,0,1],clap:[0,0,1,0,0,0,1,0],hat:[0,1,1,0,0,1,1,0]}];
 return <Figure title="SAME BPM, DIFFERENT GROOVE" description="Two invented one-bar patterns at 120 BPM" note="These are visual notation examples, not playable audio. Both patterns fit the same timing grid, but the distribution of rhythmic events creates a different feel. Original audio demonstrations can be added later with appropriate rights.">
   <div className={s.grooveRows}>{rows.map(row=><div key={row.label} className={s.groove}><strong>{row.label}</strong>{(['kick','clap','hat'] as const).map(kind=><div className={s.grooveLine} key={kind}><small>{kind.toUpperCase()}</small><div className={s.eightGrid}>{row[kind].map((v,i)=><span key={i} className={v?s.layerHit:s.layerMiss} data-tone={kind}>{v?'●':'·'}</span>)}</div></div>)}</div>)}</div>
 </Figure>;
}
export { BPMCalculator };
