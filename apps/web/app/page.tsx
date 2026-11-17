import Link from "next/link";

export default function LanguageSelector() {
  return <main className="center"><div className="eyebrow">NOT AN ANGEL</div><h1>Choose your language</h1><p>Selecciona tu idioma para continuar.</p><nav className="language-links"><Link href="/en/">English</Link><Link href="/es/">Español</Link></nav></main>;
}
