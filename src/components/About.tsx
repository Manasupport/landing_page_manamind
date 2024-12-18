import { Check } from "lucide-react";
import { motion } from "framer-motion";

export const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
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
          <motion.div variants={item} className="space-y-8 bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-3xl font-semibold text-manamind font-telegraph">Notre Mission</h3>
            <p className="text-gray-300 leading-relaxed text-lg font-telegraph">
              Manamind s'engage à transformer l'apprentissage en entreprise en créant des expériences
              engageantes et mesurables. Notre plateforme combine innovation pédagogique et technologie
              de pointe pour développer les compétences de vos équipes.
            </p>
          </motion.div>
          <motion.div variants={item} className="space-y-6">
            <h3 className="text-3xl font-semibold text-manamind mb-8 font-telegraph">Nos Valeurs</h3>
            <div className="grid gap-6">
              {["Innovation continue", "Excellence pédagogique", "Engagement client"].map(
                (value, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-manamind/10 p-3 rounded-lg group-hover:bg-manamind/20 transition-all duration-300">
                        <Check className="w-6 h-6 text-manamind" />
                      </div>
                      <span className="text-lg font-medium text-gray-200 font-telegraph group-hover:text-manamind transition-all duration-300">
                        {value}
                      </span>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};