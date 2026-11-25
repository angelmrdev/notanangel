import type { ReactNode } from 'react';
import s from './module04-performance-visuals.module.css';
type Lang = 'en' | 'es';
const tr = (lang: Lang, en: string, es: string) => lang === 'es' ? es : en;
type Item = { heading: string; detail: string; tone?: 'cyan' | 'pink' | 'yellow' };
function Figure({heading, note, children}: {heading:string;note:string;children:ReactNode}) {return <figure className={s.figure}><figcaption className={s.heading}>{heading}</figcaption>{children}<p className={s.note}>{note}</p></figure>}
function Cards({items}: {items:Item[]}) {return <div className={s.cards}>{items.map((item,i)=><div className={s.card} data-tone={item.tone||'cyan'} key={i}><strong>{item.heading}</strong><span>{item.detail}</span></div>)}</div>}
function Flow({items}:{items:Item[]}) {return <div className={s.flow}>{items.map((item,i)=><div className={s.flowStep} key={i}><b>{String(i+1).padStart(2,'0')}</b><div><strong>{item.heading}</strong><span>{item.detail}</span></div></div>)}</div>}
function Matrix({heads,rows}:{heads:string[];rows:string[][]}) {return <div className={s.tableWrap}><table className={s.table}><thead><tr>{heads.map((h,i)=><th key={i} scope="col">{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}
function ModeWorkspaceCompare({lang:l}:{lang:Lang}) {return <Figure heading={tr(l,'Preparation and performance answer different questions','Preparación y actuación responden a preguntas diferentes')} note={tr(l,'These are tasks, not guaranteed menu names. Some programs combine both workflows in one interface.','Son tareas, no nombres universales de menús. Algunos programas combinan ambos flujos en la misma interfaz.')}><Cards items={[
{heading:tr(l,'Prepare','Preparar'),detail:tr(l,'Import music, check metadata and grids, label tracks, prepare playlists and cues.','Importar música, revisar metadatos y grids, etiquetar pistas y preparar listas y cues.'),tone:'cyan'},
{heading:tr(l,'Perform','Actuar'),detail:tr(l,'Load decks, monitor CUE, control playback, manage levels and recover safely.','Cargar decks, escuchar CUE, controlar reproducción, vigilar niveles y recuperarse de errores.'),tone:'pink'},
{heading:tr(l,'Export / sync','Exportar / sincronizar'),detail:tr(l,'Transfer compatible files and supported preparation data to an external destination.','Transferir archivos compatibles y datos de preparación admitidos a un destino externo.'),tone:'yellow'},
{heading:tr(l,'Verify','Comprobar'),detail:tr(l,'Test the actual device and playback source before relying on the setup.','Probar el dispositivo y la fuente real antes de depender del montaje.')}
]}/></Figure>}
function PreparationExportFlow({lang:l}:{lang:Lang}){return <Figure heading={tr(l,'An export is a workflow, not a copy-and-hope step','Exportar es un proceso, no copiar archivos sin comprobar')} note={tr(l,'Support depends on each vendor, device, file format and version. Never assume every cue or tag will transfer.','La compatibilidad depende del fabricante, dispositivo, formato y versión. No des por hecho que todos los cues o etiquetas se transfieren.')}><Flow items={[
{heading:tr(l,'Prepare on the computer','Preparar en el ordenador'),detail:tr(l,'Validate source files, BPM/grid, cues and playlists.','Revisar archivos, BPM/grid, cues y listas.')},
{heading:tr(l,'Choose a compatible destination','Elegir destino compatible'),detail:tr(l,'Confirm device generation, drive format and supported media.','Confirmar generación del reproductor, formato de unidad y medios admitidos.')},
{heading:tr(l,'Use supported export or sync','Usar exportación o sincronización compatible'),detail:tr(l,'Follow the software workflow instead of copying its private database by hand.','Usar el flujo del programa en vez de copiar manualmente su base de datos interna.')},
{heading:tr(l,'Safely disconnect and test','Expulsar y probar'),detail:tr(l,'Open the playlist on the target player and test a track, cue and waveform.','Abrir la lista en el reproductor y comprobar una pista, cue y forma de onda.')}
]}/></Figure>}
function HardwareControlLayers({lang:l}:{lang:Lang}){return <Figure heading={tr(l,'One physical pad can trigger several actions','Un mismo pad físico puede ejecutar varias acciones')} note={tr(l,'These are illustrative mappings; labels and behavior depend on the device and configured mapping.','Mapeos ilustrativos: etiquetas y acciones dependen del dispositivo y de su configuración.')}><Matrix heads={[tr(l,'Control state','Estado'),tr(l,'Possible action','Posible acción'),tr(l,'Risk to test','Riesgo a comprobar')]} rows={[
[tr(l,'Pad mode: Hot Cue','Modo pad: Hot Cue'),tr(l,'Jump to a saved cue','Saltar a un cue guardado'),tr(l,'Wrong deck target','Deck equivocado')],
[tr(l,'Pad mode: Loop','Modo pad: Loop'),tr(l,'Activate a loop','Activar un loop'),tr(l,'Unexpected repeated phrase','Frase repetida inesperadamente')],
[tr(l,'Shift + pad','Shift + pad'),tr(l,'Secondary mapped function','Función secundaria asignada'),tr(l,'Deletion or alternate operation','Borrado u operación alternativa')],
[tr(l,'Custom mapping','Mapeo personalizado'),tr(l,'User-assigned software command','Comando asignado por el usuario'),tr(l,'Unfamiliar layout','Distribución desconocida')]
]}/></Figure>}
function MidiHidSignalPath({lang:l}:{lang:Lang}){return <Figure heading={tr(l,'Control data and audio are separate paths','Los datos de control y el audio recorren rutas distintas')} note={tr(l,'A USB cable may transport both audio and control on some devices, but their functions remain distinct. MIDI/HID compatibility does not imply an audio interface.','Un USB puede transportar audio y control en algunos equipos, pero siguen siendo funciones diferentes. MIDI/HID no garantiza interfaz de audio.')}><Cards items={[
{heading:tr(l,'Control input: MIDI or HID','Control: MIDI o HID'),detail:tr(l,'Button / jog / fader → control messages → DJ application.','Botón / jog / fader → mensajes de control → programa DJ.'),tone:'cyan'},
{heading:tr(l,'Audio output: device routing','Audio: ruta del dispositivo'),detail:tr(l,'Deck audio → mixer / interface → MASTER and monitored CUE.','Audio de decks → mezcla / interfaz → MASTER y CUE.'),tone:'pink'},
{heading:tr(l,'Feedback to hardware','Respuesta al hardware'),detail:tr(l,'LEDs, screens or motor feedback when supported by the integration.','LED, pantallas o respuesta motorizada si la integración lo permite.'),tone:'yellow'},
{heading:tr(l,'Test individually','Probar por separado'),detail:tr(l,'A working jog does not prove the speakers or headphones are correctly routed.','Que funcione el jog no garantiza que altavoces y auriculares estén bien configurados.')}
]}/></Figure>}
function ExternalMixerRouting({lang:l}:{lang:Lang}){return <Figure heading={tr(l,'Internal versus external mixing','Mezcla interna frente a mezcla externa')} note={tr(l,'External mixing requires a suitable multichannel audio path and compatible connections; hardware controls alone do not create extra outputs.','La mezcla externa requiere salida de audio multicanal y conexiones compatibles; los mandos físicos no crean más salidas por sí solos.')}><Cards items={[
{heading:tr(l,'Internal mixing','Mezcla interna'),detail:tr(l,'Software combines decks and routes a program output; a controller can send commands.','El software mezcla los decks y envía una salida de programa; la controladora puede enviar órdenes.'),tone:'cyan'},
{heading:tr(l,'External mixing','Mezcla externa'),detail:tr(l,'Deck A and B travel on separate audio pairs into physical mixer channels.','Los decks A y B van por pares de audio separados a canales físicos de una mesa.'),tone:'pink'},
{heading:tr(l,'Check outputs','Comprobar salidas'),detail:tr(l,'Verify channel pairs, interface, mixer source selectors and cue routing.','Verificar pares de canales, interfaz, selectores de fuente y CUE.'),tone:'yellow'},
{heading:tr(l,'Safety','Seguridad'),detail:tr(l,'Start with low levels; test channels individually before bringing up the PA.','Empezar con niveles bajos; probar canales por separado antes de abrir la PA.')}
]}/></Figure>}
function FeatureAvailabilityMatrix({lang:l}:{lang:Lang}){return <Figure heading={tr(l,'A feature can be limited at several layers','Una función puede estar limitada por varias capas')} note={tr(l,'This table is conceptual, not a current compatibility matrix for specific brands. Consult the current supported-device list and licence terms.','Tabla conceptual, no compatibilidad actual de marcas. Consulta listados de equipos admitidos y condiciones de licencia vigentes.')}><Matrix heads={[tr(l,'Layer','Capa'),tr(l,'Question','Pregunta'),tr(l,'Example consequence','Ejemplo de consecuencia')]} rows={[
[tr(l,'Software version','Versión de programa'),tr(l,'Does this mode exist here?','¿Existe este modo aquí?'),tr(l,'Feature menu differs','Menú diferente')],
[tr(l,'Plan / licence','Plan / licencia'),tr(l,'Is this function unlocked?','¿Está disponible la función?'),tr(l,'Restricted recording or control','Grabación o control restringido')],
[tr(l,'Device / firmware','Equipo / firmware'),tr(l,'Is it supported and configured?','¿Es compatible y está configurado?'),tr(l,'Buttons or screens lack feedback','Mandos o pantallas sin respuesta')],
[tr(l,'Music source','Fuente musical'),tr(l,'Does this source permit the action?','¿Permite la fuente esta acción?'),tr(l,'Offline/export limits','Límites de exportación/offline')],
[tr(l,'Operating system','Sistema operativo'),tr(l,'Are drivers and permissions ready?','¿Están listos drivers y permisos?'),tr(l,'Device not detected','Dispositivo no detectado')]
]}/></Figure>}
function PerformanceSafetyChecklist({lang:l}:{lang:Lang}){return <Figure heading={tr(l,'Pre-show control and audio checks','Comprobaciones antes de actuar')} note={tr(l,'Use test tracks and low output levels. Never rely on first-time firmware, driver or mapping changes immediately before a show.','Usa pistas de prueba y volumen bajo. Evita actualizar firmware, drivers o mapeos por primera vez justo antes de actuar.')}><Flow items={[
{heading:tr(l,'Detect hardware','Detectar hardware'),detail:tr(l,'Correct controller / player appears in the application.','La controladora o reproductor correcto aparece en el programa.')},
{heading:tr(l,'Confirm the active mode','Confirmar modo activo'),detail:tr(l,'Check performance/export state, pad bank and deck assignment.','Verificar actuación/exportación, banco de pads y deck asignado.')},
{heading:tr(l,'Verify audio','Comprobar audio'),detail:tr(l,'Separate MASTER and CUE; meters and output levels behave correctly.','Separar MASTER y CUE; medidores y niveles funcionan.')},
{heading:tr(l,'Test recovery','Probar recuperación'),detail:tr(l,'Know how to revert an incorrect mode, mapping or source selection.','Saber revertir un modo, mapeo o fuente incorrectos.')}
]}/></Figure>}
function ModeIntegrationLab({lang:l}:{lang:Lang}){return <Figure heading={tr(l,'Five checks to document in your own setup','Cinco comprobaciones para documentar tu equipo')} note={tr(l,'Record observations rather than guessing what your equipment supports. Repeat after meaningful software or hardware changes.','Anota observaciones reales, no supongas compatibilidades. Repite las pruebas tras cambios importantes de programa o equipo.')}><Matrix heads={[tr(l,'Test','Prueba'),tr(l,'Observation to write down','Qué anotar')]} rows={[
[tr(l,'1. Library preparation','1. Preparación de biblioteca'),tr(l,'Where are cues and playlists saved?','¿Dónde se guardan cues y listas?')],
[tr(l,'2. Controller and pads','2. Controladora y pads'),tr(l,'What changes with Shift or pad mode?','¿Qué cambia con Shift o el modo pad?')],
[tr(l,'3. Mixer mode','3. Modo de mezcla'),tr(l,'Internal or external? Which channel pair?','¿Interna o externa? ¿Qué par de canales?')],
[tr(l,'4. Export / source','4. Exportación / fuente'),tr(l,'Which files and metadata work on target?','¿Qué archivos y datos lee el destino?')],
[tr(l,'5. Recovery','5. Recuperación'),tr(l,'How to restore the usual mapping safely?','¿Cómo recuperar el mapeo habitual?')]
]}/></Figure>}
export function ModeWorkspaceCompareEn() {return <ModeWorkspaceCompare lang="en"/>}
export function ModeWorkspaceCompareEs() {return <ModeWorkspaceCompare lang="es"/>}
export function PreparationExportFlowEn() {return <PreparationExportFlow lang="en"/>}
export function PreparationExportFlowEs() {return <PreparationExportFlow lang="es"/>}
export function HardwareControlLayersEn() {return <HardwareControlLayers lang="en"/>}
export function HardwareControlLayersEs() {return <HardwareControlLayers lang="es"/>}
export function MidiHidSignalPathEn() {return <MidiHidSignalPath lang="en"/>}
export function MidiHidSignalPathEs() {return <MidiHidSignalPath lang="es"/>}
export function ExternalMixerRoutingEn() {return <ExternalMixerRouting lang="en"/>}
export function ExternalMixerRoutingEs() {return <ExternalMixerRouting lang="es"/>}
export function FeatureAvailabilityMatrixEn() {return <FeatureAvailabilityMatrix lang="en"/>}
export function FeatureAvailabilityMatrixEs() {return <FeatureAvailabilityMatrix lang="es"/>}
export function PerformanceSafetyChecklistEn() {return <PerformanceSafetyChecklist lang="en"/>}
export function PerformanceSafetyChecklistEs() {return <PerformanceSafetyChecklist lang="es"/>}
export function ModeIntegrationLabEn() {return <ModeIntegrationLab lang="en"/>}
export function ModeIntegrationLabEs() {return <ModeIntegrationLab lang="es"/>}
