import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

type Variant = "primary" | "highlight" | "outline" | "ghost";
type Common = { children: ReactNode; variant?: Variant; className?: string };
type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonLinkProps = Common & { href: string };
function classes(variant: Variant, className: string) { return [styles.button, styles[variant], className].filter(Boolean).join(" "); }
export function Button(props: ButtonProps | ButtonLinkProps) {
  const { children, variant = "primary", className = "" } = props;
  if ("href" in props && typeof props.href === "string") {
    return <Link href={props.href} className={classes(variant, className)}>{children}</Link>;
  }
  const { href: _unused, ...rest } = props as ButtonProps & { href?: never };
  void _unused;
  return <button {...rest} className={classes(variant, className)}>{children}</button>;
}
