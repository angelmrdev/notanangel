import type { Metadata } from "next";
import { LegalPage } from "../../../../components/layout/legal-page";

// Draft only. Remove noindex and add to sitemap registry AFTER legal verification.
export const metadata: Metadata = {
  title: "Aviso legal",
  robots: { index: false, follow: true },
  alternates: { canonical: "/es/aviso-legal/", languages: { en: "/legal-notice/", es: "/es/aviso-legal/" } },
};
export default function Page() { return <LegalPage locale="es" kind="legal" />; }
