import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/landing/Hero";
import { Products } from "@/components/landing/Products";
import { Features } from "@/components/landing/Features";
import { Aesthetics } from "@/components/landing/Aesthetics";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Products />
        <Features />
        <Aesthetics />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
