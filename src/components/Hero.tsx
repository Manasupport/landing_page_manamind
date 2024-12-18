import { Button } from "./ui/button";
import { TypeAnimation } from "react-type-animation";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "#182234" }}
    >
      {/* Barre de navigation */}
      <nav className="w-full py-4 px-8 bg-[#182234] flex justify-end space-x-6">
        <button
          onClick={() => scrollToSection("about")}
          className="text-white text-sm hover:underline"
        >
          Qui sommes-nous
        </button>
        <button
          onClick={() => scrollToSection("offers")}
          className="text-white text-sm hover:underline"
        >
          Nos offres
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className="text-white text-sm hover:underline"
        >
          Contactez-nous
        </button>
      </nav>

      {/* Contenu principal de Hero Page */}
      <div className="container mx-auto px-4 flex-1 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 font-telegraph">
            Manamind
          </h1>
          <div className="text-3xl md:text-4xl text-white/90 leading-relaxed font-telegraph mb-8">
            <span>Des parcours interactifs pour des </span>
            <TypeAnimation
              sequence={[
                "recrutemts mémorables.",
                1500,
                "formations mémorables.",
                1500,
                "projets mémorables.",
                1500,
              ]}
              wrapper="span"
              speed={40}
              className="font-bold"
              style={{ color: "#71c088" }}
              repeat={Infinity}
              cursor={true}
            />
          </div>
          <Button
            onClick={() => scrollToSection("about")}
            size="lg"
            className="bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6 h-auto font-telegraph"
          >
            J'en apprends plus !
          </Button>
        </div>
      </div>
    </section>
  );
};