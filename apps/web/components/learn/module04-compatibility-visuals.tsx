import type { ReactNode } from 'react';
import s from './module04-compatibility-visuals.module.css';
type Lang = 'en' | 'es';
const tr = (l: Lang, en: string, es: string) => l === 'es' ? es : en;
type Item = { name: string; detail: string };
function Figure({title,note,children}:{title:string;note:string;children:ReactNode}){return <figure className={s.figure}><figcaption className={s.heading}>{title}</figcaption>{children}<p className={s.note}>{note}</p></figure>}
function Cards({items}:{items:Item[]}){return <div className={s.cards}>{items.map((v,i)=><div className={s.card} key={i}><strong>{v.name}</strong><span>{v.detail}</span></div>)}</div>}
function Flow({items}:{items:Item[]}){return <div className={s.flow}>{items.map((v,i)=><div className={s.step} key={i}><b>{String(i+1).padStart(2,'0')}</b><div><strong>{v.name}</strong><span>{v.detail}</span></div></div>)}</div>}
function Matrix({heads,rows}:{heads:string[];rows:string[][]}){return <div className={s.tableWrap}><table className={s.table}><thead><tr>{heads.map((v,i)=><th key={i} scope="col">{v}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{row.map((v,j)=><td key={j}>{v}</td>)}</tr>)}</tbody></table></div>}
function CompatibilityLayerMap({lang:l}:{lang:Lang}){return <Figure title={tr(l,'Compatibility is a chain, not a yes/no badge','La compatibilidad es una cadena, no una casilla')} note={tr(l,'A setup is only reliable when every necessary layer works together. This map is a method, not a compatibility certification.','El montaje solo es fiable si funcionan todas las capas necesarias. Es un método, no una certificación de compatibilidad.')}><Cards items={[
{name:tr(l,'Computer and operating system','Ordenador y sistema operativo'),detail:tr(l,'Supported version, CPU architecture, memory and permissions.','Versión admitida, arquitectura, memoria y permisos.')},
{name:tr(l,'Application and license','Aplicación y licencia'),detail:tr(l,'Exact software release and permitted performance features.','Versión exacta del programa y funciones habilitadas.')},
{name:tr(l,'Controller and firmware','Controladora y firmware'),detail:tr(l,'Model generation, mappings and device firmware.','Modelo, generación, mapeos y firmware.')},
{name:tr(l,'Audio device and driver','Dispositivo de audio y driver'),detail:tr(l,'Driver mode, interface support and output channels.','Modo de driver, interfaz y canales de salida.')},
{name:tr(l,'Tracks and storage','Pistas y almacenamiento'),detail:tr(l,'Audio codec, rights, drive format and connection.','Códec, derechos de uso, formato de unidad y conexión.')},
{name:tr(l,'Export destination','Destino de exportación'),detail:tr(l,'Accepted database, metadata, cue and playlist workflows.','Base de datos, metadatos, cues y listas compatibles.')}
]}/></Figure>}
function OsDriverSupportChecklist({lang:l}:{lang:Lang}){return <Figure title={tr(l,'Verify the complete software–OS–driver combination','Comprueba el conjunto software–sistema–driver')} note={tr(l,'Official support can change between releases. A compatible controller on one OS is not proof of compatibility on another.','El soporte oficial cambia entre versiones. Que una controladora funcione en un sistema no prueba que funcione en otro.')}><Flow items={[
{name:tr(l,'Record exact versions','Anota versiones exactas'),detail:tr(l,'OS version and architecture; DJ app release; hardware firmware.','Versión y arquitectura del sistema; programa DJ; firmware.')},
{name:tr(l,'Read the current vendor support pages','Consulta el soporte vigente'),detail:tr(l,'Check the application and hardware manufacturer separately.','Comprueba por separado programa y fabricante del hardware.')},
{name:tr(l,'Identify driver and permissions','Identifica drivers y permisos'),detail:tr(l,'Confirm audio driver, USB permissions and required installation steps.','Confirma driver, permisos USB e instalación necesaria.')},
{name:tr(l,'Test the actual audio paths','Prueba las rutas reales'),detail:tr(l,'Verify deck A/B, MASTER and CUE, not only that the controller lights up.','Prueba decks A/B, MASTER y CUE, no solo los LED.')}
]}/></Figure>}
function ControllerIntegrationMatrix({lang:l}:{lang:Lang}){return <Figure title={tr(l,'Hardware support has multiple independent dimensions','El soporte de hardware tiene dimensiones independientes')} note={tr(l,'Illustrative verification matrix; do not interpret it as a compatibility claim for a specific brand or model.','Matriz orientativa; no afirma compatibilidad de ninguna marca o modelo concreto.')}><Matrix heads={[tr(l,'Check','Comprobación'),tr(l,'What to verify','Qué verificar'),tr(l,'How to test','Cómo probar')]} rows={[
[tr(l,'Recognition','Reconocimiento'),tr(l,'Correct model appears','Aparece el modelo correcto'),tr(l,'Connect and inspect device list','Conectar y consultar dispositivos')],
[tr(l,'Transport / jog','Transporte / jog'),tr(l,'Buttons and platter mapping','Mapeo de botones y plato'),tr(l,'Play a local test track','Reproducir pista local de prueba')],
[tr(l,'Audio interface','Interfaz de audio'),tr(l,'MASTER and CUE pairs','Pares MASTER y CUE'),tr(l,'Send independent test signals','Enviar señales de prueba por separado')],
[tr(l,'Displays / LEDs','Pantallas / LED'),tr(l,'Bidirectional feedback support','Soporte de respuesta bidireccional'),tr(l,'Verify a state change','Verificar cambio de estado')],
[tr(l,'Advanced functions','Funciones avanzadas'),tr(l,'License, firmware and mapping','Licencia, firmware y mapeo'),tr(l,'Use a non-destructive test','Prueba no destructiva')]
]}/></Figure>}
function AudioSourceFormatMatrix({lang:l}:{lang:Lang}){return <Figure title={tr(l,'An extension is not the whole compatibility story','La extensión no determina toda la compatibilidad')} note={tr(l,'Codec, bit depth, DRM and destination firmware can alter support. Always test the exact files and source service.','Códec, profundidad de bits, DRM y firmware de destino pueden cambiar el soporte. Prueba archivos y servicios concretos.')}><Matrix heads={[tr(l,'Source','Fuente'),tr(l,'Check','Verificar'),tr(l,'Typical failure','Fallo habitual')]} rows={[
['MP3 / AAC',tr(l,'Codec profile and destination decoder','Perfil de códec y decodificador'),tr(l,'A playable file in one app fails elsewhere','Un archivo funciona en una app y no en otra')],
['WAV / AIFF',tr(l,'Sample rate and bit depth','Frecuencia y profundidad de bits'),tr(l,'Hardware accepts only some encodings','El reproductor admite solo ciertos ajustes')],
['FLAC / ALAC',tr(l,'Application and player support','Soporte en programa y reproductor'),tr(l,'Export destination cannot decode','El destino no puede decodificar')],
[tr(l,'Streaming track','Pista en streaming'),tr(l,'Service integration, region and offline policy','Integración, región y política offline'),tr(l,'Not available without an active service','No disponible sin el servicio activo')],
[tr(l,'USB / storage','USB / unidad'),tr(l,'File system and supported structure','Sistema de archivos y estructura'),tr(l,'Drive mounts on laptop, not on player','Se abre en portátil, no en reproductor')]
]}/></Figure>}
function LicenseFeatureDependencies({lang:l}:{lang:Lang}){return <Figure title={tr(l,'Find which layer actually gates a feature','Averigua qué capa limita la función')} note={tr(l,'Licensing policies and support lists change. Use the current terms and documentation for your exact setup.','Las licencias y listas de soporte cambian. Consulta las condiciones actuales de tu configuración.')}><Cards items={[
{name:tr(l,'App edition','Edición del programa'),detail:tr(l,'A function might depend on the selected plan or edition.','La función puede depender del plan o edición.')},
{name:tr(l,'Hardware unlock','Desbloqueo por hardware'),detail:tr(l,'Some functions may require a recognized supported device.','Algunas funciones exigen un dispositivo reconocido.')},
{name:tr(l,'Music source rights','Permisos de la fuente'),detail:tr(l,'Streaming availability and export permissions are separate.','Streaming y permiso de exportación son cosas distintas.')},
{name:tr(l,'Operating mode','Modo de funcionamiento'),detail:tr(l,'Export, performance or standalone paths can differ.','Exportación, actuación y standalone pueden diferir.')},
{name:tr(l,'Region and connection','Región y conexión'),detail:tr(l,'Network or regional restrictions may apply.','Puede haber límites por red o región.')},
{name:tr(l,'Version / firmware','Versión / firmware'),detail:tr(l,'A previously supported combination may change after updates.','Una combinación compatible puede cambiar al actualizar.')}
]}/></Figure>}
function LibraryTransferReality({lang:l}:{lang:Lang}){return <Figure title={tr(l,'What can survive a library move?','¿Qué se conserva al mover una biblioteca?')} note={tr(l,'These fields are questions to verify, not guaranteed transferred data. Keep backups and compare a small sample on the destination.','Son datos que debes verificar, no transferencias garantizadas. Guarda copias y compara una muestra en destino.')}><Matrix heads={[tr(l,'Data','Dato'),tr(l,'Possible dependency','Dependencia posible'),tr(l,'Test','Prueba')]} rows={[
[tr(l,'Audio file','Archivo de audio'),tr(l,'Path, codec, storage','Ruta, códec, almacenamiento'),tr(l,'Load and play','Cargar y reproducir')],
[tr(l,'Playlist','Lista de reproducción'),tr(l,'Export format and database','Formato y base de datos'),tr(l,'Compare track counts','Comparar número de pistas')],
['BPM / grid',tr(l,'Analysis format and interpretation','Formato y lectura del análisis'),tr(l,'Inspect three beatgrids','Revisar tres beatgrids')],
['Hot Cues / loops',tr(l,'Vendor-specific metadata','Metadatos propios del fabricante'),tr(l,'Trigger safely on test track','Probar en pista de prueba')],
[tr(l,'Artwork and tags','Carátulas y etiquetas'),tr(l,'Embedded vs database fields','Datos incrustados o en base de datos'),tr(l,'Check destination display','Revisar pantalla de destino')]
]}/></Figure>}
function UpdateRiskDecisionTree({lang:l}:{lang:Lang}){return <Figure title={tr(l,'Before you update a working DJ setup','Antes de actualizar un equipo DJ que funciona')} note={tr(l,'Test changes away from an event. Do not downgrade firmware or edit drivers without the vendor procedure and an appropriate backup.','Prueba cambios lejos de una actuación. No reviertas firmware ni drivers sin procedimiento oficial y copia de seguridad.')}><Flow items={[
{name:tr(l,'Is this update necessary now?','¿Es necesaria esta actualización ahora?'),detail:tr(l,'If no, defer until you can test without affecting a show.','Si no, aplázala hasta poder probar sin afectar a una sesión.')},
{name:tr(l,'Does the vendor confirm your full combination?','¿Confirma el fabricante toda la combinación?'),detail:tr(l,'Check OS, application, driver, controller and firmware.','Comprueba sistema, app, driver, controladora y firmware.')},
{name:tr(l,'Do you have a restorable backup?','¿Tienes copia recuperable?'),detail:tr(l,'Preserve music, library database, settings and installers where permitted.','Conserva música, biblioteca, ajustes e instaladores cuando sea posible.')},
{name:tr(l,'Can you run a complete rehearsal?','¿Puedes ensayar el montaje completo?'),detail:tr(l,'Test loading, CUE, MASTER, recording if used, export and recovery.','Prueba carga, CUE, MASTER, grabación, exportación y recuperación.')}
]}/></Figure>}
function CompatibilityTestWorksheet({lang:l}:{lang:Lang}){return <Figure title={tr(l,'Complete this six-part compatibility report','Rellena este informe de compatibilidad en seis partes')} note={tr(l,'Document exact versions, the URL and date of every vendor claim, and real test outcomes. Never mark untested equipment as compatible.','Anota versiones, URL y fecha de cada referencia oficial y resultados reales. No marques como compatible un equipo sin probar.')}><Matrix heads={[tr(l,'Layer','Capa'),tr(l,'Evidence to record','Evidencia'),tr(l,'Result','Resultado')]} rows={[
[tr(l,'OS + software','Sistema + programa'),tr(l,'Exact versions and vendor release notes','Versiones y notas oficiales'),tr(l,'Confirmed / untested / blocked','Confirmado / sin probar / bloqueado')],
[tr(l,'Controller + driver','Controladora + driver'),tr(l,'Supported device list and recognition test','Lista oficial y detección'),tr(l,'Control responds?','¿Responde el control?')],
['MASTER / CUE',tr(l,'Audio output assignments','Asignaciones de salidas'),tr(l,'Both paths heard separately?','¿Se oyen por separado?')],
[tr(l,'Sources','Fuentes'),tr(l,'Local files and streaming limits','Archivos y límites streaming'),tr(l,'Loaded and played?','¿Carga y reproduce?')],
[tr(l,'Export','Exportación'),tr(l,'Playlist, metadata and target player test','Lista, metadatos y reproductor'),tr(l,'Verified on target?','¿Probado en destino?')],
[tr(l,'Recovery','Recuperación'),tr(l,'Backup and known-good configuration','Copia y configuración estable'),tr(l,'Rehearsed?','¿Ensayada?')]
]}/></Figure>}
export function CompatibilityLayerMapEn(){return <CompatibilityLayerMap lang="en"/>}
export function CompatibilityLayerMapEs(){return <CompatibilityLayerMap lang="es"/>}
export function OsDriverSupportChecklistEn(){return <OsDriverSupportChecklist lang="en"/>}
export function OsDriverSupportChecklistEs(){return <OsDriverSupportChecklist lang="es"/>}
export function ControllerIntegrationMatrixEn(){return <ControllerIntegrationMatrix lang="en"/>}
export function ControllerIntegrationMatrixEs(){return <ControllerIntegrationMatrix lang="es"/>}
export function AudioSourceFormatMatrixEn(){return <AudioSourceFormatMatrix lang="en"/>}
export function AudioSourceFormatMatrixEs(){return <AudioSourceFormatMatrix lang="es"/>}
export function LicenseFeatureDependenciesEn(){return <LicenseFeatureDependencies lang="en"/>}
export function LicenseFeatureDependenciesEs(){return <LicenseFeatureDependencies lang="es"/>}
export function LibraryTransferRealityEn(){return <LibraryTransferReality lang="en"/>}
export function LibraryTransferRealityEs(){return <LibraryTransferReality lang="es"/>}
export function UpdateRiskDecisionTreeEn(){return <UpdateRiskDecisionTree lang="en"/>}
export function UpdateRiskDecisionTreeEs(){return <UpdateRiskDecisionTree lang="es"/>}
export function CompatibilityTestWorksheetEn(){return <CompatibilityTestWorksheet lang="en"/>}
export function CompatibilityTestWorksheetEs(){return <CompatibilityTestWorksheet lang="es"/>}
