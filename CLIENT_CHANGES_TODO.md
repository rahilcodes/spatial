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
