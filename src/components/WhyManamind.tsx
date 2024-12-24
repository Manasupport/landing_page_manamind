import { Lightbulb, Users, BarChart } from "lucide-react";

export const WhyManamind = () => {
  const features = [
    {
      title: "Pilotage par les encadrants",
      icon: Lightbulb,
      points: [
        { key: "Concevoir", text: "et personnaliser des parcours d'apprentissage sur mesure." },
        { key: "Mesurer", text: "l'acquisition des compétences et suivre les parcours en temps réel." },
        { key: "Exploiter", text: "les données des parcours pour des livrables pertinents." },
      ],
    },
    {
      title: "Expérience pour les apprenants",
      icon: Users,
      points: [
        { key: "Offrir", text: "un cadre d'apprentissage aligné aux standards professionnels." },
        { key: "Impliquer", text: "les apprenants dans des parcours engageants et collaboratifs." },
        { key: "Faciliter", text: "l'évaluation individuelle et collective tout au long du parcours" },
      ],
    },
    {
      title: "Auditabilité des acquis pour l'organisation",
      icon: BarChart,
      points: [
        { key: "Intégrer", text: "des référentiels de compétences (ex. RNCP, référentiels métiers) aux parcours d'apprentissage." },
        { key: "Automatiser", text: "l'évaluation des compétences acquises." },
        { key: "Simplifier", text: "les processus d'audit." },
      ],
    },
  ];

  return (
    <section className="py-20 px-4 text-white" style={{ backgroundColor: "#0c3d5e" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xl text-manamind mb-2">Manamind : considérée par 92% des étudiants comme un vecteur d'expérience engageante.*</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="space-y-8 animate-fadeIn"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-manamind/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-12 h-12 text-manamind" />
                </div>
                <h3 className="text-2xl font-semibold leading-tight">
                  <span className="text-manamind">{feature.title.split(" ")[0]}</span>
                  {" " + feature.title.split(" ").slice(1).join(" ")}
                </h3>
                <ul className="space-y-6 text-left">
                  {feature.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-2">
                      <span className="text-manamind font-semibold">{point.key}</span>
                      <span className="text-gray-300">{point.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};