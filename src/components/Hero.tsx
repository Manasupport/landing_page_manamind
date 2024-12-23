import { Button } from "./ui/button";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (id: string) => {
    if (id === "about") {
      navigate("/about");
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col justify-between relative overflow-hidden"
      style={{ backgroundColor: "#0c3d5e" }}
    >
      {/* Barre de navigation */}
      <nav className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl py-6">
        <div className="flex justify-center space-x-12">
          <button
            onClick={() => navigate("/about")}
            className="text-white text-lg font-bold hover:text-[#71c088] transition duration-300"
          >
            Qui sommes-nous
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-white text-lg font-bold hover:text-[#71c088] transition duration-300"
          >
            Nos offres
          </button>
          <button
            onClick={() => scrollToSection("help-offer")}
            className="text-white text-lg font-bold hover:text-[#71c088] transition duration-300"
          >
            Contactez-nous
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 flex-1 flex items-center justify-center">
        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          {/* Logo fixe, légèrement plus haut */}
          <div className="mb-4">
            <img
              src="/lovable-uploads/Manamind.png"
              alt="Manamind Logo"
              className="mx-auto w-80 md:w-96"
              style={{ marginBottom: "20px" }}
            />
          </div>

          {/* Texte animé sans déplacer le reste */}
          <div className="text-3xl md:text-4xl text-white/90 leading-relaxed font-telegraph">
            <span>Des parcours interactifs pour des </span>
            <span style={{ display: "inline-block", minHeight: "1.2em" }}>
              <TypeAnimation
                sequence={[
                  "expériences engageantes.",
                  1500,
                  "compétences boostées.",
                  1500,
                  "projets mémorables.",
                  1500,
                  "formations ludiques.",
                  1500,
                ]}
                wrapper="span"
                speed={40}
                className="font-bold"
                style={{ color: "#71c088" }}
                repeat={Infinity}
                cursor={true}
              />
            </span>
          </div>
        </div>
      </div>

      {/* Bouton "J'en apprends plus" centré en bas */}
      <div className="w-full flex justify-center pb-12">
        <Button
          onClick={() => navigate("/about")}
          size="lg"
          className="bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6 h-auto font-telegraph"
        >
          J'en apprends plus !
        </Button>
      </div>
    </section>
  );
};