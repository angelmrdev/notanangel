import data from "@/config/tools-catalog.json";
export type ToolLocale = "en" | "es";
export type ToolCategory = "tempo" | "harmony";
export type Tool = { id: string; category: ToolCategory; status: "draft" | "published"; en: ToolCopy; es: ToolCopy };
export type ToolCopy = { slug: string; title: string; description: string };
export const tools = data as Tool[];
export const toolsBase = (locale: ToolLocale) => locale === "es" ? "/es/herramientas/" : "/tools/";
export const toolPath = (tool: Tool, locale: ToolLocale) => `${toolsBase(locale)}${tool[locale].slug}/`;
export const publishedTools = () => tools.filter(tool => tool.status === "published");
