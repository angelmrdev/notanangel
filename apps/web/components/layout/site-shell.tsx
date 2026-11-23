import { SiteHeader } from "../navigation/site-header";
import { SiteFooter } from "../navigation/site-footer";
import { MobileTabBar } from "../navigation/mobile-tab-bar";
import { ConsentManager } from "../consent/consent-manager";

export function SiteShell({ locale, children }: { locale: "en" | "es"; children: React.ReactNode }) {
  return <><a className="skip-link" href="#main-content">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a><SiteHeader locale={locale} />{children}<SiteFooter locale={locale} /><MobileTabBar locale={locale}/><ConsentManager locale={locale}/></>;
}
