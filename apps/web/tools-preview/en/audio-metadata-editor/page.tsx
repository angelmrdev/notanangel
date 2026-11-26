import {ToolShell,ToolPanel} from '@/components/tools/tool-shell';
import {MetadataEditor} from '@/components/tools/metadata/metadata-editor';
export const metadata={title:'Audio Metadata Editor',robots:{index:false,follow:false}};
export default function Page(){return <ToolShell locale="en" title="Audio Metadata Editor" description="Edit local MP3 and WAV tags."><ToolPanel><MetadataEditor locale="en"/></ToolPanel></ToolShell>;}
