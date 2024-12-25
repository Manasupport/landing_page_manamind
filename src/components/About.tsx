import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 min-h-screen bg-[#0c3d5e] text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-20 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#71c088] to-[#a3d7b3] text-transparent bg-clip-text">
          Manamind, c'est quoi ?
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Manamind pour concevoir et jouer des parcours d'apprentissages sur-mesure centrés sur les compétences
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-20"
      >
        <div className="bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden shadow-lg">
          <motion.div variants={itemVariants} className="relative z-10">
            <Heart className="w-12 h-12 text-[#71c088] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Manamind est la solution innovante pour concevoir facilement des parcours d'apprentissage et matérialiser l'acquisition 
              des compétences.
            </p>
          </motion.div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-gradient-to-l from-[#71c088] to-transparent" />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-[#71c088]/20 to-[#a3d7b3]/20 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à transformer votre apprentissage ?</h2>
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
        </motion.div>
      </motion.div>
    </section>
  );
};