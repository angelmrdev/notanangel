import Link from "next/link";
import { notFound } from "next/navigation";

const content = {
  en: { kicker: "THE DJ LAB", title: "Not an Angel", subtitle: "A home for DJ culture, learning and music.", learn: "Learn to DJ", journal: "Journal", pending: "The platform is taking shape. Editorial content is coming next." },
  es: { kicker: "THE DJ LAB", title: "Not an Angel", subtitle: "Un espacio para la cultura DJ, el aprendizaje y la música.", learn: "Aprende DJ", journal: "Journal", pending: "Estamos preparando la plataforma. Próximamente incorporaremos el contenido editorial." },
} as const;

export function generateStaticParams() { return [{ locale: "en" }, { locale: "es" }]; }

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") notFound();
  const t = content[locale];
  return <main className="shell"><header className="topbar"><Link className="brand" href={`/${locale}/`}>NOT AN ANGEL <span>◌</span></Link><nav aria-label="Language"><Link href="/en/">EN</Link><Link href="/es/">ES</Link></nav></header><section className="hero"><div className="eyebrow">{t.kicker}</div><h1>{t.title}</h1><p className="subtitle">{t.subtitle}</p><div className="pills"><span>{t.learn}</span><span>{t.journal}</span></div><p className="muted">{t.pending}</p></section><footer>© Not an Angel · M01-A</footer></main>;
}
