import Image from "next/image";
import HeroFrame from "@/components/HeroFrame";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  image?: { src: string; alt: string };
  /** Pixels consumed above this banner (the fixed 72px header). */
  offset?: number;
  children?: React.ReactNode;
};

/**
 * Dark hero band shared by every interior page. Together with the trust-logos
 * strip (via HeroFrame) it fills exactly one viewport, so the banner and the
 * logos are visible without scrolling. Content stays vertically centered.
 */
export default function PageHero({ eyebrow, title, sub, image, offset = 72, children }: Props) {
  return (
    <HeroFrame offset={offset}>
      <section className="carto-dark relative flex min-h-0 flex-1 items-center overflow-hidden bg-navy-deepest px-[clamp(20px,5vw,48px)] py-[clamp(40px,6vh,80px)] text-bg-light">
        {image && (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-[.55] saturate-[1.1]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,22,.92)_0%,rgba(4,10,22,.62)_55%,rgba(4,10,22,.3)_100%)]"
            />
          </>
        )}
        <div className="wrap relative w-full">
          <p className="eyebrow m-0 mb-4 text-accent-light">{eyebrow}</p>
          <h1 className="display m-0 max-w-[18ch] text-[clamp(2rem,4vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.02em]">
            {title}
          </h1>
          {sub && (
            <p className="m-0 mt-5 max-w-[58ch] text-[clamp(15px,1.05vw,17px)] leading-[1.55] text-bg-light/80">
              {sub}
            </p>
          )}
          {children}
        </div>
      </section>
    </HeroFrame>
  );
}
