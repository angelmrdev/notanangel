"use client";

import { useEffect, useState } from "react";
import styles from "./consent-manager.module.css";
import { MonetagManager } from "../monetization/monetag-manager";

type Preferences = { analytics: boolean; advertising: boolean };
const KEY = "naa-consent-v1";
const GTM_ID = "GTM-NRHRDHQF";
// Deliberately off until legal disclosures and GTM container are reviewed.
const GTM_ENABLED = process.env.NEXT_PUBLIC_NAA_GTM_ENABLED === "true";

function readConsent(): Preferences | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) return null;
    const obj = value as Record<string, unknown>;
    if (typeof obj.analytics !== "boolean" || typeof obj.advertising !== "boolean") return null;
    return { analytics: obj.analytics, advertising: obj.advertising };
  } catch { return null; }
}

function setGoogleConsent(preferences: Preferences) {
  const win = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  win.dataLayer = win.dataLayer || [];
  win.gtag = win.gtag || function (...args: unknown[]) { win.dataLayer?.push(args); };
  win.gtag("consent", "update", {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function enableGtm() {
  if (!GTM_ENABLED || document.getElementById("naa-gtm")) return;
  const win = window as Window & { dataLayer?: unknown[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.id = "naa-gtm";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

export function ConsentManager({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const [ready, setReady] = useState(false);
  const [prefs, setPrefs] = useState<Preferences | null>(null);
  const [editing, setEditing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    // GTM is only eligible after consent. Advertising tags must NOT be placed
    // in this container until separately gated by the advertising preference.
    if (stored?.analytics) { setGoogleConsent(stored); enableGtm(); }

    // Defer React state hydration to a microtask, avoiding synchronous
    // setState calls inside the effect (react-hooks/set-state-in-effect).
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setPrefs(stored);
      setAnalytics(stored?.analytics ?? false);
      setAdvertising(stored?.advertising ?? false);
      setReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  function save(next: Preferences) {
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
    const previous = prefs;
    setPrefs(next);
    setEditing(false);
    setGoogleConsent(next);
    if (next.analytics && !previous?.analytics) enableGtm();
    // A previously loaded GTM script cannot be reliably unloaded.
    // Reload to enforce withdrawal of consent before any further page tracking.
    if ((previous?.analytics && !next.analytics && GTM_ENABLED) || (previous?.advertising && !next.advertising)) window.location.reload();
  }

  if (!ready) return null;
  return <>
    <MonetagManager advertisingAllowed={prefs?.advertising === true} />
    {prefs && !editing && <button type="button" className={styles.manage} onClick={() => setEditing(true)}>{es ? "Privacidad" : "Privacy settings"}</button>}
    {(!prefs || editing) && <section className={styles.panel} role="dialog" aria-modal="false" aria-label={es ? "Preferencias de privacidad" : "Privacy preferences"}>
      <h2>{es ? "Tu privacidad" : "Your privacy"}</h2>
      <p>{es ? "Usamos almacenamiento necesario para recordar tu elección. La analítica y la publicidad opcionales requieren tu permiso. Puedes cambiarlo cuando quieras." : "We use essential storage to remember your choice. Optional analytics and advertising require your permission. You can change your choice at any time."}</p>
      {editing && <div className={styles.options}>
        <label><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} /> {es ? "Analítica" : "Analytics"}</label>
        <label><input type="checkbox" checked={advertising} onChange={e => setAdvertising(e.target.checked)} /> {es ? "Publicidad" : "Advertising"}</label>
      </div>}
      <div className={styles.actions}>
        <button type="button" onClick={() => save({ analytics: false, advertising: false })}>{es ? "Rechazar opcionales" : "Reject optional"}</button>
        <button type="button" onClick={() => editing ? save({ analytics, advertising }) : setEditing(true)}>{editing ? (es ? "Guardar selección" : "Save selection") : (es ? "Configurar" : "Customize")}</button>
        <button type="button" onClick={() => save({ analytics: true, advertising: true })}>{es ? "Aceptar todo" : "Accept all"}</button>
      </div>
    </section>}
  </>;
}
