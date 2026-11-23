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
 return <div className={s.tile}><span className={s.tileTag}>{marker ?? 'DJ TERM'}</span><strong>{label}</strong><p>{body}</p></div>;
}
export function GlossaryEssentialConcepts() {
 const groups=[
  ['TIME','Beat','Bar','BPM','Phrase'],
  ['PLAYBACK','Deck','Cue point','Beatmatching','Transition'],
  ['AUDIO','Mixer','EQ','Headphone cue','Master output']
 ];
 return <Visual eyebrow="START HERE · 12 CORE TERMS" title="The vocabulary of a DJ setup" explanation="A first orientation, not a substitute for the full definitions and examples below.">
  <div className={s.coreGrid}>{groups.map(([group,...terms])=><div className={s.coreGroup} key={group}>
   <span className={s.groupName}>{group}</span>
   <ul>{terms.map((term,i)=><li key={term}><span>{String(i+1).padStart(2,'0')}</span>{term}</li>)}</ul>
  </div>)}</div>
 </Visual>;
}
export function GlossaryCueMeanings() {
 return <Visual eyebrow="ONE WORD · THREE USES" title="What does CUE actually mean?" explanation="Different devices implement cue buttons and monitoring differently. Always read the specific control label and manual.">
  <div className={s.cards}>
   <Tile marker="LISTENING" label="Headphone cue" body="Listen privately to a selected source while another track plays through master."/>
   <Tile marker="POSITION" label="Cue point" body="Store or use a specific point in a recording so playback can start there."/>
   <Tile marker="CONTROL" label="Cue button" body="A transport control that may preview or return to a temporary cue point."/>
  </div>
 </Visual>;
}
export function GlossaryRhythmMap() {
 return <Visual eyebrow="MUSIC TIMING" title="From one beat to a musical phrase" explanation="In this simplified 4/4 example, each bar groups four beats; four bars form one illustrative grouping. Other meters and phrase lengths exist.">
  <div className={s.bars} role="group" aria-label="Four bars of four beats each, with the first beat of every bar highlighted">
   {[0,1,2,3].map(bar=><div className={s.bar} key={bar}><span className={s.barLabel}>BAR {bar+1}</span>
    <div className={s.pulses}>{[1,2,3,4].map(beat=><span data-first={beat===1} key={beat}>{beat}</span>)}</div></div>)}
  </div>
  <div className={s.phraseLine}>ONE ILLUSTRATIVE FOUR-BAR GROUPING →</div>
 </Visual>;
}
export function GlossaryDeckControls() {
 const items=[
  ['PLAY / PAUSE','Start or stop a loaded track.'],['CUE POINT','Return to or mark a playback position.'],
  ['JOG WHEEL','Nudge or search through playback.'],['TEMPO FADER','Adjust playback speed.'],
  ['HOT CUE','Trigger a saved point or action.'],['BEATGRID','Software timing reference.'],
  ['SYNC','Software-dependent tempo/phase assistance.'],['LOOP','Repeat a selected musical region.']
 ];
 return <Visual eyebrow="DECK / PLAYBACK" title="Recognize the controls before using them" explanation="Functional overview only. Exact modes, control names and button assignments vary by controller and DJ software.">
  <div className={s.controlGrid}>{items.map(([name,desc],i)=><div className={s.control} key={name}>
   <span className={s.controlNumber}>{String(i+1).padStart(2,'0')}</span><strong>{name}</strong><small>{desc}</small>
  </div>)}</div>
 </Visual>;
}
export function GlossaryAudioRouting() {
 return <Visual eyebrow="MIXER / AUDIO" title="One source, multiple listening destinations" explanation="A headphone cue can work even when a channel fader is closed. The exact pre/post-fader monitoring tap depends on the device.">
  <div className={s.route} role="group" aria-label="Deck sources feed a mixer; the master mix goes to speakers, while selected private cue sources go to headphones">
   <div className={s.routeBlock}><small>INPUTS</small><strong>Deck A + Deck B</strong></div>
   <span aria-hidden="true" className={s.arrow}>→</span>
   <div className={s.routeBlock}><small>CONTROL</small><strong>Mixer channels</strong><span>Gain · EQ · faders</span></div>
   <span aria-hidden="true" className={s.arrow}>→</span>
   <div className={s.outputs}>
    <div><small>MASTER</small><strong>Audience speakers</strong></div>
    <div><small>CUE</small><strong>DJ headphones</strong></div>
   </div>
  </div>
 </Visual>;
}
export function GlossaryMixingContrasts() {
 return <Visual eyebrow="MIXING LANGUAGE" title="Four different ways to move between tracks" explanation="These are illustrative technique families; a real transition may combine methods and a simple cut can be musically effective.">
  <div className={s.techniques}>
   <Tile marker="LONG" label="Blend" body="Overlap two tracks through a sustained transition."/>
   <Tile marker="QUICK" label="Cut" body="Switch deliberately from one track to another."/>
   <Tile marker="EQ" label="Bass swap" body="Manage competing low-frequency elements during an overlap."/>
   <Tile marker="HARMONY" label="Mix in key" body="Evaluate potential tonal compatibility during a blend."/>
  </div>
 </Visual>;
}
export function GlossaryLibraryFlow() {
 const steps=[['01','Source','Obtain a usable recording'],['02','Metadata','Identify title, artist and version'],['03','Analyze','Check tempo and beatgrid'],['04','Prepare','Mark cues and organize crates'],['05','Perform','Play and monitor the correct file']];
 return <Visual eyebrow="LIBRARY WORKFLOW" title="The terminology behind a prepared DJ track" explanation="A common educational workflow, not a mandated sequence or a guarantee of technical analysis accuracy.">
  <ol className={s.steps}>{steps.map(([num,name,detail])=><li key={num}><span>{num}</span><div><strong>{name}</strong><small>{detail}</small></div></li>)}</ol>
 </Visual>;
}
