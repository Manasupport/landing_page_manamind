export const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          À propos de Manamind
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-manamind">Notre Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              Manamind s'engage à transformer l'apprentissage en entreprise en créant des expériences
              engageantes et mesurables. Notre plateforme combine innovation pédagogique et technologie
              de pointe pour développer les compétences de vos équipes.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-manamind">Nos Valeurs</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-manamind rounded-full"></span>
                <span>Innovation continue</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-manamind rounded-full"></span>
                <span>Excellence pédagogique</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-manamind rounded-full"></span>
                <span>Engagement client</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};