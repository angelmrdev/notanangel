import s from './lesson-visuals.module.css';

/** Visuales originales localizados, independientes de la versión inglesa. */
export function DJWorkCycleEs() {
  const steps = [
    { num:'01', label:'Descubrir', note:'Buscar y escuchar música', tone:'pink' },
    { num:'02', label:'Preparar', note:'Organizar y conocer los temas', tone:'cyan' },
    { num:'03', label:'Seleccionar', note:'Elegir según el momento', tone:'yellow' },
    { num:'04', label:'Presentar', note:'Reproducir, preescuchar o mezclar', tone:'pink' },
    { num:'05', label:'Adaptarse', note:'Observar la sala y responder', tone:'cyan' },
  ];
  return <figure className={s.panel}>
    <figcaption className={s.kicker}>EL PROCESO DEL DJ <span>· 5 HABILIDADES CONECTADAS</span></figcaption>
    <ol className={s.cycle}>{steps.map(({num,label,note,tone})=><li className={s.step} data-tone={tone} key={num}>
      <span className={s.stepNumber}>{num}</span><strong>{label}</strong><span className={s.stepNote}>{note}</span>
    </li>)}</ol>
    <p className={s.caption}>Es un proceso circular: lo aprendido durante una actuación ayuda a descubrir y preparar la música de la siguiente.</p>
  </figure>;
}

export function TwoDeckConceptEs() {
  return <figure className={s.panel}>
    <figcaption className={s.kicker}>DOS PISTAS <span>· UNA MEZCLA PARA EL PÚBLICO</span></figcaption>
    <div className={s.deckGrid}>
      <div className={s.deck}>
        <div className={s.deckTag}>DECK A <span>SONANDO</span></div>
        <div className={s.disc} aria-hidden="true"><span /></div>
        <strong>Canción actual</strong><p>Suena en la pista de baile</p>
      </div>
      <div className={s.middle} aria-hidden="true"><span>→</span><span>MEZCLA</span><span>←</span></div>
      <div className={s.deck}>
        <div className={s.deckTag}>DECK B <span>EN PREPARACIÓN</span></div>
        <div className={`${s.disc} ${s.discAlt}`} aria-hidden="true"><span /></div>
        <strong>Siguiente canción</strong><p>Puede preescucharse en privado</p>
      </div>
    </div>
    <div className={s.pathGrid}>
      <div><strong>MASTER</strong><span>Altavoces del público ← mezcla seleccionada</span></div>
      <div><strong>CUE</strong><span>Auriculares DJ ← preescucha privada</span></div>
    </div>
    <p className={s.caption}>Esquema conceptual. Una pista puede reproducirse sin llegar al público; los controles concretos dependen del equipo.</p>
  </figure>;
}

export function DJRoleComparisonEs() {
  const roles = [
    ['CLUB','Selecciona música y gestiona la pista','Puede importar la continuidad'],
    ['OPEN FORMAT','Combina estilos y épocas','Importan la versatilidad y el reconocimiento'],
    ['RADIO','Selecciona y presenta música','Importan la selección y la narración'],
    ['EVENTOS','Se adapta a cada celebración','Importan las peticiones y el contexto'],
  ];
  return <figure className={s.panel}>
    <figcaption className={s.kicker}>UN MISMO OFICIO <span>· DIFERENTES CONTEXTOS</span></figcaption>
    <div className={s.roleGrid}>{roles.map(([role,mission,focus])=><div className={s.roleCard} key={role}>
      <strong>{role}</strong><p>{mission}</p><small>{focus}</small>
    </div>)}</div>
    <p className={s.caption}>Roles ilustrativos, no categorías excluyentes. Una misma persona puede trabajar en varios entornos.</p>
  </figure>;
}

export function PartyEnergyStoryEs() {
  const moments = [
    {hour:'LLEGADA',level:2,text:'Espacio para conversar'},
    {hour:'CALENTAMIENTO',level:3,text:'Música conocida y acogedora'},
    {hour:'PICO',level:5,text:'Momento colectivo de mayor intensidad'},
    {hour:'CONTRASTE',level:3,text:'Bajada antes de volver a subir'},
  ];
  return <figure className={s.panel}>
    <figcaption className={s.kicker}>FIESTA PEQUEÑA <span>· EVOLUCIÓN DE ENERGÍA ILUSTRATIVA</span></figcaption>
    <div className={s.energyGrid}>{moments.map(({hour,level,text})=><div className={s.energyMoment} key={hour}>
      <strong>{hour}</strong><div className={s.energyBars} aria-label={`Energía ilustrativa: ${level} de 5`}>{[1,2,3,4,5].map(x=><span className={x<=level?s.lit:''} key={x}/>)}</div><p>{text}</p>
    </div>)}</div>
    <p className={s.caption}>Representación creativa, no medida objetiva ni fórmula obligatoria para programar una sesión.</p>
  </figure>;
}
