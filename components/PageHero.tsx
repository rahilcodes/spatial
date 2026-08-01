import Image from "next/image";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  image?: { src: string; alt: string };
  children?: React.ReactNode;
};

/** Dark hero band shared by all subpages, with optional full-bleed imagery. */
export default function PageHero({ eyebrow, title, sub, image, children }: Props) {
  return (
    <section className="carto-dark relative overflow-hidden bg-navy-deepest px-[clamp(20px,5vw,48px)] pb-[clamp(56px,7vw,90px)] pt-[clamp(72px,9vw,120px)] text-bg-light">
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[.5] saturate-[1.05]"
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
