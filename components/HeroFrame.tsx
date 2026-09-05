import TrustMarquee from "@/components/TrustMarquee";

/**
 * First-screen frame: the banner (its `children`, which must be `flex-1 min-h-0`)
 * plus the trust-logos strip, together filling exactly one viewport below the
 * fixed 72px header — so the logos are always visible without scrolling.
 *
 * `offset` = pixels consumed above this frame (the fixed 72px header on every page,
 * now that the breadcrumb bar is gone), so header + banner + logos = 100svh.
 */
export default function HeroFrame({
  children,
  offset = 72,
}: {
  children: React.ReactNode;
  offset?: number;
}) {
  return (
    <div className="flex flex-col" style={{ height: `calc(100svh - ${offset}px)`, minHeight: 460 }}>
      {children}
      <TrustMarquee />
    </div>
  );
}
