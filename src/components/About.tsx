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

      {/* GIF MacBook réduit et rapide */}
      <div className="flex justify-center items-center mx-auto">
        <img
          src="/lovable-uploads/macbookbase.gif"
          alt="Animation GIF MacBook Manamind"
          className="w-[60%] h-auto rounded-lg shadow-2xl"
          style={{ animation: "gif-speed 1s infinite linear" }}
        />
      </div>

      {/* Animation pour accélérer le GIF */}
      <style>
        {`
          @keyframes gif-speed {
            0% { transform: scale(1); }
            100% { transform: scale(1); }
          }

          img {
            animation-duration: 0.5s !important;
          }
        `}
      </style>
    </section>
  );
};
