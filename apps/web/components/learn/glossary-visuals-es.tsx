import s from './glossary-visuals.module.css';

/** DJ-01-005: original CSS/HTML teaching figures; no copied manufacturer artwork. */
function Visual({ eyebrow, title, explanation, children }: { eyebrow: string; title: string; explanation: string; children: React.ReactNode }) {
 return <figure className={s.visual}>
  <figcaption className={s.heading}><span>{eyebrow}</span><strong>{title}</strong></figcaption>
  {children}
  <p className={s.note}>{explanation}</p>
 </figure>;
}
function Tile({ label, body, marker }: { label: string; body: string; marker?: string }) {
 return <div className={s.tile}><span className={s.tileTag}>{marker ?? 'TÉRMINO DJ'}</span><strong>{label}</strong><p>{body}</p></div>;
}
export function GlossaryEssentialConceptsEs() {
 const groups=[
  ['TIEMPO','Beat','Compás','BPM','Frase'],
  ['REPRODUCCIÓN','Deck','Cue point','Beatmatching','Transición'],
  ['AUDIO','Mezclador','EQ','CUE auriculares','Salida master']
 ];
 return <Visual eyebrow="EMPIEZA AQUÍ · 12 TÉRMINOS BÁSICOS" title="El vocabulario esencial de una cabina DJ" explanation="Un primer mapa de conceptos que no sustituye las definiciones y ejemplos que encontrarás más abajo.">
  <div className={s.coreGrid}>{groups.map(([group,...terms])=><div className={s.coreGroup} key={group}>
   <span className={s.groupName}>{group}</span>
   <ul>{terms.map((term,i)=><li key={term}><span>{String(i+1).padStart(2,'0')}</span>{term}</li>)}</ul>
  </div>)}</div>
 </Visual>;
}
export function GlossaryCueMeaningsEs() {
 return <Visual eyebrow="UNA PALABRA · TRES USOS" title="¿Qué significa realmente CUE?" explanation="Los botones CUE y la monitorización funcionan de manera diferente según el equipo. Consulta siempre sus etiquetas y manual.">
  <div className={s.cards}>
   <Tile marker="ESCUCHA" label="CUE de auriculares" body="Escucha una fuente en privado mientras otra canción suena por master."/>
   <Tile marker="POSICIÓN" label="Cue point" body="Guarda o utiliza un punto de una pista para comenzar la reproducción desde ahí."/>
   <Tile marker="CONTROL" label="Cue button" body="Botón de reproducción que puede preescuchar o volver a un cue temporal."/>
  </div>
 </Visual>;
}
export function GlossaryRhythmMapEs() {
 return <Visual eyebrow="TIEMPO MUSICAL" title="Del pulso a la frase musical" explanation="En este ejemplo simplificado de 4/4, cada compás agrupa cuatro pulsos y cuatro compases forman una unidad ilustrativa. Existen otras métricas y duraciones de frase.">
  <div className={s.bars} role="group" aria-label="Cuatro compases de cuatro pulsos, con el primer pulso de cada compás destacado">
   {[0,1,2,3].map(bar=><div className={s.bar} key={bar}><span className={s.barLabel}>COMPÁS {bar+1}</span>
    <div className={s.pulses}>{[1,2,3,4].map(beat=><span data-first={beat===1} key={beat}>{beat}</span>)}</div></div>)}
  </div>
  <div className={s.phraseLine}>AGRUPACIÓN ILUSTRATIVA DE CUATRO COMPASES →</div>
 </Visual>;
}
export function GlossaryDeckControlsEs() {
 const items=[
  ['PLAY / PAUSE','Inicia o detiene una canción cargada.'],['CUE POINT','Vuelve a una posición o márcala.'],
  ['JOG WHEEL','Corrige ligeramente el tiempo o busca una posición.'],['TEMPO FADER','Ajusta la velocidad de reproducción.'],
  ['HOT CUE','Dispara un punto o acción guardada.'],['BEATGRID','Referencia rítmica del software.'],
  ['SYNC','Asistencia de tempo o fase según el programa.'],['LOOP','Repite una sección musical elegida.']
 ];
 return <Visual eyebrow="DECK / REPRODUCCIÓN" title="Reconoce los controles antes de utilizarlos" explanation="Esquema funcional: los modos, nombres y asignaciones exactos dependen de la controladora y el software.">
  <div className={s.controlGrid}>{items.map(([name,desc],i)=><div className={s.control} key={name}>
   <span className={s.controlNumber}>{String(i+1).padStart(2,'0')}</span><strong>{name}</strong><small>{desc}</small>
  </div>)}</div>
 </Visual>;
}
export function GlossaryAudioRoutingEs() {
 return <Visual eyebrow="MIXER / AUDIO" title="Una fuente, distintas rutas de escucha" explanation="La preescucha puede funcionar con el fader del canal cerrado. La toma interna antes o después del fader depende del equipo.">
  <div className={s.route} role="group" aria-label="Los decks alimentan el mezclador; master sale a los altavoces y las fuentes seleccionadas para preescucha llegan a auriculares">
   <div className={s.routeBlock}><small>ENTRADAS</small><strong>Deck A + Deck B</strong></div>
   <span aria-hidden="true" className={s.arrow}>→</span>
   <div className={s.routeBlock}><small>CONTROL</small><strong>Canales de mezcla</strong><span>Gain · EQ · faders</span></div>
   <span aria-hidden="true" className={s.arrow}>→</span>
   <div className={s.outputs}>
    <div><small>MASTER</small><strong>Altavoces del público</strong></div>
    <div><small>CUE</small><strong>Auriculares del DJ</strong></div>
   </div>
  </div>
 </Visual>;
}
export function GlossaryMixingContrastsEs() {
 return <Visual eyebrow="LENGUAJE DE MEZCLA" title="Cuatro maneras de pasar entre canciones" explanation="Son técnicas ilustrativas: una transición real puede combinarlas y un corte sencillo puede ser muy musical.">
  <div className={s.techniques}>
   <Tile marker="LARGA" label="Blend" body="Solapa dos temas durante una transición prolongada."/>
   <Tile marker="RÁPIDA" label="Cut" body="Cambia de una canción a otra deliberadamente."/>
   <Tile marker="EQ" label="Bass swap" body="Gestiona los graves que compiten durante un solapamiento."/>
   <Tile marker="ARMONÍA" label="Mix in key" body="Valora la compatibilidad tonal al mezclar dos canciones."/>
  </div>
 </Visual>;
}
export function GlossaryLibraryFlowEs() {
 const steps=[['01','Origen','Consigue una grabación utilizable'],['02','Metadatos','Identifica título, artista y versión'],['03','Analizar','Comprueba tempo y beatgrid'],['04','Preparar','Marca cues y organiza colecciones'],['05','Pinchar','Reproduce y monitoriza el archivo correcto']];
 return <Visual eyebrow="FLUJO DE BIBLIOTECA" title="Cómo se prepara una pista para una sesión DJ" explanation="Proceso educativo habitual, no orden obligatorio ni garantía de exactitud del análisis automático.">
  <ol className={s.steps}>{steps.map(([num,name,detail])=><li key={num}><span>{num}</span><div><strong>{name}</strong><small>{detail}</small></div></li>)}</ol>
 </Visual>;
}
