import Link from "next/link";
import styles from "./info-page.module.css";
import { Container } from "../ui/container";
import { legal } from "../../config/legal";

type Kind = "privacy" | "cookies" | "legal";
export function LegalPage({ locale, kind }: { locale: "en" | "es"; kind: Kind }) {
  const es = locale === "es";
  const names = { privacy: es ? "Política de privacidad" : "Privacy policy", cookies: es ? "Política de cookies" : "Cookie policy", legal: es ? "Aviso legal" : "Legal notice" };
  const sections: Record<Kind, [string, string][]> = es ? {
    legal: [
      ["Titular y contacto", `${legal.name}, NIF: ${legal.taxId}. Domicilio: ${legal.address}, España. Datos de actividad: ${legal.activity}. Contacto: ${legal.email}.`],
      ["Objeto y uso", "Not an Angel ofrece información editorial, formación DJ y recomendaciones de productos. El usuario debe utilizar el sitio de forma lícita y respetar los derechos de terceros. Los contenidos educativos no garantizan resultados profesionales ni comerciales."],
      ["Propiedad intelectual", "Los contenidos propios están protegidos por la legislación aplicable. Las marcas y materiales de terceros pertenecen a sus respectivos titulares. No se concede licencia de explotación por el mero acceso al sitio."],
      ["Publicidad y afiliación", "El sitio puede mostrar publicidad de Monetag y enlaces de afiliación de Amazon. Como afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables. Las compras se realizan en el sitio del vendedor, sujeto a sus condiciones."],
      ["Responsabilidad y legislación", "Procuramos mantener la información actualizada, pero precios, disponibilidad y características pueden cambiar. Se aplica la legislación española sin perjuicio de las normas imperativas y derechos de los consumidores que correspondan."]],
    privacy: [
      ["Responsable", `${legal.name}, ${legal.address}, España. NIF: ${legal.taxId}. Contacto para privacidad: ${legal.email}.`],
      ["Datos y finalidades", "El alojamiento puede tratar direcciones IP y registros técnicos para servir y proteger el sitio. Si escribes por correo, tratamos tu dirección, mensaje y datos facilitados para responder y gestionar tu consulta o contratación. No hay formulario de contacto en esta versión."],
      ["Bases jurídicas", "La seguridad y gestión técnica se basan en el interés legítimo, sujeto a ponderación. Las consultas se gestionan por interés legítimo o medidas precontractuales solicitadas por el interesado, según corresponda. Las obligaciones legales se atienden conforme a la ley. La analítica y publicidad opcionales se basan en el consentimiento."],
      ["Analítica y publicidad", "Monetag puede tratar identificadores, información del dispositivo, IP e interacciones publicitarias tras aceptar publicidad. Los formatos previstos actualmente son In-Page Push y Vignette. Google Analytics 4 mediante GTM está preparado y, si se habilita, solo se carga tras aceptar analítica. No se activan notificaciones push ni OnClick mediante esta integración."],
      ["Destinatarios y transferencias", `Los proveedores de alojamiento, correo, publicidad y, si se activa, analítica pueden recibir datos necesarios para sus servicios. Los enlaces de afiliación conducen a servicios externos con sus propias políticas. Entidades, roles, países y garantías de transferencias: ${legal.providers}.`],
      ["Conservación", `Los datos se conservan durante el tiempo necesario para cada finalidad y las obligaciones legales aplicables. Plazos concretos: ${legal.retention}. Los identificadores de terceros se detallan en la política de cookies.`],
      ["Derechos", `Puedes solicitar acceso, rectificación, supresión, limitación, oposición y portabilidad cuando procedan, y retirar el consentimiento sin afectar al tratamiento previo, escribiendo a ${legal.email}. Puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).`]],
    cookies: [
      ["Qué utilizamos", "Las cookies y tecnologías similares permiten almacenar o consultar información en el dispositivo. Distinguimos almacenamiento necesario, analítica y publicidad opcionales."],
      ["Almacenamiento necesario", "naa-consent-v1: almacenamiento local propio para recordar las preferencias de analítica y publicidad. El código actual no establece caducidad automática; permanece hasta su modificación o eliminación. naa.preferredLocale: almacenamiento local de idioma si se utiliza el selector correspondiente; sin caducidad automática."],
      ["Analítica opcional", "Si se habilita GA4 mediante GTM, se carga tras aceptar analítica. Google puede utilizar identificadores y cookies de medición; sus nombres y duraciones reales deben verificarse con la configuración publicada."],
      ["Publicidad opcional", "Monetag In-Page Push (12335453) y Vignette (12335451) se cargan tras aceptar publicidad en Blog y Learn to DJ. Los scripts pueden permanecer activos durante la navegación interna hasta recargar la página. El archivo sw.js está disponible, pero esta integración no registra notificaciones push ni carga OnClick."],
      ["Inventario", legal.storage],
      ["Gestionar preferencias", "Puedes aceptar, rechazar o configurar las categorías opcionales mediante el banner y volver a abrirlo con el botón Privacidad. Al retirar un consentimiento previamente concedido se recarga la página cuando corresponde. Puedes eliminar cookies y almacenamiento desde el navegador; retirar el consentimiento no elimina necesariamente los identificadores ya almacenados por terceros."]]
  } : {
    legal: [
      ["Operator and contact", `${legal.name}, tax ID: ${legal.taxId}. Address: ${legal.address}, Spain. Business details: ${legal.activity}. Contact: ${legal.email}.`],
      ["Purpose and use", "Not an Angel provides editorial information, DJ education and product recommendations. Visitors must use the site lawfully and respect third-party rights. Educational content does not guarantee professional or commercial results."],
      ["Intellectual property", "Original content is protected by applicable law. Third-party trademarks and materials belong to their respective owners. Access does not grant a licence to exploit content."],
      ["Advertising and affiliate links", "The site may display Monetag advertising and Amazon affiliate links. As an Amazon Associate I earn from qualifying purchases. Purchases take place on the seller's website under its terms."],
      ["Liability and law", "We aim to keep information current, but prices, availability and specifications may change. Spanish law applies without prejudice to applicable mandatory rules and consumer rights."]],
    privacy: [
      ["Controller", `${legal.name}, ${legal.address}, Spain. Tax ID: ${legal.taxId}. Privacy contact: ${legal.email}.`],
      ["Data and purposes", "Hosting may process IP addresses and technical logs to deliver and secure the site. When you email us, we process your address, message and supplied details to respond and handle enquiries or bookings. This version has no contact form."],
      ["Legal bases", "Technical operation and security rely on legitimate interests, subject to balancing. Enquiries rely on legitimate interests or requested pre-contractual steps, as appropriate. Legal obligations are handled as required by law. Optional analytics and advertising rely on consent."],
      ["Analytics and advertising", "Monetag may process identifiers, device information, IP addresses and ad interactions after advertising consent. Current intended formats are In-Page Push and Vignette. GA4 through GTM is prepared and, if enabled, loads only after analytics consent. Push notifications and OnClick are not activated by this integration."],
      ["Recipients and transfers", `Hosting, email, advertising and, if enabled, analytics providers may receive data needed for their services. Affiliate links lead to external services with their own policies. Entities, roles, countries and transfer safeguards: ${legal.providers}.`],
      ["Retention", `Data is retained as necessary for each purpose and applicable legal obligations. Specific periods: ${legal.retention}. Third-party identifiers are addressed in the cookie policy.`],
      ["Your rights", `You may request access, rectification, erasure, restriction, objection and portability where applicable, and withdraw consent without affecting prior lawful processing, by emailing ${legal.email}. You may complain to the Spanish Data Protection Agency (www.aepd.es).`]],
    cookies: [
      ["What we use", "Cookies and similar technologies store or access information on your device. We distinguish essential storage, optional analytics and optional advertising."],
      ["Essential storage", "naa-consent-v1: first-party local storage remembering analytics and advertising choices. Current code has no automatic expiry; it persists until changed or deleted. naa.preferredLocale: local language preference if the corresponding selector is used; no automatic expiry."],
      ["Optional analytics", "If GA4 through GTM is enabled, it loads after analytics consent. Google may use measurement identifiers and cookies; actual names and durations must be verified against the published configuration."],
      ["Optional advertising", "Monetag In-Page Push (12335453) and Vignette (12335451) load after advertising consent on Blog and Learn to DJ. Scripts may remain active during internal navigation until reload. The sw.js file is available, but this integration does not register push notifications or load OnClick."],
      ["Inventory", legal.storage],
      ["Manage preferences", "Accept, reject or customize optional categories through the banner and reopen it using Privacy settings. Withdrawal of previously granted consent reloads the page where applicable. You can clear cookies and storage in your browser; withdrawal does not necessarily delete identifiers already stored by third parties."]]
  };
  return <main id="main-content" className={styles.page}><Container className={styles.inner}>
    <p className={styles.eyebrow}>{es ? "Información legal" : "Legal information"}</p>
    <h1 className={styles.heading}>{names[kind]}</h1>
    <div className={styles.prose}>
      {!legal.reviewed && <p>{es ? "Borrador pendiente de completar y revisar." : "Draft pending completion and review."}</p>}
      <p>{es ? "Última revisión: " : "Last reviewed: "}{legal.updated}</p>
      {sections[kind].map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      <p><Link href={es ? "/es/politica-de-privacidad/" : "/privacy-policy/"}>{names.privacy}</Link>{" · "}<Link href={es ? "/es/politica-de-cookies/" : "/cookie-policy/"}>{names.cookies}</Link>{" · "}<Link href={es ? "/es/aviso-legal/" : "/legal-notice/"}>{names.legal}</Link></p>
    </div>
  </Container></main>;
}
