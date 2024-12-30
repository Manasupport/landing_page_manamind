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

      {/* MacBook avec écran GIF */}
      <div className="relative flex justify-center items-center mx-auto max-w-4xl">
        {/* Image du MacBook */}
        <img
          src="/lovable-uploads/macbook-base.png"
          alt="MacBook"
          className="w-full max-w-3xl"
        />
        
        {/* Écran avec GIF */}
        <div className="absolute w-[55%] h-[35%] top-[14.5%] left-[22.5%] overflow-hidden rounded-md">
          <img
            src="/lovable-uploads/screenmacbook.gif"
            alt="Animation GIF Manamind"
            className="w-full h-full object-cover"
            style={{ animation: "speedUp 1.5s infinite linear" }}
          />
        </div>
      </div>

      {/* Animation CSS pour accélérer le GIF */}
      <style>
        {`
          @keyframes speedUp {
            from { transform: translateY(0); }
            to { transform: translateY(-100%); }
          }
        `}
      </style>
    </section>
  );
};
