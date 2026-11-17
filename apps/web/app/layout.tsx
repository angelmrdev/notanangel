import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Not an Angel", template: "%s | Not an Angel" },
  description: "Not an Angel — DJ culture, learning and music.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
