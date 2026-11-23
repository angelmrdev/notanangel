"use client";

import Link from "next/link";

export function LanguageSwitcher({ locale }: { locale: "en" | "es" }) {
  function rememberLanguage(value: "en" | "es") {
    try { window.localStorage.setItem("naa.preferredLocale", value); } catch { /* Storage can be unavailable. Navigation still works. */ }
  }

  return (
    <nav aria-label={locale === "es" ? "Idioma" : "Language"} className="language-switcher">
      <Link href="/" hrefLang="en" lang="en" aria-current={locale === "en" ? "page" : undefined} onClick={() => rememberLanguage("en")}>EN</Link>
      <Link href="/es/" hrefLang="es" lang="es" aria-current={locale === "es" ? "page" : undefined} onClick={() => rememberLanguage("es")}>ES</Link>
    </nav>
  );
}
