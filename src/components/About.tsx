import { motion } from "framer-motion";
import { 
  RocketLaunch, 
  BookOpen, 
  Users, 
  Heart, 
  Target, 
  Brain,
  ArrowRight
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

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
      icon: RocketLaunch,
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

  const timeline = [
    {
      year: "2022",
      title: "Naissance",
      description: "Lancement de Manamind avec une vision innovante de l'apprentissage.",
    },
    {
      year: "2023",
      title: "Croissance",
      description: "Développement de fonctionnalités avancées et expansion de notre communauté.",
    },
    {
      year: "2024",
      title: "Innovation",
      description: "Intégration de nouvelles technologies pour une expérience encore plus immersive.",
    },
  ];

  return (
    <section className="py-20 min-h-screen bg-gradient-to-b from-[#182234] to-[#1d2a3f] text-white overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-20 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#71c088] to-[#a3d7b3] text-transparent bg-clip-text">
          À propos de Manamind
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Révolutionnez l'apprentissage avec une plateforme qui s'adapte à vos besoins
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
        <div className="bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
          <motion.div variants={itemVariants} className="relative z-10">
            <Heart className="w-12 h-12 text-[#71c088] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Manamind est née d'une vision : rendre l'apprentissage plus efficace, 
              engageant et accessible. Notre plateforme innovante permet de concevoir 
              des parcours d'apprentissage personnalisés et de suivre l'acquisition 
              des compétences de manière intuitive.
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
              className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <value.icon className="w-12 h-12 text-[#71c088] mb-4" />
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Notre Histoire</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#71c088]/30" />
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <Card className="bg-white/5 p-6 backdrop-blur-sm border-none hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-[#71c088] font-bold text-xl mb-2">{item.year}</h3>
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-300">{item.description}</p>
                </Card>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#71c088] rounded-full" />
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