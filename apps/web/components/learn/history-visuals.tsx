import s from './history-visuals.module.css';

/** Original educational visuals for DJ-01-002. No photos, samples or copyrighted waveforms. */
export function DJHistoryTimeline() {
  const lanes = [
    { name: 'RADIO', tone: 'cyan', events: [{ date: '1930s', text: 'Record-based radio presentation becomes influential' }] },
    { name: 'CLUB / DISCO', tone: 'pink', events: [{ date: '1970', text: 'Mancuso’s Loft parties begin' }, { date: '1970s', text: 'Continuous disco mixing develops' }] },
    { name: 'HIP-HOP', tone: 'yellow', events: [{ date: '1973', text: 'Bronx back-to-school party associated with DJ Kool Herc' }, { date: '1970s–80s', text: 'Break extension, scratching and turntable performance develop' }] },
    { name: 'HOUSE / TECHNO', tone: 'cyan', events: [{ date: '1977', text: 'The Warehouse opens in Chicago' }, { date: '1980s', text: 'House and Detroit techno scenes expand' }] },
    { name: 'EQUIPMENT', tone: 'pink', events: [{ date: '1972 / 1979', text: 'Technics SL-1200 / MK2 milestones' }, { date: '1994 / 2001', text: 'CDJ-500 / CDJ-1000 milestones' }, { date: '2004 onward', text: 'Digital vinyl, laptops and controllers reshape workflows' }] },
  ];
  return <figure className={s.figure} aria-labelledby="history-timeline-title">
    <figcaption id="history-timeline-title" className={s.heading}><span>HISTORY, NOT A STRAIGHT LINE</span> <small>Five overlapping developments</small></figcaption>
    <p className={s.intro}>DJ culture developed through overlapping communities and technologies. These selected milestones are a guide, not a complete chronology or an inventor list.</p>
    <div className={s.lanes}>{lanes.map(lane => <section className={s.lane} data-tone={lane.tone} key={lane.name} aria-label={lane.name}>
      <strong className={s.laneLabel}>{lane.name}</strong><ol className={s.eventList}>{lane.events.map(event => <li key={`${event.date}-${event.text}`}><time className={s.date}>{event.date}</time><span>{event.text}</span></li>)}</ol>
    </section>)}</div>
    <p className={s.caption}>Milestones summarized from the cited historical sources below. Dates refer to different kinds of events and should not be read as one continuous chain of inventions.</p>
  </figure>;
}

export function RadioStudioReconstruction() {
  return <figure className={s.figure} aria-labelledby="history-radio-title">
    <figcaption id="history-radio-title" className={s.heading}><span>EARLY RADIO DJ</span><small>Illustrative studio reconstruction</small></figcaption>
    <div className={s.radioLayout} role="group" aria-label="Illustrative early radio desk: record turntable sends recorded music to broadcasting console alongside a presenter microphone; broadcasting console sends program to radio listeners">
      <div className={s.radioBox}><span className={s.partIndex}>01 / PLAYBACK</span><span className={s.record} aria-hidden="true"><i /></span><strong>Record player</strong><small>Recorded selections</small></div>
      <span className={s.arrow} aria-hidden="true">→</span>
      <div className={s.radioBox}><span className={s.partIndex}>02 / PRESENTATION</span><span className={s.console} aria-hidden="true">◉ ◉ ◉</span><strong>Broadcast console</strong><small>Music + microphone</small></div>
      <span className={s.arrow} aria-hidden="true">→</span>
      <div className={s.radioBox}><span className={s.partIndex}>03 / AUDIENCE</span><span className={s.radioIcon} aria-hidden="true">)))</span><strong>Radio listeners</strong><small>One-to-many selection</small></div>
    </div>
    <p className={s.caption}>An original conceptual illustration, not a photograph of Martin Block or a verified reconstruction of a particular station. Radio selection and presentation preceded modern beatmixing.</p>
  </figure>;
}

export function ClubMixEvolution() {
  const isolated = ['Record A', 'Pause', 'Record B', 'Pause', 'Record C'];
  return <figure className={s.figure} aria-labelledby="history-club-title">
    <figcaption id="history-club-title" className={s.heading}><span>FROM SELECTION TO FLOW</span><small>Three ways to shape listening</small></figcaption>
    <div className={s.comparison}>
      <section><h4>01 — Separate plays</h4><div className={s.sequence} role="img" aria-label="Three records played in sequence, with gaps between them">{isolated.map((name,i)=><span className={i%2?s.pause:s.track} key={i}>{name}</span>)}</div><p>Tracks are presented as distinct records.</p></section>
      <section><h4>02 — Overlapping mix</h4><div className={s.overlap} role="img" aria-label="Deck A plays, Deck B overlaps it briefly during a crossfade"><div className={s.trackA}>TRACK A <span>OUT</span></div><div className={s.trackB}>TRACK B <span>IN</span></div></div><p>A transition can preserve a continuing rhythmic feel.</p></section>
      <section><h4>03 — Longer journey</h4><div className={s.journey} role="img" aria-label="Illustrative energy path through warm-up, build, peak and reset"><span className={s.low}>WARM-UP</span><span className={s.medium}>BUILD</span><span className={s.high}>PEAK</span><span className={s.reset}>RESET</span></div><p>Selection across a night creates contrast and direction.</p></section>
    </div>
    <p className={s.caption}>Schematic fictional tracks and energy levels; not a transcription or a claim that early disco DJs all used the same technique.</p>
  </figure>;
}

export function BreakExtensionDiagram() {
  const exchanges = [
    {deck:'A',count:'1',text:'Break plays on first record'},
    {deck:'B',count:'2',text:'Matching break plays on second record'},
    {deck:'A',count:'3',text:'First record is ready to repeat'},
  ];
  return <figure className={s.figure} aria-labelledby="history-break-title">
    <figcaption id="history-break-title" className={s.heading}><span>EXTENDING A BREAK</span><small>Two decks · one recurring passage</small></figcaption>
    <div className={s.breakSequence} role="group" aria-label="Simplified sequence of switching between two records to extend a percussion break">
      {exchanges.map((step,i)=><div className={s.breakStep} key={step.count}>
        <span className={s.breakIndex}>{step.count}</span><strong>DECK {step.deck}</strong><div className={s.breakBeats} aria-label="Eight illustrated beat positions">{Array.from({length:8},(_,j)=><span key={j} className={j===0?s.downbeat:''}/>)}</div><p>{step.text}</p>{i<exchanges.length-1&&<span aria-hidden="true" className={s.breakNext}>→</span>}
      </div>)}
    </div>
    <p className={s.caption}>Simplified teaching model, not a reconstruction of a specific 1973 performance. The other copy must be prepared while one record plays, and accurate timing is essential.</p>
  </figure>;
}

export function DJCultureGeography() {
  const places = [
    {place:'JAMAICA',name:'Sound-system culture',text:'Selectors, toasting, public dances and powerful mobile sound systems.'},
    {place:'NEW YORK CITY',name:'Disco and underground clubs',text:'Dance-floor programming, The Loft and the growth of continuous mixing.'},
    {place:'THE BRONX',name:'Hip-hop turntablism',text:'Break-focused DJing and creative manipulation of records.'},
    {place:'CHICAGO',name:'House music',text:'Club culture, DJs and producers evolving dance sounds.'},
    {place:'DETROIT',name:'Techno',text:'Electronic music scenes, experimentation and new production aesthetics.'},
  ];
  return <figure className={s.figure} aria-labelledby="history-geography-title">
    <figcaption id="history-geography-title" className={s.heading}><span>SCENES AND COMMUNITIES</span><small>Not one origin story</small></figcaption>
    <div className={s.cityGrid}>{places.map((p,i)=><section className={s.city} key={p.place}><span className={s.cityNo}>{String(i+1).padStart(2,'0')}</span><div><strong>{p.place}</strong><h4>{p.name}</h4><p>{p.text}</p></div></section>)}</div>
    <p className={s.caption}>Editorial geography index rather than a geographic map. These are selected influential scenes—not an exhaustive account of global dance-music cultures.</p>
  </figure>;
}

export function EquipmentGenerations() {
  const generations = [
    {name:'VINYL',source:'Two turntables',mixer:'Analogue DJ mixer',cue:'Headphones for prelisten',note:'Records are the playback media.'},
    {name:'CD / DIGITAL PLAYER',source:'Two media players',mixer:'External DJ mixer',cue:'Headphones via mixer',note:'Dedicated digital playback replaces the record source.'},
    {name:'LAPTOP + CONTROLLER',source:'DJ software decks',mixer:'Controller / software mixer',cue:'Headphones via audio interface',note:'Control, playback and audio conversion can reside in different devices.'},
    {name:'STANDALONE',source:'Integrated media playback',mixer:'Built-in mixer section',cue:'Headphones via unit',note:'Supported media play without a laptop during performance.'},
  ];
  return <figure className={s.figure} aria-labelledby="history-gear-title">
    <figcaption id="history-gear-title" className={s.heading}><span>THE TOOLS EVOLVE</span><small>The signal path still matters</small></figcaption>
    <div className={s.gearGrid}>{generations.map((g,i)=><section key={g.name} className={s.gearCard}>
      <span className={s.gearNum}>0{i+1}</span><strong>{g.name}</strong><div className={s.gearPath}><span>{g.source}</span><span aria-hidden="true">↓</span><span>{g.mixer}</span><span aria-hidden="true">↓</span><span>MASTER / SPEAKERS</span></div><small>CUE: {g.cue}</small><p>{g.note}</p>
    </section>)}</div>
    <p className={s.caption}>Conceptual setups, not a strict sequence of replacement: vinyl, media players, software and standalone systems all remain in use. Actual audio routing varies by model.</p>
  </figure>;
}

export function HistoricalListeningWorksheet() {
  const criteria = [
    ['Selection','Why this recording, and why now?'],
    ['Transition','Is the change announced, blended, cut or manipulated?'],
    ['Audience / setting','Who is listening, and what is the social context?'],
    ['Tools','Which physical or software controls shape the performance?'],
    ['Creative choice','How does the DJ change the listener’s experience?'],
  ];
  return <figure className={s.figure} aria-labelledby="history-worksheet-title">
    <figcaption id="history-worksheet-title" className={s.heading}><span>COMPARE FOUR DJ APPROACHES</span><small>Listening worksheet</small></figcaption>
    <p className={s.intro}>Use performances you can access legitimately. Listen and fill the blank cells; these are prompts, not prewritten judgments about each tradition.</p>
    <div className={s.worksheetScroll}><table className={s.worksheet}>
      <caption className={s.visuallyHidden}>Blank comparison worksheet for radio, disco, hip-hop and digital DJ performances</caption>
      <thead><tr><th scope="col">Listen for</th><th scope="col">Radio</th><th scope="col">Disco</th><th scope="col">Hip-hop</th><th scope="col">Digital</th></tr></thead>
      <tbody>{criteria.map(([name,prompt])=><tr key={name}><th scope="row"><strong>{name}</strong><small>{prompt}</small></th>{['radio','disco','hip-hop','digital'].map(scene=><td key={scene}><span className={s.blank} aria-label={`Notes for ${name} in ${scene}`}>&nbsp;</span></td>)}</tr>)}</tbody>
    </table></div>
    <p className={s.caption}>Print this page or copy the table into your own notes. The HTML version stays accessible even without a PDF download.</p>
  </figure>;
}
