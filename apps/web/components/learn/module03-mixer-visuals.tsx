import type { ReactNode } from 'react';
import s from './module03-mixer-visuals.module.css';

type Lang = 'en' | 'es';
type Props = { lang: Lang };
const tr = (lang: Lang, en: string, es: string) => lang === 'es' ? es : en;
function Diagram({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return <figure className={s.figure}><figcaption className={s.title}>{title}</figcaption>{children}<p className={s.caption}>{caption}</p></figure>;
}
function Tile({ heading, detail, tone='cyan' }: { heading: string; detail?: string; tone?: 'cyan'|'pink'|'yellow'|'neutral' }) {
  return <div className={s.tile} data-tone={tone}><strong>{heading}</strong>{detail && <small>{detail}</small>}</div>;
}
function Flow({ steps }: { steps: Array<{ name: string; detail?: string; tone?: 'cyan'|'pink'|'yellow'|'neutral' }> }) {
  return <div className={s.flow}>{steps.map((step,i)=><div className={s.flowItem} key={`${i}-${step.name}`}><Tile heading={step.name} detail={step.detail} tone={step.tone}/>{i<steps.length-1 && <span className={s.arrow} aria-hidden="true">→</span>}</div>)}</div>;
}
export function MixerOverview({lang}:Props) {
 const cards=[
  [tr(lang,'SELECT INPUT','ELEGIR ENTRADA'),tr(lang,'Source / line / phono','Fuente / línea / phono'),'cyan'],
  [tr(lang,'ADJUST CHANNEL','AJUSTAR CANAL'),tr(lang,'Trim, EQ, filter, fader','Trim, EQ, filtro, fader'),'yellow'],
  [tr(lang,'MONITOR PRIVATELY','PREESCUCHAR'),tr(lang,'Headphone cue / PFL','Cue / PFL en auriculares'),'pink'],
  [tr(lang,'SEND OUTPUTS','ENVIAR SALIDAS'),tr(lang,'Master / booth / recording','Master / booth / grabación'),'cyan'],
 ] as const;
 return <Diagram title={tr(lang,'A mixer is a routing system','Una mesa es un sistema de rutas')} caption={tr(lang,'The four jobs may overlap and do not describe a universal internal circuit order.','Las funciones pueden solaparse y no describen un orden interno universal de circuitos.')}><div className={s.four}>{cards.map(([heading,detail,tone],i)=><div className={s.job} key={heading} data-tone={tone}><span>0{i+1}</span><strong>{heading}</strong><small>{detail}</small></div>)}</div></Diagram>;
}
export function MixerSignalFlow({lang}:Props) {
 return <Diagram title={tr(lang,'Follow one channel from source to speakers','Sigue un canal desde la fuente hasta los altavoces')} caption={tr(lang,'Representative route, not a schematic for a particular manufacturer. EQ, filter, cue and crossfader tap points vary by model.','Recorrido representativo, no diagrama eléctrico de una marca concreta. Los puntos de EQ, filtro, cue y crossfader dependen del modelo.')}>
  <Flow steps={[{name:tr(lang,'Player output','Salida del reproductor'),tone:'cyan'},{name:tr(lang,'Input + source select','Entrada + selector'),tone:'cyan'},{name:tr(lang,'Trim / channel gain','Trim / ganancia'),tone:'yellow'},{name:'EQ / FILTER',tone:'yellow'},{name:tr(lang,'Channel / crossfader routing','Fader / ruta de crossfader'),tone:'pink'},{name:tr(lang,'Master bus + output','Bus y salida MASTER'),tone:'pink'}]}/>
  <div className={s.routeNote}><strong>CUE / PFL</strong><span>{tr(lang,'Independent headphone monitoring branch; its exact tap point depends on mixer design.','Rama de preescucha independiente; el punto de toma depende de cada mesa.')}</span></div>
 </Diagram>;
}
export function MixerStripAnatomy({lang}:Props) {
 const parts=[['INPUT',tr(lang,'Choose physical source','Selecciona fuente física')],['TRIM / GAIN',tr(lang,'Set input level','Ajusta nivel de entrada')],['HI / MID / LOW',tr(lang,'Shape frequency balance','Equilibra frecuencias')],['FILTER',tr(lang,'Adjust spectral range','Modifica el espectro')],['CUE / PFL',tr(lang,'Listen privately','Escucha privada')],['CH FADER',tr(lang,'Set channel contribution','Dosifica el canal')]];
 return <Diagram title={tr(lang,'Read a channel strip from top to bottom','Interpreta una tira de canal de arriba abajo')} caption={tr(lang,'Positions are illustrative; some mixers omit controls or place them differently. Effects and routing can add extra stages.','Las posiciones son ilustrativas; algunas mesas no incluyen todos los controles o los colocan en otro orden. Los efectos y rutas pueden añadir etapas.')}>
 <div className={s.stripLayout}><div className={s.strip} aria-label={tr(lang,'Schematic channel strip with input, trim, EQ, filter, cue and channel fader','Tira de canal esquemática con entrada, ganancia, EQ, filtro, cue y fader')}><span className={s.stripHead}>CH 1</span>{parts.map(([name])=><div key={name} className={s.stripPart}><span>{name}</span><span className={name==='CH FADER'?s.fader:s.knob} aria-hidden="true"/></div>)}</div><ol className={s.parts}>{parts.map(([name,desc])=><li key={name}><b>{name}</b> — {desc}</li>)}</ol></div>
 </Diagram>;
}
export function MixerCueRouting({lang}:Props) {
 return <Diagram title={tr(lang,'Three routes that should not be confused','Tres rutas que no debemos confundir')} caption={tr(lang,'Cue and booth features depend on mixer capabilities. Booth commonly follows the program mix but can have separate level control.','Las funciones de cue y booth dependen de la mesa. Booth suele seguir la mezcla principal pero puede tener volumen independiente.')}>
 <div className={s.routes}><div className={s.route}><Tile heading={tr(lang,'Channel A + B','Canales A + B')}/><span className={s.arrow}>→</span><Tile heading="MASTER" detail={tr(lang,'Audience / PA','Público / PA')} tone="pink"/></div><div className={s.route}><Tile heading={tr(lang,'Selected CUE channels','Canales CUE seleccionados')}/><span className={s.arrow}>→</span><Tile heading="PHONES" detail={tr(lang,'Private headphones','Auriculares privados')} tone="yellow"/></div><div className={s.route}><Tile heading={tr(lang,'Program mix','Mezcla principal')}/><span className={s.arrow}>→</span><Tile heading="BOOTH" detail={tr(lang,'Local DJ monitors','Monitores de cabina')} tone="cyan"/></div></div>
 </Diagram>;
}
export function MixerFadersAndCrossfader({lang}:Props) {
 return <Diagram title={tr(lang,'Channel faders, crossfader and assignment','Faders de canal, crossfader y asignación')} caption={tr(lang,'A crossfader can be disabled, assigned per channel or configured with a different curve. Never assume its routing without checking.','El crossfader puede desactivarse, asignarse por canal o tener distinta curva. No presupongas su ruta sin comprobarla.')}>
 <div className={s.two}><div className={s.panel}><b>{tr(lang,'Channel faders','Faders de canal')}</b><div className={s.faderDuo}><div><span>CH 1</span><div className={s.vertTrack}><i style={{bottom:'68%'}}/></div></div><div><span>CH 2</span><div className={s.vertTrack}><i style={{bottom:'34%'}}/></div></div></div><p>{tr(lang,'Each fader sets its own channel contribution.','Cada fader dosifica su propio canal.')}</p></div><div className={s.panel}><b>CROSSFADER</b><div className={s.horizontalTrack}><i style={{left:'35%'}}/></div><div className={s.ends}><span>A</span><span>B</span></div><p>{tr(lang,'Blends or cuts assigned sides; behaviour depends on the curve and channel assignments.','Combina o corta los lados asignados; depende de la curva y las asignaciones.')}</p></div></div>
 </Diagram>;
}
export function MixerLevelStages({lang}:Props) {
 const levels=[{name:tr(lang,'INPUT / TRIM','ENTRADA / TRIM'),value:68},{name:tr(lang,'CHANNEL METER','MEDIDOR DE CANAL'),value:73},{name:tr(lang,'MASTER BUS','BUS MASTER'),value:64},{name:tr(lang,'OUTPUT / PA','SALIDA / PA'),value:58}];
 return <Diagram title={tr(lang,'Follow level through the system','Sigue los niveles a lo largo del sistema')} caption={tr(lang,'Bars are illustrative, not decibel measurements. A lower master knob cannot repair distortion already created upstream.','Las barras son ilustrativas, no mediciones en decibelios. Bajar MASTER no corrige una distorsión creada antes.')}><div className={s.meters}>{levels.map(item=><div className={s.meterRow} key={item.name}><span>{item.name}</span><div className={s.meterTrack}><div style={{width:`${item.value}%`}}/></div></div>)}</div><div className={s.routeNote}><strong>{tr(lang,'Headroom first','Primero, margen')}</strong><span>{tr(lang,'Avoid clipping at input, channel or master stages; use the indicators specified by the manufacturer.','Evita saturar entrada, canal o master; interpreta los indicadores según el fabricante.')}</span></div></Diagram>;
}
export function MixerConnectorMatrix({lang}:Props) {
 const rows=[['LINE',tr(lang,'Players / interfaces','Reproductores / interfaces'),tr(lang,'Line-level audio','Audio de nivel línea')],['PHONO',tr(lang,'Suitable turntable cartridge','Cápsula de plato compatible'),tr(lang,'Requires phono preamplification / RIAA where appropriate','Requiere previo phono / RIAA según corresponda')],['MIC',tr(lang,'Microphone','Micrófono'),tr(lang,'Dedicated mic input and gain','Entrada y ganancia de micro')],['MASTER',tr(lang,'PA / speakers / next processor','PA / altavoces / siguiente procesador'),tr(lang,'Main program output','Salida principal')],['BOOTH',tr(lang,'DJ monitor system','Monitores DJ'),tr(lang,'Often independent output level','A menudo con nivel independiente')],['REC',tr(lang,'Recorder / interface','Grabadora / interfaz'),tr(lang,'Recording output where fitted','Salida de grabación si existe')]];
 return <Diagram title={tr(lang,'Inputs and outputs: read the labels before wiring','Entradas y salidas: lee las etiquetas antes de cablear')} caption={tr(lang,'Connectors such as RCA, XLR and jack do not alone determine signal level. Check the actual label, balanced wiring and device manual.','Los conectores RCA, XLR o jack no determinan por sí solos el nivel. Consulta etiqueta, conexión balanceada y manual.')}><div className={s.tableWrap}><table className={s.table}><thead><tr><th>{tr(lang,'Port','Puerto')}</th><th>{tr(lang,'Common use','Uso habitual')}</th><th>{tr(lang,'Key consideration','Precaución')}</th></tr></thead><tbody>{rows.map(row=><tr key={row[0]}>{row.map((cell,i)=><td key={i}>{cell}</td>)}</tr>)}</tbody></table></div></Diagram>;
}
export function MixerDiagnosisWorksheet({lang}:Props) {
 const steps=[tr(lang,'Confirm source and cable','Confirma fuente y cable'),tr(lang,'Check LINE / PHONO / INPUT selector','Revisa LINE / PHONO / selector'),tr(lang,'Read channel meter and TRIM','Observa medidor y TRIM'),tr(lang,'Check cue and headphone level','Comprueba cue y volumen de auriculares'),tr(lang,'Check channel fader and crossfader assignment','Comprueba fader y asignación del crossfader'),tr(lang,'Verify master / booth outputs and downstream equipment','Verifica master / booth y equipos posteriores')];
 return <Diagram title={tr(lang,'Troubleshoot one stage at a time','Diagnostica una etapa cada vez')} caption={tr(lang,'Stop if you notice excessive level, feedback, unusual heat or damaged wiring. Never alter mains-power connections while equipment is energized.','Detente ante niveles excesivos, acoples, calor anormal o cables dañados. No manipules conexiones de alimentación con tensión.')}><ol className={s.checklist}>{steps.map((step,i)=><li key={step}><span className={s.checkNum}>{i+1}</span><span>{step}</span></li>)}</ol><p className={s.printHint}>{tr(lang,'Practice: note the first stage with no signal and the first stage with a healthy signal. Compare with the manual.','Práctica: anota la primera etapa sin señal y la primera con señal correcta. Contrástalo con el manual.')}</p></Diagram>;
}

export const MixerOverviewEn = () => <MixerOverview lang="en"/>;
export const MixerOverviewEs = () => <MixerOverview lang="es"/>;
export const MixerSignalFlowEn = () => <MixerSignalFlow lang="en"/>;
export const MixerSignalFlowEs = () => <MixerSignalFlow lang="es"/>;
export const MixerStripAnatomyEn = () => <MixerStripAnatomy lang="en"/>;
export const MixerStripAnatomyEs = () => <MixerStripAnatomy lang="es"/>;
export const MixerCueRoutingEn = () => <MixerCueRouting lang="en"/>;
export const MixerCueRoutingEs = () => <MixerCueRouting lang="es"/>;
export const MixerFadersAndCrossfaderEn = () => <MixerFadersAndCrossfader lang="en"/>;
export const MixerFadersAndCrossfaderEs = () => <MixerFadersAndCrossfader lang="es"/>;
export const MixerLevelStagesEn = () => <MixerLevelStages lang="en"/>;
export const MixerLevelStagesEs = () => <MixerLevelStages lang="es"/>;
export const MixerConnectorMatrixEn = () => <MixerConnectorMatrix lang="en"/>;
export const MixerConnectorMatrixEs = () => <MixerConnectorMatrix lang="es"/>;
export const MixerDiagnosisWorksheetEn = () => <MixerDiagnosisWorksheet lang="en"/>;
export const MixerDiagnosisWorksheetEs = () => <MixerDiagnosisWorksheet lang="es"/>;
