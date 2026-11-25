# SEO audit: rrymalaysia.com

Scope: live homepage plus representative About, Services, Marketplace, Contact, calculator, legal, and product pages, checked 25 November 2026. The domain is `https://rrymalaysia.com`.

## Audit summary

The site is crawlable and has a sitemap, semantic page headings, and image alt text. The main issue is repeated metadata: eight inspected URLs had the same title, description, canonical URL, and Open Graph URL. The canonical on every non-home page pointed to the homepage. Product structured data also claimed every listing was in stock without a source field, and sitemap dates used the time the sitemap was rendered rather than the content update time. These are confirmed from live HTML and the repository.

No ranking, traffic, or search penalty claim can be made without Search Console data. Mobile Core Web Vitals could not be measured because Google PageSpeed Insights rate limited the request. Score: insufficient data for a reliable overall numeric score.

## Findings

| Area | Severity | Confidence | Evidence and impact | Fix |
| --- | --- | --- | --- | --- |
| Canonical URLs | Critical | Confirmed | `/about`, `/services`, `/marketplace`, `/contact`, `/calculator/scrap`, `/privacy-policy`, and a product page all emitted `https://rrymalaysia.com` as canonical. Search engines may consolidate distinct pages into the homepage. | Emit a self-referencing canonical on every public page. |
| Titles, descriptions, social previews | Warning | Confirmed | The same title, description, and Open Graph URL appeared across all eight inspected pages. This obscures each page's topic in search and link previews. | Set unique metadata by route; generate product metadata from published Sanity data. |
| Product structured data | Warning | Confirmed | Product schema unconditionally declared `InStock` even though the product schema has no availability field; products without a price still emitted an Offer. | Remove unsupported availability claims and emit an Offer only for a valid positive price. |
| Sitemap freshness | Warning | Confirmed | Static and product URLs used `new Date()` at sitemap generation as `lastModified`, despite no corresponding content update. | Omit unverified dates for static routes and use Sanity `_updatedAt` for products. |
| WebSite structured data | Warning | Confirmed | `SearchAction` pointed to `/marketplace` without any search query parameter or working search behavior. A root breadcrumb list described several sibling pages as one hierarchy. | Remove unsupported search action and global breadcrumb list. Preserve actual product breadcrumb hierarchy. |
| Crawlability | Pass | Confirmed | `robots.txt` returns 200, allows public pages, and names `/sitemap.xml`; the homepage returns 200 without redirects. | Keep this behavior. |
| On-page structure | Pass | Confirmed | The inspected homepage has one H1, descriptive section headings, internal links, and alt text on listed images. | Keep this behavior; improve page-specific copy over time. |
| Mobile performance | Info | Unknown | PageSpeed Insights returned a rate-limit error and no mobile metrics. | Check Core Web Vitals in Search Console or retry PageSpeed later. |
| Local business data | Warning | Confirmed | Published Sanity Company Info currently contains `Kuala Lumpur, Malaysia`, `contact@rrymalaysia.com`, and `+60 12-345 6789`, which differ from previous hardcoded company details. Incorrect NAP data can confuse visitors and local listings. | Have the business owner verify and correct the Sanity record, then align its Google Business Profile and citations. |

## Prioritized action plan

1. Fix canonical URLs and route-specific metadata (quick win; implemented in this branch).
2. Correct product schema and sitemap update dates (quick win; implemented in this branch).
3. Verify the published business name, address, and phone with the owner, then update Sanity and external listings (strategic).
4. Review Search Console indexing, query and click data after deployment; submit the sitemap if needed (strategic).
5. Measure mobile Core Web Vitals and target actual bottlenecks (maintenance).

## Unknowns and follow-ups

Search Console access and Google Business Profile ownership were not available in this audit. No competitive keyword or backlink analysis was performed. PageSpeed Insights was rate limited, so performance impact remains unmeasured. The sitemap refreshes after requests; search engines still determine when to recrawl and update results.

Evidence: direct live HTML requests, the SEO skill's fetch/parse, robots and redirect scripts, and repository source. Google guidance: https://developers.google.com/search/docs/fundamentals/seo-starter-guide and https://developers.google.com/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.
