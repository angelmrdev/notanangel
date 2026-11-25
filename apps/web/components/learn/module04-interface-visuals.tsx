import type { ReactNode } from 'react';
import s from './module04-interface-visuals.module.css';

type Lang = 'en' | 'es';
const tr = (lang: Lang, en: string, es: string) => lang === 'es' ? es : en;

type Tone = 'cyan' | 'pink' | 'yellow';
function Figure({title, caption, children}: {title:string;caption:string;children:ReactNode}) {
  return <figure className={s.figure}><figcaption className={s.heading}>{title}</figcaption>{children}<p className={s.caption}>{caption}</p></figure>;
}
function Tile({title,detail,tone='cyan'}:{title:string;detail:string;tone?:Tone}) {
  return <div className={s.tile} data-tone={tone}><strong>{title}</strong><span>{detail}</span></div>;
}
function Cards({items}:{items:{title:string;detail:string;tone?:Tone}[]}) {
  return <div className={s.cards}>{items.map((item,i)=><Tile key={`${i}-${item.title}`} {...item}/>)}</div>;
}
function Sequence({items}:{items:{title:string;detail:string;tone?:Tone}[]}) {
  return <div className={s.sequence}>{items.map((item,i)=><div className={s.sequenceItem} key={`${i}-${item.title}`}>{i>0&&<span className={s.arrow} aria-hidden="true">→</span>}<Tile {...item}/></div>)}</div>;
}
function SoftwareInterfaceZones({lang:l}:{lang:Lang}) {
 const en=[['Library / browser','Search, sort and choose tracks'],['Deck A + B','Loaded music, playback state and transport'],['Waveforms','Overview, detail and position markers'],['Mixer section','Channel levels, EQ, faders and routing'],['Status / settings','Device, connection, recording or performance state']];
 const es=[['Biblioteca / navegador','Buscar, ordenar y seleccionar temas'],['Decks A + B','Pistas cargadas, reproducción y transporte'],['Formas de onda','Vista general, detalle y posición'],['Zona de mezcla','Niveles, EQ, faders y rutas'],['Estado / ajustes','Dispositivo, conexión, grabación y rendimiento']];
 return <Figure title={tr(l,'Five areas to identify first','Cinco zonas que debes reconocer')} caption={tr(l,'Actual screen layouts and available panels differ between software and selected views.','La ubicación de las zonas y los paneles disponibles cambian según el programa y la vista.')}><Cards items={(l==='es'?es:en).map(([title,detail],i)=>({title,detail,tone:(['cyan','pink','yellow'] as Tone[])[i%3]}))}/></Figure>;
}
function SoftwareTwoDeckMap({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Two virtual decks and one browser','Dos decks virtuales y un navegador')} caption={tr(l,'This is an orientation map, not a screenshot of a particular product. Mixer controls may be assigned to external hardware.','Mapa conceptual, no captura de un producto. Algunos controles de mezcla pueden estar en hardware externo.')}>
 <div className={s.screen}>
 <div className={s.screenTop}><Tile title={tr(l,'DECK A · playing','DECK A · sonando')} detail={tr(l,'Title, waveform, tempo, position','Título, onda, tempo, posición')} tone="pink"/><Tile title={tr(l,'DECK B · paused','DECK B · pausado')} detail={tr(l,'Title, waveform, tempo, position','Título, onda, tempo, posición')} tone="cyan"/></div>
 <div className={s.screenCenter}><span>{tr(l,'MIXER / LEVELS / CUE','MESA / NIVELES / CUE')}</span></div>
 <div className={s.screenBottom}><strong>{tr(l,'BROWSER + LIBRARY','NAVEGADOR + BIBLIOTECA')}</strong><span>{tr(l,'Search • choose • select destination • load','Buscar • elegir • indicar destino • cargar')}</span></div>
 </div></Figure>;
}
function SoftwareBrowserLoadFlow({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Selection is not loading or playback','Seleccionar no es cargar ni reproducir')} caption={tr(l,'Before LOAD, check the selected row, destination deck and playback status. Load-protection behaviour depends on the app.','Antes de LOAD, comprueba la fila, el deck de destino y si está sonando. La protección depende del programa.')}>
 <Sequence items={[{title:tr(l,'Select library row','Seleccionar fila'),detail:tr(l,'Choose a candidate','Elegir una canción')},{title:tr(l,'Confirm deck A/B','Confirmar deck A/B'),detail:tr(l,'Check active playback','Comprobar reproducción'),tone:'yellow'},{title:tr(l,'Load into deck','Cargar en deck'),detail:tr(l,'Verify title and state','Revisar título y estado'),tone:'pink'},{title:tr(l,'Start when ready','Reproducir cuando toque'),detail:tr(l,'Use PLAY / CUE','Usar PLAY / CUE')}]}/></Figure>;
}
const wave=[3,9,5,19,11,21,7,5,8,12,26,34,39,29,23,32,36,18,7,4,5,8,10,18,25,32,35,38,30,19,7,3,4,9,16,25,33,29,13,6];
function Wave({detailed=false,lang}:{detailed?:boolean;lang:Lang}) {
 const vals=detailed?wave.slice(9,29):wave;
 return <div className={s.wave} role="img" aria-label={detailed?tr(lang,'Detailed audio waveform, conceptual','Forma de onda detallada, esquema'):tr(lang,'Full-track audio waveform, conceptual','Forma de onda general, esquema')}>{vals.map((h,i)=><span key={i} className={s.waveBar} style={{height:`${Math.max(10,h*2)}%`}}/>)}<span className={s.playhead}/></div>;
}
function SoftwareWaveformViews({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Whole-track overview vs local detail','Toda la canción frente a un detalle cercano')} caption={tr(l,'Amplitude patterns are illustrative, not a measurement or a promise of musical structure. Colours do not have universal meaning.','Ondas ilustrativas, no una medición ni una garantía de estructura musical. Los colores no significan lo mismo en todos los programas.')}>
 <div className={s.waveGroup}><strong>{tr(l,'Overview · entire track','Vista general · canción completa')}</strong><Wave lang={l}/><strong>{tr(l,'Detailed · zoomed playback vicinity','Vista detallada · entorno del cabezal')}</strong><Wave detailed lang={l}/></div></Figure>;
}
function SoftwarePlayheadTimeline({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Playhead, elapsed/remaining time and zoom','Cabezal, tiempo y zoom')} caption={tr(l,'Zoom changes display scale, not playback BPM. A centred playhead may be accompanied by a moving waveform.','El zoom cambia la escala visual, no los BPM. El cabezal puede quedarse centrado mientras se desplaza la onda.')}>
 <div className={s.timeline}><div className={s.timeLabels}><span>00:00</span><strong>{tr(l,'PLAYHEAD','CABEZAL')}</strong><span>04:00</span></div><div className={s.track}><span className={s.trackPlayhead}/></div><div className={s.timeLabels}><span>{tr(l,'Elapsed: 01:35','Transcurrido: 01:35')}</span><span>{tr(l,'Remaining: 02:25','Restante: 02:25')}</span></div></div></Figure>;
}
function SoftwareDeckReadouts({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Labels that seem similar but are not','Datos que parecen iguales, pero no lo son')} caption={tr(l,'125 BPM × 1.04 ≈ 130 BPM. Software readout names, Sync and Key Lock behaviour vary.','125 BPM × 1,04 ≈ 130 BPM. Los indicadores, Sync y Key Lock varían según el programa.')}>
 <Cards items={[{title:tr(l,'Analysed BPM','BPM analizados'),detail:'125.0',tone:'cyan'},{title:tr(l,'Tempo setting','Ajuste tempo'),detail:'+4.0%',tone:'yellow'},{title:tr(l,'Playing BPM','BPM actuales'),detail:'130.0',tone:'pink'},{title:tr(l,'Key readout','Indicador de tonalidad'),detail:tr(l,'Estimate / interpretation varies','Estimación / presentación variable'),tone:'cyan'}]}/></Figure>;
}
function SoftwareBeatgridReading({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Grid line ≠ guaranteed audible beat','Línea del grid ≠ pulso audible garantizado')} caption={tr(l,'Illustrative example: at one position the lines coincide; later they may drift. Diagnose first, repair in Module 05.','Ejemplo ilustrativo: al principio coinciden y después pueden desplazarse. Detecta el fallo; se corrige en el módulo 05.')}>
 <div className={s.gridPair}><div><strong>{tr(l,'Grid aligned','Grid alineado')}</strong><div className={s.beatRow}>{[0,1,2,3].map(i=><div className={s.beat} key={i}><span className={s.gridLine}/><span className={s.hit}/></div>)}</div></div><div><strong>{tr(l,'Grid drifting','Grid desfasado')}</strong><div className={s.beatRow}>{[0,1,2,3].map(i=><div className={s.beat} key={i}><span className={s.gridLine}/><span className={s.hit} style={{left:`${35+i*10}%`}}/></div>)}</div></div></div></Figure>;
}
function SoftwareLibrarySafetyChecklist({lang:l}:{lang:Lang}) {
 const rows=l==='es'?[['Buscar','Comprueba el nombre de la canción y el artista'],['Verificar','Revisa si la fuente está disponible'],['Elegir destino','Observa qué deck está sonando'],['Cargar','Usa el deck de destino correcto'],['Confirmar','Comprueba título y controles de reproducción']]:[['Find','Confirm title and artist'],['Verify','Check the source is available'],['Target','See which deck is playing'],['Load','Use the intended destination deck'],['Confirm','Check title and transport state']];
 return <Figure title={tr(l,'Safe loading checklist','Lista para cargar sin sustos')} caption={tr(l,'A highlighted track, visible waveform or available LOAD button does not guarantee the deck is safe to replace.','Una fila resaltada, una onda visible o un botón LOAD disponible no garantizan que sea seguro sustituir la pista.')}><ol className={s.checklist}>{rows.map(([a,b],i)=><li key={a}><span className={s.index}>{i+1}</span><div><strong>{a}</strong><p>{b}</p></div></li>)}</ol></Figure>;
}
function SoftwareInterfacePractice({lang:l}:{lang:Lang}) {
 const fields=l==='es'?['Biblioteca y fila seleccionada','Deck A/B cargado y estado PLAY','Onda general y onda detallada','Cabezal y contador de tiempo','BPM originales y actuales','MASTER y CUE','Protección de carga (si existe)','Distribución al cambiar ventana']:['Browser and selected row','Loaded deck A/B and PLAY state','Overview and detailed waveform','Playhead and time counter','Original and playing BPM','MASTER and CUE','Load protection (if available)','Layout when resizing window'];
 return <Figure title={tr(l,'Label a real screenshot of your DJ application','Etiqueta una captura real de tu programa DJ')} caption={tr(l,'Use your actual interface. If a feature is not offered by the current software or hardware, mark it unavailable rather than assuming its location.','Usa tu interfaz real. Si una función no existe en el programa o equipo, anótalo en lugar de inventar su posición.')}><ol className={s.checklist}>{fields.map((f,i)=><li key={f}><span className={s.index}>{i+1}</span><div>{f}</div></li>)}</ol></Figure>;
}
export const SoftwareInterfaceZonesEn = () => <SoftwareInterfaceZones lang="en"/>;
export const SoftwareInterfaceZonesEs = () => <SoftwareInterfaceZones lang="es"/>;
export const SoftwareTwoDeckMapEn = () => <SoftwareTwoDeckMap lang="en"/>;
export const SoftwareTwoDeckMapEs = () => <SoftwareTwoDeckMap lang="es"/>;
export const SoftwareBrowserLoadFlowEn = () => <SoftwareBrowserLoadFlow lang="en"/>;
export const SoftwareBrowserLoadFlowEs = () => <SoftwareBrowserLoadFlow lang="es"/>;
export const SoftwareWaveformViewsEn = () => <SoftwareWaveformViews lang="en"/>;
export const SoftwareWaveformViewsEs = () => <SoftwareWaveformViews lang="es"/>;
export const SoftwarePlayheadTimelineEn = () => <SoftwarePlayheadTimeline lang="en"/>;
export const SoftwarePlayheadTimelineEs = () => <SoftwarePlayheadTimeline lang="es"/>;
export const SoftwareDeckReadoutsEn = () => <SoftwareDeckReadouts lang="en"/>;
export const SoftwareDeckReadoutsEs = () => <SoftwareDeckReadouts lang="es"/>;
export const SoftwareBeatgridReadingEn = () => <SoftwareBeatgridReading lang="en"/>;
export const SoftwareBeatgridReadingEs = () => <SoftwareBeatgridReading lang="es"/>;
export const SoftwareLibrarySafetyChecklistEn = () => <SoftwareLibrarySafetyChecklist lang="en"/>;
export const SoftwareLibrarySafetyChecklistEs = () => <SoftwareLibrarySafetyChecklist lang="es"/>;
export const SoftwareInterfacePracticeEn = () => <SoftwareInterfacePractice lang="en"/>;
export const SoftwareInterfacePracticeEs = () => <SoftwareInterfacePractice lang="es"/>;
