import { ToolsIndex } from "@/components/tools/tools-index";
import { toolsIndexMetadata } from "@/lib/tools/index-metadata";
export const metadata = toolsIndexMetadata("es");
export default function Page() { return <ToolsIndex locale="es"/>; }
