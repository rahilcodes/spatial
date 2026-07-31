type Props = {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  children?: React.ReactNode;
};

/** Dark hero band shared by all subpages. */
export default function PageHero({ eyebrow, title, sub, children }: Props) {
  return (
    <section className="carto-dark relative overflow-hidden bg-navy-deepest px-[clamp(20px,5vw,48px)] pb-[clamp(56px,7vw,90px)] pt-[clamp(72px,9vw,120px)] text-bg-light">
      <div className="wrap relative">
        <p className="eyebrow m-0 mb-5 text-accent-light">{eyebrow}</p>
        <h1 className="display m-0 max-w-[18ch] text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          {title}
        </h1>
        {sub && (
          <p className="m-0 mt-6 max-w-[58ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-bg-light/72">
            {sub}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
