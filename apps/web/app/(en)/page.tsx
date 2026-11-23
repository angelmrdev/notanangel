import type { Metadata } from "next";
import { HomeContent } from "../../components/layout/home-content";

export const metadata: Metadata = {
  title: "Not an Angel — DJ Culture, Learning & Music",
  description: "Discover DJ culture, learn to mix and explore music with Not an Angel.",
  alternates: { canonical: "/", languages: { en: "/", es: "/es/", "x-default": "/" } },
};
export default function Home() { return <HomeContent locale="en" />; }
