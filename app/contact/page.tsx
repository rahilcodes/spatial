import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start a pilot or ask a question — Spatial Alphabet replies within one business day. Offices in Keller, TX and Hyderabad, India.",
  alternates: { canonical: "/contact" },
};

const OFFICES = [
  {
    key: "keller",
    office: SITE.offices.keller,
    mapSrc: "https://www.google.com/maps?q=32.9346,-97.2517&z=14&output=embed",
    mapTitle: "Map — Keller, Texas office",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=32.9346,-97.2517",
    qr: "/assets/gen/qr-keller.png",
  },
  {
    key: "hyderabad",
    office: SITE.offices.hyderabad,
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.0244859804698!2d78.3630982!3d17.4585421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910043006eab%3A0x7a6c6902d99fd6b!2sSpatial%20Alphabet%20.Int.Inc!5e0!3m2!1sen!2sin!4v1788584948427!5m2!1sen!2sin",
    mapTitle: "Map — Hyderabad, Telangana office",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=17.4585421,78.3630982",
    qr: "/assets/gen/qr-hyderabad.png",
  },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact Us", href: "/contact" },
        ]}
      />
      <PageHero
        eyebrow="CONTACT — WE REPLY WITHIN ONE BUSINESS DAY"
        title="Start the conversation."
        sub="Scope a pilot, ask about a service, or just describe the problem — we'll tell you honestly whether we're the right fit."
      />
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(56px,8vw,96px)]">
        <div className="wrap flex flex-wrap gap-[clamp(40px,6vw,90px)]">
          {/* Form */}
          <div className="relative min-w-0 flex-[1.4_1_360px]">
            <h2 className="display m-0 mb-2 text-[clamp(1.4rem,2.6vw,2rem)] font-semibold">
              Tell us what you&apos;re working on.
            </h2>
            <p className="m-0 mb-7 text-[14.5px] text-ink/65">
              We reply within one business day.
            </p>
            <ContactForm variant="light" idPrefix="contact" />
          </div>

          {/* Offices */}
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-9">
            {OFFICES.map(({ key, office, mapSrc, mapTitle, mapsLink, qr }) => (
              <div key={key}>
                <p className="m-0 mb-1.5 font-mono text-[11px] tracking-[.14em] text-accent-hover">
                  {office.label}
                </p>
                {office.address && (
                  <p className="m-0 mb-1.5 max-w-[40ch] text-[13.5px] leading-[1.5] text-ink/75">{office.address}</p>
                )}
                <p className="m-0 mb-3.5 font-mono text-[12.5px] text-ink/65">📍 {office.coords}</p>
                <div className="overflow-hidden rounded-[4px] border border-ink/15">
                  <iframe
                    src={mapSrc}
                    title={mapTitle}
                    width="100%"
                    height="220"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block border-0"
                  />
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="shrink-0" aria-label={`Scan or open directions to the ${office.city} office`}>
                    <Image
                      src={qr}
                      alt={`QR code linking to the ${office.city} office location on Google Maps`}
                      width={80}
                      height={80}
                      className="rounded-[3px] border border-ink/15 bg-white"
                    />
                  </a>
                  <div>
                    <p className="m-0 font-mono text-[10.5px] tracking-[.12em] text-ink/65">
                      SCAN FOR DIRECTIONS
                    </p>
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] font-semibold text-accent-hover"
                    >
                      Open in Google Maps ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <p className="m-0 mb-1 text-[15px]">
                <a href={`mailto:${SITE.email}`} className="font-semibold text-accent-hover">
                  {SITE.email}
                </a>
              </p>
              <p className="m-0 text-[15px]">
                <a href={SITE.phoneHref} className="font-semibold text-accent-hover">
                  {SITE.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
