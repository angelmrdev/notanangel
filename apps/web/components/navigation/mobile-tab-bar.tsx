import Link from "next/link";
import styles from "./mobile-tab-bar.module.css";

type IconName = "home" | "blog" | "learn" | "about";
function TabIcon({ name }: { name: IconName }) {
  const common = { width: 23, height: 23, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  if (name === "home") return <svg {...common}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/></svg>;
  if (name === "blog") return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>;
  if (name === "learn") return <svg {...common}><path d="M3 6.5C6 5 9 5 12 7c3-2 6-2 9-.5v13c-3-1.5-6-1.5-9 .5-3-2-6-2-9-.5z"/><path d="M12 7v13"/></svg>;
  return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/></svg>;
}

export function MobileTabBar({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const home = es ? "/es/" : "/";
  const items: { icon: IconName; label: string; href: string; active?: boolean }[] = [
    { icon: "home", label: es ? "Inicio" : "Home", href: home, active: true },
    { icon: "blog", label: "Blog", href: es ? "/es/blog/" : "/blog/" },
    { icon: "learn", label: es ? "Aprender" : "Learn", href: es ? "/es/curso-dj/" : "/learn-to-dj/" },
    { icon: "about", label: es ? "Sobre mí" : "About", href: es ? "/es/sobre-mi/" : "/about/" },
  ];
  return <nav className={styles.bar} aria-label={es ? "Navegación inferior" : "Bottom navigation"}>
    {items.map(item => <Link className={`${styles.tab} ${item.active ? styles.active : ""}`} href={item.href} key={item.icon} aria-label={item.label}>
      <TabIcon name={item.icon}/><span>{item.label}</span>
    </Link>)}
  </nav>;
}
