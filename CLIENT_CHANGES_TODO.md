# Client Change Request — Aug 2026 (3 DOCX + email from Ramesh Reddy)

## A. Content replacement from DOCX
- [x] A1. "What We Deliver" → restructured to **4 pillars** (nested groups) with new detailed content
- [x] A2. "Whom We Serve" → 5 sectors with new narrative copy + captions
- [x] A3. Rearranged heads on Home + What We Deliver + Whom We Serve (4-pillar / 5-sector order)

## B. Logos (item 5)
- [x] B1. 7 client logos in trust strip (Sonata, 7EVN, ComTek, Tiger Analytics, Tech Mahindra, Shaft, NAM)

## C. Pending items
- [x] C1. Landing page auto-sliding — hover-pause removed last round; will re-verify
- [x] C2. Core Values, Mission & Vision — present in Who We Are; will re-verify
- [x] C3. OTP email verification — gates downloads (request→verify→download) and job applications (verified 200 / unverified 403). Dev-code fallback until SMTP is set.

## D. Hosting-time (do/prepare anyway)
- [x] D1. Free-tier analytics (Microsoft Clarity) — gated on env; verify
- [x] D2. Self-uploading Blogs, Jobs & Downloads — admin panel; verify
- [x] D3. Careers CV downloading + relevant picture (globe image); verify

## E. Client-provided imagery
- [x] E1. 12 WWD diagrams placed on service pages (hero/side/group images)
- [x] E2. 2 WWS field photos on Electrical Utilities + Telecommunications sectors

## Verification — ALL PASS
- [x] Build clean; all pages 200; 4 service slugs generate
- [x] No mobile overflow at 390/768; contrast clean (0 low-contrast) on restructured pages
- [x] Hero autoplay advances; 7 logos + all client images load (200)
- [x] OTP download gate: no-grant 403, request→devCode, wrong 400, verify 200, download redirects through gate
- [x] OTP careers gate: verified submit 200, unverified submit 403
- [x] Dropdown nav + contact options = 4 pillars; Mission/Vision/Values present

## Round 5 — 5 Sep 2026 (hosting migration + one-screen hero/logos)

- [x] Migrated storage to Neon Postgres (`lib/db.ts`, async `pg` pool) and Vercel Blob private store (`lib/blob.ts`) so admin content, leads, CVs and download files persist on Vercel. SQLite removed.
- [x] OTP emails and lead notifications send through Mailjet SMTP; leads notify `LEADS_NOTIFY_EMAIL`.
- [x] Trust-logo strip: full colour (no grayscale/fade), larger logos, compact band.
- [x] One-screen frame (`components/HeroFrame.tsx`): header + hero slider + logo strip fit exactly one viewport on the home page; header + breadcrumb + banner + logo strip fit one viewport on every interior banner page (Who We Are, Who We Serve, Services, News, Careers, Downloads, Contact). Verified at 390 / 768 / 1440 px, no clipping, no horizontal overflow.
- [x] Home carousel arrows moved to the bottom corners on phones so they no longer cover the slide text.
- [x] Resilience: home page news widget falls back to seed articles if the database is unreachable; DB connects time out at 8s instead of hanging.
- [ ] Client to supply: real Hyderabad office address (Koti map), blog/download content via /admin.
- [x] Round 5b: trust-logo band is now one short row (heading at left, logos scrolling beside it; ~66px tall at 1900×830 instead of ~118px). Hero slider type and spacing scaled down (title 61px instead of 77px at 1900 wide, tighter pill/sub/tag spacing) so the first screen breathes at 100% zoom. Interior banner titles matched. Verified at 1900×830, 1440×900, 390×844.
- [x] Round 5c: visible "HOME / PAGE" breadcrumb line removed from every page (BreadcrumbList JSON-LD kept for SEO); banner frame offset adjusted so header + banner + logos still fill one screen. Slow-navigation fix: database-backed sections (home news widget, news list, careers roles + form, downloads grid) now stream behind Suspense with skeleton placeholders, so clicking Home or any menu item commits in well under a second even when the database is slow (measured 0.7s vs 3.9s before).
