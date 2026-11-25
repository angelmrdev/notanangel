import { ToolsIndex } from "@/components/tools/tools-index";
import { toolsIndexMetadata } from "@/lib/tools/index-metadata";
export const metadata = toolsIndexMetadata("en");
export default function Page() { return <ToolsIndex locale="en"/>; }
