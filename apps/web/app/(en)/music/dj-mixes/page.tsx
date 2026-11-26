import { MusicLanding, musicMetadata } from "@/components/music/music-pages";
export const metadata = musicMetadata("en", "dj-mixes");
export default function Page() { return <MusicLanding locale="en" category="dj-mixes"/>; }
