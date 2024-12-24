import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const StickyNav = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center gap-4">
        <Button
          variant="ghost"
          onClick={() => scrollToSection("about")}
          className="text-[#0c3d5e] hover:text-[#0c3d5e]/80"
        >
          Qui sommes-nous
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection("pricing")}
          className="text-[#0c3d5e] hover:text-[#0c3d5e]/80"
        >
          Nos offres
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection("contact")}
          className="text-[#0c3d5e] hover:text-[#0c3d5e]/80"
        >
          Contactez-nous
        </Button>
      </div>
    </nav>
  );
};