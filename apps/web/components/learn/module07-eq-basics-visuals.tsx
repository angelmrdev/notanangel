'use client';

import { useState } from 'react';
import s from './module07-eq-basics-visuals.module.css';

type Lang = 'en' | 'es';
type Band = 'low' | 'mid' | 'high';
const bandOrder: Band[] = ['low', 'mid', 'high'];
const labels = {
  en: {low:'LOW',mid:'MID',high:'HIGH',reset:'Reset',neutral:'Neutral (0 dB)',cut:'Cut',boost:'Boost',deckA:'Deck A · playing',deckB:'Deck B · incoming', note:'Conceptual visual model — this does not process or play audio. Frequency ranges, EQ curves and isolation depend on the mixer.', safe:'Start at a safe listening level. Use cuts to make room; do not boost both tracks to make the blend seem louder.'},
  es: {low:'GRAVES',mid:'MEDIOS',high:'AGUDOS',reset:'Restablecer',neutral:'Neutro (0 dB)',cut:'Recorte',boost:'Realce',deckA:'Deck A · sonando',deckB:'Deck B · entrante',note:'Modelo visual conceptual: no procesa ni reproduce audio. Los rangos, curvas de EQ y aislamiento dependen de la mesa.',safe:'Empieza a volumen seguro. Usa recortes para crear espacio; no realces ambas pistas para que la mezcla parezca más fuerte.'},
};
const notes: Record<Lang, Record<Band, {source:string; listen:string; risk:string}>> = {
 en: {
  low:{source:'Kick body, bass guitar, synth bass and low fundamentals',listen:'Follow the weight of the kick and bass line, not just the click of the attack.',risk:'Too much overlap may muddy the groove; too much cutting may empty it.'},
  mid:{source:'Vocals, chords, snare body and melodic instruments',listen:'Follow words, chord texture and the main hook.',risk:'Aggressive cuts can make the song lose its identity.'},
  high:{source:'Hi-hats, cymbal shimmer, consonants and brightness',listen:'Follow hi-hat texture and crisp articulation.',risk:'Too much high end can become harsh or tiring.'},
 }, es:{
  low:{source:'Cuerpo del bombo, bajo, sintetizadores graves y fundamentales',listen:'Sigue el peso del bombo y la línea de bajo, no solo el clic del ataque.',risk:'El solapamiento puede enturbiar el groove; un recorte excesivo lo vacía.'},
  mid:{source:'Voces, acordes, cuerpo de caja e instrumentos melódicos',listen:'Sigue las palabras, la textura de los acordes y el gancho principal.',risk:'Recortes agresivos pueden borrar la identidad musical del tema.'},
  high:{source:'Charleston, brillo de platos, consonantes y detalle',listen:'Sigue la textura del hi-hat y la articulación.',risk:'Demasiado agudo puede resultar áspero o fatigante.'},
 }
};

function Figure({title, children, lang}:{title:string; children:React.ReactNode;lang:Lang}) {
 return <figure className={s.figure}><figcaption className={s.title}>{title}</figcaption>{children}<p className={s.footnote}>{labels[lang].note}</p></figure>;
}
function EqBandExplorer({lang}:{lang:Lang}) {
 const [band,setBand] = useState<Band>('low');
 const [change,setChange] = useState(0);
 const info = notes[lang][band];
 return <Figure lang={lang} title={lang==='es'?'Explora las tres bandas de EQ':'Explore the three EQ bands'}>
   <div className={s.tabs} role="group" aria-label={lang==='es'?'Elige una banda':'Choose a band'}>{bandOrder.map(b=><button key={b} type="button" aria-pressed={band===b} onClick={()=>{setBand(b);setChange(0);}}>{labels[lang][b]}</button>)}</div>
   <div className={s.bandMap} aria-hidden="true">{bandOrder.map(b=><div key={b} data-band={b} data-selected={band===b}><strong>{labels[lang][b]}</strong></div>)}</div>
   <label className={s.sliderLabel} htmlFor={`eq-band-${lang}`}>{lang==='es'?'Ajuste ilustrativo':'Illustrative adjustment'} <strong>{change>0?'+':''}{change} dB</strong></label>
   <input id={`eq-band-${lang}`} className={s.slider} type="range" min="-12" max="6" step="1" value={change} onChange={e=>setChange(Number(e.target.value))}/>
   <div className={s.scale}><span>−12 dB</span><span>0 dB</span><span>+6 dB</span></div>
   <div className={s.readout}><strong>{change===0?labels[lang].neutral:change<0?labels[lang].cut:labels[lang].boost}</strong><p>{lang==='es'?'Escucha especialmente':'Listen for'}: {info.listen}</p><p><b>{lang==='es'?'Suele afectar a':'Often affects'}:</b> {info.source}.</p><p><b>{lang==='es'?'Riesgo':'Risk'}:</b> {info.risk}</p></div>
   <button type="button" className={s.reset} onClick={()=>setChange(0)}>{labels[lang].reset}</button>
 </Figure>;
}

type Eq = [number,number,number];
type DeckId = 'a' | 'b';

// Keep child component identity stable across parent state updates.
function EqDeckControls({deck, value, lang, onChange}: {
 deck: DeckId;
 value: Eq;
 lang: Lang;
 onChange: (deck: DeckId, index: number, value: number) => void;
}) {
 return <div className={s.deck}>
  <h4>{deck==='a' ? labels[lang].deckA : labels[lang].deckB}</h4>
  {bandOrder.map((band, i)=><label key={band} className={s.deckRow}>
   <span>{labels[lang][band]}</span>
   <input type="range" min="-12" max="6" step="1" value={value[i]}
    onChange={e=>onChange(deck, i, Number(e.target.value))}/>
   <output>{value[i]>0?'+':''}{value[i]} dB</output>
  </label>)}
 </div>;
}

function EqTwoDeckLab({lang}:{lang:Lang}) {
 const [a,setA] = useState<Eq>([0,0,0]);
 const [b,setB] = useState<Eq>([-12,0,0]);
 const setValue = (deck:'a'|'b',index:number,value:number)=>{
  const setter=deck==='a'?setA:setB;
  setter(previous=>previous.map((x,i)=>i===index?value:x) as Eq);
 };
 const totalLow=a[0]+b[0];
 const clash=a[0]>=-3 && b[0]>=-3;
 const weak=a[0]<=-9 && b[0]<=-9;
 const prompt=clash?(lang==='es'?'Ambos graves están cerca de 0 dB: escucha si bombo y bajo se enmascaran.':'Both low bands are near 0 dB: listen for kick/bass masking.'):
  weak?(lang==='es'?'Ambos graves están muy recortados: puede faltar peso.':'Both low bands are deeply cut: the blend may lose weight.'):
  lang==='es'?'Hay espacio en graves para uno de los temas. Comprueba el resultado de oído.':'There is room for one track in the low band. Verify by ear.';
 return <Figure lang={lang} title={lang==='es'?'Laboratorio de dos decks: deja espacio':'Two-deck EQ lab: make space'}>
  <p>{lang==='es'?'A comienza en 0 dB y B entra con graves recortados. Prueba varios ajustes y observa el diagnóstico: no es un medidor de sonoridad real.':'A starts flat while incoming B has reduced lows. Try different settings and read the diagnosis: it is not a real loudness meter.'}</p>
  <div className={s.decks}><EqDeckControls deck="a" value={a} lang={lang} onChange={setValue}/><EqDeckControls deck="b" value={b} lang={lang} onChange={setValue}/></div>
  <div className={s.meter} role="img" aria-label={`${lang==='es'?'Suma ilustrativa de ajustes de graves':'Illustrative sum of low-band settings'}: ${totalLow} dB`}><span style={{width:`${Math.max(4,Math.min(100,(totalLow+24)/36*100))}%`}}/></div>
  <div className={s.readout} role="status"><strong>{lang==='es'?'Diagnóstico conceptual':'Conceptual diagnosis'}</strong><p>{prompt}</p><small>{lang==='es'?'No representa niveles sumados de audio, potencia, clipping ni la respuesta acústica.':'Does not represent summed audio levels, power, clipping or acoustic response.'}</small></div>
  <div className={s.actions}><button type="button" onClick={()=>{setA([0,0,0]);setB([-12,0,0]);}}>{lang==='es'?'Ejemplo inicial':'Starting example'}</button><button type="button" onClick={()=>{setA([0,0,0]);setB([0,0,0]);}}>{lang==='es'?'Ambas EQ neutras':'Both EQs flat'}</button><button type="button" onClick={()=>{setA([-12,0,0]);setB([0,0,0]);}}>{lang==='es'?'Intercambiar los graves':'Swap the low end'}</button></div>
  <p className={s.safety}>{labels[lang].safe}</p>
 </Figure>;
}
function EqListeningWorksheet({lang}:{lang:Lang}) {
 const steps=lang==='es'?[
 'Selecciona dos temas con tempo cercano y un tramo instrumental claro.',
 'Pon el master y los auriculares a un volumen seguro; deja la EQ neutra.',
 'En preescucha, baja solo LOW de B y describe qué cambia en bombo y bajo.',
 'Repite con MID y HIGH por separado, volviendo a 0 dB entre pruebas.',
 'Haz una entrada corta con B y graves recortados; escucha si el bajo de A sigue definido.',
 'En un límite de frase, baja gradualmente los graves de A mientras recuperas los de B.',
 'Graba el ensayo y revisa equilibrio, claridad y consistencia de nivel.'
 ]:[
 'Choose two tracks with similar tempos and clear instrumental passages.',
 'Set safe master/headphone levels; leave the EQ controls neutral.',
 'In headphones, cut only LOW on B and describe the kick/bass difference.',
 'Repeat separately with MID and HIGH, returning to 0 dB each time.',
 'Bring in B briefly with lows reduced; listen for definition in A’s bass.',
 'At a phrase boundary, gradually lower A’s lows while restoring B’s.',
 'Record the attempt; review balance, clarity and level consistency.'
 ];
 const [checked,setChecked]=useState<boolean[]>(Array(steps.length).fill(false));
 return <Figure lang={lang} title={lang==='es'?'Práctica guiada de escucha y EQ':'Guided EQ listening practice'}>
  <p>{lang==='es'?'Marca cada paso después de hacerlo con el equipo real.':'Mark each step after doing it on real equipment.'}</p>
  <ol className={s.checks}>{steps.map((step,i)=><li key={step}><label><input type="checkbox" checked={checked[i]} onChange={e=>setChecked(old=>old.map((v,j)=>j===i?e.target.checked:v))}/><span>{step}</span></label></li>)}</ol>
  <div className={s.actions}><strong aria-live="polite">{checked.filter(Boolean).length}/{steps.length}</strong><button type="button" onClick={()=>setChecked(Array(steps.length).fill(false))}>{labels[lang].reset}</button></div>
  <p className={s.safety}>{labels[lang].safe}</p>
 </Figure>;
}
export function EqBandExplorerEn(){return <EqBandExplorer lang="en"/>;}
export function EqBandExplorerEs(){return <EqBandExplorer lang="es"/>;}
export function EqTwoDeckLabEn(){return <EqTwoDeckLab lang="en"/>;}
export function EqTwoDeckLabEs(){return <EqTwoDeckLab lang="es"/>;}
export function EqListeningWorksheetEn(){return <EqListeningWorksheet lang="en"/>;}
export function EqListeningWorksheetEs(){return <EqListeningWorksheet lang="es"/>;}
