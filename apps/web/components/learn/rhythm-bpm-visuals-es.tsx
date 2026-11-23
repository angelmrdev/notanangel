import type { ReactNode } from 'react';
import { BPMCalculatorEs } from './bpm-calculator-es';
import s from './rhythm-bpm-visuals.module.css';

function Figure({ title, description, note, children }: { title: string; description: string; note: string; children: ReactNode }) {
 return <figure className={s.figure}><figcaption className={s.heading}>{title}<span>{description}</span></figcaption>{children}<p className={s.note}>{note}</p></figure>;
}
export function TempoPulseComparisonEs(){
 const tempos=[60,120,180];
 return <Figure title="EL BPM ES UNA FRECUENCIA" description="Cuatro segundos de pulsos constantes a distintas velocidades" note="Cada punto representa un pulso. En cuatro segundos caben 4 pulsos a 60 BPM, 8 a 120 BPM y 12 a 180 BPM.">
  <div className={s.pulseCompare} role="group" aria-label="Cuatro segundos: a 60 BPM hay cuatro pulsos separados un segundo; a 120, ocho separados medio segundo; y a 180, doce separados un tercio de segundo.">
    {tempos.map(bpm=><div className={s.pulseRow} key={bpm}><strong>{bpm} <small>BPM</small></strong><div className={s.pulseTrack}>
     {Array.from({length:bpm/15},(_,i)=><span key={i} className={s.pulseDot} style={{left:`${(i/(bpm/15))*100}%`}}/>)}
    </div><span className={s.pulseTime}>{(60/bpm).toFixed(2)}s/pulso</span></div>)}
  </div><div className={s.timeAxis}><span>0s</span><span>1s</span><span>2s</span><span>3s</span><span>4s</span></div>
 </Figure>;
}
export function PulseAndRhythmLayersEs(){
 const rows=[['PULSO',[1,1,1,1,1,1,1,1],'beat'],['BOMBO',[1,0,0,0,1,0,0,0],'kick'],['CAJA',[0,0,1,0,0,0,1,0],'snare'],['CHARLES',[1,1,1,1,1,1,1,1],'charless']];
 return <Figure title="PULSO CONSTANTE, RITMO CAMBIANTE" description="Un compás de 4/4 dividido en ocho posiciones de corchea" note="Patrón ilustrativo: añadir golpes de hi-charles o cambiar la caja no modifica necesariamente los BPM.">
  <div className={s.layerChart} role="group" aria-label="Pulso regular en las posiciones 1, 3, 5 y 7, con percusión distribuida entre ocho subdivisiones.">
   <div className={s.layerLabel}>POSICIÓN</div><div className={s.eightGrid}>{['1','&','2','&','3','&','4','&'].map((x,i)=><span key={i}>{x}</span>)}</div>
   {rows.map(([name,arr,tone])=><div className={s.layerRow} key={String(name)}><strong>{name}</strong><div className={s.eightGrid}>{(arr as number[]).map((v,i)=><span key={i} className={v? s.layerHit:s.layerMiss} data-tone={tone}>{v?'●':'·'}</span>)}</div></div>)}
  </div>
 </Figure>;
}
export function HalfDoubleTempoEs(){
 return <Figure title="UN RITMO · DOS INTERPRETACIONES DEL PULSO" description="70 y 140 BPM representan niveles de pulso relacionados" note="Un programa puede analizar correctamente la estructura rítmica y mostrar la mitad o el doble de BPM. Comprueba el pulso escuchando.">
  <div className={s.halfGrid}><div><strong>70 BPM · conteo lento</strong><div className={s.pulseRowDemo}>{Array.from({length:8},(_,i)=><span className={s.slowDot} key={i}>1</span>)}</div><small>Un pulso cada 857 ms, aproximadamente</small></div><div><strong>140 BPM · conteo rápido</strong><div className={s.pulseRowDemo}>{Array.from({length:16},(_,i)=><span className={i%2===0?s.fastStrong:s.fastWeak} key={i}>{i%2===0?'1':'&'}</span>)}</div><small>Un pulso contado cada 429 ms, aproximadamente</small></div></div>
 </Figure>;
}
export function BeatgridAlignmentExamplesEs(){
 const peaks=[10,21,35,47,60,72,85,97];
 const variants=[{label:'ALINEADO',offset:0,step:1,explain:'Los marcadores coinciden con los ataques de pulso elegidos.'},{label:'DESPLAZADO',offset:5,step:1,explain:'Los marcadores llegan sistemáticamente tarde.'},{label:'MEDIO TIEMPO',offset:0,step:2,explain:'Los marcadores cuentan un pulso de cada dos.'}];
 return <Figure title="REVISA EL BEATGRID, NO SOLO LOS BPM" description="Picos de forma de onda y marcadores de rejilla ilustrativos" note="Patrones sintéticos para aprender: no son capturas de ningún software ni grabaciones reales. Un error de beatgrid también puede acumularse con el tiempo.">
  <div className={s.gridExamples}>{variants.map(v=><div key={v.label} className={s.gridExample}><div><strong>{v.label}</strong><small>{v.explain}</small></div><div className={s.wave} role="img" aria-label={`${v.label}: ${v.explain}`}>
   {peaks.map((x,i)=><span key={i} className={s.wavePeak} style={{left:`${x}%`,height:`${20+(i%3)*12}px`}}/>)}
   {peaks.filter((_,i)=>i%v.step===0).map((x,i)=><span key={i} className={s.waveMarker} style={{left:`${x+v.offset}%`}}/>)}
  </div></div>)}</div>
 </Figure>;
}
export function BeatBarPhraseHierarchyEs(){
 return <Figure title="BPM → PULSOS → COMPASES → FRASES" description="Velocidad, agrupación y forma musical responden a preguntas distintas" note="Ejemplo ilustrativo de cuatro compases en 4/4. Las frases no duran necesariamente cuatro compases y los BPM no identifican por sí solos sus límites.">
  <div className={s.hierarchy}><div className={s.hierarchyTop}><b>128 BPM</b><span>Frecuencia del pulso elegido</span></div><div className={s.barGroups}>{[0,1,2,3].map(bar=><div key={bar} className={s.barGroup}><span>COMPÁS {bar+1}</span><div>{[1,2,3,4].map(beat=><strong key={beat} data-strong={beat===1}>{beat}</strong>)}</div></div>)}</div><div className={s.hierarchyBottom}>GRUPO DE CUATRO COMPASES · Referencia de escucha, no longitud universal de frase</div></div>
 </Figure>;
}
export function TempoPracticeWorksheetEs(){
 const tasks=[['Encuentra el pulso','Escucha sin mirar los BPM y marca un pulso regular.'],['Cuenta 15 segundos','¿Cuántos intervalos completos entre pulsos has contado?'],['Estima los BPM','Multiplica el conteo por cuatro y anota la posible imprecisión.'],['Prueba el doble o la mitad','¿Podrías sentir el mismo groove a la mitad o al doble?'],['Compara sensaciones','Elige otra pista a BPM similares, pero con un ritmo diferente.']];
 return <Figure title="HOJA DE PRÁCTICA DE TEMPO" description="Cinco ejercicios repetibles" note="Imprime la página o copia las consignas a tu biblioteca DJ. No se recogen ni guardan datos personales.">
  <ol className={s.worksheet}>{tasks.map(([title,desc],i)=><li key={title}><span className={s.number}>{String(i+1).padStart(2,'0')}</span><div><strong>{title}</strong><p>{desc}</p><div className={s.writeLine} aria-hidden="true"/></div></li>)}</ol>
 </Figure>;
}
export function SameTempoDifferentGroovesEs(){
 const rows=[{label:'CUATRO AL PISO RECTO',kick:[1,0,1,0,1,0,1,0],palma:[0,0,1,0,0,0,1,0],charles:[1,1,1,1,1,1,1,1]},{label:'EJEMPLO SINCOPADO',kick:[1,0,0,1,1,0,0,1],palma:[0,0,1,0,0,0,1,0],charles:[0,1,1,0,0,1,1,0]}];
 return <Figure title="MISMOS BPM, DISTINTO GROOVE" description="Dos patrones ficticios de un compás a 120 BPM" note="Son ejemplos gráficos, no audio reproducible. Ambos patrones comparten rejilla temporal, pero sus acentos producen sensaciones diferentes. Podrían añadirse muestras propias más adelante.">
   <div className={s.grooveRows}>{rows.map(row=><div key={row.label} className={s.groove}><strong>{row.label}</strong>{([{key:'kick',tone:'kick',label:'BOMBO'},{key:'palma',tone:'clap',label:'PALMA'},{key:'charles',tone:'hat',label:'CHARLES'}] as const).map(({key,tone,label})=><div className={s.grooveLine} key={key}><small>{label}</small><div className={s.eightGrid}>{row[key].map((v,i)=><span key={i} className={v?s.layerHit:s.layerMiss} data-tone={tone}>{v?'●':'·'}</span>)}</div></div>)}</div>)}</div>
 </Figure>;
}
export { BPMCalculatorEs };
