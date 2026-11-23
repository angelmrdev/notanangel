import Link from "next/link";
import { Container } from "../ui/container";
import styles from "./info-page.module.css";

export function AboutPage({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  return <main id="main-content" className={styles.page}><Container className={styles.inner}>
    <p className={styles.eyebrow}>{es ? "La persona detrás del ruido" : "The person behind the noise"}</p>
    <h1 className={styles.heading}>{es ? <>NOT EXACTLY<br/><span className={styles.accent}>AN ANGEL.</span></> : <>NOT EXACTLY<br/><span className={styles.accent}>AN ANGEL.</span></>}</h1>
    <p className={styles.lead}>{es ? "Not an Angel es mi espacio para mezclar música, cultura pop, creatividad y todo lo que aprendo detrás de los platos." : "Not an Angel is my space for mixing music, pop culture, creativity and everything I learn behind the decks."}</p>
    <div className={styles.grid}><div className={styles.prose}>
      <h2>{es ? "Música con personalidad" : "Music with personality"}</h2>
      <p>{es ? "Soy el creador detrás de Not an Angel: un proyecto DJ que nace de la curiosidad por la música, el espectáculo y la energía que se crea cuando una canción conecta con la gente." : "I'm the person behind Not an Angel, a DJ project driven by curiosity about music, performance and the energy that happens when a track connects with people."}</p>
      <p>{es ? "Mi recorrido en comunicación audiovisual y producción de espectáculos influye en cómo entiendo una sesión: no solo como una sucesión de canciones, sino como ritmo, narrativa y experiencia." : "My background in audiovisual communication and live production shapes the way I think about a set: not just a sequence of songs, but rhythm, storytelling and experience."}</p>
      <h2>{es ? "Compartir el proceso" : "Sharing the process"}</h2>
      <p>{es ? "Aquí conviven la cultura DJ, el pop, las mezclas, los experimentos creativos y una forma práctica de aprender. En Learn to DJ reúno conceptos, técnicas y recursos para entender mejor cómo funciona una mezcla; en el Blog exploro música, herramientas e ideas que merecen una conversación." : "DJ culture, pop, mixes, creative experiments and practical learning all belong here. Learn to DJ brings together concepts, techniques and resources for understanding how mixing works; the Blog explores music, tools and ideas worth talking about."}</p>
      <p>{es ? "No se trata de seguir una fórmula única. Se trata de escuchar, probar, equivocarse, encontrar conexiones y desarrollar un sonido propio." : "There isn't one formula to follow. It's about listening, experimenting, making mistakes, finding connections and developing a sound of your own."}</p>
    </div><aside className={styles.panel}><h2>{es ? "Explora Not an Angel" : "Explore Not an Angel"}</h2><p>{es ? "Un proyecto musical con una parte editorial y educativa: descubre las historias o entra en el recorrido de aprendizaje." : "A music project with an editorial and educational side: discover the stories or dive into the learning journey."}</p><div className={styles.links}><Link className={styles.link} href={es ? "/es/blog/" : "/blog/"}>Blog ↗</Link><Link className={`${styles.link} ${styles.linkSecondary}`} href={es ? "/es/curso-dj/" : "/learn-to-dj/"}>{es ? "Aprende DJ ↗" : "Learn to DJ ↗"}</Link></div></aside></div>
  </Container></main>;
}
