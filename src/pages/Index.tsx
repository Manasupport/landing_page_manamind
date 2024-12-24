import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyManamind } from "@/components/WhyManamind";
import { Values } from "@/components/Values";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { ConsultationSection } from "@/components/ConsultationSection";
import { StickyNav } from "@/components/StickyNav";

const Index = () => {
  return (
    <div className="min-h-screen">
      <StickyNav />
      <Hero />
      <About />
      <WhyManamind />
      <Values />
      <Pricing />
      <ConsultationSection />
      <Contact />
    </div>
  );
};

export default Index;