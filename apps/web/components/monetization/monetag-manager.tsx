"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { adPolicy } from "@/lib/monetization/policy.mjs";

const ENABLED = process.env.NEXT_PUBLIC_NAA_MONETAG_ENABLED === "true";
const IN_PAGE_PUSH = process.env.NEXT_PUBLIC_NAA_MONETAG_INPAGE_ENABLED !== "false";
const VIGNETTE = process.env.NEXT_PUBLIC_NAA_MONETAG_VIGNETTE_ENABLED !== "false";
const ONCLICK = process.env.NEXT_PUBLIC_NAA_MONETAG_ONCLICK_ENABLED === "true";

function addMonetagScript(id: string, src: string, zone: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.dataset.zone = zone;
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}

// Third-party listeners cannot reliably be removed. Keep each advertising
// document isolated, including transitions between Vignette and OnClick.
export function MonetagManager({ advertisingAllowed }: { advertisingAllowed: boolean }) {
  const pathname = usePathname();
  useEffect(() => {
    if (!ENABLED || !advertisingAllowed) return;
    const current = window.location.pathname;
    const previous = document.documentElement.dataset.naaAdPath;
    if (previous && previous !== current) { window.location.reload(); return; }
    document.documentElement.dataset.naaAdPath = current;
    const policy = adPolicy(current, !!document.querySelector('[data-naa-authorized-downloads="true"]'), {
      enabled: ENABLED, advertisingAllowed, inpage: IN_PAGE_PUSH, vignette: VIGNETTE, onclick: ONCLICK,
    });
    if (policy.inpage) addMonetagScript("naa-monetag-inpage", "https://nap5k.com/tag.min.js", "12335453");
    if (policy.vignette) addMonetagScript("naa-monetag-vignette", "https://n6wxm.com/vignette.min.js", "12335451");
    if (policy.onclick) addMonetagScript("naa-monetag-onclick", "https://al5sm.com/tag.min.js", "12335456");
    function navigate(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      event.preventDefault();
      window.location.assign(url.href);
    }
    function historyChanged() {
      if (window.location.pathname !== current) window.location.reload();
    }
    document.addEventListener('click', navigate, true);
    window.addEventListener('popstate', historyChanged);
    return () => {
      document.removeEventListener('click', navigate, true);
      window.removeEventListener('popstate', historyChanged);
    };
  }, [advertisingAllowed, pathname]);
  return null;
}
