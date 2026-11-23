"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Build-time kill switch: leave OFF until legal notices and consent are approved.
const ENABLED = process.env.NEXT_PUBLIC_NAA_MONETAG_ENABLED === "true";
const IN_PAGE_PUSH = process.env.NEXT_PUBLIC_NAA_MONETAG_INPAGE_ENABLED !== "false";
const VIGNETTE = process.env.NEXT_PUBLIC_NAA_MONETAG_VIGNETTE_ENABLED !== "false";

function eligibleContent(pathname: string): boolean {
  return /^\/(?:es\/)?blog(?:\/|$)/.test(pathname) ||
    /^\/learn-to-dj(?:\/|$)/.test(pathname) ||
    /^\/es\/curso-dj(?:\/|$)/.test(pathname);
}

function addMonetagScript(id: string, src: string, zone: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.dataset.zone = zone;
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}

/** Only contextual formats are loaded here. Push permission and OnClick are excluded. */
export function MonetagManager({ advertisingAllowed }: { advertisingAllowed: boolean }) {
  const pathname = usePathname();
  useEffect(() => {
    if (!ENABLED || !advertisingAllowed || !eligibleContent(pathname ?? "")) return;
    if (IN_PAGE_PUSH) addMonetagScript("naa-monetag-inpage", "https://nap5k.com/tag.min.js", "12335453");
    if (VIGNETTE) addMonetagScript("naa-monetag-vignette", "https://n6wxm.com/vignette.min.js", "12335451");
    // Monetag scripts may persist after injection. Consent withdrawal reloads the page.
  }, [advertisingAllowed, pathname]);
  return null;
}
