import React from "react";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-20 min-h-screen bg-[#0c3d5e] text-white overflow-hidden">
      {/* Texte d'introduction */}
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
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#71c088] to-[#a3d7b3] text-transparent bg-clip-text">
          Approuvé par des milliers d'utilisateurs dans les meilleurs établissements d'enseignement supérieur
        </h2>
      </div>

      {/* Défilement des logos */}
      <div className="overflow-hidden py-4 bg-[#0b3a53]">
        <motion.div
          className="flex gap-8 animate-scroll"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          {["mines.jpg", "skema.jpg", "UC.jpg", "X.png", "EM.jpg", "ENPC.jpg", "escp.jpg"].map((logo, index) => (
            <img
              key={index}
              src={`/lovable-uploads/${logo}`} // Remplacez avec les chemins réels des logos
              alt={`Partenaire ${index + 1}`}
              className="h-16 w-auto object-contain"
            />
          ))}
        </motion.div>
      </div>

      {/* Animation CSS pour le défilement horizontal */}
      <style>
        {`
          .animate-scroll {
            display: flex;
            animation: scroll 15s linear infinite;
          }

          @keyframes scroll {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </section>
  );
};