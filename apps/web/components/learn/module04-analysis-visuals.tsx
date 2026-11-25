import type { ReactNode } from 'react';
import s from './module04-analysis-visuals.module.css';
type Lang = 'en' | 'es';
const tr = (l: Lang, en: string, es: string) => l === 'es' ? es : en;
type CardData = { title: string; detail: string; tone?: 'cyan' | 'pink' | 'yellow' };
function Figure({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return <figure className={s.figure}><figcaption className={s.title}>{title}</figcaption>{children}<p className={s.note}>{note}</p></figure>;
}
function Card({title, detail, tone='cyan'}:CardData) {return <div className={s.card} data-tone={tone}><strong>{title}</strong><span>{detail}</span></div>}
function Cards({items}:{items:CardData[]}){return <div className={s.cards}>{items.map((item,i)=><Card key={i} {...item}/>)}</div>}
function AnalysisPipeline({lang:l}:{lang:Lang}){
 const items:CardData[]=[
 {title:tr(l,'Audio file','Archivo de audio'),detail:tr(l,'The source remains the source','La fuente original sigue siendo la fuente')},
 {title:tr(l,'Audio features','Rasgos acústicos'),detail:tr(l,'Onsets, energy, harmonic content','Ataques, energía, contenido armónico'),tone:'yellow'},
 {title:tr(l,'Estimates','Estimaciones'),detail:tr(l,'BPM, beats, grid, key, waveform','BPM, pulsos, grid, tonalidad y forma de onda'),tone:'pink'},
 {title:tr(l,'Library metadata','Metadatos de biblioteca'),detail:tr(l,'Results can be checked or overridden','Los resultados se pueden comprobar o modificar')}
 ];
 return <Figure title={tr(l,'Analysis produces estimates, not guarantees','El análisis genera estimaciones, no garantías')} note={tr(l,'Different algorithms and application versions can give different results from the same source.','Distintos algoritmos y versiones pueden dar resultados diferentes para el mismo archivo.')}><div className={s.flow}>{items.map((item,i)=><div className={s.flowItem} key={i}>{i>0&&<span className={s.arrow} aria-hidden="true">↓</span>}<Card {...item}/></div>)}</div></Figure>
}
function TempoHalfDoubleExamples({lang:l}:{lang:Lang}){
 const rows=[{perceived:'128',half:'64',double:'256'},{perceived:'90',half:'45',double:'180'},{perceived:'140',half:'70',double:'280'}];
 return <Figure title={tr(l,'A pulse can have several valid metrical levels','Un pulso puede interpretarse en varias escalas')} note={tr(l,'Numbers are hypothetical. Double-time or half-time labels do not necessarily mean the audio was played faster or slower.','Cifras hipotéticas. Leer a mitad o doble tempo no significa que el audio se reproduzca más lento o rápido.')}><div className={s.tableWrap}><table className={s.table}><thead><tr><th>{tr(l,'Listening reference','Referencia auditiva')}</th><th>{tr(l,'Half-time','Mitad')}</th><th>{tr(l,'Double-time','Doble')}</th></tr></thead><tbody>{rows.map((r,i)=><tr key={i}><td>{r.perceived} BPM</td><td>{r.half} BPM</td><td>{r.double} BPM</td></tr>)}</tbody></table></div></Figure>
}
function BeatgridAnchorDrift({lang:l}:{lang:Lang}){
 return <Figure title={tr(l,'A beatgrid can be offset or drift over time','El beatgrid puede estar desplazado o derivar')} note={tr(l,'Illustration only: evenly spaced beat markers cannot describe every live or tempo-changing recording.','Diagrama conceptual: una cuadrícula uniforme no describe necesariamente una grabación con tempo variable.')}><div className={s.gridDemo}><strong>{tr(l,'Aligned reference','Referencia alineada')}</strong><div className={s.beatRow}>{[0,1,2,3,4,5,6,7].map(x=><span key={x} className={s.goodBeat}>│</span>)}</div><strong>{tr(l,'Offset from the start','Desplazada desde el inicio')}</strong><div className={s.beatRow}>{[0,1,2,3,4,5,6,7].map(x=><span key={x} className={s.offBeat}>│</span>)}</div><strong>{tr(l,'Gradual drift','Deriva progresiva')}</strong><div className={s.beatRow}>{[0,1,2,3,4,5,6,7].map(x=><span key={x} className={s.driftBeat} style={{transform:`translateX(${x*2.4}px)`}}>│</span>)}</div></div></Figure>
}
function KeyEstimateConfidence({lang:l}:{lang:Lang}){
 const data:CardData[]=[{title:tr(l,'Tonal centre','Centro tonal'),detail:tr(l,'May be ambiguous or change','Puede ser ambiguo o cambiar')},{title:tr(l,'Major / minor','Mayor / menor'),detail:tr(l,'Modal mixture can confuse classifiers','La mezcla modal complica la clasificación'),tone:'yellow'},{title:tr(l,'Percussive passages','Pasajes percusivos'),detail:tr(l,'Little stable pitch information','Poca información de altura estable'),tone:'pink'},{title:tr(l,'Arrangement','Arreglo'),detail:tr(l,'Bass, melody and chords can disagree','Bajo, melodía y acordes pueden diferir')}];
 return <Figure title={tr(l,'Why automatic key labels sometimes disagree','Por qué pueden discrepar las etiquetas de tonalidad')} note={tr(l,'A detected key is a classification hypothesis. Do not infer reliability from a Camelot label alone.','Una tonalidad detectada es una hipótesis de clasificación. El código Camelot no garantiza fiabilidad.')}><Cards items={data}/></Figure>
}
function WaveformSpectralView({lang:l}:{lang:Lang}){
 return <Figure title={tr(l,'Waveform shape is not a full musical score','La forma de onda no es una partitura completa')} note={tr(l,'Bars are an invented illustration. Height primarily shows amplitude/energy in the displayed representation, not a guaranteed kick, phrase boundary or musical key.','Barras ilustrativas. La altura representa principalmente amplitud o energía en esa visualización, no garantiza bombos, frases ni tonalidad.')}><div className={s.waveBox} role="img" aria-label={tr(l,'Illustrative waveform with a quieter passage followed by a louder passage','Forma de onda ilustrativa: sección suave seguida de sección más intensa')}><div className={s.wave}>{Array.from({length:48},(_,i)=>{const val=i<15?8+i%4*2:i<32?16+(i*7)%18:26+(i*5)%20;return <span key={i} style={{height:`${val}px`}}/>})}</div></div><div className={s.legend}><span>{tr(l,'Lower amplitude','Menor amplitud')}</span><span>{tr(l,'Higher amplitude','Mayor amplitud')}</span></div></Figure>
}
function AnalysisMetadataVsAudio({lang:l}:{lang:Lang}){
 return <Figure title={tr(l,'The audio and its database record are different things','El audio y su registro en la biblioteca son cosas distintas')} note={tr(l,'A metadata edit changes how your DJ application interprets or displays a track; it does not necessarily alter the source audio.','Cambiar metadatos modifica cómo el programa interpreta o muestra el tema; no implica modificar el archivo de audio.')}><div className={s.split}><Card title={tr(l,'Audio content','Contenido de audio')} detail={tr(l,'Recorded samples and musical performance','Muestras grabadas e interpretación musical')}/><Card title={tr(l,'Analysis record','Registro de análisis')} detail={tr(l,'Estimated BPM, beatgrid markers, key, cues, waveform cache','BPM, marcadores del grid, tonalidad, cues y caché visual estimados')} tone="pink"/></div></Figure>
}
function AnalysisRiskChecklist({lang:l}:{lang:Lang}){
 const rows=l==='es'?[['Batería en directo','Comprueba el grid en varios puntos'],['Intro sin percusión','Revisa dónde empieza el pulso'],['Síncopas y contratiempos','No confundas ataques con el beat'],['Cambio de tempo','Busca deriva a lo largo del tema'],['Arreglo con modulación','La tonalidad puede cambiar'],['Pista mal identificada','Comprueba versión, edit y archivo']]:[['Live drums','Check the grid in several sections'],['Beatless intro','Find where the pulse starts'],['Syncopation','Do not confuse onsets with beats'],['Tempo change','Look for drift across the track'],['Modulating arrangement','Key may change during the song'],['Wrong track identity','Confirm version, edit and audio file']];
 return <Figure title={tr(l,'When to review automatic analysis manually','Cuándo revisar el análisis automático')} note={tr(l,'These are review triggers, not proof that the algorithm is wrong.','Son señales para revisar, no pruebas de que el algoritmo esté equivocado.')}><div className={s.tableWrap}><table className={s.table}><thead><tr><th>{tr(l,'Signal','Señal')}</th><th>{tr(l,'First check','Primera comprobación')}</th></tr></thead><tbody>{rows.map((r,i)=><tr key={i}><td>{r[0]}</td><td>{r[1]}</td></tr>)}</tbody></table></div></Figure>
}
function TrackAnalysisWorksheet({lang:l}:{lang:Lang}){
 const fields=l==='es'?['Identificador del tema y versión','BPM detectado y pulsación percibida','BPM mitad/doble si procede','Tonalidad estimada y confianza auditiva','Alineación del grid al inicio','Alineación en la mitad y el final','Avisos: intro libre, batería humana, cambios','Decisión: confiar, revisar o posponer']:['Track identity and version','Detected BPM and perceived pulse','Half/double alternative where relevant','Detected key and listening confidence','Beatgrid alignment at the start','Alignment at middle and ending','Warnings: rubato, live drums, changes','Decision: trust, review or defer'];
 return <Figure title={tr(l,'Eight-point track analysis log','Ficha de análisis de ocho puntos')} note={tr(l,'Use three contrasting local tracks. Observe and record; leave manual editing for the following module.','Utiliza tres archivos locales diferentes. Observa y registra; la corrección manual se aborda en el módulo siguiente.')}><ol className={s.worksheet}>{fields.map((f,i)=><li key={i}><span className={s.number}>{String(i+1).padStart(2,'0')}</span><strong>{f}</strong><span className={s.blank} aria-hidden="true"/></li>)}</ol></Figure>
}
export const AnalysisPipelineEn = () => <AnalysisPipeline lang="en"/>;
export const AnalysisPipelineEs = () => <AnalysisPipeline lang="es"/>;
export const TempoHalfDoubleExamplesEn = () => <TempoHalfDoubleExamples lang="en"/>;
export const TempoHalfDoubleExamplesEs = () => <TempoHalfDoubleExamples lang="es"/>;
export const BeatgridAnchorDriftEn = () => <BeatgridAnchorDrift lang="en"/>;
export const BeatgridAnchorDriftEs = () => <BeatgridAnchorDrift lang="es"/>;
export const KeyEstimateConfidenceEn = () => <KeyEstimateConfidence lang="en"/>;
export const KeyEstimateConfidenceEs = () => <KeyEstimateConfidence lang="es"/>;
export const WaveformSpectralViewEn = () => <WaveformSpectralView lang="en"/>;
export const WaveformSpectralViewEs = () => <WaveformSpectralView lang="es"/>;
export const AnalysisMetadataVsAudioEn = () => <AnalysisMetadataVsAudio lang="en"/>;
export const AnalysisMetadataVsAudioEs = () => <AnalysisMetadataVsAudio lang="es"/>;
export const AnalysisRiskChecklistEn = () => <AnalysisRiskChecklist lang="en"/>;
export const AnalysisRiskChecklistEs = () => <AnalysisRiskChecklist lang="es"/>;
export const TrackAnalysisWorksheetEn = () => <TrackAnalysisWorksheet lang="en"/>;
export const TrackAnalysisWorksheetEs = () => <TrackAnalysisWorksheet lang="es"/>;
