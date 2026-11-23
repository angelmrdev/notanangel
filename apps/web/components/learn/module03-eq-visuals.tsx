import type { ReactNode } from 'react';
import s from './module03-eq-visuals.module.css';

type Lang = 'en' | 'es';
function tr(lang: Lang, en: string, es: string) { return lang === 'es' ? es : en; }
function Figure({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
 return <figure className={s.figure}><figcaption className={s.heading}>{title}</figcaption>{children}<p className={s.caption}>{caption}</p></figure>;
}
function Cell({ title, detail, tone='cyan' }: {title:string;detail:string;tone?:'cyan'|'pink'|'yellow'}) {
 return <div className={s.cell} data-tone={tone}><strong>{title}</strong><span>{detail}</span></div>;
}
function MixerControlRoles({lang:l}:{lang:Lang}) {
 const rows=[
 ['TRIM / GAIN',tr(l,'Input stage: avoid overloading the channel.','Etapa de entrada: evita sobrecargar el canal.')],
 ['EQ',tr(l,'Changes the level of frequency regions.','Modifica el nivel de regiones de frecuencia.')],
 ['FILTER',tr(l,'Attenuates frequency regions around a movable cutoff.','Atenúa regiones alrededor de una frecuencia de corte móvil.')],
 ['CHANNEL FADER',tr(l,'Sets how much the channel contributes to the mix.','Regula cuánto aporta el canal a la mezcla.')],
 ['CROSSFADER',tr(l,'Blends or switches assigned channels, if enabled.','Combina o cambia canales asignados, si está habilitado.')],
 ['MASTER',tr(l,'Sets main output level; cannot repair upstream clipping.','Ajusta la salida principal; no repara una saturación anterior.')]];
 return <Figure title={tr(l,'Six controls: six different jobs','Seis controles: seis funciones distintas')} caption={tr(l,'Control order, pickup points, scales and assignments depend on mixer model.','El orden de controles, puntos de toma, escalas y asignaciones dependen de la mesa.')}><div className={s.cards}>{rows.map(([name,detail],i)=><Cell key={name} title={name} detail={detail} tone={i%3===0?'yellow':i%3===1?'pink':'cyan'}/>)}</div></Figure>;
}
function GainStageMeter({lang:l}:{lang:Lang}) {
 const examples=[{name:tr(l,'Healthy headroom','Margen adecuado'),bars:7,status:tr(l,'Transient peaks below clipping','Picos transitorios sin clipping'),danger:false},{name:tr(l,'Overdriven input','Entrada saturada'),bars:10,status:tr(l,'Lower trim before downstream controls','Reduce trim antes de los controles posteriores'),danger:true}];
 return <Figure title={tr(l,'Input gain and headroom','Ganancia de entrada y margen dinámico')} caption={tr(l,'Illustrative meters, not universal dB calibration. Red indicators and peak-hold behaviours vary by device.','Medidores ilustrativos, no una calibración universal en dB. El rojo y la retención de picos varían según el equipo.')}><div className={s.two}>{examples.map(e=><div className={s.cell} key={e.name}><strong>{e.name}</strong><div className={s.meter} role="img" aria-label={e.status}>{Array.from({length:10},(_,i)=><span key={i} data-active={i<e.bars} data-zone={i>=8?'danger':i>=6?'caution':'normal'}/>)}</div><span>{e.status}</span></div>)}</div><p className={s.note}>{tr(l,'A quieter master does not undo clipping produced at the input stage.','Bajar el master no deshace la saturación producida en la entrada.')}</p></Figure>;
}
function ThreeBandEQ({lang:l}:{lang:Lang}) {
 const rows=[['LOW',tr(l,'Kick weight and bass fundamentals (often, but not only).','Peso del bombo y fundamentales del bajo (habitualmente, no exclusivamente).')],['MID',tr(l,'Vocal intelligibility and many melodic elements.','Inteligibilidad vocal y buena parte de los elementos melódicos.')],['HIGH',tr(l,'Hi-hats, brightness and high-frequency detail.','Charleston, brillo y detalles de alta frecuencia.')]];
 return <Figure title={tr(l,'Three-band EQ: an approximate map','Ecualizador de tres bandas: mapa aproximado')} caption={tr(l,'Band crossover frequencies, gain ranges and isolator behaviour vary widely. Bands overlap; instruments are not confined to one band.','Las frecuencias de cruce, rangos y modo isolator varían mucho. Las bandas se solapan; ningún instrumento pertenece solo a una.')}><div className={s.bands}>{rows.map(([name,detail],i)=><div key={name} className={s.band} data-index={i}><strong>{name}</strong><span>{detail}</span></div>)}</div><div className={s.axis}><span>{tr(l,'Lower frequencies','Frecuencias bajas')}</span><span>{tr(l,'Higher frequencies','Frecuencias altas')}</span></div></Figure>;
}
function FrequencyOverlap({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Why two bass-heavy tracks can mask each other','Por qué dos pistas con mucho grave pueden enmascararse')} caption={tr(l,'Simplified concept; electrical clipping, acoustic masking and musical arrangement are different issues. Cutting lows is a technique, not an automatic requirement.','Concepto simplificado: clipping eléctrico, enmascaramiento acústico y arreglo musical no son lo mismo. Recortar graves es una técnica, no una obligación.')}><div className={s.two}><div className={s.cell}><strong>{tr(l,'Two strong low ends','Dos graves protagonistas')}</strong><div className={s.overlap}><span/><span/></div><span>{tr(l,'Dense overlap may obscure kick and bass definition.','El solapamiento puede restar definición a bombo y bajo.')}</span></div><div className={s.cell}><strong>{tr(l,'Deliberate space','Espacio deliberado')}</strong><div className={s.overlap} data-separated="true"><span/><span/></div><span>{tr(l,'Adjust arrangement or EQ while listening to the master.','Ajusta arreglo o EQ escuchando el master.')}</span></div></div></Figure>;
}
function HighLowPassFilters({lang:l}:{lang:Lang}) {
 const filters=[{name:'HPF',title:tr(l,'High-pass filter','Filtro paso alto'),desc:tr(l,'Attenuates frequencies below the cutoff.','Atenúa frecuencias por debajo del corte.'),points:'8,80 35,78 65,40 92,26 132,25 170,25'},{name:'LPF',title:tr(l,'Low-pass filter','Filtro paso bajo'),desc:tr(l,'Attenuates frequencies above the cutoff.','Atenúa frecuencias por encima del corte.'),points:'8,25 45,25 78,26 102,41 135,79 170,80'}];
 return <Figure title={tr(l,'HPF versus LPF: which frequencies remain?','HPF frente a LPF: ¿qué frecuencias permanecen?')} caption={tr(l,'Qualitative response shapes; resonance, slope, wet/dry mix and cutoff control differ across hardware. The graphic is not a measured frequency response.','Curvas cualitativas: resonancia, pendiente, mezcla dry/wet y frecuencia de corte varían entre equipos. No representa una medición real.')}><div className={s.two}>{filters.map(f=><div key={f.name} className={s.cell}><strong>{f.name} · {f.title}</strong><svg viewBox="0 0 178 96" role="img" aria-label={`${f.name}: ${f.desc}`} className={s.curve}><line x1="6" y1="84" x2="174" y2="84" stroke="currentColor" strokeOpacity=".4"/><polyline fill="none" stroke="#2bc6d8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={f.points}/></svg><span>{f.desc}</span></div>)}</div></Figure>;
}
function ChannelCrossfaderCurves({lang:l}:{lang:Lang}) {
 return <Figure title={tr(l,'Channel fader, crossfader assignment and curve','Fader de canal, asignación y curva del crossfader')} caption={tr(l,'The crossfader may be disabled, unassigned or set to a cut/sharp curve. Centre position does not necessarily mean a 50/50 perceived blend.','El crossfader puede estar desactivado, sin asignación o con curva de corte. Su centro no implica necesariamente una mezcla percibida al 50 %.')}><div className={s.two}><Cell title={tr(l,'CHANNEL FADER','FADER DE CANAL')} detail={tr(l,'Regulates contribution of its own channel; routing may also depend on other controls.','Regula la contribución de su canal; el recorrido puede depender de otros controles.')} tone="yellow"/><Cell title="CROSSFADER A ⇄ B" detail={tr(l,'Acts on channels assigned to A and B; THRU/unassigned channels may bypass it.','Actúa sobre canales asignados a A/B; los canales en THRU o sin asignar pueden evitarlo.')} tone="pink"/></div><div className={s.curves}><div><strong>{tr(l,'Smooth blend','Mezcla gradual')}</strong><svg viewBox="0 0 160 80" role="img" aria-label={tr(l,'Smooth crossover between deck A and deck B.','Cruce gradual entre canal A y canal B.')}><polyline points="0,8 40,20 80,40 120,60 160,72" stroke="#e968a5" strokeWidth="3" fill="none"/><polyline points="0,72 40,60 80,40 120,20 160,8" stroke="#25c5d4" strokeWidth="3" fill="none"/></svg></div><div><strong>{tr(l,'Sharp cut','Corte rápido')}</strong><svg viewBox="0 0 160 80" role="img" aria-label={tr(l,'Sharp crossfader curve near the edges.','Curva de corte brusco cerca de los extremos.')}><polyline points="0,8 18,70 140,72 160,72" stroke="#e968a5" strokeWidth="3" fill="none"/><polyline points="0,72 20,8 142,8 160,72" stroke="#25c5d4" strokeWidth="3" fill="none"/></svg></div></div></Figure>;
}
function SafeControlSequence({lang:l}:{lang:Lang}) {
 const steps=l==='es'?[['01','VOLUMEN SEGURO','Baja el nivel de escucha; comprueba cableado, entradas y ajustes de canal.'],['02','GANANCIA','Reproduce el tramo más fuerte y ajusta trim mirando el medidor adecuado.'],['03','EQ / FILTRO','Coloca los controles en neutral antes de comparar cambios.'],['04','FADER DE CANAL','Aumenta gradualmente la contribución del canal a la mezcla.'],['05','MASTER / BOOTH','Ajusta la escucha y comprueba si hay clipping o limitadores.']]:[['01','SAFE OUTPUT','Lower listening levels; check wiring, input selection and channel settings.'],['02','INPUT GAIN','Play a loud passage and set trim using the appropriate meter.'],['03','EQ / FILTER','Return controls to neutral before evaluating changes.'],['04','CHANNEL FADER','Raise contribution to the program mix gradually.'],['05','MASTER / BOOTH','Set monitoring levels and check for clipping or limiting.']];
 return <Figure title={tr(l,'A repeatable setup sequence','Secuencia de ajuste repetible')} caption={tr(l,'Never assume the meter measures the same point on every mixer; consult device documentation. Protect your hearing and connected speakers.','No presupongas que todos los medidores miden el mismo punto; consulta el manual. Protege la audición y los altavoces conectados.')}><ol className={s.steps}>{steps.map(([n,title,detail])=><li key={n}><b>{n}</b><span><strong>{title}</strong><small>{detail}</small></span></li>)}</ol></Figure>;
}
function MixerControlLab({lang:l}:{lang:Lang}) {
 const items=l==='es'?[
 'Con el master a nivel seguro, localiza TRIM/GAIN, EQ, filtro, fader de canal, crossfader y MASTER.',
 'Reproduce un tramo con picos y ajusta la ganancia de entrada sin saturar.',
 'Baja el fader de canal y observa si el medidor sigue mostrando nivel; identifica el punto de medición.',
 'Lleva cada banda EQ al mínimo, una por una, y vuelve al centro. Describe qué sonidos pierden presencia.',
 'Compara HPF y LPF a volumen seguro; devuelve el filtro a neutral.',
 'Comprueba la asignación A/B/THRU y la curva del crossfader antes de moverlo.',
 'Anota qué controles cambian la salida audible y cuáles no reparan una entrada ya saturada.'
 ]:[
 'With a safe master level, locate TRIM/GAIN, EQ, filter, channel fader, crossfader and MASTER.',
 'Play a peak-heavy passage and set input gain without overloading the input.',
 'Close the channel fader and observe whether its meter still moves; identify the meter pickup point.',
 'Reduce each EQ band in turn, then return it to centre. Describe which sounds become less prominent.',
 'Compare HPF and LPF at a safe volume; return the filter to neutral.',
 'Check A/B/THRU assignment and crossfader curve before moving the crossfader.',
 'Record which controls alter audible output and which cannot repair upstream clipping.'
 ];
 return <Figure title={tr(l,'Seven-step mixer controls laboratory','Laboratorio de siete ejercicios de mixer')} caption={tr(l,'Use an authorized practice track, headphones or quiet monitors, and an appropriate mixer manual. Do not intentionally overload speakers or headphones.','Usa una pista autorizada, auriculares o monitores a volumen moderado y el manual de tu mesa. No fuerces saturación en altavoces ni auriculares.')}><ol className={s.steps}>{items.map((item,i)=><li key={item}><b>{String(i+1).padStart(2,'0')}</b><span>{item}</span></li>)}</ol></Figure>;
}
export function MixerControlRolesEn() { return <MixerControlRoles lang="en" />; }
export function MixerControlRolesEs() { return <MixerControlRoles lang="es" />; }
export function GainStageMeterEn() { return <GainStageMeter lang="en" />; }
export function GainStageMeterEs() { return <GainStageMeter lang="es" />; }
export function ThreeBandEQEn() { return <ThreeBandEQ lang="en" />; }
export function ThreeBandEQEs() { return <ThreeBandEQ lang="es" />; }
export function FrequencyOverlapEn() { return <FrequencyOverlap lang="en" />; }
export function FrequencyOverlapEs() { return <FrequencyOverlap lang="es" />; }
export function HighLowPassFiltersEn() { return <HighLowPassFilters lang="en" />; }
export function HighLowPassFiltersEs() { return <HighLowPassFilters lang="es" />; }
export function ChannelCrossfaderCurvesEn() { return <ChannelCrossfaderCurves lang="en" />; }
export function ChannelCrossfaderCurvesEs() { return <ChannelCrossfaderCurves lang="es" />; }
export function SafeControlSequenceEn() { return <SafeControlSequence lang="en" />; }
export function SafeControlSequenceEs() { return <SafeControlSequence lang="es" />; }
export function MixerControlLabEn() { return <MixerControlLab lang="en" />; }
export function MixerControlLabEs() { return <MixerControlLab lang="es" />; }
