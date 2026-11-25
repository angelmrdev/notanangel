import type { ReactNode } from 'react';
import s from './module05-audio-formats-visuals.module.css';

type Lang = 'en' | 'es';
type Item = {title:string;detail:string};
const tr=(l:Lang,en:string,es:string)=>l==='en'?en:es;
function Figure({title,note,children}:{title:string;note:string;children:ReactNode}) {return <figure className={s.figure}><figcaption className={s.heading}>{title}</figcaption>{children}<p className={s.note}>{note}</p></figure>}
function Cards({items}:{items:Item[]}){return <div className={s.grid}>{items.map((x,i)=><div className={s.card} key={i}><strong>{x.title}</strong><span>{x.detail}</span></div>)}</div>}
function Matrix({heads,rows}:{heads:string[];rows:string[][]}){return <div className={s.wrap}><table className={s.table}><thead><tr>{heads.map((x,i)=><th key={i} scope="col">{x}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{row.map((x,j)=><td key={j}>{x}</td>)}</tr>)}</tbody></table></div>}
function Steps({items}:{items:Item[]}){return <div className={s.flow}>{items.map((x,i)=><div className={s.step} key={i}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{x.title}</strong><small>{x.detail}</small></div></div>)}</div>}
function Bars({data}:{data:{name:string;value:number;label:string}[]}){return <div>{data.map((x,i)=><div className={s.bar} key={i}><span className={s.label}>{x.name}</span><div className={s.track}><div className={s.fill} style={{width:`${Math.max(0,Math.min(100,x.value))}%`}} /></div><span className={s.value}>{x.label}</span></div>)}</div>}
function AudioFormatFamilyMap({lang:l}:{lang:Lang}) {return <Figure title={tr(l,'Five common DJ audio formats — not five quality rankings','Cinco formatos DJ habituales, no una clasificación de calidad')} note={tr(l,'File extension alone cannot certify original quality. Actual codec, source and player support all matter.','La extensión no demuestra la calidad de origen. Importan el códec real, la fuente y la compatibilidad.') }><Matrix heads={[tr(l,'Format','Formato'),tr(l,'Typical encoding','Codificación habitual'),tr(l,'Practical note','Nota práctica')]} rows={[
['MP3',tr(l,'Lossy','Con pérdidas'),tr(l,'Widely supported; quality depends on source and encoding','Muy compatible; depende de origen y codificación')],['AAC / M4A',tr(l,'Usually lossy AAC; M4A is a container','Habitualmente AAC con pérdidas; M4A es contenedor'),tr(l,'Codec and device support must be checked','Comprobar códec y dispositivo')],['WAV',tr(l,'Often uncompressed PCM','Habitualmente PCM sin comprimir'),tr(l,'Large files; metadata and codec support vary','Archivos grandes; metadatos y códecs variables')],['AIFF',tr(l,'Often uncompressed PCM','Habitualmente PCM sin comprimir'),tr(l,'Check tagging and hardware support','Comprobar etiquetas y hardware')],['FLAC',tr(l,'Lossless compression','Compresión sin pérdidas'),tr(l,'Smaller than PCM; not universally supported','Menor tamaño que PCM; compatibilidad variable')]
]} /></Figure>}
function LossyLosslessSignal({lang:l}:{lang:Lang}) {return <Figure title={tr(l,'What does an encoder keep?','¿Qué conserva una codificación?')} note={tr(l,'Illustrative process diagram, not a literal spectrum. Lossless reconstruction is bit-exact for the decoded PCM samples; lossy encoding does not guarantee that.','Esquema conceptual, no espectro real. La reconstrucción sin pérdidas conserva las muestras PCM decodificadas; la compresión con pérdidas no lo garantiza.')}><Cards items={[
{title:tr(l,'Original PCM source','Fuente PCM original'),detail:tr(l,'A sequence of digital audio samples.','Una secuencia de muestras digitales de audio.')},
{title:tr(l,'Lossless — FLAC','Sin pérdidas — FLAC'),detail:tr(l,'Reversible packing; decoding restores the same samples.','Compresión reversible; recupera las mismas muestras.')},
{title:tr(l,'Lossy — MP3 / AAC','Con pérdidas — MP3 / AAC'),detail:tr(l,'Perceptual encoding discards selected information to save space.','La codificación perceptual descarta información para ahorrar espacio.')},
{title:tr(l,'Output is not the source certificate','La salida no acredita el origen'),detail:tr(l,'A WAV made from MP3 cannot bring discarded details back.','Un WAV creado desde MP3 no recupera lo eliminado.')}
]} /></Figure>}
function BitrateStorageCompare({lang:l}:{lang:Lang}){return <Figure title={tr(l,'Approximate storage for one hour of stereo audio','Almacenamiento aproximado por hora de audio estéreo')} note={tr(l,'Illustrative decimal MB; MP3/AAC assume constant bitrates; PCM assumes 44.1 kHz/16-bit stereo (about 635 MB/h). FLAC varies with the programme and is deliberately excluded from fixed-size bars.','MB decimales orientativos; MP3/AAC con bitrate constante; PCM estéreo a 44,1 kHz/16 bits (aprox. 635 MB/h). FLAC depende del contenido y no tiene barra fija.')}><Bars data={[{name:'128 kb/s',value:10,label:'58 MB'},{name:'192 kb/s',value:14,label:'86 MB'},{name:'256 kb/s',value:18,label:'115 MB'},{name:'320 kb/s',value:23,label:'144 MB'},{name:'PCM 16-bit',value:100,label:'635 MB'}]}/></Figure>}
function SampleRateBitDepth({lang:l}:{lang:Lang}){return <Figure title={tr(l,'Sample rate and bit depth describe different properties','La frecuencia de muestreo y los bits describen propiedades diferentes')} note={tr(l,'Bit depth here describes integer PCM quantisation, not an automatic guarantee of perceived quality. More data is not proof of a better master.','La profundidad de bits describe cuantización PCM entera, no garantiza más calidad audible. Más datos no demuestran un máster mejor.')}><Cards items={[
{title:tr(l,'44.1 kHz','44,1 kHz'),detail:tr(l,'44,100 samples per second, per channel.','44.100 muestras por segundo y canal.')},
{title:tr(l,'48 kHz','48 kHz'),detail:tr(l,'48,000 samples per second, per channel.','48.000 muestras por segundo y canal.')},
{title:tr(l,'16-bit PCM','PCM de 16 bits'),detail:tr(l,'65,536 possible integer levels per sample.','65.536 niveles enteros posibles por muestra.')},
{title:tr(l,'24-bit PCM','PCM de 24 bits'),detail:tr(l,'More quantisation precision; useful in production.','Mayor precisión de cuantización; útil al producir.')}
]} /></Figure>}
function TranscodingReality({lang:l}:{lang:Lang}){return <Figure title={tr(l,'Converting a file is not upgrading its source','Convertir un archivo no mejora su fuente')} note={tr(l,'Transcoding can be useful to meet hardware requirements; avoid repeated lossy conversions and preserve authorised originals.','Convertir puede servir para cumplir requisitos de hardware. Evita recodificaciones con pérdidas y conserva los originales autorizados.')}><Steps items={[
{title:tr(l,'An original MP3 contains lossy audio','Un MP3 original contiene audio con pérdidas'),detail:tr(l,'Some information was discarded when encoded.','Se descartó información durante la codificación.')},
{title:tr(l,'Decoding creates PCM samples','Al decodificar se obtienen muestras PCM'),detail:tr(l,'The decoder outputs a playable waveform, not the deleted details.','El decodificador obtiene audio reproducible, no los detalles perdidos.')},
{title:tr(l,'Saving as WAV stores those decoded samples','Guardar como WAV almacena esas muestras'),detail:tr(l,'The file gets larger but cannot recover lost information.','El archivo crece, pero la información no reaparece.')},
{title:tr(l,'Use the authorised best source available','Usa la mejor fuente autorizada disponible'),detail:tr(l,'Choose format based on source quality and target hardware.','Elige según calidad de origen y equipo de destino.')}
]} /></Figure>}
function PlaybackCompatibility({lang:l}:{lang:Lang}){return <Figure title={tr(l,'Test the exact export path, not just the extension','Comprueba el recorrido real, no solo la extensión')} note={tr(l,'These checks are deliberately manufacturer-neutral: support can vary by player generation, firmware, codec, USB format and export software.','Comprobación independiente de fabricantes: la compatibilidad depende de reproductor, firmware, códec, USB y software de exportación.')}><Matrix heads={[tr(l,'Checkpoint','Comprobación'),tr(l,'Question','Pregunta')]} rows={[
[tr(l,'DJ application','Software DJ'),tr(l,'Can it import, analyse and play the exact file?','¿Importa, analiza y reproduce este archivo?')],
[tr(l,'Export / library','Exportación / biblioteca'),tr(l,'Does the export workflow preserve a usable reference?','¿La exportación conserva una referencia utilizable?')],
[tr(l,'Player / controller','Reproductor / controladora'),tr(l,'Does this model and firmware decode the codec?','¿Este modelo y firmware decodifican el códec?')],
[tr(l,'Storage device','Unidad de almacenamiento'),tr(l,'Are filesystem, folder names and USB media supported?','¿Admite sistema de archivos, nombres y USB?')],
[tr(l,'Offline test','Prueba sin conexión'),tr(l,'Can you load, cue and finish a track on the real setup?','¿Puedes cargar, preescuchar y acabar una pista en el equipo real?')]
]} /></Figure>}
function AudioFileQualityCheck({lang:l}:{lang:Lang}){return <Figure title={tr(l,'A six-check audio quality workflow','Seis comprobaciones de calidad del archivo')} note={tr(l,'A spectrogram or reported bitrate can flag anomalies but cannot conclusively certify mastering quality or authenticity on its own.','Un espectrograma o bitrate puede revelar anomalías, pero por sí solo no certifica la calidad ni autenticidad del máster.')}><Steps items={[
{title:tr(l,'Identify source and version','Identifica procedencia y versión'),detail:tr(l,'Use a legitimate, verifiable release.','Utiliza un lanzamiento legítimo y verificable.')},
{title:tr(l,'Inspect actual codec and properties','Comprueba códec y propiedades'),detail:tr(l,'Extension alone is insufficient.','La extensión por sí sola no basta.')},
{title:tr(l,'Audition intro and outro','Escucha intro y outro'),detail:tr(l,'Check missing beats and unwanted edits.','Comprueba golpes ausentes y cortes inesperados.')},
{title:tr(l,'Listen to a loud section at safe level','Escucha un tramo intenso a volumen seguro'),detail:tr(l,'Check glitches, obvious distortion and unwanted artifacts.','Busca fallos, distorsión y artefactos evidentes.')},
{title:tr(l,'Verify target software and player','Verifica el software y reproductor'),detail:tr(l,'Import and load the real exported file.','Importa y carga el archivo exportado real.')},
{title:tr(l,'Keep master and backup','Conserva original y copia de seguridad'),detail:tr(l,'Do not overwrite the source with a transcoded version.','No sobrescribas la fuente con una conversión.')}
]} /></Figure>}
function AudioFormatDecisionLab({lang:l}:{lang:Lang}){return <Figure title={tr(l,'Five decisions: select and justify the format','Cinco decisiones: elige formato y justifícalo')} note={tr(l,'There is no universal best format. Record the source, compatibility evidence and reason for every choice.','No existe un formato óptimo universal. Documenta origen, compatibilidad y motivo de cada elección.')}><Matrix heads={[tr(l,'Scenario','Situación'),tr(l,'What must be checked?','¿Qué comprobar?')]} rows={[
[tr(l,'Laptop DJ set with limited storage','Sesión con portátil y poco espacio'),tr(l,'Trusted lossy source, bitrate, compatibility, backup','Fuente con pérdidas fiable, bitrate, compatibilidad, respaldo')],
[tr(l,'USB export to club media player','USB para reproductor de club'),tr(l,'Exact player codecs, filesystem and exported library','Códecs del reproductor, sistema de archivos y exportación')],
[tr(l,'Lossless archive for long-term use','Archivo sin pérdidas a largo plazo'),tr(l,'Source provenance, lossless codec, redundant backups','Procedencia, códec sin pérdidas y varias copias')],
[tr(l,'An MP3 disguised as WAV','MP3 convertido a WAV'),tr(l,'Converting does not recover lost source quality','La conversión no recupera calidad de origen')],
[tr(l,'A 24-bit master for DJ playback','Máster de 24 bits para pinchar'),tr(l,'Device support, playback workflow and whether conversion is needed','Compatibilidad, reproducción y necesidad real de conversión')]
]} /></Figure>}
export function AudioFormatFamilyMapEn() {return <AudioFormatFamilyMap lang="en" />;}
export function AudioFormatFamilyMapEs() {return <AudioFormatFamilyMap lang="es" />;}
export function LossyLosslessSignalEn() {return <LossyLosslessSignal lang="en" />;}
export function LossyLosslessSignalEs() {return <LossyLosslessSignal lang="es" />;}
export function BitrateStorageCompareEn() {return <BitrateStorageCompare lang="en" />;}
export function BitrateStorageCompareEs() {return <BitrateStorageCompare lang="es" />;}
export function SampleRateBitDepthEn() {return <SampleRateBitDepth lang="en" />;}
export function SampleRateBitDepthEs() {return <SampleRateBitDepth lang="es" />;}
export function TranscodingRealityEn() {return <TranscodingReality lang="en" />;}
export function TranscodingRealityEs() {return <TranscodingReality lang="es" />;}
export function PlaybackCompatibilityEn() {return <PlaybackCompatibility lang="en" />;}
export function PlaybackCompatibilityEs() {return <PlaybackCompatibility lang="es" />;}
export function AudioFileQualityCheckEn() {return <AudioFileQualityCheck lang="en" />;}
export function AudioFileQualityCheckEs() {return <AudioFileQualityCheck lang="es" />;}
export function AudioFormatDecisionLabEn() {return <AudioFormatDecisionLab lang="en" />;}
export function AudioFormatDecisionLabEs() {return <AudioFormatDecisionLab lang="es" />;}
