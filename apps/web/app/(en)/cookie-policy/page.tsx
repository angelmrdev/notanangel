import type { Metadata } from "next";
import { LegalPage } from "../../../components/layout/legal-page";

// Draft only. Remove noindex and add to sitemap registry AFTER legal verification.
export const metadata: Metadata = {
  title: "Cookie policy",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cookie-policy/", languages: { en: "/cookie-policy/", es: "/es/politica-de-cookies/" } },
};
export default function Page() { return <LegalPage locale="en" kind="cookies" />; }
