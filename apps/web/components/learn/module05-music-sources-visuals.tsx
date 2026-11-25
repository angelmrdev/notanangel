import type { ReactNode } from 'react';
import s from './module05-music-sources-visuals.module.css';

type Lang = 'en' | 'es';
type Item = { title: string; detail: string };
const tr = (l: Lang, en: string, es: string) => l === 'en' ? en : es;
function Figure({title,note,children}:{title:string;note:string;children:ReactNode}) {
  return <figure className={s.figure}><figcaption className={s.title}>{title}</figcaption>{children}<p className={s.note}>{note}</p></figure>;
}
function Cards({items}:{items:Item[]}) {return <div className={s.cards}>{items.map((x,i)=><div className={s.card} key={i}><strong>{x.title}</strong><span>{x.detail}</span></div>)}</div>}
function Steps({items}:{items:Item[]}) {return <div className={s.flow}>{items.map((x,i)=><div className={s.flowItem} key={i}><span className={s.number}>{String(i+1).padStart(2,'0')}</span><div><strong>{x.title}</strong><span>{x.detail}</span></div></div>)}</div>}
function Matrix({heads,rows}:{heads:string[];rows:string[][]}) {return <div className={s.tableWrap}><table className={s.table}><thead><tr>{heads.map((h,i)=><th scope="col" key={i}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}>{v}</td>)}</tr>)}</tbody></table></div>}
function SourceLandscape({lang:l}:{lang:Lang}) {return <Figure title={tr(l,'Six legitimate music-source categories','Seis formas legítimas de conseguir música')} note={tr(l,'Availability and rights vary by provider and territory. This is a decision map, not an endorsement of any specific seller.','Disponibilidad y permisos varían según proveedor y territorio. Es un mapa de decisiones, no una recomendación comercial.')}><Cards items={[
{title:tr(l,'Digital stores','Tiendas digitales'),detail:tr(l,'Purchase downloadable releases; check format and mix version.','Comprar archivos; revisar formato y versión.')},
{title:tr(l,'DJ record pools','Pools DJ'),detail:tr(l,'Membership-based promotional catalogues; verify eligibility and terms.','Catálogos promocionales sujetos a requisitos y condiciones.')},
{title:tr(l,'Artist and label promos','Promos de sellos y artistas'),detail:tr(l,'Authorised files sent for promotion; permission scope still matters.','Archivos promocionales autorizados; comprueba el alcance del permiso.')},
{title:tr(l,'Licensed free releases','Descargas gratuitas con licencia'),detail:tr(l,'Check permissions, attribution and redistribution limits.','Revisar permisos, atribución y límites de redistribución.')},
{title:tr(l,'DJ streaming integrations','Streaming integrado'),detail:tr(l,'Access tied to account, platform, catalogue and supported software.','Acceso dependiente de cuenta, plataforma, catálogo y software.')},
{title:tr(l,'Original authorised material','Material propio autorizado'),detail:tr(l,'Confirm that all included samples and compositions are cleared.','Confirmar permisos de muestras y composiciones incluidas.')}
]} /></Figure>}
function AccessVsFile({lang:l}:{lang:Lang}) {return <Figure title={tr(l,'Access and a local audio file are not equivalent','Acceso y archivo local no son equivalentes')} note={tr(l,'Neither possession of a file nor streaming access automatically grants rights to record, redistribute or upload a DJ mix.','Ni disponer del archivo ni acceder por streaming concede automáticamente derechos para grabar, redistribuir o subir una sesión.')}><Matrix heads={[tr(l,'Question','Pregunta'),tr(l,'Local file','Archivo local'),tr(l,'Streaming integration','Streaming integrado')]} rows={[
[tr(l,'Can you locate and back up the audio?','¿Puedes localizar y copiar el audio?'),tr(l,'Usually, subject to terms','Normalmente, sujeto a condiciones'),tr(l,'Usually no independent file','Normalmente no hay archivo independiente')],
[tr(l,'Can it play without internet?','¿Funciona sin internet?'),tr(l,'If software and licence permit','Si software y licencia lo permiten'),tr(l,'Only if the specific integration allows it','Solo si la integración lo permite')],
[tr(l,'Can you USB-export it?','¿Puedes exportarlo a USB?'),tr(l,'Depends on player format and export workflow','Depende del formato y procedimiento'),tr(l,'Do not assume export is available','No presupongas exportación')],
[tr(l,'Can you upload a recorded mix?','¿Puedes subir una sesión grabada?'),tr(l,'Separate rights required','Se necesitan derechos adicionales'),tr(l,'Separate rights and service restrictions','Derechos adicionales y restricciones del servicio')]
]} /></Figure>}
function VersionChooser({lang:l}:{lang:Lang}) {return <Figure title={tr(l,'One title may have several distinct versions','Un título puede tener varias versiones diferentes')} note={tr(l,'These are common version names, not strict guarantees about duration, structure or quality. Always audition the actual release.','Son nombres habituales, no garantías sobre duración, estructura o calidad. Escucha siempre la versión concreta.')}><Cards items={[
{title:tr(l,'Radio edit','Radio edit'),detail:tr(l,'Often shorter; a DJ intro may be absent.','Suele ser más corta; puede no tener intro DJ.')},
{title:tr(l,'Extended mix','Extended mix'),detail:tr(l,'May offer longer intro or outro for transitions.','Puede ofrecer intro u outro más largos.')},
{title:tr(l,'Clean / explicit','Clean / explicit'),detail:tr(l,'Select the appropriate lyrical edit for the venue.','Elegir la edición vocal adecuada al contexto.')},
{title:tr(l,'Instrumental / acapella','Instrumental / acapella'),detail:tr(l,'Different musical layers; verify official provenance.','Capas musicales diferentes; comprobar procedencia.')},
{title:tr(l,'Remaster','Remaster'),detail:tr(l,'May differ in dynamics and loudness.','Puede cambiar dinámica y volumen percibido.')},
{title:tr(l,'DJ intro / outro edit','DJ intro / outro edit'),detail:tr(l,'Check arrangement and legitimacy of the edit.','Comprobar estructura y legitimidad de la edición.')}
]} /></Figure>}
function QualityProvenance({lang:l}:{lang:Lang}) {return <Figure title={tr(l,'Audio labels are not proof of source quality','La etiqueta del archivo no demuestra la calidad de origen')} note={tr(l,'Illustrative assessment only. Transcoding lossy audio to WAV cannot recover discarded information.','Es una comprobación orientativa. Pasar un archivo con pérdidas a WAV no restaura la información descartada.')}><Steps items={[
{title:tr(l,'Identify provenance','Identificar la procedencia'),detail:tr(l,'Prefer a verifiable release or authorised distributor.','Preferir un lanzamiento o distribuidor verificable.')},
{title:tr(l,'Inspect the delivered format','Comprobar el formato'),detail:tr(l,'Match codec, container and device support.','Comprobar códec, contenedor y compatibilidad.')},
{title:tr(l,'Audition beginning, centre and end','Escuchar inicio, centro y final'),detail:tr(l,'Look for glitches, unexpected silence or unwanted edits.','Buscar cortes, silencios inesperados o versiones erróneas.')},
{title:tr(l,'Keep original and source notes','Conservar original y procedencia'),detail:tr(l,'Avoid unnecessary re-encoding; save proof of acquisition where useful.','Evitar conversiones innecesarias y guardar justificantes cuando proceda.')}
]} /></Figure>}
function SourceToLibrary({lang:l}:{lang:Lang}) {return <Figure title={tr(l,'Buying, importing and backing up are separate actions','Comprar, importar y respaldar son acciones distintas')} note={tr(l,'A DJ library database may reference the original file without copying it. Moving the file can break that reference.','La base de datos DJ puede referenciar el archivo original sin copiarlo. Mover el archivo puede romper esa referencia.')}><Steps items={[
{title:tr(l,'Obtain an authorised source','Conseguir una fuente autorizada'),detail:tr(l,'Confirm exact release and use terms.','Confirmar lanzamiento y condiciones.')},
{title:tr(l,'Store the actual file','Guardar el archivo real'),detail:tr(l,'Use a stable local path, not a temporary download folder.','Usar ruta estable, no una carpeta temporal.')},
{title:tr(l,'Import into DJ software','Importar en el software DJ'),detail:tr(l,'The software often creates a database reference.','El software suele crear una referencia en su base de datos.')},
{title:tr(l,'Test loading and backup','Probar carga y respaldo'),detail:tr(l,'Verify playback and recoverability before a show.','Verificar reproducción y recuperación antes de actuar.')}
]} /></Figure>}
function UsagePermissionMatrix({lang:l}:{lang:Lang}) {return <Figure title={tr(l,'Different actions can require different permissions','Distintos usos pueden exigir permisos diferentes')} note={tr(l,'General educational overview, not legal advice. Contractual and copyright requirements vary across jurisdictions and venues.','Resumen educativo, no asesoramiento legal. Los requisitos contractuales y de derechos varían según país y local.')}><Matrix heads={[tr(l,'Action','Acción'),tr(l,'What to check','Qué comprobar')]} rows={[
[tr(l,'Download and store','Descargar y guardar'),tr(l,'The source authorises download and retention.','La fuente permite descarga y conservación.')],
[tr(l,'Perform at a venue','Pinchar en un local'),tr(l,'Applicable public-performance rights and venue arrangements.','Derechos de comunicación pública y condiciones del local.')],
[tr(l,'Record a DJ set','Grabar una sesión DJ'),tr(l,'Service restrictions plus rights in recordings and music.','Restricciones del servicio y derechos de grabación y música.')],
[tr(l,'Upload or monetise the mix','Subir o monetizar una sesión'),tr(l,'Online distribution rights, platform policy and content claims.','Derechos de distribución, políticas y reclamaciones.')],
[tr(l,'Share the audio file','Compartir el archivo'),tr(l,'Explicit redistribution permission, not merely purchase.','Permiso expreso de redistribución, no solo compra.')]
]} /></Figure>}
function AcquisitionChecklist({lang:l}:{lang:Lang}) {return <Figure title={tr(l,'Eight-step track acquisition workflow','Ocho pasos para conseguir y preparar una canción')} note={tr(l,'A repeatable workflow prevents missing-file surprises and helps document uncertain permissions.','Un procedimiento repetible reduce sorpresas con archivos perdidos y ayuda a documentar los permisos dudosos.')}><Steps items={[
{title:tr(l,'Choose the desired version','Elegir la versión'),detail:tr(l,'Radio, extended, clean, instrumental or another official variant.','Radio, extended, clean, instrumental u otra variante oficial.')},
{title:tr(l,'Verify legitimate source and terms','Verificar fuente y condiciones'),detail:tr(l,'Do not infer permission from a free download button.','No deducir permisos de un botón de descarga gratuita.')},
{title:tr(l,'Check format and destination','Comprobar formato y destino'),detail:tr(l,'Confirm that your DJ software and player support it.','Confirmar compatibilidad con software y reproductor.')},
{title:tr(l,'Acquire and audition','Obtener y escuchar'),detail:tr(l,'Check start, middle and ending at safe volume.','Escuchar principio, centro y final con volumen seguro.')},
{title:tr(l,'Store and label','Guardar y etiquetar'),detail:tr(l,'Use stable paths and accurate version metadata.','Usar rutas estables y metadatos correctos.')},
{title:tr(l,'Import and load','Importar y cargar'),detail:tr(l,'Test in the actual performance software.','Probar en el software de actuación real.')},
{title:tr(l,'Check network dependencies','Comprobar dependencias de red'),detail:tr(l,'Test offline only where offline use is permitted.','Probar sin conexión solo donde esté permitido.')},
{title:tr(l,'Back up and record provenance','Respaldar y documentar'),detail:tr(l,'Keep original and library data recoverable.','Conservar original y datos recuperables.')}
]} /></Figure>}
function SourceAuditWorksheet({lang:l}:{lang:Lang}) {return <Figure title={tr(l,'Five-track source audit worksheet','Ficha de auditoría de cinco canciones')} note={tr(l,'Fill in one row per track. "Unknown" is a valid answer until you verify a right, format or offline capability.','Rellena una fila por canción. «Desconocido» es una respuesta válida hasta comprobar permisos, formato o disponibilidad offline.')}><Matrix heads={[tr(l,'Track','Tema'),tr(l,'Source and version','Fuente y versión'),tr(l,'Local file?','¿Archivo local?'),tr(l,'Offline tested?','¿Probado offline?')]} rows={Array.from({length:5},(_,i)=>[String(i+1),tr(l,'To complete','Por completar'),tr(l,'Yes / No / Unknown','Sí / No / No sé'),tr(l,'Yes / No / N/A','Sí / No / N/A')])}/><div className={s.badge}>{tr(l,'Next action: verify missing evidence','Siguiente: verificar la información pendiente')}</div></Figure>}
export function SourceLandscapeEn() { return <SourceLandscape lang="en" />; }
export function SourceLandscapeEs() { return <SourceLandscape lang="es" />; }
export function AccessVsFileEn() { return <AccessVsFile lang="en" />; }
export function AccessVsFileEs() { return <AccessVsFile lang="es" />; }
export function VersionChooserEn() { return <VersionChooser lang="en" />; }
export function VersionChooserEs() { return <VersionChooser lang="es" />; }
export function QualityProvenanceEn() { return <QualityProvenance lang="en" />; }
export function QualityProvenanceEs() { return <QualityProvenance lang="es" />; }
export function SourceToLibraryEn() { return <SourceToLibrary lang="en" />; }
export function SourceToLibraryEs() { return <SourceToLibrary lang="es" />; }
export function UsagePermissionMatrixEn() { return <UsagePermissionMatrix lang="en" />; }
export function UsagePermissionMatrixEs() { return <UsagePermissionMatrix lang="es" />; }
export function AcquisitionChecklistEn() { return <AcquisitionChecklist lang="en" />; }
export function AcquisitionChecklistEs() { return <AcquisitionChecklist lang="es" />; }
export function SourceAuditWorksheetEn() { return <SourceAuditWorksheet lang="en" />; }
export function SourceAuditWorksheetEs() { return <SourceAuditWorksheet lang="es" />; }
