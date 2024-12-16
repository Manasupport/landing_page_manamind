export const WhyManamind = () => {
  const features = [
    {
      title: "Pilotage par les encadrants",
      points: [
        "Concevoir des parcours d'apprentissage sur mesure",
        "Mesurer l'acquisition des compétences",
        "Exploiter les données des parcours",
      ],
    },
    {
      title: "Expérience pour les apprenants",
      points: [
        "Offrir un cadre d'apprentissage aligné aux standards professionnels",
        "Impliquer les apprenants dans des parcours engageants",
        "Faciliter l'évaluation individuelle et collective",
      ],
    },
    {
      title: "Auditabilité des acquis pour l'organisation",
      points: [
        "Intégrer des référentiels de compétences",
        "Automatiser l'évaluation des compétences",
        "Simplifier les processus d'audit",
      ],
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Pourquoi Manamind ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-manamind">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start space-x-2">
                    <span className="w-2 h-2 mt-2 bg-manamind rounded-full flex-shrink-0" />
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};