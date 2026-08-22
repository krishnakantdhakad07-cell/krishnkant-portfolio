import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioSections from "@/components/PortfolioSections";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SiteShell from "@/components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <a href="#about" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <PortfolioSections />
        <Contact />
      </main>

      <Footer />
    </SiteShell>
  );
}
