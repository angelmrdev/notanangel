import type { Metadata } from "next";
import { LegalPage } from "../../../components/layout/legal-page";

// Draft only. Remove noindex and add to sitemap registry AFTER legal verification.
export const metadata: Metadata = {
  title: "Legal notice",
  robots: { index: false, follow: true },
  alternates: { canonical: "/legal-notice/", languages: { en: "/legal-notice/", es: "/es/aviso-legal/" } },
};
export default function Page() { return <LegalPage locale="en" kind="legal" />; }
