import { getPublishedMusic } from "@/lib/music/repository";
import { SiteHeader } from "../navigation/site-header";
import { SiteFooter } from "../navigation/site-footer";
import { MobileTabBar } from "../navigation/mobile-tab-bar";
import { ConsentManager } from "../consent/consent-manager";

export function SiteShell({ locale, children }: { locale: "en" | "es"; children: React.ReactNode }) {
  const musicVisible=getPublishedMusic().length>0;
  return <><a className="skip-link" href="#main-content">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a><SiteHeader musicVisible={musicVisible} locale={locale} />{children}<SiteFooter musicVisible={musicVisible} locale={locale} /><MobileTabBar musicVisible={musicVisible} locale={locale}/><ConsentManager locale={locale}/></>;
}
