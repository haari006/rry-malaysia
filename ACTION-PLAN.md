# SEO ACTION PLAN — rrymalaysia.com

Date: 2026-03-06

## Priority 0 (This Week)

### 1) Add JSON-LD foundation
- Type: Strategic
- Impact: High
- Effort: Medium
- Tasks:
  - Add `Organization` JSON-LD (name, URL, logo, contactPoint, sameAs)
  - Add `WebSite` JSON-LD (name, URL, SearchAction)
  - Add `BreadcrumbList` for key navigation paths
  - Add `Product` schema to marketplace detail pages where valid
- Success metric:
  - `parse_html.py` reports non-empty schema
  - Rich Results Test validates without critical errors

### 2) AI search readiness controls
- Type: Quick win
- Impact: High
- Effort: Low
- Tasks:
  - Publish `/llms.txt` and optional `/llms-full.txt`
  - Update `robots.txt` with explicit policies for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bytespider, CCBot
- Success metric:
  - `llms_txt_checker.py` returns found/valid
  - `robots_checker.py` shows explicit AI crawler management

### 3) Security header hardening
- Type: Quick win
- Impact: High (trust + browser safety)
- Effort: Low-Medium
- Tasks:
  - Add `Content-Security-Policy`
  - Add `X-Frame-Options: SAMEORIGIN`
  - Add `X-Content-Type-Options: nosniff`
  - Add `Referrer-Policy: strict-origin-when-cross-origin`
  - Add `Permissions-Policy`
  - Extend HSTS with `includeSubDomains`
- Success metric:
  - `security_headers.py` score improves from 45 to 80+

## Priority 1 (Next 2-4 Weeks)

### 4) Fix thin-content templates
- Type: Strategic
- Impact: High
- Effort: Medium-High
- Tasks:
  - Raise word count for `services`, `about`, `contact`, marketplace index, and detail pages
  - Add unique specs, buying criteria, FAQs (non-FAQ schema), trust signals, delivery/service process
  - Include Malaysia-localized terms and intent variants
- Success metric:
  - Reduce thin pages from 11/13 to <=3/13
  - Improve average word count from 166 to 400+

### 5) Improve internal linking quality
- Type: Quick win
- Impact: Medium
- Effort: Low
- Tasks:
  - Replace empty anchors with descriptive text
  - Ensure every key page has >=3 contextual internal links
  - Add cross-links between services, calculators, and relevant marketplace listings
- Success metric:
  - `internal_links.py` shows 0 empty-anchor links
  - No key page below 3 internal links

## Priority 2 (Monthly Maintenance)

### 6) Social and brand entity strengthening
- Type: Maintenance
- Impact: Medium
- Effort: Low
- Tasks:
  - Add `twitter:site` and `twitter:creator` (optional quality improvements)
  - Create/standardize official brand profiles and reference in `sameAs`
- Success metric:
  - `social_meta.py` remains 85+ and entity checker reports stronger profile coverage

### 7) Performance baseline and CWV remediation
- Type: Strategic
- Impact: Medium-High
- Effort: Medium
- Tasks:
  - Re-run `pagespeed.py` with API key (mobile + desktop)
  - Prioritize fixes by measured bottlenecks: render-blocking JS/CSS, image compression, caching, third-party scripts
- Success metric:
  - Measured LCP <=2.5s, INP <=200ms, CLS <=0.1 on key templates

## Validation Commands
```bash
python3 /Users/hariharanrajakumar/.codex/skills/seo/scripts/parse_html.py /tmp/rrymalaysia.html --url https://rrymalaysia.com --json
python3 /Users/hariharanrajakumar/.codex/skills/seo/scripts/robots_checker.py https://rrymalaysia.com
python3 /Users/hariharanrajakumar/.codex/skills/seo/scripts/llms_txt_checker.py https://rrymalaysia.com
python3 /Users/hariharanrajakumar/.codex/skills/seo/scripts/security_headers.py https://rrymalaysia.com
python3 /Users/hariharanrajakumar/.codex/skills/seo/scripts/internal_links.py https://rrymalaysia.com --depth 1 --max-pages 20
```

## Environment Limitation Logged
- Google PageSpeed API rate-limited during this run; CWV optimization should be finalized after successful metric pull.

