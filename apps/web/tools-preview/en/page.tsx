import type { Metadata } from "next";
import { ToolsIndex } from "@/components/tools/tools-index";
export const metadata: Metadata = {title: "Tools", robots: {index:false,follow:false}};
export default function Page() {return <ToolsIndex locale="en"/>;}
