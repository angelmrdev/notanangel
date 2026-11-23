import type { Metadata } from "next";
import "../globals.css";
import { SiteShell } from "../../components/layout/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://notanangeldj.com"),
  title: { default: "Not an Angel", template: "%s | Not an Angel" },
  description: "Not an Angel — DJ culture, learning and music.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteShell locale="en">{children}</SiteShell></body></html>;
}
