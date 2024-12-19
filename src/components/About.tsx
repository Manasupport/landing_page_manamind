import { Check, RefreshCw, BookOpen, Users } from "lucide-react"; // Import des icônes spécifiques
import { motion } from "framer-motion";

export const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const values = [
    {
      title: "Innovation continue",
      icon: RefreshCw,
      description:
        "Toujours à la recherche de nouvelles idées et technologies pour optimiser l'apprentissage.",
    },
    {
      title: "Excellence pédagogique",
      icon: BookOpen,
      description:
        "Une expertise pédagogique de haut niveau pour garantir un impact durable sur vos équipes.",
    },
    {
      title: "Engagement client",
      icon: Users,
      description:
        "Une collaboration étroite pour s'assurer que chaque solution répond parfaitement à vos besoins.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 px-4"
      style={{ backgroundColor: "#182234" }} // Couleur de fond uniforme
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white tracking-tight font-telegraph"
        >
          À propos de Manamind
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          {/* Mission */}
          <motion.div
            variants={item}
            className="space-y-8 bg-white/5 p-8 rounded-2xl backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-500"
          >
            <h3 className="text-3xl font-semibold text-[#71c088] font-telegraph">
              Notre Mission
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg font-telegraph">
              Manamind s'engage à transformer l'apprentissage en entreprise en créant des expériences
              engageantes et mesurables. Notre plateforme combine innovation pédagogique et technologie
              de pointe pour développer les compétences de vos équipes.
            </p>
          </motion.div>

          {/* Valeurs */}
          <motion.div variants={item} className="space-y-6">
            <h3 className="text-3xl font-semibold text-[#71c088] mb-8 font-telegraph">
              Nos Valeurs
            </h3>
            <div className="grid gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#71c088]/20 p-4 rounded-lg group-hover:bg-[#71c088]/30 transition-all duration-300">
                      <value.icon className="w-6 h-6 text-[#71c088]" />
                    </div>
                    <div>
                      <span className="text-lg font-medium text-gray-200 font-telegraph group-hover:text-[#71c088] transition-all duration-300">
                        {value.title}
                      </span>
                      <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-all duration-300">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
