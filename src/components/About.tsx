import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ScrollControls, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";

function LaptopWithScreen() {
  const group = useRef();
  const { nodes, materials } = useGLTF('/lovable-uploads/laptop.glb'); // Chemin mis à jour
  const screenTexture = useTexture('/lovable-uploads/screenmacbook.gif'); // Chemin mis à jour

  useFrame(() => {
    // Animation d'ouverture du laptop en fonction du scroll
    if (group.current) {
      group.current.rotation.x = window.scrollY * 0.001; // Ajuste la rotation au scroll
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]} scale={1.5}>
      {/* Modèle principal */}
      <primitive object={nodes.Laptop} material={materials.body} />
      
      {/* Écran avec GIF */}
      <mesh geometry={nodes.Screen.geometry} position={nodes.Screen.position}>
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function LaptopScene() {
  return (
    <section className="h-screen flex items-center justify-center overflow-hidden">
      <Canvas>
        <ScrollControls pages={2} damping={0.25}>
          <LaptopWithScreen />
        </ScrollControls>
      </Canvas>
    </section>
  );
}

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
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 mb-12 text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-[#71c088] to-[#a3d7b3] text-transparent bg-clip-text"
        >
          L’expérience d'apprentissage innovante qui booste l’engagement et les compétences.
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Manamind est une application conçue pour créer et animer des parcours d'apprentissage sur mesure, centrés sur le développement des compétences.
        </motion.p>
      </motion.div>

      {/* Laptop 3D Animation */}
      <LaptopScene />
    </section>
  );
};
