import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import FabricSelection from '@/components/home/FabricSelection';
import ComparisonTable from '@/components/home/ComparisonTable';
import Contact from '@/components/home/Contact';
import Gallery from '@/components/home/Gallery';
import Process from '@/components/home/Process';
import CTASection from '@/components/home/CTASection';
import AboutSection from '@/components/home/AboutSection';
import WhyTenndalux from '@/components/home/WhyTenndalux';
import FAQ from '@/components/home/FAQ';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <Process />
      <AboutSection />
      <Services />
      <Gallery />
      <WhyTenndalux />
      <FabricSelection />
      <ComparisonTable />
      <CTASection />
      <Contact />
      <FAQ />
      <Footer />
    </main>
  );
}
