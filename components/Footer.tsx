import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-navy-deepest px-[clamp(20px,5vw,48px)] pb-8 pt-[clamp(64px,9vw,110px)] text-bg-light">
      <div aria-hidden="true" className="carto-dark absolute inset-0" />
      <div className="wrap relative">
        <div className="mb-[clamp(48px,6vw,72px)] flex flex-wrap gap-[clamp(40px,6vw,90px)]">
          <div className="min-w-0 flex-[1.2_1_320px]">
            <p className="display m-0 mb-2 text-[26px] font-bold">
              Spatial <span className="text-accent">Alphabet</span>
            </p>
            <p className="eyebrow m-0 mb-9 text-bg-light/55">MAP. MODEL. DELIVER.</p>
            <div className="flex flex-col gap-6">
              <div>
                <p className="m-0 mb-1.5 font-mono text-[11px] tracking-[.14em] text-accent-light">
                  {SITE.offices.keller.label}
                </p>
                <p className="m-0 font-mono text-[12.5px] text-bg-light/65">
                  {SITE.offices.keller.coords}
                </p>
              </div>
              <div>
                <p className="m-0 mb-1.5 font-mono text-[11px] tracking-[.14em] text-accent-light">
                  {SITE.offices.hyderabad.label}
                </p>
                <p className="m-0 font-mono text-[12.5px] text-bg-light/65">
                  {SITE.offices.hyderabad.coords}
                </p>
              </div>
              <div>
                <p className="m-0 mb-1 text-[14.5px]">
                  <a href={`mailto:${SITE.email}`} className="hit-area transition-colors hover:text-accent-light">
                    {SITE.email}
                  </a>
                </p>
                <p className="m-0 text-[14.5px]">
                  <a href={SITE.phoneHref} className="hit-area transition-colors hover:text-accent-light">
                    {SITE.phone}
                  </a>
                </p>
              </div>
              <nav aria-label="Footer" className="flex flex-col gap-2 pt-2">
                <Link href="/who-we-are" className="hit-area w-max text-[14px] text-bg-light/70 transition-colors hover:text-accent-light">
                  Who We Are
                </Link>
                <Link href="/who-we-serve" className="hit-area w-max text-[14px] text-bg-light/70 transition-colors hover:text-accent-light">
                  Who We Serve
                </Link>
                <Link href="/news" className="hit-area w-max text-[14px] text-bg-light/70 transition-colors hover:text-accent-light">
                  News &amp; Blog
                </Link>
                <Link href="/careers" className="hit-area w-max text-[14px] text-bg-light/70 transition-colors hover:text-accent-light">
                  Careers
                </Link>
                <Link href="/downloads" className="hit-area w-max text-[14px] text-bg-light/70 transition-colors hover:text-accent-light">
                  Downloads
                </Link>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hit-area w-max text-[14px] text-bg-light/70 transition-colors hover:text-accent-light"
                >
                  LinkedIn ↗
                </a>
              </nav>
            </div>
          </div>
          <div className="min-w-0 flex-[1.6_1_360px]">
            <h2 className="display m-0 mb-2 text-[clamp(1.5rem,3vw,2.2rem)] font-semibold">
              <Link href="/contact" className="transition-colors hover:text-accent-light">
                Start the conversation.
              </Link>
            </h2>
            <p className="m-0 mb-7 text-[14.5px] text-bg-light/60">
              Fill the form below, or{" "}
              <Link href="/contact" className="text-accent-light underline underline-offset-2">
                open the full contact page
              </Link>
              . We reply within one business day.
            </p>
            <div className="relative">
              <ContactForm variant="dark" idPrefix="footer" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-x-7 gap-y-3 border-t border-bg-light/12 pt-5 text-[12.5px] text-bg-light/55">
          <span>© 2026 Spatial Alphabet. All rights reserved.</span>
          <span className="font-mono tracking-[.08em]">AI-ENABLED GEOSPATIAL &amp; ENGINEERING SOLUTIONS</span>
        </div>
      </div>
    </footer>
  );
}
