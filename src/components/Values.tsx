import { Brain, GraduationCap } from "lucide-react";

export const Values = () => {
  const values = [
    {
      title: "Innovation Continue",
      icon: Brain,
      description: "Nous repoussons constamment les limites pour créer des expériences d'apprentissage uniques.",
      points: [
        "Adaptabilité aux besoins spécifiques",
        "Intégration de méthodologies modernes",
        "Innovation centrée sur l'utilisateur"
      ]
    },
    {
      title: "Excellence Pédagogique",
      icon: GraduationCap,
      description: "Notre expertise garantit un impact durable sur le développement des compétences.",
      points: [
        "Apprentissage basé sur des référentiels de compétences",
        "Auto-évaluation et évaluation par les pairs",
        "Tableaux de bord analytiques précis"
      ]
    }
  ];

  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#0c3d5e" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Nos Valeurs
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-8 transition-transform hover:translate-y-[-4px] hover:shadow-lg"
            >
              <div className="flex items-center mb-6">
                <value.icon className="w-8 h-8 text-manamind mr-4" />
                <h3 className="text-2xl font-semibold text-white">{value.title}</h3>
              </div>
              <p className="text-white/90 mb-6">{value.description}</p>
              <ul className="space-y-3">
                {value.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-center text-white/80">
                    <span className="text-manamind mr-2">•</span>
                    {point}
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