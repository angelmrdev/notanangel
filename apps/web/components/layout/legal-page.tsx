import Link from "next/link";
import styles from "./info-page.module.css";
import { Container } from "../ui/container";

type Kind = "privacy" | "cookies" | "legal";
export function LegalPage({ locale, kind }: { locale: "en" | "es"; kind: Kind }) {
  const es = locale === "es";
  const names = { privacy: es ? "Política de privacidad" : "Privacy policy", cookies: es ? "Política de cookies" : "Cookie policy", legal: es ? "Aviso legal" : "Legal notice" };
  const details = {
    privacy: es ? "Este sitio utiliza direcciones de correo de contacto para recibir consultas. Antes de publicar esta política se deben verificar la identidad del responsable, las bases jurídicas, los plazos de conservación, los destinatarios, las transferencias y los derechos aplicables, así como cualquier servicio de analítica o publicidad que se active." : "This site provides email addresses for enquiries. Before publication, verify the controller identity, legal bases, retention periods, recipients, transfers and applicable rights, together with any analytics or advertising services enabled.",
    cookies: es ? "Antes de publicar esta política se debe auditar el uso real de cookies y almacenamiento local, documentar su finalidad y duración y configurar el consentimiento cuando corresponda." : "Before publication, audit the actual cookies and local storage used, document their purposes and duration, and configure consent where required.",
    legal: es ? "Antes de publicar este aviso se deben completar y verificar los datos identificativos y de contacto del titular y las condiciones legales aplicables al servicio." : "Before publication, complete and verify the site operator's identity, contact details and applicable legal disclosures."
  };
  return <main id="main-content" className={styles.page}><Container className={styles.inner}>
    <p className={styles.eyebrow}>{es ? "Información legal" : "Legal information"}</p>
    <h1 className={styles.heading}>{names[kind]}</h1>
    <div className={styles.prose}><p>{details[kind]}</p><p>{es ? "Documento de trabajo: pendiente de validación jurídica y datos del titular. No publicar como política definitiva." : "Working draft: pending legal review and verified operator details. Do not publish as a final policy."}</p>
    <p><Link href={es ? "/es/contacto/" : "/contact/"}>{es ? "Contacto" : "Contact"}</Link></p></div>
  </Container></main>;
}
