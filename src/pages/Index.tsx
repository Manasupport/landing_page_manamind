import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyManamind } from "@/components/WhyManamind";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <WhyManamind />
      <Pricing />
      <Contact />
    </div>
  );
};

export default Index;