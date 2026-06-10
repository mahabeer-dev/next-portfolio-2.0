# SEO Audit — mahabeer.online

**Date:** 2026-06-10
**Scope:** Code-level SEO of the portfolio (`www.mahabeer.online`) + Google Search Console performance for the whole `sc-domain:mahabeer.online` property (last 3 months).
**Prepared during:** SEO remediation session (5 fixes shipped, see §4).

---

## 1. Executive summary

The portfolio's **on-page SEO is technically solid** (Next.js 16 metadata, sitemap, robots, JSON-LD, canonicals) and the gaps found have been fixed (§4).

The **critical insight from Search Console** is that the property is a **Domain property** covering *all* subdomains, and the data is dominated by **client sites**, not the portfolio:

- **Domain totals (3 mo):** ~168 clicks, ~17,713 impressions, ~0.95% CTR, avg position ~5.4.
- **`white-oak.mahabeer.online` alone = ~90% of clicks and ~88% of impressions.**
- **The portfolio `www.mahabeer.online` = ~2 clicks / 172 impressions / position 9.16** over three months — effectively not ranking.

**Implication:** The biggest, fastest wins are *not* on the portfolio. They are (a) recovering the huge CTR gap on white-oak, and (b) fixing the HTTP-indexed client subdomain. The portfolio needs a content/authority play, which is a slower track.

---

## 2. Search Console performance analysis

### 2.1 Traffic by page (3 months)

| Page | Clicks | Impr. | CTR | Pos. | Note |
|---|---:|---:|---:|---:|---|
| white-oak.mahabeer.online | 152 | 15,568 | 0.98% | 4.48 | Client site — the breadwinner |
| shivaay-dental.mahabeer.online | 12 | 843 | 1.42% | 11.49 | Just off page 1 |
| http://longshot.mahabeer.online | 2 | 807 | 0.25% | 16.83 | **Indexed over HTTP** |
| **www.mahabeer.online (portfolio)** | **2** | **172** | 1.16% | **9.16** | The repo we optimize |
| mohalieyeconsultants.mahabeer.online | 0 | 306 | 0% | 6.46 | Ranks, no clicks |
| widgets.mahabeer.online (+subpaths) | 0 | ~45 | 0% | — | |

### 2.2 Geography

- **India: 168 / 168 clicks (100%)**, 17,086 impressions (96.5%).
- United States: 361 impressions, **0 clicks** (pos 7.53). All non-India countries: 0 clicks.
- **Read:** these are **local-intent businesses** (dental, eye consultants, Mohali). International impressions will not convert; don't optimize for them.

### 2.3 Devices

| Device | Clicks | Impr. | CTR | Pos. |
|---|---:|---:|---:|---:|
| Mobile | 85 | 11,502 | 0.74% | 5.73 |
| Desktop | 82 | 6,160 | 1.33% | 5.00 |
| Tablet | 1 | 51 | 1.96% | 5.41 |

- Mobile carries **65% of impressions** but the **lowest CTR (0.74%)**. Mobile titles/snippets underperform — worth a mobile SERP review.

### 2.4 Timeline

- Domain was near-zero in impressions until **~April 7–8, 2026** (28 → 121 → 276 → 304), when white-oak got indexed/ranked. Steady ~250–300 impr/day since.
- Anomaly **2026-05-22**: 1,047 impressions but only 2 clicks (0.19% CTR) — a query surfaced broadly at low rank/wrong intent. Worth identifying in the Queries report.
- The portfolio never joined the growth curve.

### 2.5 The CTR opportunity (highest leverage)

`white-oak` ranks at **position 4.48** but converts only **0.98%** of impressions. Typical organic CTR at positions 4–5 is **~6–9%**.

> If white-oak reached even a conservative **5% CTR** at its current impression volume, that's **~780 clicks vs. 152 today — roughly a 5× gain**, with zero new ranking required. This is the single biggest opportunity in the dataset.

The likely causes (to confirm on the live site): weak/auto-generated `<title>` and meta description, missing or generic OG, no compelling snippet, possibly missing structured data / rich-result eligibility.

---

## 3. Code-level SEO audit (portfolio repo)

**Stack:** Next.js 16.1.6 (App Router), React 19, native Metadata API. No `next-seo`/`next-sitemap` — uses framework primitives, which is the right call.

| Area | Status | Location |
|---|---|---|
| Root + per-page metadata (title template, description, OG, Twitter, robots) | ✅ Strong | `app/layout.tsx`, each `page.tsx` |
| Dynamic blog metadata (`generateMetadata`) | ✅ | `app/blogs/[slug]/page.tsx` |
| Dynamic sitemap (personal blogs only) | ✅ | `app/sitemap.ts` |
| Robots | ✅ | `app/robots.ts` |
| PWA manifest | ✅ (icons fixed, §4) | `app/manifest.ts` |
| JSON-LD: Person, WebSite, Organization, Article, ItemList | ✅ Good coverage | layout + pages |
| Canonicals + `metadataBase` | ✅ www-consistent | all pages |
| GA4 (gtag.js + route reporter, env-gated) | ✅ | `lib/analytics-config.ts`, `components/ga-route-reporter.tsx` |
| www canonicalization | ✅ non-www 308→www | host/sitemap/canonical agree |

**Content model:** blogs are hardcoded TS files in `content/blogs/` aggregated via `lib/blogs.ts`; only `platform === "personal"` posts are statically generated + sitemapped (8 posts). No CMS.

---

## 4. Fixes shipped this session (portfolio)

All committed to the `deploy` branch and pushed.

| # | Issue | Fix | Commit |
|---|---|---|---|
| 1 | Google verification meta was a broken placeholder (`google-site-verification=YOUR_CODE_HERE`, double-prefixed) | Env-driven, conditional — never ships a placeholder; DNS verification unaffected | `85db29f` |
| 2 | hreflang pointed at non-existent `/en-US` (404) | Removed the `languages` block | `74404dd` |
| 3 | Favicon/PWA icons were a non-square portrait `pic.webp` | Code-generated blue "M" monogram (`icon.tsx`, `apple-icon.tsx`) + real 192/512 PNGs in manifest | `f770d51` |
| 4 | All pages shared one static OG image | Dynamic per-page + per-blog OG cards via `opengraph-image` + `lib/og.tsx`; removed duplicate image arrays | `42aabc2` |
| 5 | Build warnings (dead `eslint` key, wrong workspace-root inference) | Removed `eslint` key; pinned `turbopack.root` | `0d7de13` |

> Note: these affect `www.mahabeer.online` only — ~1% of the property's traffic. Real impact is gated on the portfolio ranking better (§5).

---

## 5. Prioritized recommendations

### P0 — Highest leverage (client subdomains, where the traffic is)
1. **Fix white-oak's CTR.** Audit and rewrite `<title>` + meta description, add/verify OG image, add LocalBusiness structured data. At position ~4.5 this is a potential ~5× clicks with no ranking change. *(Requires access to the white-oak codebase — not this repo.)*
2. **Fix `http://longshot` indexing.** Add a 301 HTTP→HTTPS redirect so Google consolidates on the secure URL and stops splitting signals.
3. **Confirm each client subdomain has correct canonical + HTTPS + LocalBusiness schema** (dental, eye consultants are local-search plays — add NAP, Google Business Profile linkage).

### P1 — Portfolio ranking (slower track)
4. **Deploy the shipped fixes** and, in Search Console, **URL-inspect → Request indexing** for the homepage and each blog so the new tags/OG are picked up.
5. **Grow indexable content + internal links.** Position 9 with 172 impressions = thin authority. More blog posts, internal linking between posts, and a few quality backlinks are what move it.
6. **Verify rich results** with Google's Rich Results Test (Person/Article eligibility).

### P2 — Hygiene / measurement
7. **Segment Search Console by page/subdomain** in all future reporting — never read domain-wide numbers as the portfolio's.
8. **Mobile SERP review** — mobile CTR (0.74%) lags desktop (1.33%) despite 2× impressions.
9. Consider per-subdomain **URL-prefix properties** inside Search Console for cleaner per-site analytics.

---

## 6. Open question for the owner

**What is the actual goal of this work — the portfolio, or the client-subdomain network?**

- If **the portfolio**: accept it's a slow content/authority build; the on-page foundation is now done.
- If **the network** (where 99% of traffic is): the highest-ROI work is on white-oak and the other client sites, which live in different codebases.

This determines where effort goes next.
