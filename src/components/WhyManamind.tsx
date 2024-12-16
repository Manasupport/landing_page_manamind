import { Lightbulb, Users, BarChart } from "lucide-react";

export const WhyManamind = () => {
  const features = [
    {
      title: "Pilotage par les encadrants",
      icon: Lightbulb,
      points: [
        "Concevoir des parcours d'apprentissage sur mesure",
        "Mesurer l'acquisition des compétences",
        "Exploiter les données des parcours",
      ],
    },
    {
      title: "Expérience pour les apprenants",
      icon: Users,
      points: [
        "Offrir un cadre d'apprentissage aligné aux standards professionnels",
        "Impliquer les apprenants dans des parcours engageants",
        "Faciliter l'évaluation individuelle et collective",
      ],
    },
    {
      title: "Auditabilité des acquis pour l'organisation",
      icon: BarChart,
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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 tracking-tight">
          Pourquoi Manamind ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fadeIn"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="bg-manamind/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-manamind" />
              </div>
              <h3 className="text-xl font-semibold mb-6 text-gray-800">{feature.title}</h3>
              <ul className="space-y-4">
                {feature.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start space-x-3">
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