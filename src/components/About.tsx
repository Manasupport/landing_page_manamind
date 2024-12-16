import { Check } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 tracking-tight">
          À propos de Manamind
        </h2>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 animate-fadeIn">
            <h3 className="text-3xl font-semibold text-manamind">Notre Mission</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Manamind s'engage à transformer l'apprentissage en entreprise en créant des expériences
              engageantes et mesurables. Notre plateforme combine innovation pédagogique et technologie
              de pointe pour développer les compétences de vos équipes.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-manamind mb-8">Nos Valeurs</h3>
            <div className="grid gap-6">
              {["Innovation continue", "Excellence pédagogique", "Engagement client"].map(
                (value, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fadeIn"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-manamind/10 p-3 rounded-lg">
                        <Check className="w-6 h-6 text-manamind" />
                      </div>
                      <span className="text-lg font-medium text-gray-800">{value}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};