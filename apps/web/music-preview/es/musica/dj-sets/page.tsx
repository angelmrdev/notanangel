import { MusicLanding, musicMetadata } from "@/components/music/music-pages";
export const metadata = musicMetadata("es", "dj-sets");
export default function Page() { return <MusicLanding locale="es" category="dj-sets"/>; }
