import type { ReactNode } from 'react';
import s from './module03-hardware-visuals.module.css';

type Lang = 'en' | 'es';
type VisualProps = { lang: Lang };
const t = (lang: Lang, en: string, es: string) => lang === 'es' ? es : en;

function Figure({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return <figure className={s.figure}><figcaption className={s.title}>{title}</figcaption>{children}<p className={s.caption}>{caption}</p></figure>;
}
function Node({ small, name, detail, tone = 'neutral' }: { small: string; name: string; detail?: string; tone?: 'pink'|'yellow'|'cyan'|'neutral' }) {
  return <div className={s.node} data-tone={tone}><small>{small}</small><strong>{name}</strong>{detail ? <span>{detail}</span> : null}</div>;
}
function Arrow() { return <span className={s.arrow} aria-hidden="true">→</span>; }
function Path({ label, nodes }: { label: string; nodes: Array<{ small:string; name:string; detail?:string; tone?: 'pink'|'yellow'|'cyan'|'neutral' }> }) {
  return <div className={s.path}><h4>{label}</h4><div className={s.pathFlow}>{nodes.map((n, i) => <div className={s.pathItem} key={`${label}-${i}`}><Node {...n}/>{i < nodes.length-1 ? <Arrow/> : null}</div>)}</div></div>;
}

export function HardwareFunctionsMap({ lang }: VisualProps) {
 const groups = [
  [t(lang,'MUSIC SOURCE','FUENTE MUSICAL'),t(lang,'Files, streams or records','Archivos, streaming o discos'),'cyan'],
  [t(lang,'PLAYBACK','REPRODUCCIÓN'),t(lang,'Software, player or stylus','Software, reproductor o cápsula'),'yellow'],
  [t(lang,'PERFORMANCE CONTROL','CONTROL DJ'),t(lang,'Jog, transport, pitch or platter','Jog, botones, pitch o plato'),'pink'],
  [t(lang,'MIX + ROUTING','MEZCLA Y RUTAS'),t(lang,'Channels, cue and master','Canales, preescucha y master'),'cyan']
 ] as const;
 return <Figure title={t(lang,'Four functions, many possible layouts','Cuatro funciones, distintas configuraciones')} caption={t(lang,'These are functions, not necessarily separate devices. One unit may perform more than one function.','Son funciones, no necesariamente aparatos separados. Una unidad puede realizar varias funciones.')}>
  <div className={s.fourGrid}>{groups.map(([a,b,tone],i)=><div className={s.functionCard} data-tone={tone} key={a}><span className={s.number}>0{i+1}</span><strong>{a}</strong><span>{b}</span></div>)}</div>
 </Figure>;
}
export function HardwareSignalPaths({ lang }: VisualProps) {
 const master=t(lang,'MASTER / audience','MASTER / público');
 return <Figure title={t(lang,'Where audio is created and mixed','Dónde se reproduce y mezcla el audio')} caption={t(lang,'Conceptual routing only. Physical outputs, cue routing and network capability vary by device and operating mode.','Rutas conceptuales. Las salidas físicas, la preescucha y la conectividad dependen del modelo y modo de uso.')}>
 <div className={s.paths}>
 <Path label={t(lang,'Controller + laptop','Controladora + portátil')} nodes={[{small:t(lang,'LIBRARY + PLAYBACK','BIBLIOTECA Y REPRODUCCIÓN'),name:t(lang,'DJ software','Software DJ'),tone:'cyan'},{small:t(lang,'CONTROL + AUDIO','CONTROL Y AUDIO'),name:t(lang,'Controller / interface','Controladora / interfaz'),tone:'pink'},{small:'MASTER',name:master,tone:'yellow'}]}/>
 <Path label={t(lang,'Media players + external mixer','Reproductores + mesa externa')} nodes={[{small:t(lang,'FILES','ARCHIVOS'),name:'USB / media',tone:'cyan'},{small:t(lang,'PLAYBACK','REPRODUCCIÓN'),name:t(lang,'Player A + B','Reproductor A + B'),tone:'pink'},{small:t(lang,'MIX','MEZCLA'),name:t(lang,'External mixer','Mesa externa'),tone:'yellow'},{small:'MASTER',name:master}]}/>
 <Path label={t(lang,'Standalone all-in-one','Equipo autónomo todo en uno')} nodes={[{small:t(lang,'FILES','ARCHIVOS'),name:'USB / media',tone:'cyan'},{small:t(lang,'PLAYBACK + MIX','REPRODUCCIÓN Y MEZCLA'),name:t(lang,'All-in-one unit','Unidad todo en uno'),tone:'pink'},{small:'MASTER',name:master,tone:'yellow'}]}/>
 <Path label={t(lang,'Ordinary vinyl','Vinilo convencional')} nodes={[{small:t(lang,'PHYSICAL RECORD','DISCO FÍSICO'),name:t(lang,'Turntables','Platos'),tone:'cyan'},{small:t(lang,'SIGNAL CONDITIONING','ADAPTACIÓN DE SEÑAL'),name:t(lang,'Phono stage','Previo phono'),tone:'pink'},{small:t(lang,'MIX','MEZCLA'),name:t(lang,'DJ mixer','Mesa DJ'),tone:'yellow'},{small:'MASTER',name:master}]}/>
 </div></Figure>;
}
export function ControllerAnatomy({ lang }: VisualProps) {
 const labels=[t(lang,'LEFT DECK','DECK IZQUIERDO'),t(lang,'MIXER SECTION','SECCIÓN DE MEZCLA'),t(lang,'RIGHT DECK','DECK DERECHO')];
 return <Figure title={t(lang,'Identify the three working areas','Identifica las tres zonas de trabajo')} caption={t(lang,'Schematic controller, not a model-specific layout. Deck controls and audio capabilities vary.','Controladora esquemática, no representa un modelo concreto. Los controles y capacidades de audio varían.')}>
 <div className={s.controller} role="img" aria-label={t(lang,'Schematic: two deck sections flank a central mixer area with channel faders, EQ and cue.','Esquema: dos decks a los lados de una sección central con faders, ecualización y preescucha.')}>
  {labels.map((label,i)=><section className={s.controllerZone} key={label} data-tone={i===1?'yellow':'cyan'}><strong>{label}</strong>{i!==1?<><div className={s.jog}><span>JOG</span></div><div className={s.controls}><span>PLAY</span><span>CUE</span><span>PITCH</span></div></>:<><div className={s.knobs}><span>HI</span><span>MID</span><span>LOW</span></div><div className={s.faders}><span>CH 1</span><span>CH 2</span></div><div className={s.controls}><span>CUE</span><span>MASTER</span></div></>}</section>)}
 </div></Figure>;
}
export function PlayerVsMixerRoles({ lang }: VisualProps) {
 return <Figure title={t(lang,'Playback controls and channel controls are different jobs','Los controles de reproducción y de canal cumplen funciones distintas')} caption={t(lang,'A separate media player controls track playback; an external mixer manages channel gain, cue and outputs. Some all-in-one units combine both roles.','Un reproductor independiente controla la pista; la mesa externa gestiona ganancia, preescucha y salidas. Algunos equipos integran ambos.')}>
  <div className={s.twoCols}><div className={s.roleCard}><b>{t(lang,'PLAYER / DECK','REPRODUCTOR / DECK')}</b><ul><li>{t(lang,'Load and locate tracks','Cargar y localizar pistas')}</li><li>{t(lang,'PLAY / CUE / loop','PLAY / CUE / loop')}</li><li>{t(lang,'Pitch and jog adjustments','Ajustes de pitch y jog')}</li></ul></div><div className={s.roleCard}><b>{t(lang,'MIXER / CHANNEL','MESA / CANAL')}</b><ul><li>{t(lang,'Input gain and level','Ganancia y nivel de entrada')}</li><li>{t(lang,'EQ, filter, channel fader','EQ, filtro y fader de canal')}</li><li>{t(lang,'Headphone cue and master routing','Preescucha y enrutamiento MASTER')}</li></ul></div></div>
 </Figure>;
}
export function VinylPhonoStage({ lang }: VisualProps) {
 return <Figure title={t(lang,'Why phono is not line level','Por qué PHONO no es lo mismo que LINE')} caption={t(lang,'A standard magnetic cartridge normally needs phono gain and equalization before entering a line-level signal path. Use the appropriate inputs; some turntables provide switchable line outputs.','Una cápsula magnética convencional normalmente requiere ganancia y ecualización phono antes de la ruta de línea. Usa las entradas apropiadas; algunos platos permiten seleccionar salida LINE.')}>
 <Path label={t(lang,'Ordinary record playback','Reproducción de vinilo convencional')} nodes={[{small:t(lang,'MECHANICAL','MECÁNICA'),name:t(lang,'Vinyl + stylus','Vinilo + aguja'),tone:'cyan'},{small:t(lang,'LOW LEVEL','NIVEL BAJO'),name:t(lang,'Cartridge / PHONO','Cápsula / PHONO'),tone:'pink'},{small:t(lang,'GAIN + EQUALIZATION','GANANCIA + ECUALIZACIÓN'),name:t(lang,'Phono preamp','Previo phono'),tone:'yellow'},{small:t(lang,'LINE','LÍNEA'),name:t(lang,'Mixer channel','Canal de mesa')}]}/>
 <div className={s.note}>{t(lang,'Do not connect an amplifier speaker output to a mixer line input.','Nunca conectes la salida de potencia para altavoces de un amplificador a una entrada LINE de una mesa.')}</div>
 </Figure>;
}
export function VinylVsDVS({ lang }: VisualProps) {
 return <Figure title={t(lang,'Ordinary vinyl and DVS: two different sources of music','Vinilo convencional y DVS: dos fuentes musicales distintas')} caption={t(lang,'DVS requires a compatible timecode signal, interface/input path and software. Ordinary vinyl playback uses the music physically pressed into the groove.','DVS necesita señal de código de tiempo, ruta de entrada/interfaz y software compatibles. El vinilo normal reproduce la música grabada físicamente en el surco.')}>
 <div className={s.twoCols}><div className={s.roleCard}><b>{t(lang,'ORDINARY VINYL','VINILO NORMAL')}</b><p>{t(lang,'Music is in the record groove. The cartridge produces the audio signal.','La música está en el surco. La cápsula produce la señal de audio.')}</p><span className={s.chip}>{t(lang,'Record → phono → mixer','Disco → phono → mesa')}</span></div><div className={s.roleCard}><b>DVS</b><p>{t(lang,'Timecode from the control record directs software playback of a digital track.','El código de tiempo del disco de control dirige la reproducción de un archivo digital.')}</p><span className={s.chip}>{t(lang,'Timecode → software → audio out','Timecode → software → salida audio')}</span></div></div>
 </Figure>;
}
export function HardwareFailurePoints({ lang }: VisualProps) {
 const cases=[
 [t(lang,'Controller + laptop','Controladora + portátil'),t(lang,'Laptop, audio driver, USB and software','Portátil, driver de audio, USB y software'),t(lang,'Check audio device and power settings','Revisa dispositivo de audio y energía')],
 [t(lang,'Separate media players','Reproductores separados'),t(lang,'Drive format, exports and local links','Formato USB, exportación y enlaces locales'),t(lang,'Test media compatibility before the gig','Comprueba la compatibilidad antes del bolo')],
 [t(lang,'Standalone','Autónomo'),t(lang,'Drive, firmware and supported formats','USB, firmware y formatos compatibles'),t(lang,'Verify on-unit playback without computer','Prueba la reproducción sin ordenador')],
 [t(lang,'Turntables','Platos'),t(lang,'Needle, grounding and vibration','Aguja, tierra y vibraciones'),t(lang,'Inspect stylus and phono input','Revisa cápsula y entrada phono')]
 ];
 return <Figure title={t(lang,'Know the critical failure point','Conoce los puntos débiles de cada sistema')} caption={t(lang,'Illustrative checks, not an exhaustive fault diagnosis. Always follow the manuals of the exact devices.','Comprobaciones orientativas, no diagnóstico exhaustivo. Consulta siempre los manuales del equipo concreto.')}>
 <div className={s.matrix} role="table" aria-label={t(lang,'Hardware workflow reliability checklist','Lista de fiabilidad por tipo de equipo')}>
 <div className={s.matrixHeader} role="row"><b role="columnheader">{t(lang,'SETUP','EQUIPO')}</b><b role="columnheader">{t(lang,'RISK','RIESGO')}</b><b role="columnheader">{t(lang,'CHECK','COMPROBAR')}</b></div>
 {cases.map(([name,risk,check])=><div className={s.matrixRow} role="row" key={name}><strong role="cell">{name}</strong><span role="cell">{risk}</span><span role="cell">{check}</span></div>)}
 </div></Figure>;
}
export function HardwareTraceWorksheet({ lang }: VisualProps) {
 const fields=[t(lang,'Where is music stored?','¿Dónde se guarda la música?'),t(lang,'Which device plays it?','¿Qué aparato reproduce?'),t(lang,'Where is audio mixed?','¿Dónde se mezcla el audio?'),t(lang,'Where does headphone cue come from?','¿De dónde sale la preescucha?'),t(lang,'Where does MASTER leave the system?','¿Por dónde sale MASTER?')];
 return <Figure title={t(lang,'Worksheet: trace two complete DJ setups','Ejercicio: sigue dos cadenas de señal completas')} caption={t(lang,'Complete the worksheet using real device manuals. Do not assume that USB, RCA or XLR performs the same job on every device.','Completa la ficha con manuales reales. No presupongas que USB, RCA o XLR tienen la misma función en todos los equipos.')}>
 <div className={s.worksheet}><div className={s.worksheetHeader}><span>{t(lang,'QUESTION','PREGUNTA')}</span><span>{t(lang,'A · LAPTOP + CONTROLLER','A · PORTÁTIL + CONTROLADORA')}</span><span>{t(lang,'B · PLAYERS + MIXER','B · REPRODUCTORES + MESA')}</span></div>{fields.map(q=><div className={s.worksheetRow} key={q}><strong>{q}</strong><span className={s.blank} aria-hidden="true"/><span className={s.blank} aria-hidden="true"/></div>)}</div>
 </Figure>;
}

export const HardwareFunctionsMapEn=()=> <HardwareFunctionsMap lang="en"/>;
export const HardwareFunctionsMapEs=()=> <HardwareFunctionsMap lang="es"/>;
export const HardwareSignalPathsEn=()=> <HardwareSignalPaths lang="en"/>;
export const HardwareSignalPathsEs=()=> <HardwareSignalPaths lang="es"/>;
export const ControllerAnatomyEn=()=> <ControllerAnatomy lang="en"/>;
export const ControllerAnatomyEs=()=> <ControllerAnatomy lang="es"/>;
export const PlayerVsMixerRolesEn=()=> <PlayerVsMixerRoles lang="en"/>;
export const PlayerVsMixerRolesEs=()=> <PlayerVsMixerRoles lang="es"/>;
export const VinylPhonoStageEn=()=> <VinylPhonoStage lang="en"/>;
export const VinylPhonoStageEs=()=> <VinylPhonoStage lang="es"/>;
export const VinylVsDVSEn=()=> <VinylVsDVS lang="en"/>;
export const VinylVsDVSEs=()=> <VinylVsDVS lang="es"/>;
export const HardwareFailurePointsEn=()=> <HardwareFailurePoints lang="en"/>;
export const HardwareFailurePointsEs=()=> <HardwareFailurePoints lang="es"/>;
export const HardwareTraceWorksheetEn=()=> <HardwareTraceWorksheet lang="en"/>;
export const HardwareTraceWorksheetEs=()=> <HardwareTraceWorksheet lang="es"/>;
