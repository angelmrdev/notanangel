import type { Metadata } from "next";
import { HomeContent } from "../../../components/layout/home-content";

export const metadata: Metadata = {
  title: "Not an Angel — Cultura DJ, aprendizaje y música",
  description: "Descubre la cultura DJ, aprende a mezclar y explora la música con Not an Angel.",
  alternates: { canonical: "/es/", languages: { en: "/", es: "/es/", "x-default": "/" } },
};
export default function SpanishHome() { return <HomeContent locale="es" />; }
