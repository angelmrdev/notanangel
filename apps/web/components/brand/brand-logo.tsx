import Image from "next/image";
import Link from "next/link";
import styles from "./brand-logo.module.css";

type Props = { locale: "en" | "es"; placement?: "header" | "footer" };

export function BrandLogo({ locale, placement = "header" }: Props) {
  return (
    <Link href={locale === "es" ? "/es/" : "/"} className={`${styles.link} ${placement === "footer" ? styles.footer : styles.header}`} aria-label={locale === "es" ? "Not an Angel — Inicio" : "Not an Angel — Home"}>
      <Image src="/brand/logo-primary.webp" alt="Not an Angel" width={1500} height={600} unoptimized priority={placement === "header"} className={styles.image} />
    </Link>
  );
}
