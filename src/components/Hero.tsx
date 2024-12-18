import { Button } from "./ui/button";
import { TypeAnimation } from 'react-type-animation';

export const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center bg-manamind relative overflow-hidden">
      <div className="absolute inset-0 bg-[#182234]"></div>
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 font-telegraph">
            Manamind
          </h1>
          <div className="text-3xl md:text-4xl text-white/90 leading-relaxed font-telegraph mb-8">
            <span>Des parcours interactifs pour des </span>
            <TypeAnimation
              sequence={[
                'recrutements mémorables.',
                1500,
                'formations mémorables.',
                1500,
                'projets mémorables.',
                1500,
              ]}
              wrapper="span"
              speed={40}
              className="font-bold text-[#0e1117]"
              repeat={Infinity}
              cursor={true}
            />
          </div>
          <Button
            onClick={scrollToAbout}
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