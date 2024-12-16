import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Pricing />
      <Contact />
    </div>
  );
};

export default Index;