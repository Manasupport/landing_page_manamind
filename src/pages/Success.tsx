import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative bg-gradient-to-br from-[#71c088] via-[#0c3d5e] to-[#09314c] overflow-hidden">
      {/* Dégradé animé */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent)] pointer-events-none"></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center border border-gray-200"
      >
        {/* Icône animée */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <PartyPopper className="w-20 h-20 text-[#71c088]" />
        </motion.div>

        {/* Titre animé */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-[#0c3d5e] mb-6"
        >
          Félicitations et bienvenue dans la communauté Manamind ! 🎉
        </motion.h1>

        {/* Texte informatif */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-lg leading-relaxed mb-6"
        >
          Nous avons bien enregistré votre demande et nous allons créer votre compte dés que possible, d’ici 24 heures ouvrées. <br />
          📩 Pensez à vérifier vos spams.
        </motion.p>

        {/* Bouton Retour à l'accueil */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate("/")}
          className="bg-[#71c088] hover:bg-[#5a9a75] text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Retour à l’accueil
        </motion.button>
      </motion.div>
    </div>
  );
};