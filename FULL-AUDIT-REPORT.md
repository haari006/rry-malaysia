# FULL SEO AUDIT REPORT — rrymalaysia.com

Date: 2026-03-06  
Scope: Full-site audit (13 discovered URLs, depth-limited crawl)

## A) Audit Summary
- Overall score: **70/100 (Good)** (from generated dashboard)
- Score confidence: **Medium** (PageSpeed/CWV API rate-limited)
- Top 3 issues:
  1. Missing structured data (no JSON-LD schema found)
  2. Thin content across most crawled pages (11/13 pages under 300 words)
  3. Missing AI-search readiness files/signals (`/llms.txt` missing; AI bots not explicitly managed)
- Top 3 opportunities:
  1. Add Organization + WebSite JSON-LD with `sameAs`
  2. Expand service/marketplace page content to intent-specific copy
  3. Add missing security headers and tune robots policy for AI crawlers

## B) Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
|---|---|---|---|---|---|
| Technical SEO | ✅ Pass | Confirmed | HTTPS and direct canonical homepage are in place | `security_headers.py`: HTTPS yes; `parse_html.py`: canonical `https://rrymalaysia.com` | Keep HTTPS canonical consistency site-wide |
| On-Page SEO | ⚠️ Warning | Confirmed | Homepage content is thin | `parse_html.py` word count: 289; `duplicate_content.py`: homepage 282 words | Increase homepage to ~500-900 words with service/location trust details |
| Content Quality | 🔴 Critical | Confirmed | Thin content on majority of crawled pages | `duplicate_content.py`: 11/13 pages below 300 words | Expand key pages (services, marketplace, calculator, about/contact) with unique buyer-intent content |
| Schema | 🔴 Critical | Confirmed | No JSON-LD structured data detected | `parse_html.py`: `schema: []`; `entity_checker.py`: no Organization/Person entity | Add JSON-LD: `Organization`, `WebSite`, `BreadcrumbList`; product pages add `Product` where applicable |
| E-E-A-T / Entity | ⚠️ Warning | Confirmed | Weak entity graph signals (`sameAs` missing) | `entity_checker.py`: no sameAs links (Wikipedia/Wikidata/LinkedIn/X) | Add `sameAs` to Organization schema for authoritative profiles |
| Crawlability | ✅ Pass | Confirmed | robots.txt available and sitemap declared | `robots_checker.py`: `200`, sitemap found at `/sitemap.xml` | Keep sitemap fresh and auto-ping on updates |
| AI Search Readiness (GEO) | ⚠️ Warning | Confirmed | `llms.txt` missing | `llms_txt_checker.py`: 404 not found | Create `/llms.txt` and optional `/llms-full.txt` with key page mappings |
| AI Crawler Governance | ⚠️ Warning | Confirmed | AI crawlers not explicitly managed in robots policy | `robots_checker.py`: 11 AI crawlers inherit `*` rules | Add explicit blocks/allow rules for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc. |
| Security Headers | ⚠️ Warning | Confirmed | Critical headers missing (CSP, XFO, XCTO, Referrer-Policy, Permissions-Policy) | `security_headers.py`: score 45/100, 5 headers missing | Add headers at CDN/app edge; include `includeSubDomains` in HSTS |
| Redirects | ✅ Pass | Confirmed | No redirect chain/loop on primary URL | `redirect_checker.py`: 0 hops, final 200 | Keep 1-hop max policy for all canonical URLs |
| Links | ⚠️ Warning | Confirmed | Empty-anchor links and low-link pages exist | `internal_links.py`: 16 links with no anchor text; 1 page with <3 internal links | Ensure descriptive anchor text and minimum internal link count on key pages |
| Broken Links | ✅ Pass | Confirmed | No broken links detected on scanned page set | `broken_links.py`: 0 broken, 4 redirected | Monitor redirects and replace with direct destination URLs where possible |
| Social Metadata | ✅ Pass | Confirmed | OG/Twitter meta mostly complete | `social_meta.py`: 85/100, only optional fields missing | Optionally add `twitter:site` and `twitter:creator` |
| International SEO | ℹ️ Info | Confirmed | No hreflang present | `hreflang_checker.py`: 0 tags | Keep as-is for single-language site; implement only if multilingual |
| Performance / CWV | ℹ️ Info | Hypothesis | CWV could not be confirmed due API quota/rate limit | `pagespeed.py`: rate-limited by Google API | Re-run with API key and capture LCP/INP/CLS before performance prioritization |

## C) Prioritized Action Plan (Execution Order)
1. Add baseline JSON-LD (`Organization`, `WebSite`, `BreadcrumbList`) and entity `sameAs`.
2. Create `/llms.txt` and explicit AI-bot `robots.txt` policy.
3. Deploy missing security headers at server/CDN.
4. Expand thin pages with unique, intent-matched content blocks.
5. Improve internal anchors and add contextual links on low-link pages.
6. Re-run PageSpeed with API key; optimize LCP/INP/CLS based on measured data.

## D) Unknowns and Follow-ups
- CWV metrics unknown due API rate-limiting (not a site failure).
- No GSC/GA data was provided; indexing and CTR claims are out of scope.
- Visual/mobile rendering checks were not executed with Playwright in this run.

## Environment Limitations
- `pagespeed.py` failed due Google API rate limit.
- Remaining checks completed successfully.

