import type { Metadata } from "next";
import { LegalPage } from "../../../../components/layout/legal-page";

// Draft only. Remove noindex and add to sitemap registry AFTER legal verification.
export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: true },
  alternates: { canonical: "/es/politica-de-privacidad/", languages: { en: "/privacy-policy/", es: "/es/politica-de-privacidad/" } },
};
export default function Page() { return <LegalPage locale="es" kind="privacy" />; }
