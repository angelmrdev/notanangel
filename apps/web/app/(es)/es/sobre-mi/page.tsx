import type { Metadata } from "next";
import { AboutPage } from "../../../../components/layout/about-page";

export const metadata: Metadata = {
  title: "Sobre Not an Angel",
  description: "Conoce el proyecto Not an Angel: cultura DJ, música, pop y aprendizaje creativo.",
  alternates: { canonical: "/es/sobre-mi/", languages: { en: "/about/", es: "/es/sobre-mi/" } },
};

export default function Page() { return <AboutPage locale="es" />; }
