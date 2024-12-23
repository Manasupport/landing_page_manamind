import { motion } from "framer-motion";
import { 
  Rocket, 
  BookOpen, 
  Users, 
  Heart, 
  ArrowRight
} from "lucide-react";
import { Button } from "./ui/button";

export const About = () => {
  // Animation variants
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

  const values = [
    {
      icon: Rocket,
      title: "Innovation continue",
      description: "Nous repoussons constamment les limites pour créer des expériences d'apprentissage uniques.",
    },
    {
      icon: BookOpen,
      title: "Excellence pédagogique",
      description: "Notre expertise garantit un impact durable sur le développement des compétences.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Nous travaillons main dans la main avec nos clients pour des solutions sur mesure.",
    },
  ];

  return (
    <section id="about" className="py-20 min-h-screen bg-[#0c3d5e] text-white overflow-hidden">
      {/* Hero Section */}
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
        Manamind pour concevoir et jouer des parcours d’apprentissages sur-mesure centrés sur les compétences
        </p>
      </motion.div>

      {/* Mission Section */}
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
            Manamind est la solution innovante pour concevoir facilement des parcours d’apprentissage et matérialiser l’acquisition 
            des compétences.

            </p>
          </motion.div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-gradient-to-l from-[#71c088] to-transparent" />
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Nos Valeurs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 shadow-lg"
            >
              <value.icon className="w-12 h-12 text-[#71c088] mb-4" />
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
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
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez Manamind et découvrez une nouvelle façon d'apprendre et de progresser.
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
        </motion.div>
      </motion.div>
    </section>
  );
};
