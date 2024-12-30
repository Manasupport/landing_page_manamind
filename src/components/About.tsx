import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Animation de l'ouverture du MacBook
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [75, 0]); // De fermé à ouvert
  const brightness = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]); // Écran s'illumine

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 min-h-screen bg-[#0c3d5e] text-white overflow-hidden flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 text-center"
      >
        {/* Titre et description */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-[#71c088] to-[#a3d7b3] text-transparent bg-clip-text">
          L’expérience d'apprentissage innovante qui booste l’engagement et les compétences.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
          Manamind est une application conçue pour créer et animer des parcours d'apprentissage sur mesure, centrés sur le développement des compétences.
        </p>

        {/* Animation du MacBook */}
        <div className="relative w-full flex justify-center">
          <motion.div
            style={{
              rotateX,
              transformOrigin: "bottom",
            }}
            className="w-[50vw] md:w-[40vw] lg:w-[30vw] h-auto relative"
          >
            {/* Base du MacBook */}
            <img
              src="/public/lovable-uploads/macbook-base.png"
              alt="MacBook Base"
              className="w-full h-auto"
            />
            {/* Écran du MacBook */}
            <motion.div
              style={{
                filter: `brightness(${brightness})`,
              }}
              className="absolute top-[10%] left-[10%] w-[80%] h-[60%] overflow-hidden rounded-md bg-black"
            >
              <img
                src="/public/lovable-uploads/screenmacbook.gif"
                alt="GIF Animation"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
