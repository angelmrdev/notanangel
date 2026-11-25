import type { ReactNode } from 'react';
import s from './module04-offline-visuals.module.css';
type Lang='en'|'es';
const t=(l:Lang,en:string,es:string)=>l==='es'?es:en;
type Item={name:string;detail:string};
function Figure({title,note,children}:{title:string;note:string;children:ReactNode}){return <figure className={s.figure}><figcaption className={s.heading}>{title}</figcaption>{children}<p className={s.caption}>{note}</p></figure>}
function Cards({items}:{items:Item[]}){return <div className={s.cards}>{items.map((item,i)=><div className={s.card} key={i}><strong>{item.name}</strong><span>{item.detail}</span></div>)}</div>}
function Steps({items}:{items:Item[]}){return <div className={s.flow}>{items.map((item,i)=><div className={s.step} key={i}><b className={s.num}>{String(i+1).padStart(2,'0')}</b><div><strong>{item.name}</strong><span>{item.detail}</span></div></div>)}</div>}
function Matrix({headers,rows}:{headers:string[];rows:string[][]}){return <div className={s.tableWrap}><table className={s.table}><thead><tr>{headers.map((h,i)=><th scope="col" key={i}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}>{v}</td>)}</tr>)}</tbody></table></div>}

function OfflineReadinessLayers({lang:l}:{lang:Lang}){return <Figure title={t(l,'Offline readiness has six independent layers','Seis capas para preparar una sesión sin conexión')} note={t(l,'A working music file alone is not proof that the whole DJ setup will work without a network.','Que exista un archivo no garantiza que el equipo completo funcione sin red')}><Cards items={[{name:t(l,'Local files','Archivos locales'),detail:t(l,'Every track has a readable path, and the codec works in the destination.','Cada pista tiene una ruta accesible y el destino admite su códec.')},
{name:t(l,'DJ application','Programa DJ'),detail:t(l,'The app can start, browse and load offline.','El programa abre, busca y carga sin red.')},
{name:t(l,'License or activation','Licencia o activación'),detail:t(l,'Required permissions remain valid under the applicable terms.','Los permisos necesarios siguen vigentes según las condiciones.')},
{name:t(l,'Hardware and routing','Hardware y rutas'),detail:t(l,'Controller, interface, MASTER and CUE remain functional.','Controladora, interfaz, MASTER y CUE funcionan.')},
{name:t(l,'Storage and power','Almacenamiento y corriente'),detail:t(l,'Drives, connectors and power adapters are present and reliable.','Unidades, conectores y fuentes están disponibles.')},
{name:t(l,'Fallback and rehearsal','Respaldo y ensayo'),detail:t(l,'A tested alternative is ready, and the dry run was recorded.','Hay alternativa probada y ensayo documentado.')}]} /></Figure>}
export function OfflineReadinessLayersEn(){return <OfflineReadinessLayers lang="en" />}
export function OfflineReadinessLayersEs(){return <OfflineReadinessLayers lang="es" />}

function OfflineLocalVsStreaming({lang:l}:{lang:Lang}){return <Figure title={t(l,'Not every cached track is usable offline','No toda canción almacenada en caché funciona sin internet')} note={t(l,'Streaming availability depends on service, account, region, integration and current product policies. Do not infer offline rights from a cache icon.','La disponibilidad depende del servicio, cuenta, región, integración y condiciones actuales. La caché no garantiza uso offline.')}><Matrix headers={[t(l,"Condition / source","Condición / fuente"),t(l,"Verification / response","Verificación / respuesta")]} rows={[[t(l,'Local MP3/WAV/FLAC','MP3/WAV/FLAC local'),t(l,'Check file exists, can decode, is linked to the library.','Comprueba ruta, decodificación y vínculo con la biblioteca.')],
[t(l,'DJ service integration','Servicio integrado en DJ'),t(l,'Check precise service and software offline policies.','Comprueba las condiciones offline del servicio y programa concretos.')],
[t(l,'Consumer app download','Descarga en app de consumo'),t(l,'Do not assume it can be exported or loaded as a DJ file.','No supongas que se exporta ni se carga como archivo DJ.')],
[t(l,'Exported USB library','Biblioteca USB exportada'),t(l,'Verify destination model, format and database.','Prueba modelo de destino, formato y base de datos.')]]} /></Figure>}
export function OfflineLocalVsStreamingEn(){return <OfflineLocalVsStreaming lang="en" />}
export function OfflineLocalVsStreamingEs(){return <OfflineLocalVsStreaming lang="es" />}

function OfflineExportTopology({lang:l}:{lang:Lang}){return <Figure title={t(l,'Offline workflows require destination-specific tests','Los flujos offline requieren pruebas en su destino')} note={t(l,'Copying a file is not the same as exporting a compatible DJ library with playlists and cues.','Copiar un archivo no equivale a exportar una biblioteca compatible con listas y cues.')}><Steps items={[{name:t(l,'Choose destination','Elige destino'),detail:t(l,'Laptop playback, compatible standalone unit or player USB.','Portátil, unidad autónoma o reproductor USB compatible.')},
{name:t(l,'Prepare local audio','Prepara audio local'),detail:t(l,'Confirm ownership/access, playable codecs and complete paths.','Verifica acceso, códecs compatibles y rutas completas.')},
{name:t(l,'Use supported export','Usa exportación compatible'),detail:t(l,'Follow the destination software and firmware requirements.','Respeta requisitos del software y firmware de destino.')},
{name:t(l,'Test on destination','Prueba en destino'),detail:t(l,'Load several tracks, navigation, playlists, cues and outputs.','Carga pistas, listas, cues y salidas.')},
{name:t(l,'Re-check disconnected','Repite sin red'),detail:t(l,'Simulate the actual event workflow with the network off.','Simula el evento real sin red.')}]} /></Figure>}
export function OfflineExportTopologyEn(){return <OfflineExportTopology lang="en" />}
export function OfflineExportTopologyEs(){return <OfflineExportTopology lang="es" />}

function OfflinePowerAndStorage({lang:l}:{lang:Lang}){return <Figure title={t(l,'Physical dependencies still matter offline','Las dependencias físicas siguen importando sin conexión')} note={t(l,'A backup drive is only a fallback when the DJ software or player can actually read it.','Una unidad de respaldo solo sirve si el programa o reproductor puede leerla.')}><Cards items={[{name:t(l,'Primary drive','Unidad principal'),detail:t(l,'Check free space, mount path, file access and safe-eject process.','Comprueba espacio, montaje, permisos y expulsión segura.')},
{name:t(l,'Tested second drive','Segunda unidad probada'),detail:t(l,'Different physical copy, compatible format, representative tracks.','Otra copia física, formato compatible y pistas reales.')},
{name:t(l,'Cables and hubs','Cables y adaptadores'),detail:t(l,'Test exact USB/adapter chain; avoid untested hubs before gigs.','Prueba la cadena real; evita hubs no comprobados.')},
{name:t(l,'Power adapters','Fuentes de alimentación'),detail:t(l,'Bring matched rated adapters and check outlets safely.','Lleva adaptadores adecuados y verifica tomas con seguridad.')},
{name:t(l,'Laptop readiness','Preparación del portátil'),detail:t(l,'Power settings, screen sleep, available storage, battery health.','Energía, suspensión, espacio y batería.')},
{name:t(l,'Safe handling','Manipulación segura'),detail:t(l,'Never modify mains wiring or defeat electrical safety systems.','No alteres la red eléctrica ni anules protecciones.')}]} /></Figure>}
export function OfflinePowerAndStorageEn(){return <OfflinePowerAndStorage lang="en" />}
export function OfflinePowerAndStorageEs(){return <OfflinePowerAndStorage lang="es" />}

function OfflineDryRunSequence({lang:l}:{lang:Lang}){return <Figure title={t(l,'An offline rehearsal must survive a restart','El ensayo offline debe superar un reinicio')} note={t(l,'Simply switching Wi-Fi off mid-playback can miss activation, caching and library failures that appear on restart.','Apagar Wi-Fi mientras suena música puede ocultar fallos de activación, caché y biblioteca que surgen al reiniciar.')}><Steps items={[{name:t(l,'Save stable configuration','Guarda configuración estable'),detail:t(l,'Record version, audio device and routes before disconnecting.','Anota versión, dispositivo y salidas antes de desconectar.')},
{name:t(l,'Disconnect every network','Desconecta todas las redes'),detail:t(l,'Disable Wi-Fi and other paths relevant to the test.','Desactiva Wi-Fi y otras conexiones pertinentes.')},
{name:t(l,'Restart the software','Reinicia el programa'),detail:t(l,'Check licensing messages and library load from a clean launch.','Comprueba licencias y biblioteca desde un inicio limpio.')},
{name:t(l,'Load different tracks','Carga varias pistas'),detail:t(l,'Intro, main, newer additions and different file formats.','Intro, principales, recién añadidas y varios formatos.')},
{name:t(l,'Test control and audio','Prueba control y audio'),detail:t(l,'Both decks, CUE, MASTER, controller mappings and levels.','Ambos decks, CUE, MASTER, mapeo y niveles.')},
{name:t(l,'Record and repeat','Registra y repite'),detail:t(l,'Document failures; after repairs run the complete test again.','Anota fallos; tras corregirlos repite la prueba.')}]} /></Figure>}
export function OfflineDryRunSequenceEn(){return <OfflineDryRunSequence lang="en" />}
export function OfflineDryRunSequenceEs(){return <OfflineDryRunSequence lang="es" />}

function OfflineFailureFallbacks({lang:l}:{lang:Lang}){return <Figure title={t(l,'Choose a fallback for the actual failure','Elige una alternativa para el fallo real')} note={t(l,'A contingency must be independently tested and should not introduce a dangerous or unverified electrical connection.','El respaldo debe probarse por separado y nunca exigir conexiones eléctricas peligrosas.')}><Matrix headers={[t(l,"Condition / source","Condición / fuente"),t(l,"Verification / response","Verificación / respuesta")]} rows={[[t(l,'Track unavailable','Pista no disponible'),t(l,'Use tested locally accessible alternative in the planned crate.','Usa una alternativa local probada en la lista.')],
[t(l,'Primary USB unreadable','USB principal ilegible'),t(l,'Switch to tested compatible duplicate; do not assume file-copy equivalence.','Pasa a una copia compatible ya comprobada.')],
[t(l,'Software fails at launch','El programa no abre'),t(l,'Use an already-tested compatible independent playback plan.','Usa otro método independiente ya probado.')],
[t(l,'Master output silent','MASTER sin sonido'),t(l,'Check selected interface, assigned output, mixer routing and mute.','Comprueba interfaz, salida asignada, ruteo y mute.')],
[t(l,'Cue silent','CUE sin sonido'),t(l,'Check headphone output, cue buttons and independent output mapping.','Comprueba salida, botones CUE y asignación.')],
[t(l,'Power or device fault','Fallo de corriente o hardware'),t(l,'Stop safely and involve venue technical staff; never improvise mains repairs.','Detente con seguridad y consulta al técnico; no improvises reparaciones.')]]} /></Figure>}
export function OfflineFailureFallbacksEn(){return <OfflineFailureFallbacks lang="en" />}
export function OfflineFailureFallbacksEs(){return <OfflineFailureFallbacks lang="es" />}

function OfflineGoNoGoMatrix({lang:l}:{lang:Lang}){return <Figure title={t(l,'A practical go / no-go decision','Decisión práctica: actuar o no')} note={t(l,'Any untested critical dependency is a reason to retest or simplify the setup before the performance.','Cualquier dependencia crítica sin probar exige repetir pruebas o simplificar antes de actuar.')}><Matrix headers={[t(l,"Condition / source","Condición / fuente"),t(l,"Verification / response","Verificación / respuesta")]} rows={[[t(l,'Local playlist loads','Carga la lista local'),t(l,'Go only after testing representative tracks offline.','Adelante solo tras probar pistas representativas sin red.')],
[t(l,'Login or activation works','Funciona acceso/activación'),t(l,'Confirm a clean offline software start, not just an open session.','Comprueba un arranque limpio sin conexión.')],
[t(l,'MASTER and CUE separate','MASTER y CUE separados'),t(l,'Verify both after reboot with safe levels.','Verifica ambos después de reiniciar con niveles seguros.')],
[t(l,'Destination USB works','Funciona USB de destino'),t(l,'Test on exact player, not just computer.','Pruébalo en reproductor exacto, no solo portátil.')],
[t(l,'Fallback independently tested','Respaldo probado aparte'),t(l,'Know who switches and how before the event.','Define quién cambia el sistema y cómo.')]]} /></Figure>}
export function OfflineGoNoGoMatrixEn(){return <OfflineGoNoGoMatrix lang="en" />}
export function OfflineGoNoGoMatrixEs(){return <OfflineGoNoGoMatrix lang="es" />}

function OfflineRehearsalWorksheet({lang:l}:{lang:Lang}){return <Figure title={t(l,'Document the ten-track offline challenge','Documenta la prueba offline de diez pistas')} note={t(l,'A repeatable log is stronger evidence than remembering that it seemed fine once.','Un registro reproducible vale más que recordar que una vez pareció funcionar.')}><Steps items={[{name:t(l,'List equipment and versions','Lista equipos y versiones'),detail:t(l,'Software, OS, controller, interface and destination device.','Programa, sistema, controladora, interfaz y destino.')},
{name:t(l,'Create ten local tracks','Prepara diez pistas locales'),detail:t(l,'Include multiple sections and two or more formats if applicable.','Incluye secciones diferentes y varios formatos si procede.')},
{name:t(l,'Disconnect and restart','Desconecta y reinicia'),detail:t(l,'Record whether startup and permissions succeed.','Anota si inicio y permisos funcionan.')},
{name:t(l,'Test each route','Prueba cada ruta'),detail:t(l,'Deck A, deck B, MASTER, CUE, browser and controls.','Deck A, deck B, MASTER, CUE, navegador y mandos.')},
{name:t(l,'Record failures and plan','Registra fallos y plan'),detail:t(l,'Write specific cause, tested fix, fallback and final go/no-go.','Escribe causa, arreglo probado, respaldo y decisión.')}]} /></Figure>}
export function OfflineRehearsalWorksheetEn(){return <OfflineRehearsalWorksheet lang="en" />}
export function OfflineRehearsalWorksheetEs(){return <OfflineRehearsalWorksheet lang="es" />}
