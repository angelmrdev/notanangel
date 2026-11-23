import styles from "./info-page.module.css";
import { Container } from "../ui/container";

export function ContactPage({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  return <main id="main-content" className={styles.page}><Container className={styles.inner}>
    <p className={styles.eyebrow}>{es ? "Contacto / Colaboraciones / Booking" : "Contact / Collaborations / Booking"}</p>
    <h1 className={styles.heading}>{es ? <>LET’S MAKE<br/><span className={styles.accent}>SOME NOISE.</span></> : <>LET’S MAKE<br/><span className={styles.accent}>SOME NOISE.</span></>}</h1>
    <p className={styles.lead}>{es ? "¿Tienes una propuesta, una idea o una pregunta? Elige el contacto que mejor encaje y hablamos." : "Got a proposal, an idea or a question? Pick the right inbox and let's talk."}</p>
    <div className={styles.contactList}>
      <section className={styles.contactCard}><h2>{es ? "Contrataciones y actuaciones" : "Bookings & performances"}</h2><p>{es ? "Para sesiones DJ, eventos, actuaciones y propuestas profesionales relacionadas con la música en directo." : "For DJ sets, events, performances and professional live-music enquiries."}</p><a className={styles.email} href="mailto:booking@notanangeldj.com">booking@notanangeldj.com</a></section>
      <section className={styles.contactCard}><h2>{es ? "Contacto general" : "General enquiries"}</h2><p>{es ? "Para colaboraciones editoriales, preguntas sobre el Blog o Learn to DJ, proyectos creativos y otras consultas." : "For editorial collaborations, questions about the Blog or Learn to DJ, creative projects and everything else."}</p><a className={styles.email} href="mailto:contact@notanangeldj.com">contact@notanangeldj.com</a></section>
    </div><p className={styles.note}>{es ? "Al escribir por correo, comparte el contexto y los detalles relevantes de tu propuesta. No se incluye un formulario de contacto en esta versión." : "When emailing, include some context and the relevant details of your enquiry. This version uses direct email links rather than a contact form."}</p>
  </Container></main>;
}
