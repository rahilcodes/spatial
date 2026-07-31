import type { Metadata } from "next";
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
    mapSrc: "https://www.google.com/maps?q=Keller,+TX,+USA&output=embed",
    mapTitle: "Map — Keller, Texas office",
  },
  {
    key: "hyderabad",
    office: SITE.offices.hyderabad,
    mapSrc: "https://www.google.com/maps?q=Hyderabad,+Telangana,+India&output=embed",
    mapTitle: "Map — Hyderabad, Telangana office",
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
            {OFFICES.map(({ key, office, mapSrc, mapTitle }) => (
              <div key={key}>
                <p className="m-0 mb-1.5 font-mono text-[11px] tracking-[.14em] text-accent-hover">
                  {office.label}
                </p>
                <p className="m-0 mb-3.5 font-mono text-[12.5px] text-ink/65">{office.coords}</p>
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
