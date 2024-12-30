import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Animation d'ouverture du MacBook
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section
      id="about"
      className="py-20 min-h-screen bg-[#0c3d5e] text-white overflow-hidden"
      ref={containerRef}
    >
      {/* Texte Introductif */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-12 text-center"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-[#71c088] to-[#a3d7b3] text-transparent bg-clip-text">
          L’expérience d'apprentissage innovante qui booste l’engagement et les compétences.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Manamind est une application conçue pour créer et animer des parcours d'apprentissage sur mesure, centrés sur le développement des compétences.
        </p>
      </motion.div>

      {/* Animation MacBook */}
      <div className="relative flex justify-center items-center overflow-hidden">
        {/* Image du MacBook */}
        <motion.img
          src="/lovable-uploads/macbook-base.png"
          alt="MacBook"
          style={{ scale, opacity }}
          className="w-[90%] md:w-[70%] lg:w-[60%] max-w-4xl mx-auto"
        />

        {/* Animation GIF à l'intérieur */}
        <motion.img
          src="/lovable-uploads/screenmacbook.gif"
          alt="Animation GIF"
          style={{ opacity }}
          className="absolute top-[17%] left-[29%] w-[42%] md:w-[35%] lg:w-[30%] rounded-md shadow-lg"
        />
      </div>
    </section>
  );
};
