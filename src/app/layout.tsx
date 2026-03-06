import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { COMPANY_INFO } from "@/lib/company";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rrymalaysia.com"),
  title: {
    default: "RRY Malaysia | Heavy Machinery & Scrap Metal Trading",
    template: "%s | RRY Malaysia",
  },
  description:
    "RRY Hardware and Machinery (M) Sdn. Bhd. supplies heavy machinery, auto parts, and scrap metal trading services in Malaysia.",
  keywords: [
    "RRY Malaysia",
    "heavy machinery Malaysia",
    "scrap metal trading",
    "auto parts marketplace",
    "machinery supplier Ipoh",
    "scrap recycling Malaysia",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://rrymalaysia.com",
    siteName: "RRY Malaysia",
    title: "RRY Malaysia | Heavy Machinery & Scrap Metal Trading",
    description:
      "Trusted partner for heavy machinery, auto parts, and scrap metal trading in Malaysia.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "RRY Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rrymalaysia",
    creator: "@rrymalaysia",
    title: "RRY Malaysia | Heavy Machinery & Scrap Metal Trading",
    description:
      "Trusted partner for heavy machinery, auto parts, and scrap metal trading in Malaysia.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RRY Malaysia",
    legalName: COMPANY_INFO.name,
    url: "https://rrymalaysia.com",
    logo: "https://rrymalaysia.com/logo.png",
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "NO 12, MEDAN SILIBIN, JALAN SILIBIN",
      postalCode: "30100",
      addressLocality: "Ipoh",
      addressRegion: "Perak",
      addressCountry: "MY",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: COMPANY_INFO.phone,
        email: COMPANY_INFO.email,
        areaServed: "MY",
        availableLanguage: ["en", "ms"],
      },
    ],
    sameAs: [
      "https://rrymalaysia.com",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RRY Malaysia",
    url: "https://rrymalaysia.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rrymalaysia.com/marketplace",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://rrymalaysia.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://rrymalaysia.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Marketplace",
        item: "https://rrymalaysia.com/marketplace",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: "https://rrymalaysia.com/contact",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
