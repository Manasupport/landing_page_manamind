import { Button } from "./ui/button";
import { TypeAnimation } from "react-type-animation";

export const Hero = () => {
  const handleNavigation = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
            onClick={() => handleNavigation("about")}
            className="text-white text-lg font-bold hover:text-[#71c088] transition duration-300"
          >
            Qui sommes-nous
          </button>
          <button
            onClick={() => handleNavigation("pricing")}
            className="text-white text-lg font-bold hover:text-[#71c088] transition duration-300"
          >
            Nos offres
          </button>
          <button
            onClick={() => handleNavigation("contact")}
            className="text-white text-lg font-bold hover:text-[#71c088] transition duration-300"
          >
            Contactez-nous
          </button>
        </div>
      </nav>

      {/* Logo ajusté */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-10">
        <img
          src="/lovable-uploads/Manamind.png"
          alt="Manamind Logo"
          className="mx-auto w-[30rem]"
        />
      </div>

      {/* Texte animé */}
      <div className="flex-1 flex items-center justify-center mt-48">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="text-3xl md:text-4xl text-white/90 leading-relaxed font-telegraph">
            <span>Des parcours interactifs pour des </span>
            <span style={{ display: "inline-block", minHeight: "1.2em" }}>
              <TypeAnimation
                sequence={[
                  "expériences engageantes.",
                  800,
                  "compétences boostées.",
                  800,
                  "projets mémorables.",
                  800,
                  "formations ludiques.",
                  800,
                ]}
                wrapper="span"
                speed={30}
                className="font-bold"
                style={{ color: "#71c088" }}
                repeat={Infinity}
                cursor={true}
              />
            </span>
          </div>
        </div>
      </div>

      {/* Bouton */}
      <div className="w-full flex justify-center pb-12">
        <Button
          onClick={() => handleNavigation("about")}
          size="lg"
          className="bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6 h-auto font-telegraph"
        >
          J'en apprends plus !
        </Button>
      </div>
    </section>
  );
};
