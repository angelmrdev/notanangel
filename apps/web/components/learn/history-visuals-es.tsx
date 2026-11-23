import s from './history-visuals.module.css';

/** Visualizaciones originales y localizadas al castellano para DJ-01-002. */
export function DJHistoryTimelineEs() {
  const lanes = [
    { name: 'RADIO', tone: 'cyan', events: [{ date: 'Años 30', text: 'La presentación de discos en la radio gana influencia' }] },
    { name: 'CLUB / DISCO', tone: 'pink', events: [{ date: '1970', text: 'Comienzan las fiestas Loft de Mancuso' }, { date: 'Años 70', text: 'Se desarrollan las mezclas continuas de disco' }] },
    { name: 'HIP-HOP', tone: 'yellow', events: [{ date: '1973', text: 'Fiesta del Bronx vinculada a DJ Kool Herc' }, { date: 'Años 70–80', text: 'Evolucionan la extensión de breaks, el scratching y la actuación con platos' }] },
    { name: 'HOUSE / TECHNO', tone: 'cyan', events: [{ date: '1977', text: 'Abre el Warehouse de Chicago' }, { date: 'Años 80', text: 'Se expanden el house y el techno de Detroit' }] },
    { name: 'EQUIPOS', tone: 'pink', events: [{ date: '1972 / 1979', text: 'Hitos del Technics SL-1200 / MK2' }, { date: '1994 / 2001', text: 'Hitos del CDJ-500 / CDJ-1000' }, { date: 'Desde 2004', text: 'Vinilo digital, portátiles y controladoras transforman la forma de pinchar' }] },
  ];
  return <figure className={s.figure} aria-labelledby="historia-es-timeline-title">
    <figcaption id="historia-es-timeline-title" className={s.heading}><span>HISTORIA SIN UNA ÚNICA LÍNEA</span> <small>Cinco evoluciones que se solapan</small></figcaption>
    <p className={s.intro}>La cultura DJ surgió de comunidades y tecnologías que evolucionaron en paralelo. Estos hitos orientan: no forman una cronología exhaustiva ni una lista de inventores.</p>
    <div className={s.lanes}>{lanes.map(lane => <section className={s.lane} data-tone={lane.tone} key={lane.name} aria-label={lane.name}>
      <strong className={s.laneLabel}>{lane.name}</strong><ol className={s.eventList}>{lane.events.map(event => <li key={`${event.date}-${event.text}`}><time className={s.date}>{event.date}</time><span>{event.text}</span></li>)}</ol>
    </section>)}</div>
    <p className={s.caption}>Hitos resumidos a partir de las fuentes históricas citadas. Las fechas representan acontecimientos diferentes y no deben interpretarse como una cadena única de inventos.</p>
  </figure>;
}

export function RadioStudioReconstructionEs() {
  return <figure className={s.figure} aria-labelledby="historia-es-radio-title">
    <figcaption id="historia-es-radio-title" className={s.heading}><span>DJ DE RADIO DE LOS INICIOS</span><small>Recreación conceptual de un estudio</small></figcaption>
    <div className={s.radioLayout} role="group" aria-label="Ejemplo conceptual de radio: un tocadiscos y el micrófono del presentador llegan a la mesa de emisión, que envía el programa a los oyentes">
      <div className={s.radioBox}><span className={s.partIndex}>01 / REPRODUCCIÓN</span><span className={s.record} aria-hidden="true"><i /></span><strong>Tocadiscos</strong><small>Discos seleccionados</small></div>
      <span className={s.arrow} aria-hidden="true">→</span>
      <div className={s.radioBox}><span className={s.partIndex}>02 / PRESENTACIÓN</span><span className={s.console} aria-hidden="true">◉ ◉ ◉</span><strong>Mesa de emisión</strong><small>Música + micrófono</small></div>
      <span className={s.arrow} aria-hidden="true">→</span>
      <div className={s.radioBox}><span className={s.partIndex}>03 / PÚBLICO</span><span className={s.radioIcon} aria-hidden="true">)))</span><strong>Oyentes de radio</strong><small>Selección para una audiencia</small></div>
    </div>
    <p className={s.caption}>Ilustración conceptual original: no es una fotografía de Martin Block ni la reconstrucción verificada de una emisora concreta. La selección y presentación en radio precedieron al beatmixing moderno.</p>
  </figure>;
}

export function ClubMixEvolutionEs() {
  const isolated = ['Disco A', 'Pausa', 'Disco B', 'Pausa', 'Disco C'];
  return <figure className={s.figure} aria-labelledby="historia-es-club-title">
    <figcaption id="historia-es-club-title" className={s.heading}><span>DE LA SELECCIÓN A LA CONTINUIDAD</span><small>Tres maneras de construir una escucha</small></figcaption>
    <div className={s.comparison}>
      <section><h4>01 — Reproducción separada</h4><div className={s.sequence} role="img" aria-label="Tres discos suenan sucesivamente, con pausas entre ellos">{isolated.map((name,i)=><span className={i%2?s.pause:s.track} key={i}>{name}</span>)}</div><p>Las canciones se presentan por separado.</p></section>
      <section><h4>02 — Mezcla solapada</h4><div className={s.overlap} role="img" aria-label="El deck A suena y el B se superpone brevemente durante una transición"><div className={s.trackA}>PISTA A <span>SALE</span></div><div className={s.trackB}>PISTA B <span>ENTRA</span></div></div><p>Una transición puede mantener la continuidad rítmica.</p></section>
      <section><h4>03 — Recorrido más largo</h4><div className={s.journey} role="img" aria-label="Ejemplo de curva energética con inicio, subida, pico y descanso"><span className={s.low}>INICIO</span><span className={s.medium}>SUBIDA</span><span className={s.high}>PICO</span><span className={s.reset}>PAUSA</span></div><p>La selección de una noche crea contraste y dirección musical.</p></section>
    </div>
    <p className={s.caption}>Esquema de temas y niveles energéticos ficticios; no es una transcripción ni implica que todos los primeros DJs de disco usaran la misma técnica.</p>
  </figure>;
}

export function BreakExtensionDiagramEs() {
  const exchanges = [
    {deck:'A',count:'1',text:'Suena el break del primer disco'},
    {deck:'B',count:'2',text:'Suena el break equivalente del segundo disco'},
    {deck:'A',count:'3',text:'El primer disco está preparado para repetir'},
  ];
  return <figure className={s.figure} aria-labelledby="historia-es-break-title">
    <figcaption id="historia-es-break-title" className={s.heading}><span>PROLONGAR UN BREAK</span><small>Dos decks · un pasaje repetido</small></figcaption>
    <div className={s.breakSequence} role="group" aria-label="Secuencia simplificada de alternar dos discos para alargar un break de percusión">
      {exchanges.map((step,i)=><div className={s.breakStep} key={step.count}>
        <span className={s.breakIndex}>{step.count}</span><strong>DECK {step.deck}</strong><div className={s.breakBeats} aria-label="Ocho posiciones rítmicas representadas">{Array.from({length:8},(_,j)=><span key={j} className={j===0?s.downbeat:''}/>)}</div><p>{step.text}</p>{i<exchanges.length-1&&<span aria-hidden="true" className={s.breakNext}>→</span>}
      </div>)}
    </div>
    <p className={s.caption}>Modelo didáctico simplificado, no reconstrucción de una actuación concreta de 1973. Mientras suena un disco hay que preparar la otra copia y controlar el tiempo con precisión.</p>
  </figure>;
}

export function DJCultureGeographyEs() {
  const places = [
    {place:'JAMAICA',name:'Cultura sound system',text:'Selectors, toasting, bailes públicos y potentes sistemas de sonido móviles.'},
    {place:'NUEVA YORK',name:'Disco y clubes underground',text:'Programación para la pista de baile, The Loft y expansión de la mezcla continua.'},
    {place:'EL BRONX',name:'Turntablism del hip-hop',text:'DJing centrado en breaks y manipulación creativa de discos.'},
    {place:'CHICAGO',name:'Música house',text:'Clubes, DJs y productores que transforman los sonidos de baile.'},
    {place:'DETROIT',name:'Techno',text:'Escenas electrónicas, experimentación y nuevas estéticas de producción.'},
  ];
  return <figure className={s.figure} aria-labelledby="historia-es-geography-title">
    <figcaption id="historia-es-geography-title" className={s.heading}><span>ESCENAS Y COMUNIDADES</span><small>No hay un único origen</small></figcaption>
    <div className={s.cityGrid}>{places.map((p,i)=><section className={s.city} key={p.place}><span className={s.cityNo}>{String(i+1).padStart(2,'0')}</span><div><strong>{p.place}</strong><h4>{p.name}</h4><p>{p.text}</p></div></section>)}</div>
    <p className={s.caption}>Índice editorial de lugares, no mapa geográfico. Son escenas influyentes seleccionadas, no un registro exhaustivo de las culturas de baile del mundo.</p>
  </figure>;
}

export function EquipmentGenerationsEs() {
  const generations = [
    {name:'VINILO',source:'Dos platos',mixer:'Mixer DJ analógico',cue:'Auriculares para preescucha',note:'Los discos son el soporte de reproducción.'},
    {name:'CD / REPRODUCTOR DIGITAL',source:'Dos reproductores multimedia',mixer:'Mixer DJ externo',cue:'Auriculares conectados al mixer',note:'Un reproductor digital sustituye a la fuente de vinilo.'},
    {name:'PORTÁTIL + CONTROLADORA',source:'Decks del software DJ',mixer:'Controladora / mixer del software',cue:'Auriculares mediante interfaz de audio',note:'Control, reproducción y conversión de audio pueden estar repartidos entre equipos.'},
    {name:'AUTÓNOMO',source:'Reproducción multimedia integrada',mixer:'Sección de mezcla integrada',cue:'Auriculares conectados a la unidad',note:'Reproduce soportes compatibles sin portátil durante la actuación.'},
  ];
  return <figure className={s.figure} aria-labelledby="historia-es-gear-title">
    <figcaption id="historia-es-gear-title" className={s.heading}><span>EVOLUCIÓN DE LOS EQUIPOS</span><small>La ruta de señal sigue importando</small></figcaption>
    <div className={s.gearGrid}>{generations.map((g,i)=><section key={g.name} className={s.gearCard}>
      <span className={s.gearNum}>0{i+1}</span><strong>{g.name}</strong><div className={s.gearPath}><span>{g.source}</span><span aria-hidden="true">↓</span><span>{g.mixer}</span><span aria-hidden="true">↓</span><span>MASTER / ALTAVOCES</span></div><small>CUE: {g.cue}</small><p>{g.note}</p>
    </section>)}</div>
    <p className={s.caption}>Configuraciones conceptuales, no una secuencia de sustitución: vinilos, reproductores, software y sistemas autónomos siguen conviviendo. La ruta real de audio depende del modelo.</p>
  </figure>;
}

export function HistoricalListeningWorksheetEs() {
  const criteria = [
    ['Selección','¿Por qué este disco y por qué ahora?'],
    ['Transición','¿Se anuncia, mezcla, corta o manipula el cambio?'],
    ['Público / entorno','¿Quién escucha y cuál es el contexto social?'],
    ['Herramientas','¿Qué controles físicos o de software intervienen?'],
    ['Decisión creativa','¿Cómo transforma el DJ la experiencia de escucha?'],
  ];
  return <figure className={s.figure} aria-labelledby="historia-es-worksheet-title">
    <figcaption id="historia-es-worksheet-title" className={s.heading}><span>COMPARA CUATRO ENFOQUES DJ</span><small>Ficha de escucha</small></figcaption>
    <p className={s.intro}>Utiliza actuaciones a las que tengas acceso legítimo. Escucha y rellena las celdas vacías: son preguntas orientativas, no valoraciones predefinidas de cada tradición.</p>
    <div className={s.worksheetScroll}><table className={s.worksheet}>
      <caption className={s.visuallyHidden}>Ficha vacía para comparar actuaciones de radio, disco, hip-hop y DJing digital</caption>
      <thead><tr><th scope="col">Observa</th><th scope="col">Radio</th><th scope="col">Disco</th><th scope="col">Hip-hop</th><th scope="col">Digital</th></tr></thead>
      <tbody>{criteria.map(([name,prompt])=><tr key={name}><th scope="row"><strong>{name}</strong><small>{prompt}</small></th>{['radio','disco','hip-hop','digital'].map(scene=><td key={scene}><span className={s.blank} aria-label={`Notas sobre ${name} en ${scene}`}>&nbsp;</span></td>)}</tr>)}</tbody>
    </table></div>
    <p className={s.caption}>Imprime esta página o copia la tabla a tus apuntes. La versión HTML sigue siendo accesible sin descargar un PDF.</p>
  </figure>;
}
