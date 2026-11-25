This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Sanity content updates

Publish changes in Sanity Studio to make them visible on the website. Drafts are not displayed.

| Content | Refresh interval | Website usage |
| --- | --- | --- |
| Products | 60 seconds | Featured listings, marketplace, product details, sitemap |
| Scrap rates | 60 seconds | Material, price, unit, trend, last-updated date in calculator |
| Hero, features, call to action | 60 seconds | Homepage text, images, buttons, feature icons/order, CTA colors |
| Services | 1 hour | Homepage cards, service sections/images and slug anchors |
| About page | 1 hour | Headings, rich text, vision and mission |
| Company details | 1 hour | Footer, contact/legal pages, WhatsApp inquiries/cart, organization/product structured data |

Refreshes are request-driven: the first request after an interval may receive the previous page while Next.js refreshes it in the background. Reload after regeneration succeeds to see changes. An already-open browser tab does not update automatically. Failed regeneration retains the last successful page.

Deploy this configuration once; later content edits do not require redeployment or a webhook. The shared queries in `src/sanity/lib/content.ts` use explicit cache lifetimes and the published perspective with Sanity CDN disabled. Company data is shared with client components through `CompanyProvider`.

Keep one published document each for Hero, About Page, Company Info and CTA Section. If duplicates exist, the most recently updated published document is selected (with document ID as a tie-breaker). Missing fields use the site's existing defaults where available; empty services/features collections use the original cards. Feature icons accept Lucide names such as `ShieldCheck` and `Truck`, with a shield fallback for unknown names. CTA colors use the three schema choices. CMS button and rich-text links allow local URLs and HTTP(S), email and telephone links.

Only public content is fetched. Order documents remain in the existing Studio/order submission workflow and are not displayed publicly. Text without an existing Sanity schema field remains in code; no schema migration is required.

## Scrap calculator pricing

The estimate is entered weight multiplied by the published Sanity rate, with no volume bonus or pickup deduction. Enter weight in the displayed rate unit: kilograms for `kg`, metric tonnes for `ton` (1 tonne = 1,000 kg). Pickup costs are confirmed separately. Invalid weights/rates cannot produce a quote, and totals are displayed to two decimal places.

Run the pricing regression checks with `node --test tests/scrap-quote.test.mjs`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Search metadata

Each public page has a self-referencing canonical URL, distinct title and description, and matching social preview metadata. Product metadata and sitemap modification dates follow published Sanity content. Keep company contact details in Sanity accurate so on-page and structured data remain trustworthy. The SEO audit and follow-up work are in `FULL-AUDIT-REPORT.md` and `ACTION-PLAN.md`.
