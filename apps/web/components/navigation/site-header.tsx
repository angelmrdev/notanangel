"use client";

import Link from "next/link";
import { LanguageSwitcher } from "../language-switcher";
import { BrandLogo } from "../brand/brand-logo";
import styles from "./site-header.module.css";

export function SiteHeader({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const home = es ? "/es/" : "/";
  const nav = [
    { label: es ? "Inicio" : "Home", href: home },
    { label: "Blog", href: es ? "/es/blog/" : "/blog/" },
    { label: es ? "Aprende DJ" : "Learn to DJ", href: es ? "/es/curso-dj/" : "/learn-to-dj/" },
    { label: es ? "Sobre mí" : "About", href: es ? "/es/sobre-mi/" : "/about/" },
  ];
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <BrandLogo locale={locale} />
        <nav className={styles.desktop} aria-label={es ? "Navegación principal" : "Main navigation"}>
          {nav.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className={styles.actions}><LanguageSwitcher locale={locale} /></div>
      </div>
    </header>
  );
}
