import type { ReactNode } from 'react';
import s from './beats-bars-visuals.module.css';

/** Music theory figures for DJ-02-002. No external images, audio, or browser JS. */
function Diagram({ title, subtitle, note, children, accessibleDescription }: { title: string; subtitle: string; note: string; children: ReactNode; accessibleDescription: string }) {
  return <figure className={s.figure}>
    <figcaption className={s.heading}>{title}<span>{subtitle}</span></figcaption>
    <div role="group" aria-label={accessibleDescription}>{children}</div>
    <p className={s.note}>{note}</p>
  </figure>;
}

/** V01: 16 quarter-note beats, grouped accurately into four 4/4 measures. */
export function FourFourMeasureMap() {
  return <Diagram title="BEATS · BARS · DOWNBEATS" subtitle="Four bars in 4/4, sixteen quarter-note beats" accessibleDescription="Four 4/4 bars. Every bar contains four beats, and the first beat of bars 1, 2, 3 and 4 is highlighted as the downbeat." note="Vertical borders indicate bar lines; a highlighted 1 marks the downbeat of each measure. The accent you hear in a song may fall on another beat.">
    <div className={s.fourMeasures}>{[0,1,2,3].map(bar=><div className={s.measure} key={bar}>
      <small>BAR {bar+1}</small><div className={s.fourBeats}>{[1,2,3,4].map(beat=><span key={beat} className={beat===1?s.downbeat:s.beat}>{beat}</span>)}</div>
      <span className={s.measureFooter}>{bar===0?'Bar starts at beat 1':'New bar → 1'}</span>
    </div>)}</div>
    <div className={s.statRow}><span>4 bars</span><span>4 beats per bar</span><strong>16 beats total</strong></div>
  </Diagram>;
}

/** V02: Beat units explicitly distinguished in simple vs compound meters. */
export function MeterComparison() {
  const meters=[
    {name:'4/4',caption:'Four quarter-note beats',cells:[1,2,3,4],groups:[4],type:'simple'},
    {name:'3/4',caption:'Three quarter-note beats',cells:[1,2,3],groups:[3],type:'simple'},
    {name:'2/4',caption:'Two quarter-note beats',cells:[1,2],groups:[2],type:'simple'},
    {name:'6/8',caption:'Two dotted-quarter pulses',cells:[1,2,3,4,5,6],groups:[3,3],type:'compound'},
  ];
  return <Diagram title="WHAT THE METER CHANGES" subtitle="Simple versus compound grouping" accessibleDescription="4/4 groups four quarter-note beats, 3/4 groups three and 2/4 groups two. 6/8 groups six eighth notes into two groups of three, usually heard as two compound pulses." note="For 6/8, the large pulses usually fall on eighth-note positions 1 and 4. That is not the same as saying there are six quarter-note beats.">
    <div className={s.meterGrid}>{meters.map(m=><div className={s.meterCard} key={m.name}><div className={s.meterTitle}><strong>{m.name}</strong><small>{m.type.toUpperCase()}</small></div><p>{m.caption}</p>
      <div className={s.meterBeats} style={{gridTemplateColumns:`repeat(${m.cells.length}, minmax(0, 1fr))`}}>{m.cells.map((v,i)=><span key={v} data-accent={i===0||(m.name==='6/8'&&i===3)}>{v}</span>)}</div>
      {m.name==='6/8'?<div className={s.groupNotation}><span>ONE-and-a</span><span>TWO-and-a</span></div>:<small className={s.counting}>Count: {m.cells.join(' – ')}</small>}
    </div>)}</div>
  </Diagram>;
}

/** V03: eight consecutive bars and the correct count of 32 beat positions. */
export function EightBarCountingStrip() {
  return <Diagram title="COUNT EIGHT BARS" subtitle="In 4/4: eight measures × four beats = 32 beats" accessibleDescription="Eight 4/4 measures, each showing beat positions one through four. Downbeats repeat once per measure and the full passage has 32 beats." note="Count the number of completed groups of four—not only the number of times you say the word 'one'. These labels describe a steady 4/4 example.">
    <div className={s.eightBars}>{Array.from({length:8},(_,bar)=><div className={s.miniMeasure} key={bar}><small>BAR {bar+1}</small><div>{[1,2,3,4].map((beat)=><span className={beat===1?s.downbeat:s.beat} key={beat}>{beat}</span>)}</div></div>)}</div>
    <div className={s.statRow}><span>Bar starts: 1 · 5 · 9 · 13 · 17 · 21 · 25 · 29</span><strong>32 beats</strong></div>
  </Diagram>;
}

/** V04: quarter, eighth and sixteenth-note counting aligned to the same four quarters. */
export function RhythmicSubdivisions() {
  const rows=[
    {label:'QUARTERS',names:['1','2','3','4'],step:4,desc:'One event per beat'},
    {label:'EIGHTHS',names:['1','&','2','&','3','&','4','&'],step:2,desc:'Two equal positions per beat'},
    {label:'SIXTEENTHS',names:['1','e','&','a','2','e','&','a','3','e','&','a','4','e','&','a'],step:1,desc:'Four equal positions per beat'}
  ];
  return <Diagram title="HOW SUBDIVISIONS FIT" subtitle="The same 4/4 bar counted three ways" accessibleDescription="Quarter notes: 1 2 3 4. Eighth notes: 1 and 2 and 3 and 4 and. Sixteenth notes: 1 e and a 2 e and a 3 e and a 4 e and a." note="Every row spans the same musical duration. A subdivision gives more possible rhythmic placements, not a faster song tempo.">
    <div className={s.subdivisionRows}>{rows.map(row=><div className={s.subdivisionRow} key={row.label}><div className={s.subdivisionLabel}><strong>{row.label}</strong><small>{row.desc}</small></div><div className={s.subdivisionTrack}>{row.names.map((label,i)=><div key={i} className={s.subdivisionItem} style={{width:`${100/row.names.length}%`}}><span data-main={i%(4/row.step)===0 && label.match(/^[1-4]$/)!==null}>{label}</span></div>)}</div></div>)}</div>
  </Diagram>;
}

/** V05: quarter-note BPM is assumed for 4/4 calculations. */
export function BarDurationComparison() {
  const rows=[{bpm:120,beat:0.5,bar:2,eight:16},{bpm:128,beat:0.46875,bar:1.875,eight:15}];
  return <Diagram title="BPM → BAR DURATION" subtitle="Eight bars in 4/4 at two different tempos" accessibleDescription="At 120 quarter-note BPM, each 4/4 bar is two seconds and eight bars last sixteen seconds. At 128 quarter-note BPM, each bar lasts 1.875 seconds and eight bars last fifteen seconds." note="Formula for 4/4 when BPM counts quarter-note beats: seconds per bar = 240 / BPM. This simplified calculation assumes constant tempo and no added pauses.">
    <div className={s.durationRows}>{rows.map(row=><div className={s.durationRow} key={row.bpm}><div className={s.durationTitle}><strong>{row.bpm} BPM</strong><span>{row.bar.toFixed(3)} s / bar</span><span>{row.eight} s total</span></div><div className={s.durationBlocks}>{Array.from({length:8},(_,i)=><span key={i}><b>{i+1}</b></span>)}</div><div className={s.durationScale}><span>0 s</span><span>{row.eight} s</span></div></div>)}</div>
  </Diagram>;
}

/** V06: schematic peaks and beatgrid lines; peak height does not define downbeats. */
export function BarBeatgridDiagnostic() {
  const bars=[0,1];
  return <Diagram title="BEATGRID ≠ EVERY TRANSIENT" subtitle="Beat markers, bar starts and audio peaks are different clues" accessibleDescription="Two hypothetical waveforms. A correct grid has quarter-note beat positions aligned, with bar downbeats every fourth beat. A wrong grid may be offset by one subdivision although strong waveform peaks still appear elsewhere." note="These waveforms are synthetic illustrations, not software screenshots or evidence of a real recording. Loud transients do not automatically indicate the first beat of a measure.">
    <div className={s.beatgridCards}>{bars.map((state)=><div className={s.beatgridCard} key={state}><div><strong>{state===0?'BEATS AND DOWNBEATS':'OFFSET GRID EXAMPLE'}</strong><small>{state===0?'Bars begin at beats 1 and 5.':'An incorrect anchor can mislabel the bar start.'}</small></div>
      <div className={s.beatgrid} role="img" aria-label={state===0?'Eight quarter-note beat markers with downbeats at beat 1 and 5':'Eight grid lines shifted later from the intended beat positions'}>
      {Array.from({length:8},(_,i)=><span key={i} className={s.gridMarker} data-downbeat={i%4===0} style={{left:`${(i+0.5)*(100/8)+(state?3:0)}%`}}/>)}
      {Array.from({length:16},(_,i)=><span key={i} className={s.transient} style={{left:`${(i+0.5)*100/16}%`,height:`${14+(i*7)%31}px`}}/>)}
      </div><div className={s.beatLabels}>{Array.from({length:8},(_,i)=><span key={i}>{i%4+1}</span>)}</div>
    </div>)}</div>
  </Diagram>;
}

/** V07: an accessible worksheet the reader can print or transcribe. */
export function CountingPracticeWorksheet() {
  return <Diagram title="PRACTICE · MARK THE DOWNBEATS" subtitle="Eight empty measures for your own listening observations" accessibleDescription="Printable counting worksheet with eight measures, each containing four numbered positions, and blank lines for notes about where downbeats and accents occur." note="Repeat the activity with a 4/4 track you can legally access. For a different meter, adapt the number of beats per bar.">
    <div className={s.practiceMeasures}>{Array.from({length:8},(_,i)=><div className={s.practiceMeasure} key={i}><small>BAR {i+1}</small><div>{[1,2,3,4].map(n=><span key={n}>{n}</span>)}</div></div>)}</div>
    <div className={s.practiceNotes}><span>Track / version: ___________________________________</span><span>What signaled each new bar? _________________________</span><span>Where did you lose count, if anywhere? ______________</span></div>
  </Diagram>;
}

/** V08: often-confused loop units; no assumption about hardware button behavior. */
export function BeatLoopVsBarLoop() {
  return <Diagram title="FOUR BEATS OR FOUR BARS?" subtitle="The labels can sound similar, but the durations are not" accessibleDescription="At 120 BPM in 4/4, a four-beat loop occupies one bar and lasts two seconds, while a four-bar loop occupies sixteen beats and lasts eight seconds." note="Example assumes 120 quarter-note BPM in 4/4. The number displayed on a loop control may represent beats, bars or another convention depending on the DJ software.">
    <div className={s.loopCompare}><div className={s.loopRow}><strong>4 BEATS</strong><div className={s.loopBars}>{Array.from({length:4},(_,i)=><span key={i} className={s.loopHit}>{i+1}</span>)}</div><b>1 bar · 2 s</b></div>
    <div className={s.loopRow}><strong>4 BARS</strong><div className={s.loopBars}>{Array.from({length:16},(_,i)=><span key={i} className={i%4===0?s.loopHit:s.loopBeat}>{i%4+1}</span>)}</div><b>16 beats · 8 s</b></div></div>
  </Diagram>;
}
