import { Lightbulb, Users, BarChart, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export const WhyManamind = () => {
  const features = [
    {
      title: "Pilotage pour les encadrants",
      icon: Lightbulb,
      points: [
        { text: "- Concevoir et personnaliser facilement des parcours d'apprentissage." },
        { text: "- Suivre en temps réel la progression des apprenants et l'acquisition des compétences." },
        { text: "- Bénéficier d'un guichet unique pour faciliter le partage de ressources et l'évaluation des livrables." },
      ],
    },
    {
      title: "Expérience pour les apprenants",
      icon: Users,
      points: [
        { text: "- Impliquer les apprenants dans des parcours engageants et collaboratifs." },
        { text: "- Matérialiser l'acquisition des compétences techniques et comportementales tout au long du parcours." },
        { text: "- Offrir un cadre d'apprentissage adapté à des parcours aussi bien individuels que collectifs." },
      ],
    },
    {
      title: "Auditabilité pour l'institution",
      icon: BarChart,
      points: [
        { text: "- Intégrer des référentiels de compétences (ex. RNCP, France compétences, Fiches métiers…) aux parcours d'apprentissage." },
        { text: "- Automatiser l'évaluation des compétences." },
        { text: "- Simplifier les processus d'audit (AoL)." },
      ],
    },
  ];

  return (
    <section className="py-20 px-4 text-white" style={{ backgroundColor: "#0c3d5e" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-center mb-16 text-[#71c088] font-bold">
          Manamind propose une expérience d'apprentissage innovante et créatrice de valeur pour chaque partie prenante.
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-white/5 rounded-2xl p-8 h-full backdrop-blur-sm border border-white/10 hover:border-manamind/30 transition-colors">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-manamind/20 flex items-center justify-center mb-6 group-hover:bg-manamind/30 transition-colors">
                    <feature.icon className="w-10 h-10 text-manamind" />
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight text-manamind">
                    {feature.title}
                  </h3>
                  <ul className="space-y-6 text-left">
                    {feature.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-2">
                        <span className="text-gray-300">{point.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-[#71c088]/20 to-[#a3d7b3]/20 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm border border-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à transformer votre apprentissage ?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Manamind : considérée par 94%* des étudiants comme un vecteur d'expérience engageante
          </p>
          <Button
            size="lg"
            onClick={() => {
              const section = document.getElementById("pricing");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-[#71c088] hover:bg-[#5a9a6e] text-white group"
          >
            Commencer maintenant
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-xs text-gray-400 mt-4 italic">
            * Questionnaire soumis aux étudiants utilisateurs de Manamind Spring 2024.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
