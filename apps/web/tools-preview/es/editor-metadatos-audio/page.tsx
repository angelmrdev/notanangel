import {ToolShell,ToolPanel} from '@/components/tools/tool-shell';
import {MetadataEditor} from '@/components/tools/metadata/metadata-editor';
export const metadata={title:'Editor de metadatos de audio',robots:{index:false,follow:false}};
export default function Page(){return <ToolShell locale="es" title="Editor de metadatos de audio" description="Edita etiquetas MP3 y WAV localmente."><ToolPanel><MetadataEditor locale="es"/></ToolPanel></ToolShell>;}
