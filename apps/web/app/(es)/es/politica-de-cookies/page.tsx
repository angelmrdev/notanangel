import type { Metadata } from "next";
import { LegalPage } from "../../../../components/layout/legal-page";

// Draft only. Remove noindex and add to sitemap registry AFTER legal verification.
export const metadata: Metadata = {
  title: "Política de cookies",
  robots: { index: false, follow: true },
  alternates: { canonical: "/es/politica-de-cookies/", languages: { en: "/cookie-policy/", es: "/es/politica-de-cookies/" } },
};
export default function Page() { return <LegalPage locale="es" kind="cookies" />; }
