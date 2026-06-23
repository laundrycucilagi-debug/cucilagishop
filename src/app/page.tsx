import { FloatingWhatsAppButton } from "@/components/public/floating-whatsapp-button";
import { HeroSection } from "@/components/public/hero-section";
import { HowToOrderSection } from "@/components/public/how-to-order-section";
import { ProductSection } from "@/components/public/product-section";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { getPublicProducts } from "@/lib/supabase/public-products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getPublicProducts();

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ProductSection products={products} />
        <HowToOrderSection />
      </main>
      <SiteFooter />
      <FloatingWhatsAppButton />
    </>
  );
}
