import type { ReactNode } from 'react';
import s from './module04-software-visuals.module.css';

type Lang = 'en' | 'es';
const tr = (lang: Lang, en: string, es: string) => lang === 'es' ? es : en;
type Tone = 'cyan' | 'pink' | 'yellow';
function Figure({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return <figure className={s.figure}><figcaption className={s.heading}>{title}</figcaption>{children}<p className={s.caption}>{caption}</p></figure>;
}
function Tile({ title, detail, tone = 'cyan' }: { title: string; detail: string; tone?: Tone }) {
  return <div className={s.tile} data-tone={tone}><strong>{title}</strong><span>{detail}</span></div>;
}
function Arrow() { return <span aria-hidden="true" className={s.arrow}>→</span>; }
function Sequence({ steps }: { steps: { title: string; detail: string; tone?: Tone }[] }) {
  return <div className={s.sequence}>{steps.map((step, i) => <div className={s.sequenceItem} key={step.title}>{i > 0 && <Arrow/>}<Tile {...step}/></div>)}</div>;
}
function Cards({ items }: { items: {title:string;detail:string;tone?:Tone}[] }) {
  return <div className={s.cards}>{items.map(item => <Tile key={item.title} {...item}/>)}</div>;
}
function Steps({ rows }: { rows: { title: string; detail: string }[] }) {
  return <ol className={s.steps}>{rows.map((row, i) => <li key={row.title}><span className={s.index}>{i+1}</span><div><strong>{row.title}</strong><p>{row.detail}</p></div></li>)}</ol>;
}
function SoftwareFunctionMap({ lang:l }: {lang:Lang}) {
  const items = l === 'es' ? [
    {title:'Biblioteca',detail:'Localizar pistas, playlists y preparación'},
    {title:'Motor de audio',detail:'Decodificar y reproducir archivos'},
    {title:'Análisis',detail:'Estimar BPM, tonalidad y beatgrid'},
    {title:'Mezcla y CUE',detail:'Procesar, controlar y enviar salidas'},
    {title:'Integración',detail:'Traducir controles físicos a acciones'}
  ] : [
    {title:'Library',detail:'Find tracks, playlists and preparation'},
    {title:'Audio engine',detail:'Decode and play audio files'},
    {title:'Analysis',detail:'Estimate BPM, key and beatgrid'},
    {title:'Mixing and CUE',detail:'Process, control and route outputs'},
    {title:'Integration',detail:'Translate physical controls into actions'}
  ];
  return <Figure title={tr(l,'Five different jobs, one application','Cinco funciones diferentes, una aplicación')} caption={tr(l,'These jobs may be distributed between software and supported hardware; the diagram is a conceptual overview.','Estas funciones pueden repartirse entre software y hardware compatible; esquema conceptual.')}><Cards items={items.map((x,i)=>({...x,tone: i===1?'pink':i===3?'yellow':'cyan'}))}/></Figure>;
}
function PlaybackAudioPath({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Follow the music from source to destination','Sigue la música desde la fuente al destino')} caption={tr(l,'A simplified laptop DJ path. An external hardware mixer or standalone player may change where decoding and mixing occur.','Ruta simplificada con portátil. Una mesa externa o un reproductor autónomo pueden cambiar dónde se decodifica y mezcla.')}><Sequence steps={[
 {title:tr(l,'Local file / licensed source','Archivo local / fuente autorizada'),detail:tr(l,'Audio becomes accessible','Audio disponible')},
 {title:tr(l,'Decode + virtual deck','Decodificación + deck virtual'),detail:tr(l,'Playback position and speed','Posición y velocidad') ,tone:'pink'},
 {title:tr(l,'Mix + audio interface','Mezcla + interfaz de audio'),detail:tr(l,'Route signals to outputs','Asignar señales a salidas'),tone:'yellow'}
 ]}/><div className={s.outputs}><Tile title="MASTER" detail={tr(l,'Room / PA','Sala / PA')} tone="yellow"/><Tile title="CUE / PHONES" detail={tr(l,'Private monitoring','Preescucha privada')}/></div></Figure>;
}
function LibraryFileDatabase({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'A library entry is not an audio file','Una entrada en biblioteca no es un archivo de audio')} caption={tr(l,'Some tags can be embedded in the file; cue data and playlists may be stored in the DJ database. The storage model varies by application.','Algunas etiquetas pueden guardarse en el archivo; cues y playlists pueden estar en la base de datos del programa. Depende de la aplicación.')}><div className={s.pair}><Tile title={tr(l,'Audio file on a drive','Archivo de audio en el disco')} detail={tr(l,'Decoded music, possible embedded tags, physical path','Música, posibles etiquetas y ruta física')} tone="cyan"/><Tile title={tr(l,'DJ application database','Base de datos del software DJ')} detail={tr(l,'Library entry, playlists, analysis, cues or references','Entrada, playlists, análisis, cues o referencias')} tone="pink"/></div><p className={s.note}>{tr(l,'Moving the file outside the application can break the link without erasing its library entry.','Mover el archivo fuera del programa puede romper la referencia sin borrar la entrada de biblioteca.')}</p></Figure>;
}
function ImportAnalyzePrepare({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Four actions that are easy to confuse','Cuatro operaciones que conviene distinguir')} caption={tr(l,'Analysis is an estimate. Preparation is a deliberate decision checked by ear.','El análisis es una estimación; la preparación es una decisión comprobada al oído.')}><Steps rows={l==='es' ? [
  {title:'Importar',detail:'Registrar archivo o fuente accesible'},
  {title:'Indexar',detail:'Leer ruta y metadatos disponibles'},
  {title:'Analizar',detail:'Estimar BPM, tonalidad y rejilla'},
  {title:'Preparar',detail:'Revisar, colocar cues y anotar decisiones'}
 ]:[
  {title:'Import',detail:'Register an accessible file or source'},
  {title:'Index',detail:'Read location and available metadata'},
  {title:'Analyse',detail:'Estimate BPM, key and beatgrid'},
  {title:'Prepare',detail:'Review, set cues and record decisions'}
 ]}/></Figure>;
}
function LocalStreamingAvailability({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Playback access is not the same as offline rights','Poder reproducir no equivale a tener derechos offline')} caption={tr(l,'Streaming, caching, USB export and recording permissions are service-, plan- and version-specific. Do not infer rights from a visible download icon.','Streaming, caché, exportación USB y grabación dependen del servicio, plan y versión. Un icono de descarga no garantiza derechos.')}><Cards items={l==='es' ? [
 {title:'Archivo local compatible',detail:'Funciona sin red si está disponible y autorizado'},
 {title:'Streaming integrado',detail:'Requiere integración, cuenta y condiciones vigentes',tone:'pink'},
 {title:'Caché / modo offline',detail:'Solo cuando el servicio DJ lo permita expresamente',tone:'yellow'}
 ]:[
 {title:'Supported local file',detail:'Works without network when available and permitted'},
 {title:'Integrated streaming',detail:'Requires supported integration, account and terms',tone:'pink'},
 {title:'Cache / offline mode',detail:'Only when expressly supported by the DJ service',tone:'yellow'}
 ]}/></Figure>;
}
function ControllerSoftwareBoundary({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Who processes the music?','¿Quién procesa realmente la música?')} caption={tr(l,'A controller may also contain a sound card; standalone equipment and hardware mixers can process audio internally. Confirm your device architecture.','Una controladora puede incluir tarjeta de sonido; sistemas autónomos y mesas pueden procesar audio internamente. Comprueba tu modelo.')}><div className={s.pair}><Tile title={tr(l,'Controller controls','Controles de la controladora')} detail={tr(l,'Buttons, jog, faders: send commands','Botones, jog y faders: envían órdenes')} tone="yellow"/><Tile title={tr(l,'Computer DJ software','Software DJ en ordenador')} detail={tr(l,'Interprets commands and adjusts deck playback','Interpreta órdenes y modifica el deck')} tone="pink"/></div><div className={s.downArrow}>↓</div><Tile title={tr(l,'Audio interface / mixer','Interfaz de audio / mezclador')} detail={tr(l,'Output routing to MASTER and CUE','Asignación a MASTER y CUE')}/></Figure>;
}
function MasterCueRouting({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'One DJ application, two listening destinations','Un programa DJ, dos destinos de escucha')} caption={tr(l,'Example of independent stereo outputs. Routing and channel numbering differ by software, interface and mixer; not all devices support separate CUE.','Ejemplo de salidas estéreo independientes. La numeración depende del software y el equipo; no todos permiten CUE separado.')}><div className={s.pair}><Tile title={tr(l,'Deck A → MASTER','Deck A → MASTER')} detail={tr(l,'Public speakers / PA','Altavoces de sala / PA')} tone="pink"/><Tile title={tr(l,'Deck B → CUE','Deck B → CUE')} detail={tr(l,'Headphones, channel fader may be down','Auriculares, fader posiblemente cerrado')} tone="yellow"/></div><p className={s.note}>{tr(l,'Before raising volume, verify your selected output device and the exact routes in preferences.','Antes de subir volumen, comprueba el dispositivo y las rutas de salida en preferencias.')}</p></Figure>;
}
function SoftwareSoundcheckWorksheet({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'A repeatable first soundcheck','Primera prueba de sonido reproducible')} caption={tr(l,'Use known local tracks, start at low volume and preserve a written record of your verified output settings.','Utiliza archivos locales conocidos, empieza con volumen bajo y guarda por escrito los ajustes de salida verificados.')}><Steps rows={l==='es' ? [
 {title:'Anotar ajustes',detail:'Guarda dispositivo, driver y salidas actuales'},
 {title:'Preparar',detail:'Conecta el equipo y baja niveles antes de reproducir'},
 {title:'Cargar',detail:'Abre dos archivos locales compatibles'},
 {title:'Probar MASTER',detail:'Reproduce A y verifica solo el destino de sala'},
 {title:'Probar CUE',detail:'Mantén B fuera del público y escucha por auriculares'},
 {title:'Registrar',detail:'Anota rutas y limitaciones verificadas'}
 ]:[
 {title:'Record settings',detail:'Write down selected device, driver and outputs'},
 {title:'Prepare',detail:'Connect equipment and lower levels before playback'},
 {title:'Load',detail:'Open two supported local tracks'},
 {title:'Test MASTER',detail:'Play A and confirm only the intended room output'},
 {title:'Test CUE',detail:'Keep B out of the public mix and monitor privately'},
 {title:'Document',detail:'Save verified routing and any hardware limitations'}
 ]}/></Figure>;
}

export const SoftwareFunctionMapEn = () => <SoftwareFunctionMap lang="en"/>;
export const SoftwareFunctionMapEs = () => <SoftwareFunctionMap lang="es"/>;
export const PlaybackAudioPathEn = () => <PlaybackAudioPath lang="en"/>;
export const PlaybackAudioPathEs = () => <PlaybackAudioPath lang="es"/>;
export const LibraryFileDatabaseEn = () => <LibraryFileDatabase lang="en"/>;
export const LibraryFileDatabaseEs = () => <LibraryFileDatabase lang="es"/>;
export const ImportAnalyzePrepareEn = () => <ImportAnalyzePrepare lang="en"/>;
export const ImportAnalyzePrepareEs = () => <ImportAnalyzePrepare lang="es"/>;
export const LocalStreamingAvailabilityEn = () => <LocalStreamingAvailability lang="en"/>;
export const LocalStreamingAvailabilityEs = () => <LocalStreamingAvailability lang="es"/>;
export const ControllerSoftwareBoundaryEn = () => <ControllerSoftwareBoundary lang="en"/>;
export const ControllerSoftwareBoundaryEs = () => <ControllerSoftwareBoundary lang="es"/>;
export const MasterCueRoutingEn = () => <MasterCueRouting lang="en"/>;
export const MasterCueRoutingEs = () => <MasterCueRouting lang="es"/>;
export const SoftwareSoundcheckWorksheetEn = () => <SoftwareSoundcheckWorksheet lang="en"/>;
export const SoftwareSoundcheckWorksheetEs = () => <SoftwareSoundcheckWorksheet lang="es"/>;
