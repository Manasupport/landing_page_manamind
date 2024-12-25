import { motion } from "framer-motion";

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
        className="container mx-auto px-4 mb-12 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#71c088] to-[#a3d7b3] text-transparent bg-clip-text">
          Manamind, c'est quoi ?
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Manamind est une application pour concevoir et jouer des parcours d'apprentissages sur-mesure centrés sur les compétences
        </p>
        
        <div className="max-w-5xl mx-auto">
          <img
            src="/lovable-uploads/675596c9-f66c-4c0f-a559-cb1abd9453d0.png"
            alt="Manamind Platform Interface"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </motion.div>
    </section>
  );
};