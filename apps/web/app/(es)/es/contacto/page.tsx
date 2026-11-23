import type { Metadata } from "next";
import { ContactPage } from "../../../../components/layout/contact-page";

export const metadata: Metadata = {
  title: "Contacto de Not an Angel",
  description: "Contacto para contrataciones DJ, colaboraciones y consultas generales de Not an Angel.",
  alternates: { canonical: "/es/contacto/", languages: { en: "/contact/", es: "/es/contacto/" } },
};

export default function Page() { return <ContactPage locale="es" />; }
