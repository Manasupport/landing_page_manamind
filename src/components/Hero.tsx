import { Button } from "./ui/button";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
          Créez des{" "}
          <span className="text-manamind">
            <TypeAnimation
              sequence={[
                "parcours d'apprentissage",
                3000,
                "expériences pédagogiques",
                3000,
                "simulations immersives",
                3000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
          Manamind vous aide à créer des parcours d'apprentissage engageants et efficaces.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/pricing")}
            size="lg"
            className="bg-manamind hover:bg-manamind/90 text-white px-8"
          >
            Commencer maintenant
          </Button>
          <Button
            onClick={() => navigate("/about")}
            variant="outline"
            size="lg"
            className="border-manamind text-manamind hover:bg-manamind/10"
          >
            J'en apprends plus
          </Button>
        </div>
      </div>
    </section>
  );
};