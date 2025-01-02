import { useEffect } from "react";
import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export const StickyNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Gère le défilement automatique après le changement d'URL
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  // Fonction pour défiler vers une section spécifique
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${id}`); // Change l'URL avec le hash
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#71c088]/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center">
        {/* Logo - Scroll to Hero */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex-shrink-0 focus:outline-none cursor-pointer"
          aria-label="Retour à l'accueil"
        >
          <img
            src="/lovable-uploads/384c8e47-f179-4499-b24e-4ee8556324d9.png"
            alt="Manamind Logo"
            className="h-10 w-10"
          />
        </button>

        {/* Navigation Links */}
        <div className="flex-1 flex justify-center gap-4">
          <Button
            variant="ghost"
            onClick={() => scrollToSection("about")}
            className="text-white hover:bg-white/20 hover:text-white"
          >
            À propos de Manamind
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
