import s from './lesson-visuals.module.css';

/** Original educational diagrams; accessible HTML, CSS and no external assets. */
export function DJWorkCycle() {
  const steps = [
    { num: '01', label: 'Discover', note: 'Find and listen to music', tone: 'pink' },
    { num: '02', label: 'Prepare', note: 'Organize and learn tracks', tone: 'cyan' },
    { num: '03', label: 'Select', note: 'Choose for the moment', tone: 'yellow' },
    { num: '04', label: 'Present', note: 'Play, cue or mix', tone: 'pink' },
    { num: '05', label: 'Respond', note: 'Read the room and adapt', tone: 'cyan' },
  ];
  return <figure className={s.panel}>
    <figcaption className={s.kicker}>THE DJ WORKFLOW <span>· 5 CONNECTED SKILLS</span></figcaption>
    <ol className={s.cycle}>{steps.map(({num,label,note,tone})=><li className={s.step} data-tone={tone} key={num}>
      <span className={s.stepNumber}>{num}</span><strong>{label}</strong><span className={s.stepNote}>{note}</span>
    </li>)}</ol>
    <p className={s.caption}>The workflow is circular: what happens during a performance informs what you discover and prepare next.</p>
  </figure>;
}

export function TwoDeckConcept() {
  return <figure className={s.panel}>
    <figcaption className={s.kicker}>TWO TRACKS <span>· ONE AUDIENCE MIX</span></figcaption>
    <div className={s.deckGrid}>
      <div className={s.deck}>
        <div className={s.deckTag}>DECK A <span>PLAYING</span></div>
        <div className={s.disc} aria-hidden="true"><span /></div>
        <strong>Current track</strong><p>Heard on the dancefloor</p>
      </div>
      <div className={s.middle} aria-hidden="true"><span>→</span><span>MIX</span><span>←</span></div>
      <div className={s.deck}>
        <div className={s.deckTag}>DECK B <span>PREPARING</span></div>
        <div className={`${s.disc} ${s.discAlt}`} aria-hidden="true"><span /></div>
        <strong>Next track</strong><p>Can be cued privately</p>
      </div>
    </div>
    <div className={s.pathGrid}>
      <div><strong>MASTER</strong><span>Audience speakers ← selected mix</span></div>
      <div><strong>CUE</strong><span>DJ headphones ← private prelisten</span></div>
    </div>
    <p className={s.caption}>Illustrative routing. A track can play on a deck without reaching the audience; equipment-specific controls differ.</p>
  </figure>;
}

export function DJRoleComparison() {
  const roles = [
    ['CLUB','Choose tracks and manage a dancefloor','Continuous flow may matter'],
    ['OPEN-FORMAT','Move across styles and eras','Versatility and recognition matter'],
    ['RADIO','Curate and introduce music','Selection and presentation matter'],
    ['MOBILE','Adapt to a private event','Requests and context matter'],
  ];
  return <figure className={s.panel}>
    <figcaption className={s.kicker}>ONE CRAFT <span>· DIFFERENT CONTEXTS</span></figcaption>
    <div className={s.roleGrid}>{roles.map(([role,mission,focus])=><div className={s.roleCard} key={role}>
      <strong>{role}</strong><p>{mission}</p><small>{focus}</small>
    </div>)}</div>
    <p className={s.caption}>Illustrative roles, not exclusive categories. A DJ may work in several settings.</p>
  </figure>;
}

export function PartyEnergyStory() {
  const moments = [
    {hour:'ARRIVAL',level:2,text:'Room for conversation'},
    {hour:'WARM-UP',level:3,text:'Recognizable, inviting music'},
    {hour:'PEAK',level:5,text:'A stronger shared moment'},
    {hour:'RESET',level:3,text:'Contrast before building again'},
  ];
  return <figure className={s.panel}>
    <figcaption className={s.kicker}>SMALL PARTY <span>· ILLUSTRATIVE ENERGY FLOW</span></figcaption>
    <div className={s.energyGrid}>{moments.map(({hour,level,text})=><div className={s.energyMoment} key={hour}>
      <strong>{hour}</strong><div className={s.energyBars} aria-label={`Illustrative energy level ${level} of 5`}>{[1,2,3,4,5].map(x=><span className={x<=level?s.lit:''} key={x}/>)}</div><p>{text}</p>
    </div>)}</div>
    <p className={s.caption}>A creative illustration, not an objective measurement or a mandatory way to program a set.</p>
  </figure>;
}
