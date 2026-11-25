import type { Metadata } from "next";
import { toolsBase, type ToolLocale } from "./catalog";
export function toolsIndexMetadata(locale: ToolLocale): Metadata {
 const es=locale==="es";
 const title=es?"Herramientas DJ gratuitas":"Free DJ Tools";
 const description=es?"Calcula BPM, pitch y tiempos de delay. Explora la rueda Camelot, convierte tonalidades y comprueba la compatibilidad armónica.":"Calculate BPM, pitch and delay times. Explore the Camelot wheel, convert musical keys and check harmonic compatibility.";
 return {title,description,alternates:{canonical:toolsBase(locale),languages:{en:toolsBase("en"),es:toolsBase("es"),"x-default":toolsBase("en")}},openGraph:{title,description,url:toolsBase(locale),type:"website",locale:es?"es_ES":"en_US",siteName:"Not an Angel"}};
}
