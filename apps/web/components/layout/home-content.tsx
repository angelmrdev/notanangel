import Link from "next/link";
import styles from "./home-content.module.css";

export function HomeContent({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const blog = es ? "/es/blog/" : "/blog/";
  const learn = es ? "/es/curso-dj/" : "/learn-to-dj/";
  const about = es ? "/es/sobre-mi/" : "/about/";
  return <main id="main-content">
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.liveDot}/> NOT AN ANGEL / MUSIC & DJ CULTURE</p>
          <h1 id="hero-title">MAKE<br/><span>NOISE.</span><br/>LEARN<br/>MORE<span className={styles.period}>.</span></h1>
          <p className={styles.intro}>{es ? "Explora técnicas de mezcla, descubre cultura musical y encuentra nuevas ideas para tus sesiones." : "Explore DJ techniques, discover music culture and find fresh ideas for your next mix."}</p>
          <div className={styles.ctas}><Link className={styles.primary} href={learn}>{es ? "Empieza a aprender" : "Start learning"} <span aria-hidden="true">↗</span></Link><Link className={styles.secondary} href={blog}>{es ? "Explora el Blog" : "Explore the Blog"} <span aria-hidden="true">→</span></Link></div>
        </div>
        <div className={styles.heroArt} aria-hidden="true"><div className={styles.ring}/><div className={styles.artStar}>✳</div><div className={styles.artPanel}><span>NO</span><span>RULES</span><small>JUST GOOD MUSIC / 001</small></div><div className={styles.artCaption}>POP CHAOS <b>✦</b> EDITORIAL</div></div>
      </div>
      <nav className={styles.ticker} aria-label={es ? "Secciones de la portada" : "Homepage sections"}>
        <a href="#blog"><span>01</span>{es ? "BLOG" : "BLOG"}<span aria-hidden="true">↗</span></a>
        <a href="#learn"><span>02</span>{es ? "APRENDE DJ" : "LEARN TO DJ"}<span aria-hidden="true">↗</span></a>
        <a href="#about"><span>03</span>{es ? "SOBRE MÍ" : "ABOUT"}<span aria-hidden="true">↗</span></a>
      </nav>
    </section>
    <section id="blog" className={styles.section} aria-labelledby="blog-heading"><div className={styles.sectionInner}>
      <div className={styles.sectionTop}><p className={styles.kicker}>01 / THE BLOG</p><span className={styles.sectionIndex}>WORDS & CULTURE ↗</span></div>
      <h2 id="blog-heading">{es ? <>CULTURA.<br/><span>CON ACTITUD.</span></> : <>CULTURE.<br/><span>WITH ATTITUDE.</span></>}</h2>
      <p className={styles.sectionLead}>{es ? "Ideas, guías y conversaciones sobre música, creatividad y todo lo que rodea a la cabina." : "Ideas, guides and conversations about music, creativity and everything happening beyond the decks."}</p>
      <div className={styles.editorialGrid}>
        <Link className={styles.featureCard} href={blog}>
          <div className={styles.cardNumber}>01 / BLOG</div><div className={styles.featureGraphic} aria-hidden="true">✳</div>
          <div><span className={styles.tag}>{es ? "MÚSICA Y CULTURA" : "MUSIC & CULTURE"}</span><h3>{es ? "Ideas que suenan diferente." : "Ideas that sound different."}</h3><p>{es ? "Historias, tendencias y perspectivas sobre música y cultura DJ." : "Stories, trends and perspectives on music and DJ culture."}</p><span className={styles.cardAction}>{es ? "Explorar el Blog" : "Explore the Blog"} ↗</span></div>
        </Link>
        <Link className={styles.sideCard} href={blog}>
          <span className={styles.tagCyan}>{es ? "DESCUBRE" : "DISCOVER"}</span><div className={styles.sideSymbol} aria-hidden="true">↗</div>
          <h3>{es ? "Más allá de la cabina." : "Beyond the decks."}</h3><p>{es ? "Creatividad, tecnología y conversaciones que mueven la música." : "Creativity, technology and conversations moving music forward."}</p><span className={styles.cardAction}>{es ? "Leer el Blog" : "Read the Blog"} ↗</span>
        </Link>
      </div>
    </div></section>
    <section id="learn" className={`${styles.section} ${styles.learn}`} aria-labelledby="learn-heading"><div className={styles.sectionInner}>
      <div className={styles.sectionTop}><p className={styles.kicker}>02 / LEARN TO DJ</p><span className={styles.sectionIndex}>FROM ZERO TO THE BOOTH ↗</span></div>
      <div className={styles.learnGrid}><div><h2 id="learn-heading">{es ? <>APRENDE.<br/><span>MEZCLA.</span><br/>REPITE.</> : <>LEARN.<br/><span>MIX.</span><br/>REPEAT.</>}</h2><p className={styles.sectionLead}>{es ? "De tus primeras mezclas a dominar las frases, la estructura y tu propio sonido. Sin saltarte los fundamentos." : "From your first transitions to mastering phrasing, structure and your own sound. No shortcuts around the fundamentals."}</p><Link className={styles.learnLink} href={learn}>{es ? "Explorar Learn to DJ" : "Explore Learn to DJ"} <span aria-hidden="true">↗</span></Link></div><div className={styles.lessonGraphic} aria-hidden="true"><div className={styles.disc}><div className={styles.discInner}/></div><div className={styles.discLabel}>PLAY / PAUSE / REPEAT</div><div className={styles.lessonSticker}>START<br/>HERE ↗</div></div></div>
    </div></section>
    <section id="about" className={`${styles.section} ${styles.about}`} aria-labelledby="about-heading"><div className={styles.sectionInner}><div className={styles.sectionTop}><p className={styles.kicker}>03 / NOT AN ANGEL</p><span className={styles.sectionIndex}>THE PERSON BEHIND THE NOISE</span></div><h2 id="about-heading">{es ? <>NO SOY<br/><span>UN ÁNGEL.</span></> : <>NOT EXACTLY<br/><span>AN ANGEL.</span></>}</h2><div className={styles.aboutBottom}><p>{es ? "Música, cultura pop y DJing en un espacio independiente para descubrir, experimentar y compartir." : "Music, pop culture and DJing meet in an independent space to discover, experiment and share."}</p><div className={styles.aboutActions}><Link className={styles.secondary} href={about}>{es ? "Conoce Not an Angel" : "Meet Not an Angel"} ↗</Link><span className={styles.aboutStar} aria-hidden="true">✦</span></div></div></div></section>
  </main>;
}
