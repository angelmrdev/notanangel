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
export function FourFourMeasureMapEs() {
  return <Diagram title="PULSOS · COMPASES · PRIMEROS TIEMPOS" subtitle="Cuatro compases en 4/4, dieciséis pulsos de negra" accessibleDescription="Cuatro compases de 4/4. Cada uno tiene cuatro pulsos y el primer tiempo de cada compás está resaltado." note="Los bordes verticales representan las divisiones entre compases; el 1 destacado marca el primer tiempo. Un acento audible puede caer en otro pulso.">
    <div className={s.fourMeasures}>{[0,1,2,3].map(bar=><div className={s.measure} key={bar}>
      <small>COMPÁS {bar+1}</small><div className={s.fourBeats}>{[1,2,3,4].map(beat=><span key={beat} className={beat===1?s.downbeat:s.beat}>{beat}</span>)}</div>
      <span className={s.measureFooter}>{bar===0?'El compás empieza en 1':'Nuevo compás → 1'}</span>
    </div>)}</div>
    <div className={s.statRow}><span>4 compases</span><span>4 pulsos por compás</span><strong>16 pulsos en total</strong></div>
  </Diagram>;
}

/** V02: Beat units explicitly distinguished in simple vs compound meters. */
export function MeterComparisonEs() {
  const meters=[
    {name:'4/4',caption:'Cuatro pulsos de negra',cells:[1,2,3,4],groups:[4],type:'simple'},
    {name:'3/4',caption:'Tres pulsos de negra',cells:[1,2,3],groups:[3],type:'simple'},
    {name:'2/4',caption:'Dos pulsos de negra',cells:[1,2],groups:[2],type:'simple'},
    {name:'6/8',caption:'Dos pulsos de negra con puntillo',cells:[1,2,3,4,5,6],groups:[3,3],type:'compound'},
  ];
  return <Diagram title="QUÉ CAMBIA CON LA MÉTRICA" subtitle="Agrupación simple frente a compuesta" accessibleDescription="4/4 agrupa cuatro negras, 3/4 agrupa tres y 2/4 agrupa dos. 6/8 reúne seis corcheas en dos grupos de tres, normalmente percibidos como dos pulsos compuestos." note="En 6/8 los pulsos principales suelen caer en las corcheas 1 y 4. Esto no equivale a seis pulsos de negra.">
    <div className={s.meterGrid}>{meters.map(m=><div className={s.meterCard} key={m.name}><div className={s.meterTitle}><strong>{m.name}</strong><small>{m.type.toUpperCase()}</small></div><p>{m.caption}</p>
      <div className={s.meterBeats} style={{gridTemplateColumns:`repeat(${m.cells.length}, minmax(0, 1fr))`}}>{m.cells.map((v,i)=><span key={v} data-accent={i===0||(m.name==='6/8'&&i===3)}>{v}</span>)}</div>
      {m.name==='6/8'?<div className={s.groupNotation}><span>UNO-y-a</span><span>DOS-y-a</span></div>:<small className={s.counting}>Cuenta: {m.cells.join(' – ')}</small>}
    </div>)}</div>
  </Diagram>;
}

/** V03: eight consecutive bars and the correct count of 32 beat positions. */
export function EightBarCountingStripEs() {
  return <Diagram title="CUENTA OCHO COMPASES" subtitle="En 4/4: ocho compases × cuatro pulsos = 32 pulsos" accessibleDescription="Ocho compases en 4/4 con posiciones del 1 al 4. El primer pulso se repite en cada compás; el fragmento suma 32." note="Cuenta grupos completos de cuatro, no solo las veces que pronuncias «uno». Es un ejemplo de 4/4 constante.">
    <div className={s.eightBars}>{Array.from({length:8},(_,bar)=><div className={s.miniMeasure} key={bar}><small>COMPÁS {bar+1}</small><div>{[1,2,3,4].map((beat)=><span className={beat===1?s.downbeat:s.beat} key={beat}>{beat}</span>)}</div></div>)}</div>
    <div className={s.statRow}><span>Comienzos de compás: 1 · 5 · 9 · 13 · 17 · 21 · 25 · 29</span><strong>32 pulsos</strong></div>
  </Diagram>;
}

/** V04: quarter, eighth and sixteenth-note counting aligned to the same four quarters. */
export function RhythmicSubdivisionsEs() {
  const rows=[
    {label:'NEGRAS',names:['1','2','3','4'],step:4,desc:'Un evento por pulso'},
    {label:'CORCHEAS',names:['1','&','2','&','3','&','4','&'],step:2,desc:'Dos posiciones iguales por pulso'},
    {label:'SEMICORCHEAS',names:['1','e','&','a','2','e','&','a','3','e','&','a','4','e','&','a'],step:1,desc:'Cuatro posiciones iguales por pulso'}
  ];
  return <Diagram title="CÓMO ENCAJAN LAS SUBDIVISIONES" subtitle="Un mismo compás de 4/4 contado de tres maneras" accessibleDescription="Negras: 1 2 3 4. Corcheas: 1 y 2 y 3 y 4 y. Semicorcheas: 1 e y a 2 e y a 3 e y a 4 e y a." note="Cada fila representa la misma duración. Subdividir ofrece más posiciones rítmicas sin acelerar la canción.">
    <div className={s.subdivisionRows}>{rows.map(row=><div className={s.subdivisionRow} key={row.label}><div className={s.subdivisionLabel}><strong>{row.label}</strong><small>{row.desc}</small></div><div className={s.subdivisionTrack}>{row.names.map((label,i)=><div key={i} className={s.subdivisionItem} style={{width:`${100/row.names.length}%`}}><span data-main={i%(4/row.step)===0 && label.match(/^[1-4]$/)!==null}>{label}</span></div>)}</div></div>)}</div>
  </Diagram>;
}

/** V05: quarter-note BPM is assumed for 4/4 calculations. */
export function BarDurationComparisonEs() {
  const rows=[{bpm:120,beat:0.5,bar:2,eight:16},{bpm:128,beat:0.46875,bar:1.875,eight:15}];
  return <Diagram title="BPM → DURACIÓN DEL COMPÁS" subtitle="Ocho compases de 4/4 a dos tempos" accessibleDescription="A 120 negras por minuto, un compás dura dos segundos y ocho duran dieciséis. A 128, cada compás dura 1,875 segundos y ocho duran quince." note="En 4/4 con BPM referidos a negras: segundos por compás = 240 / BPM. Suponemos tempo constante y ausencia de pausas añadidas.">
    <div className={s.durationRows}>{rows.map(row=><div className={s.durationRow} key={row.bpm}><div className={s.durationTitle}><strong>{row.bpm} BPM</strong><span>{row.bar.toFixed(3)} s/compás</span><span>{row.eight} s en total</span></div><div className={s.durationBlocks}>{Array.from({length:8},(_,i)=><span key={i}><b>{i+1}</b></span>)}</div><div className={s.durationScale}><span>0 s</span><span>{row.eight} s</span></div></div>)}</div>
  </Diagram>;
}

/** V06: schematic peaks and beatgrid lines; peak height does not define downbeats. */
export function BarBeatgridDiagnosticEs() {
  const bars=[0,1];
  return <Diagram title="BEATGRID ≠ CADA TRANSITORIO" subtitle="Marcadores de pulso, comienzos de compás y picos de audio son pistas distintas" accessibleDescription="Dos formas de onda hipotéticas: la rejilla correcta alinea negras y primeros tiempos cada cuatro pulsos; otra puede estar desplazada, aunque se vean picos intensos en otras posiciones." note="Son ilustraciones sintéticas, no capturas ni grabaciones reales. Los transitorios más fuertes no señalan necesariamente el primer tiempo del compás.">
    <div className={s.beatgridCards}>{bars.map((state)=><div className={s.beatgridCard} key={state}><div><strong>{state===0?'PULSOS Y PRIMEROS TIEMPOS':'EJEMPLO DE REJILLA DESPLAZADA'}</strong><small>{state===0?'Los compases comienzan en los pulsos 1 y 5.':'Un anclaje incorrecto puede marcar mal el inicio del compás.'}</small></div>
      <div className={s.beatgrid} role="img" aria-label={state===0?'Ocho marcadores de negra con inicios de compás en 1 y 5':'Ocho líneas de rejilla desplazadas respecto a los pulsos esperados'}>
      {Array.from({length:8},(_,i)=><span key={i} className={s.gridMarker} data-downbeat={i%4===0} style={{left:`${(i+0.5)*(100/8)+(state?3:0)}%`}}/>)}
      {Array.from({length:16},(_,i)=><span key={i} className={s.transient} style={{left:`${(i+0.5)*100/16}%`,height:`${14+(i*7)%31}px`}}/>)}
      </div><div className={s.beatLabels}>{Array.from({length:8},(_,i)=><span key={i}>{i%4+1}</span>)}</div>
    </div>)}</div>
  </Diagram>;
}

/** V07: an accessible worksheet the reader can print or transcribe. */
export function CountingPracticeWorksheetEs() {
  return <Diagram title="PRÁCTICA · MARCA LOS PRIMEROS TIEMPOS" subtitle="Ocho compases vacíos para tus anotaciones auditivas" accessibleDescription="Hoja imprimible con ocho compases, cada uno con cuatro posiciones, y líneas donde anotar primeros tiempos y acentos." note="Repite la actividad con una pista de 4/4 a la que tengas acceso legítimo. Si cambia la métrica, adapta los pulsos de cada compás.">
    <div className={s.practiceMeasures}>{Array.from({length:8},(_,i)=><div className={s.practiceMeasure} key={i}><small>COMPÁS {i+1}</small><div>{[1,2,3,4].map(n=><span key={n}>{n}</span>)}</div></div>)}</div>
    <div className={s.practiceNotes}><span>Pista / versión: ___________________________________</span><span>¿Qué señaló cada compás nuevo? _________________________</span><span>¿En qué momento perdiste la cuenta? ______________</span></div>
  </Diagram>;
}

/** V08: often-confused loop units; no assumption about hardware button behavior. */
export function BeatLoopVsBarLoopEs() {
  return <Diagram title="¿CUATRO PULSOS O CUATRO COMPASES?" subtitle="Los nombres se parecen, pero las duraciones son distintas" accessibleDescription="A 120 BPM en 4/4, un loop de cuatro pulsos ocupa un compás y dura dos segundos; otro de cuatro compases ocupa dieciséis pulsos y dura ocho segundos." note="Ejemplo a 120 negras por minuto en 4/4. Según el software DJ, el número de un control de loop puede indicar pulsos, compases u otra convención.">
    <div className={s.loopCompare}><div className={s.loopRow}><strong>4 PULSOS</strong><div className={s.loopBars}>{Array.from({length:4},(_,i)=><span key={i} className={s.loopHit}>{i+1}</span>)}</div><b>1 compás · 2 s</b></div>
    <div className={s.loopRow}><strong>4 COMPASES</strong><div className={s.loopBars}>{Array.from({length:16},(_,i)=><span key={i} className={i%4===0?s.loopHit:s.loopBeat}>{i%4+1}</span>)}</div><b>16 pulsos · 8 s</b></div></div>
  </Diagram>;
}
