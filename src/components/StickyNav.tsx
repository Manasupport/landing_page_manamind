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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#71c088]/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center gap-4">
        <Button
          variant="ghost"
          onClick={() => scrollToSection("about")}
          className="text-white hover:bg-[#5a9a6e] hover:text-white"
        >
          A propos de Manamind
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection("pricing")}
          className="text-white hover:bg-[#5a9a6e] hover:text-white"
        >
          Nos offres
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection("contact")}
          className="text-white hover:bg-[#5a9a6e] hover:text-white"
        >
          Contactez-nous
        </Button>
      </div>
    </nav>
  );
};