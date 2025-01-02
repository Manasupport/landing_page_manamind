import { useEffect } from "react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

export const StickyNav = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#71c088]/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center">
        {/* Logo - Scroll to Hero */}
        <a
          href="#hero"
          onClick={() => scrollToSection("hero")}
          className="flex-shrink-0 focus:outline-none cursor-pointer"
          aria-label="Retour à l'accueil"
        >
          <img
            src="/lovable-uploads/384c8e47-f179-4499-b24e-4ee8556324d9.png"
            alt="Manamind Logo"
            className="h-10 w-10"
          />
        </a>

        {/* Navigation Links */}
        <div className="flex-1 flex justify-center gap-4">
          <Button
            variant="ghost"
            onClick={() => scrollToSection("about")}
            className="text-white hover:bg-white/20 hover:text-white"
          >
            A propos de Manamind
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection("pricing")}
            className="text-white hover:bg-white/20 hover:text-white"
          >
            Nos offres
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection("help-offer")}
            className="text-white hover:bg-white/20 hover:text-white"
          >
            Contactez-nous
          </Button>
        </div>
      </div>
    </nav>
  );
};
