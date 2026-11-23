import type { Metadata } from "next";
import { AboutPage } from "../../../components/layout/about-page";

export const metadata: Metadata = {
  title: "About Not an Angel",
  description: "Meet the person behind Not an Angel: DJ culture, music, pop and creative learning.",
  alternates: { canonical: "/about/", languages: { en: "/about/", es: "/es/sobre-mi/" } },
};

export default function Page() { return <AboutPage locale="en" />; }
