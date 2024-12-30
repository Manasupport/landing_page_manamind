import { motion, useScroll, useTransform } from "framer-motion";

export const About = () => {
  const { scrollYProgress } = useScroll();

  // Animation d'ouverture du MacBook
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  return (
    <section id="about" className="py-20 min-h-screen bg-[#0c3d5e] text-white overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-[#71c088] to-[#a3d7b3] text-transparent bg-clip-text">
          L’expérience d'apprentissage innovante qui booste l’engagement et les compétences.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Manamind est une application conçue pour créer et animer des parcours d'apprentissage sur mesure, centrés sur le développement des compétences.
        </p>
      </div>

      {/* Animation MacBook */}
      <div className="relative max-w-4xl mx-auto mt-12">
        {/* Base du MacBook */}
        <motion.img
          src="/assets/macbook-base.png"
          alt="MacBook"
          className="w-full h-auto"
          style={{
            scale,
            opacity,
          }}
        />
        
        {/* Écran du MacBook avec le GIF */}
        <motion.div
          className="absolute top-[10%] left-[15%] w-[70%] h-[55%] overflow-hidden rounded-lg"
          style={{
            scale,
            opacity,
          }}
        >
          <img
            src="/assets/screenmacbook.gif"
            alt="Animation GIF Manamind"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};
