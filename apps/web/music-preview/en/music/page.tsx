import { MusicLanding, musicMetadata } from "@/components/music/music-pages";
export const metadata = musicMetadata("en");
export default function Page() { return <MusicLanding locale="en"/>; }
