import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
        url: "/hero-bg.png",
        width: 1376,
        height: 768,
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
    images: ["/hero-bg.png"],
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
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RRY Malaysia",
    url: "https://rrymalaysia.com",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
