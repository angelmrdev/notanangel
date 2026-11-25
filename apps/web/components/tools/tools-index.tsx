import { publishedTools, toolPath, type ToolLocale } from "@/lib/tools/catalog";
import { ToolShell } from "./tool-shell";
import styles from "./tools.module.css";
export function ToolsIndex({locale}:{locale:ToolLocale}) {
 const es = locale === "es";
 return <ToolShell locale={locale} title={es ? "HERRAMIENTAS PARA LA MEZCLA." : "TOOLS FOR THE MIX."} description={es ? "Menos dudas. Más mezcla." : "Less guessing. More mixing."}>

 {(["tempo","harmony"] as const).map((category,index)=><section key={category} className={styles.group}><h2>0{index+1} / {category==="tempo"?(es ? "BPM Y TEMPO" : "BPM & TEMPO"):(es?"TONALIDAD Y MEZCLA ARMÓNICA":"KEY & HARMONY")}</h2><div className={styles.grid}>{publishedTools().filter(t=>t.category===category).map(t=><article className={styles.card} key={t.id}><span className={styles.code}>{t.id}</span><h3>{t[locale].title}</h3><p>{t[locale].description}</p><a href={toolPath(t,locale)}>{es ? "Abrir herramienta" : "Open tool"}</a></article>)}</div></section>)}
 </ToolShell>;
}
