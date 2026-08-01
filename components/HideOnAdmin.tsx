"use client";

import { usePathname } from "next/navigation";

/** Hides public site chrome (header/footer/pill) on /admin routes. */
export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
