import type { ReactNode } from "react";
import Link from "next/link";
import { toolsBase, type ToolLocale } from "@/lib/tools/catalog";
import styles from "./tools.module.css";
export function ToolShell({locale,title,description,children}:{locale:ToolLocale;title:string;description:string;children:ReactNode}) {
 return <main id="main-content" className={styles.main}><header className={styles.hero}><span className={styles.kicker}>{locale === "es" ? "HERRAMIENTAS DJ GRATUITAS" : "FREE DJ UTILITIES"}</span><h1>{title}</h1><p>{description}</p></header>{children}<p><Link href={toolsBase(locale)}>{locale === "es" ? "Todas las herramientas DJ" : "All DJ tools"}</Link></p></main>;
}
export function ToolPanel({children}:{children:ReactNode}) { return <section className={styles.panel}>{children}</section>; }
export function ToolResult({label,children}:{label:string;children:ReactNode}) { return <div className={styles.result} aria-live="polite"><span>{label}</span><strong>{children}</strong></div>; }
