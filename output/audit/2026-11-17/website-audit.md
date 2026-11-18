# Make India Foundation - website audit and remediation brief

**Site:** https://makeindiafoundation.org/  
**Audit date:** 17 November 2026, approximately 10:40-11:02 IST  
**Status:** Audit and documentation only. No website source, DNS, hosting configuration, email settings or production deployments were changed.  
**Reviewed checkout:** `fe4f4803c15cf31963a80c64ff43bae4982c927a` (pre-existing local deletions of tracked dependencies and unrelated changes preserved).

## 1. Executive summary

The user's reported low performance, large payload, missing button names, contrast, heading and landmark findings are reproducible. The problems are fixable without a visual redesign.

| Verified measurement | Mobile | Desktop |
|---|---:|---:|
| Lighthouse performance | 36/100 | 74/100 |
| Lighthouse accessibility | 87/100 | 93/100 |
| Lighthouse best practices | 96/100 | 96/100 |
| Lighthouse SEO | 75/100 | 75/100 |
| First Contentful Paint | 5.9 s | 1.4 s |
| Largest Contentful Paint | 8.2 s | 2.1 s |
| Total Blocking Time | 1,280 ms | 270 ms |
| Cumulative Layout Shift | approximately 0 | 0.002 |
| Homepage network payload | 7,012 KiB | 7,012 KiB |

**SecurityHeaders grade: F.** All six headers checked by that service are missing. The scan was verified at 10:48:54 IST, 17 November 2026. This grade concerns response headers, not proof that the site is compromised.

Lighthouse 12.8.2 was run locally against the public homepage with Chrome, cold storage, simulated mobile throttling and a 4x CPU slowdown. Mobile capture: 10:44:36 IST; desktop capture: 10:52:30 IST. These are single-run lab measurements, not real-user Core Web Vitals. A score of 34 can vary to 36 between runs; it is not a search ranking. Automated accessibility scores do not establish WCAG conformance.

### What the linked tools showed

- **SecurityHeaders:** live report successfully opened in the browser, grade F; raw HTTP response independently verified.
- **AccessibilityChecker:** the supplied report is behind a human-verification challenge. No CAPTCHA was bypassed and its current score was not claimed. Equivalent checks were run independently using axe-core 4.10.3 and Lighthouse.
- **MXToolbox:** MX lookup completed. DNS records exist and a DMARC quarantine/reject policy is enabled. BIMI was not published; this is optional branding, not a website performance or accessibility failure.
- **Google PageSpeed public API:** returned HTTP 429 quota exhaustion. A fresh local Lighthouse run was used instead; no paid API quota was purchased.

## 2. Priority findings and exact locations

P1 = major, address before the next release. P2 = improve in the next pass. Source-based findings are explicitly distinguished from rendered results.

### A01 [P1] Icon-only buttons lack accessible names

**Confirmed live:** one mobile-menu button on the homepage at 390 x 844; opening registration exposes a second unnamed close button. Desktop hides the mobile control, explaining why a desktop-only test can miss it.

**Locations:**
- `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/Navigation.js:287-292`
- `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/CommonUI.js:285-289`
- Additional source finding: `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/pages/CompetitionCategoriesPage.js:275-280`

**Fix:** give buttons contextual names (`aria-label="Open navigation menu"`, state-dependent "Close navigation menu", "Close registration", "Close category details"). Use `type="button"` for non-submit buttons. Expose menu `aria-expanded`, connect `aria-controls` to a stable menu ID, and keep decorative SVGs `aria-hidden`. Existing hero next/previous/dot/scroll buttons already have names: preserve them. Relevant standard: WCAG 4.1.2, Name, Role, Value.

### A02 [P1] Normal-sized text does not meet 4.5:1 contrast

**Confirmed live homepage:** 26 failing elements in the settled axe snapshot, including 13 instances of muted text; counts can change with animation and viewport. Another 65 contrast checks were inconclusive on the desktop capture and need manual review, not an automatic pass or fail.

| Example rendered foreground/background | Measured ratio | Required for normal text |
|---|---:|---:|
| Muted brown `#755c57` / beige `#e7d6c5` | 4.32:1 | 4.5:1 |
| Primary brown `#97624e` / beige `#e7d6c5` | 3.55:1 | 4.5:1 |
| Primary brown `#97624e` / darker beige `#dfcab9` | 3.18:1 | 4.5:1 |
| Badge orange `#cf6c08` / white | 3.61:1 | 4.5:1 |
| Brand orange `#f97316` / pale card `#ede0d4` | 2.16:1 | 4.5:1 |

**Locations:** semantic tokens in `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/styles.css:6-18`; rendered uses include Mission, CompetitionSection, TrendingNews and Footer. Source inspection also identifies risky white text on the secondary/teal button colors; those combinations require rendered state testing.

**Fix:** darken foreground tokens and orange small text, or change backgrounds. Separate decorative brand colors from accessible text colors. Rebuild generated CSS after token edits. Test every hover/focus state and every hero slide with actual images and transparent overlays. WCAG 1.4.3 requires 4.5:1 for normal text and 3:1 for large text (at least 24 CSS px regular or about 18.7 px bold). Do not round 4.48 up to a passing 4.5.

### A03 [P1] Main-content landmark is missing on the homepage

**Confirmed live:** the homepage exposes `nav` and `footer`, but no `main`; axe reported 49 content nodes outside landmarks on desktop and 54 on mobile. The Contact route already has a main landmark and must not receive a nested second main.

**Location:** `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/pages/IndexPage.js:24-32`. Source review finds similar gaps on Workshop, Makers Space, ARISE/IGNITE and several competition routes.

**Fix:** put each route's unique body content within one `<main id="main-content">`, keeping Navigation and Footer outside it. Add a keyboard-visible skip link. Keep nav labels meaningful if multiple navigation regions are introduced. Landmark warnings are best-practice diagnostics; map each underlying problem to the relevant WCAG 1.3.1/2.4.1 requirement rather than treating every axe region count as an independent legal violation.

### A04 [P1] Headings do not provide a coherent outline

**Confirmed live:** axe flagged the first Science Simplified card heading and the footer "Join Our Community" heading. The homepage DOM contains three carousel H1s plus a Science Simplified H1. The Contact route has no H1. Multiple H1s alone are not automatically a WCAG failure, but the hidden-slide content and skipped levels make navigation confusing.

**Locations:** `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/Hero.js:87-116`; `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/ScienceSimplified.js:44,83`; `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/Footer.js:62,181,210,233`; `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/Contact.js:179-181`.

**Fix:** one descriptive primary H1 per route; H2 for major sections, H3 for child cards. Preserve visual size with classes, not heading rank. Hide inactive carousel content from assistive technology and disable its focusable descendants with `inert` or conditional rendering; `aria-hidden` alone does not prevent keyboard focus.

### A05 [P1] Form labels are not associated with controls

**Confirmed live:** registration has three unnamed selects (Grade, Track, Stream); Contact has an unnamed Interest Category select. The five Contact fields all have zero associated label elements. Placeholders can let an automated check infer a name, but do not replace persistent labels. Required asterisks are present while Contact inputs lack native `required` attributes.

**Locations:** `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/CommonUI.js:299-346`; `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/Contact.js:202-255`; `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/Footer.js:240-249`.

**Fix:** unique control IDs and matching React `htmlFor` labels; appropriate `required`, `autocomplete`, input types and instructions. Associate errors with `aria-describedby`, mark invalid controls and announce submission status with a polite live region. Do not rely exclusively on JavaScript alerts.

### A06 [P1] Registration modal does not behave as an accessible dialog

**Confirmed live:** opening registration left keyboard focus on the background opener; no `dialog` element or `role="dialog"` exists; pressing Escape did not close the overlay. It also remained open while navigating to Contact. Focus trapping/restoration should be verified after remediation; no full screen-reader test was run.

**Location:** `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/CommonUI.js:285-366`. Similar category-modal concerns are source-based at `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/pages/CompetitionCategoriesPage.js:270-334`.

**Fix:** prefer native `<dialog>` opened with `showModal()`, or a complete accessible dialog implementation: labelled title, modal semantics, initial focus, contained tab order, Escape dismissal, inert background and focus restoration. Do not nest focusable links in buttons; Contact axe also flagged a nested-interactive control.

### A07 [P1] Additional keyboard and motion gaps (source-confirmed, manual validation needed)

Category cards call `onClick` on the shared div-based Card component: `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/pages/CompetitionCategoriesPage.js:214-217`. Use a native button/link. Dropdowns, tabs and accordions need their state/control relationships: `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/Navigation.js:69-99`; `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/CommonUI.js:185-215`.

The hero rotates every four seconds with no pause control: `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/Hero.js:36-41`. Add pause/resume for auto-updating content, pause on interaction where appropriate, and respect reduced-motion preference. Keep an intentional static or reduced-motion equivalent; do not disable essential feedback globally. Validate against WCAG 2.1.1 and 2.2.2, as applicable.

### P01 [P1] The homepage downloads 7,012 KiB

**Confirmed:** Lighthouse transfer total 7,180,373 bytes (7,012 KiB rounded). This is approximately 6.85 MiB, not exactly 7,000 decimal KB. Large images, not just JavaScript, dominate.

| Resource | Transfer payload in this run |
|---|---:|
| ARISE `src/assets/competitions/c2.png` | 2,348,179 bytes (about 2.24 MiB) |
| External PTU footer logo | 903,562 bytes (about 882 KiB) |
| Compressed Babel compiler | 584,650 bytes (about 571 KiB) |
| `hero3.png` | 518,269 bytes |
| `c1.png` | 466,431 bytes |
| `hero2.png` | 409,739 bytes |
| `hero1.png` | 394,286 bytes |

**Locations:** `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/CompetitionSection.js:1-2,48-53`; `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/Hero.js:1-3,68-78`; `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/Footer.js:48-54,219-225`.

**Fix:** create correctly sized WebP/AVIF variants for photos/artwork and a properly sized optimized partner logo. Verify logo permission before copying external assets. Use responsive `srcset`/`sizes`, reserve image dimensions, lazy-load below-fold images, and avoid loading all hero slides immediately. Do not lazy-load the primary visible/LCP hero image. Lighthouse estimates about 4,585 KiB of possible image-delivery savings; that is an estimate, not a guaranteed reduction. Target initial cold-load payload below 1,600 KiB where practical, per Chrome guidance.

### P02 [P1] Runtime JSX compilation and synchronous scripts block rendering

**Confirmed source and lab:** browser Babel is about 3,140,126 decoded bytes in the local file and about 571 KiB transferred with compression. The head loads React, ReactDOM, Babel and Lucide synchronously; every page is then fetched as `text/babel`. Lighthouse identifies Babel as the largest script-time contributor and reports 1,280 ms mobile total blocking time.

**Location:** `/Users/suganthanpraba/Documents/makeindiafoundation.org/index.html:11-14,38-73,75-94`.

**Fix:** transpile JSX at build time with a minimal bundler, remove Babel standalone from the production page, bundle/minify the application and load built code using a module/deferred entry point. Split non-homepage routes only where useful. Import only required icons. Keep fonts to needed weights and avoid duplicate analytics beacons. Preserve all route/form behavior during migration. Babel's own documentation advises against standalone compilation for ordinary production sites.

### S01 [P1] Six important security headers are missing

**Confirmed by live SecurityHeaders and raw HTTPS response:**

- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

**Configuration locations:** `/Users/suganthanpraba/Documents/makeindiafoundation.org/wrangler.toml:1-12`; `/Users/suganthanpraba/Documents/makeindiafoundation.org/worker/index.js:96-108`.

**Remediation design, not yet applied:**
- Worker static-asset headers go in `_headers` at the root of the configured assets directory. This checkout specifies `/Users/suganthanpraba/Documents/makeindiafoundation.org/.cloudflare-assets`, not the root `public` directory. Alternatively use deliberate Cloudflare response-header rules.
- Worker-generated API responses need headers in Worker response construction too; static-asset rules do not cover every generated response.
- Candidate low-risk defaults: `X-Content-Type-Options: nosniff`; `Referrer-Policy: strict-origin-when-cross-origin`; `X-Frame-Options: SAMEORIGIN` (or DENY if embedding is prohibited); a Permissions Policy such as `camera=(), microphone=(), geolocation=()` only after confirming these features are unused.
- Roll out HSTS on verified HTTPS hosts with a short initial max-age; increase after checking certificates/redirects. Do not enable `includeSubDomains` or preload blindly when subdomain coverage is unknown.
- Inventory Google Fonts, Cloudflare analytics, images, RSS fetches and any embedded media before drafting CSP. Test `Content-Security-Policy-Report-Only` first, using an approved reporting endpoint. Current browser Babel and inline scripts/styles complicate a strict policy. Precompile code before enforcing a narrow script policy; avoid adding `unsafe-eval`/broad wildcards simply to obtain a score.
- Choose `frame-ancestors` consistently with X-Frame-Options. Do not blindly enable COEP/COOP/CORP: cross-origin images and embeds can break, and those optional headers are not the six currently missing.

Missing headers are hardening gaps, not proof of exploitable XSS or a breached website. No exploit attempts or intrusive security testing were performed.

### D01 [P2] `www` host does not exist

**Confirmed:** `www.makeindiafoundation.org` returns NXDOMAIN, independently queried at Cloudflare's public resolver. The apex resolves over IPv4 and IPv6. HTTP apex redirects successfully to HTTPS.

**Fix:** in Cloudflare, define the intended `www` host, ensure certificate coverage, and configure a permanent canonical redirect to `https://makeindiafoundation.org`, preserving paths/queries. DNS alone does not create the redirect. Confirm canonical preference before changing production.

### E01 [P2] Search and basic presentation gaps

**Confirmed:** SEO 75/100; no meta description; three generic "Read more" news links. Lighthouse flags an unknown `Content-Signal` line in Cloudflare-managed robots.txt. `/sitemap.xml` returns 404. The unsupported robots directive is not evidence that Google is blocked: the current file also has `Allow: /`. News publisher logos are forced into square dimensions despite non-square source ratios.

**Locations:** `/Users/suganthanpraba/Documents/makeindiafoundation.org/index.html:5-9`; `/Users/suganthanpraba/Documents/makeindiafoundation.org/src/components/TrendingNews.js:146-159`.

**Fix:** accurate title/description/canonical metadata and article-specific link text; preserve logo aspect ratios. Review robots ownership/content signals with the owner rather than removing crawler policy just for a score. If individual pages need indexing, consider real routable URLs/static prerendering before generating a sitemap: fragments like `#/about` are not reliable distinct crawlable page URLs. Check Search Console indexing, social previews and actual broken links in a subsequent SEO pass.

### C01 [P2] Deployment copy is stale relative to root source

**Confirmed locally:** Wrangler serves `.cloudflare-assets`, a separately tracked copy. Its index and Navigation lack the Volunteer Registration addition present in root source and the live site. Changes to `src` alone are therefore not guaranteed to ship; current deployment provenance must be clarified.

**Fix:** establish one reproducible build producing one clean deployment directory. Confirm actual hosting project/routes and release commit, avoid editing generated copies by hand, and preview before release. Existing unrelated dependency deletions were left untouched.

## 3. DNS/email - what is good and what remains unverified

- MX records route mail through Cloudflare Email Routing; MXToolbox confirms they are published.
- SPF exists: `v=spf1 include:_spf.mx.cloudflare.net ~all`.
- DMARC exists with `p=quarantine`, relaxed alignment and an aggregate-report mailbox.
- HTTPS certificate verification succeeds; observed certificate validity is 12 November 2026 to 10 February 2027. Keep automatic renewal working.
- No CAA record was returned. CAA is optional policy hardening, not a website outage.
- DKIM was not checked because the sending provider and selector are unknown. Cloudflare Email Routing handles routing and is not by itself proof that website-generated outbound mail is authenticated or delivered.
- Confirm ownership and monitoring of the DMARC report mailbox. Review a real, redacted message header from the actual sender for SPF/DKIM/DMARC alignment and test delivery with owner-authorized recipients.
- Do not overwrite SPF with another provider's example. If an outbound provider is added, maintain one valid SPF policy including all authorized senders and review the DNS-lookup limit.

## 4. Form delivery connection: requires owner confirmation

The local `/Users/suganthanpraba/Documents/makeindiafoundation.org/wrangler.toml:15-17` sets `FORMS_ENABLED = "false"`; `/Users/suganthanpraba/Documents/makeindiafoundation.org/worker/index.js:100-101` then returns 503 for form POSTs. The deployed setting could differ. No production form was submitted, no emails were sent, and no student/personal data was collected during this audit.

Before enabling forms, confirm email provider, recipient, Google Sheets destination, permissions, required-field validation, rate limiting/anti-abuse and privacy/consent handling, especially because the site serves students. Use dummy data in an approved staging environment and verify email plus sheet persistence. Store provider keys using hosting secret storage. Never put credentials in public JavaScript, the assets directory, the report, or chat.

## 5. Action plan and acceptance checks

| Order | Work | Owner | Acceptance evidence |
|---|---|---|---|
| 1 | Names, form labels, dialog keyboard behavior, main landmarks, headings, contrast | Frontend developer + accessibility reviewer | No failures in named axe rules on sampled routes/states; keyboard and screen-reader review |
| 2 | Resize/compress images and lazy-load below-fold content | Frontend developer + content owner | Network waterfall and image quality review; payload target below 1,600 KiB if feasible |
| 3 | Build-time JSX compilation and clean deployment output | Frontend developer | Behavior regression checks; no Babel runtime; reproducible preview build |
| 4 | Security headers and staged CSP/HSTS rollout | Hosting administrator + developer | Raw headers, SecurityHeaders rescan, console/resource tests, rollback plan |
| 5 | Canonical `www`, outbound mail/forms, metadata/indexing | DNS administrator + owner | Redirect tests, approved test submissions, redacted mail-auth evidence, Search Console |
| 6 | Re-run and document before/after evidence | QA/reviewer | Repeated mobile Lighthouse runs and full route/state checklist |

**Targets, not promises:** mobile Lighthouse performance >=90 where feasible; LCP <=2.5 s, lab TBT <=200 ms, CLS <=0.1, initial payload <=1,600 KiB. For production Core Web Vitals use real-user 75th-percentile LCP <=2.5 s, INP <=200 ms and CLS <=0.1; lab TBT is not INP. Report a median of at least three comparable Lighthouse runs instead of treating one score as an SLA.

Check menu open/closed, registration open/closed/error/success, category dialog, Contact, Workshop, Makers Space, ARISE/IGNITE, FAQ and Volunteer Registration; keyboard Tab/Shift+Tab/Enter/Space/Escape; VoiceOver or NVDA; 200% and 400% zoom/reflow; mobile/tablet/desktop; reduced motion; every hero slide; failure and loading states; slow network; third-party resources under CSP. Website content within landmarks is the goal, not simply adding ARIA attributes everywhere.

## 6. Suggested meeting note (not booked)

**Purpose:** approve the remediation scope, hosting ownership and safe rollout.  
**Proposed format/location:** 30-minute online review via the team's preferred Google Meet/Zoom, or in-person venue chosen by the team.  
**Date/time:** to be confirmed in IST; no invitation or calendar event has been created.  
**Participants:** foundation owner, frontend developer, Cloudflare/DNS administrator; accessibility reviewer if available.

Agenda:
1. 5 min - demonstrate F security grade, 36 mobile score and 7,012 KiB payload.
2. 10 min - agree accessibility and image/build fixes without redesigning the site.
3. 10 min - confirm deployment source, DNS, form/email destinations and safe CSP/HSTS rollout.
4. 5 min - assign owners, acceptance criteria, timeline and rollback/re-test date.

Bring the current hosting/deployment project name, the developer/repository owner, intended mail provider and recipients, sample redacted audit/message evidence, and authorized staging access. Use collaborator invitations with least privilege, not shared passwords. This assistant can help prepare and implement changes in this chat; it cannot attend an in-person or external video meeting.

## 7. Limits, positives and audit health

**Positive observations:** site and HTTPS load successfully, apex HTTP redirects, Cloudflare caching/compression is active, mobile capture had no horizontal overflow at 390 px, layout shift is low, MX/SPF/DMARC exist, and hero controls already have accessible names.

**Limits:** this is a focused website-health audit, not a full penetration test or WCAG certification. Live checks covered the homepage, mobile menu, registration modal and Contact; additional routes were source-reviewed, not exhaustively exercised. Human verification blocked AccessibilityChecker. Browser Use cloud harness failed to start, so no cloud-harness QA verdict is claimed; accessible state checks used the available isolated Playwright browser and local Lighthouse. No real-device touch test, full screen-reader audit, DKIM/blacklist/SMTP delivery test, staging submission or real-user analytics analysis was performed. Scripts/backend were not executed locally for security testing.

**Scoped heuristic health score (separate from Lighthouse):** Accessibility 1/4; Performance 1/4; Theming 2/4; Responsive design 3/4; Implementation integrity 2/4. Total **9/20: significant remediation required**, not a certification. Integrity concerns are inconsistent deployment copies and runtime compilation, not a claim of generic branding. The mechanical Impeccable detector returned only two advisory bounce-animation suggestions; these are aesthetic opinions, not security/accessibility failures, and are not priorities here. Findings comprise ten P1 groups and three P2 groups plus a connection item requiring validation; no P0 production failure is asserted.

**Graph-first context:** existing scoped `graphify-out/graph.json` was used through local JSON traversal because the `graphify` CLI is unavailable; graph source references were verified. The graph contains duplicate deployment/vendored nodes, which were excluded from focused source traversal. No new indexing, semantic extraction, credentials scan or graph update was required because no website code was changed.

Optional follow-up commands: `/impeccable harden` for semantic/forms/dialog behavior, `/impeccable colorize` for contrast, `/impeccable optimize` for assets/build, `/impeccable adapt` for zoom/touch validation, followed by `/impeccable polish` and a fresh audit. These may be run separately or together after agreeing the scope. Impeccable reported an optional v4.9.1 update. Agent Reach reported v1.6.1 available; its update instructions are at https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/update.md. No tools were updated during this audit.

## 8. Evidence and sources

Evidence files are in `/Users/suganthanpraba/Documents/makeindiafoundation.org/output/audit/2026-11-17/`:
- `lighthouse-mobile.html` / `.json`, `lighthouse-desktop.html` / `.json`: full reports, settings, network items and diagnostics.
- `axe-homepage-desktop.json`, `axe-homepage-mobile.json`, `axe-registration-open.json`, `axe-contact.json`: independent rendered accessibility checks.
- `securityheaders-result.txt`, `http-response-headers.txt`, `dns-summary.json`, `mxtoolbox-result.txt`, `accessibilitychecker-status.txt`: service/network evidence.

Reference pages consulted:
1. [SecurityHeaders scan](https://securityheaders.com/?q=https%3A%2F%2Fmakeindiafoundation.org&followRedirects=on)
2. [MXToolbox lookup](https://mxtoolbox.com/SuperTool.aspx?action=mx%3amakeindiafoundation.org&run=toolpage)
3. [WCAG contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
4. [WCAG Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)
5. [WAI heading guidance](https://www.w3.org/WAI/tutorials/page-structure/headings/)
6. [WAI page regions](https://www.w3.org/WAI/tutorials/page-structure/regions/)
7. [WCAG Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
8. [Chrome: avoid enormous network payloads](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight)
9. [Babel standalone production guidance](https://babeljs.io/docs/babel-standalone)
10. [Cloudflare Worker static-asset headers](https://developers.cloudflare.com/workers/static-assets/headers/)
