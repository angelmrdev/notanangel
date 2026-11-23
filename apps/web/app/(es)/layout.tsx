import type { Metadata } from "next";
import "../globals.css";
import { SiteShell } from "../../components/layout/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://notanangeldj.com"),
  title: { default: "Not an Angel", template: "%s | Not an Angel" },
  description: "Not an Angel — Cultura DJ, aprendizaje y música.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><SiteShell locale="es">{children}</SiteShell></body></html>;
}
