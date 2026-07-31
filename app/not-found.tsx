import Link from "next/link";

export default function NotFound() {
  return (
    <section className="carto-dark flex min-h-[70vh] flex-col items-center justify-center bg-navy-deepest px-6 py-24 text-center text-bg-light">
      <p className="eyebrow m-0 mb-5 text-accent-light">404 — COORDINATES NOT FOUND</p>
      <h1 className="display m-0 max-w-[16ch] text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.02em]">
        This location isn&apos;t on our map.
      </h1>
      <p className="m-0 mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-bg-light/70">
        The page you&apos;re looking for moved or never existed. Head back to solid ground.
      </p>
      <Link href="/" className="btn-solid mt-9">
        Back to home →
      </Link>
    </section>
  );
}
