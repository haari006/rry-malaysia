import { serializeJsonLd } from "@/lib/content";
import { CompanyProvider } from "@/components/CompanyProvider";
import { getCompanyInfo } from "@/sanity/lib/content";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CartDialog from "@/components/cart/CartDialog";
import { CartProvider } from "@/components/cart/CartProvider";

export const revalidate = 3600;

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const company = await getCompanyInfo();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.name,
    url: "https://rrymalaysia.com",
    logo: "https://rrymalaysia.com/logo.png",
    email: company.email,
    telephone: company.phone,
    address: company.address,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: company.phone,
        email: company.email,
        areaServed: "MY",
        availableLanguage: ["en", "ms"],
      },
    ],
    sameAs: [
      "https://rrymalaysia.com",
    ],
  };

  return (
    <CompanyProvider company={company}>
      <CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }} />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <FloatingWhatsApp />
          <Footer company={company} />
          <CartDialog />
        </div>
      </CartProvider>
    </CompanyProvider>
  );
}
