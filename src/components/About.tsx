import React from "react";
import { motion } from "framer-motion";

export const About = () => {
  const logos = [
    "mines.png",
    "skema.png",
    "UC.png",
    "x1.png",
    "EM.png",
    "enpc.png",
    "escp.png",
  ];

  // Génère un carrousel infini en doublant les logos
  const repeatedLogos = [...logos, ...logos, ...logos];

  return (
    <section id="about" className="py-20 min-h-screen bg-[#0c3d5e] text-white overflow-hidden">
      {/* Texte d'introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-12 text-center"
      >
        {/* Titre principal en blanc */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          L’expérience d'apprentissage innovante qui booste l’engagement et les compétences.
        </h1>

        {/* Texte secondaire ajusté */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-[900px] mx-auto leading-relaxed">
          Manamind est une application conçue pour créer et animer des parcours d'apprentissage sur mesure,
          centrés sur le développement des compétences.
        </p>
      </motion.div>

      {/* GIF MacBook */}
      <div className="flex justify-center items-center mx-auto mb-12">
        <img
          src="/lovable-uploads/macbook-screen-full.gif"
          alt="Animation GIF MacBook Manamind"
          className="w-[60%] h-auto rounded-lg shadow-2xl"
        />
      </div>

      {/* Texte sous l'ordinateur */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          Approuvé par des milliers d'utilisateurs dans les meilleurs établissements d'enseignement supérieur
        </h1>
      </div>

      {/* Défilement des logos */}
      <div className="overflow-hidden py-8 bg-[#0c3d5e]">
        <motion.div
          className="flex items-center gap-8"
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            duration: 20, // Réduit la vitesse
            ease: "linear",
          }}
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          {repeatedLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 w-[200px] h-[150px] flex items-center justify-center">
              <img
                src={`/lovable-uploads/${logo}`}
                alt={`Partenaire ${index + 1}`}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};