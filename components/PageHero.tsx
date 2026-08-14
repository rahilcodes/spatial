import Image from "next/image";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  image?: { src: string; alt: string };
  children?: React.ReactNode;
};

/**
 * Dark hero band shared by every subpage. Uniform height, padding, and
 * left-aligned/vertically-centered content so all page banners match — with or
 * without a background image.
 */
export default function PageHero({ eyebrow, title, sub, image, children }: Props) {
  return (
    <section className="carto-dark relative flex min-h-[clamp(300px,42vh,440px)] items-center overflow-hidden bg-navy-deepest px-[clamp(20px,5vw,48px)] py-[clamp(56px,7vw,88px)] text-bg-light">
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
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(4,10,22,.8))]"
          />
        </>
      )}
      <div className="wrap relative">
        <p className="eyebrow m-0 mb-5 text-accent-light">{eyebrow}</p>
        <h1 className="display m-0 max-w-[18ch] text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          {title}
        </h1>
        {sub && (
          <p className="m-0 mt-6 max-w-[58ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-bg-light/80">
            {sub}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
