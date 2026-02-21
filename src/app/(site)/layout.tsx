import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CartDialog from "@/components/cart/CartDialog";
import { CartProvider } from "@/components/cart/CartProvider";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <FloatingWhatsApp />
        <Footer />
        <CartDialog />
      </div>
    </CartProvider>
  );
}
