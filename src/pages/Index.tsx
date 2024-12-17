import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyManamind } from "@/components/WhyManamind";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { ConsultationSection } from "@/components/ConsultationSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <WhyManamind />
      <Pricing />
      <ConsultationSection />
      <Contact />
    </div>
  );
};

export default Index;