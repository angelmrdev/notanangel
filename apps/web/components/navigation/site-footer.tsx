import Link from "next/link";
import styles from "./site-footer.module.css";
import { BrandLogo } from "../brand/brand-logo";

export function SiteFooter({ locale, musicVisible = false }: { locale: "en" | "es"; musicVisible?: boolean }) {
  const es = locale === "es";
  return <footer className={styles.footer}>
    <div className={styles.inner}>
      <div><BrandLogo locale={locale} placement="footer" /><p>{es ? "Música, cultura DJ y aprendizaje." : "Music, DJ culture and learning."}</p></div>
      <nav className={styles.links} aria-label={es ? "Navegación del pie" : "Footer navigation"}>
        {musicVisible && <Link href={es ? "/es/musica/" : "/music/"}>{es ? "Música" : "Music"}</Link>}
        <Link href={es ? "/es/blog/" : "/blog/"}>Blog</Link>
        <Link href={es ? "/es/curso-dj/" : "/learn-to-dj/"}>{es ? "Aprende DJ" : "Learn to DJ"}</Link>
        <Link href={es ? "/es/herramientas/" : "/tools/"}>{es ? "Herramientas" : "Tools"}</Link>
        <Link href={es ? "/es/sobre-mi/" : "/about/"}>{es ? "Sobre mí" : "About"}</Link>
        <Link href={es ? "/es/contacto/" : "/contact/"}>{es ? "Contacto" : "Contact"}</Link>
        <Link href={es ? "/es/aviso-legal/" : "/legal-notice/"}>{es ? "Aviso legal" : "Legal notice"}</Link>
        <Link href={es ? "/es/politica-de-privacidad/" : "/privacy-policy/"}>{es ? "Privacidad" : "Privacy"}</Link>
        <Link href={es ? "/es/politica-de-cookies/" : "/cookie-policy/"}>{es ? "Cookies" : "Cookies"}</Link>
      </nav>
    </div>
    <div className={styles.bottom}>© {new Date().getFullYear()} Not an Angel. {es ? "Todos los derechos reservados." : "All rights reserved."}</div>
  </footer>;
}
