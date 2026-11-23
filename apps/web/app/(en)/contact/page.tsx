import type { Metadata } from "next";
import { ContactPage } from "../../../components/layout/contact-page";

export const metadata: Metadata = {
  title: "Contact Not an Angel",
  description: "Contact Not an Angel for DJ bookings, collaborations and general enquiries.",
  alternates: { canonical: "/contact/", languages: { en: "/contact/", es: "/es/contacto/" } },
};

export default function Page() { return <ContactPage locale="en" />; }
