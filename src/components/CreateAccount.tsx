import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { BookOpen, GraduationCap, Building, Users } from "lucide-react";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan, priceId, numberOfCourses } = location.state || {};

  const [accountType, setAccountType] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountType) {
      toast({
        title: "Type de compte requis",
        description: "Veuillez sélectionner un type de compte",
        variant: "destructive",
      });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: Math.random().toString(36).slice(-8),
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });

      if (authError) throw authError;

      // Update profile with additional information
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          "Prenom": formData.firstName,
          "Nom": formData.lastName,
          "Type de compte": accountType,
          "Plan choisi": selectedPlan,
          "Nombre de parcours": numberOfCourses || 1,
        })
        .eq('id', authData.user?.id);

      if (profileError) throw profileError;

      if (selectedPlan === "Starter") {
        window.location.href = "https://app.manamind.fr";
      } else {
        try {
          const { data, error } = await supabase.functions.invoke('create-checkout', {
            body: { 
              priceId, 
              email: formData.email 
            }
          });

          if (error) throw error;
          if (!data?.url) throw new Error("URL de paiement manquante");

          console.log("Redirecting to Stripe:", data.url);
          window.location.href = data.url;
        } catch (checkoutError) {
          console.error("Checkout error:", checkoutError);
          toast({
            title: "Erreur lors de la redirection vers le paiement",
            description: "Une erreur est survenue. Veuillez réessayer.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Account creation error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du compte. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Partie Gauche : Formulaire */}
      <div className="w-full md:w-1/2 p-8 md:p-12 bg-[#71c088] flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Je m'enregistre
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nom"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full p-3 rounded-lg border-0"
          />
          <input
            type="text"
            placeholder="Prénom"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full p-3 rounded-lg border-0"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded-lg border-0"
          />
        </form>
        {/* Lien de Connexion */}
        <p className="text-center text-sm text-white mt-6 underline cursor-pointer hover:text-gray-200">
          <a href="https://app.manamind.fr" target="_blank" rel="noopener noreferrer">
            J'ai déjà un compte, je me connecte
          </a>
        </p>
      </div>

      {/* Partie Droite : Types de Comptes */}
      <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-[#0c3d5e] to-[#71c088] text-white flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Je choisis le type de compte qui me correspond
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Professeur permanent", value: "permanent", icon: GraduationCap },
            { label: "Professeur vacataire", value: "vacataire", icon: Users },
            { label: "Institution", value: "institution", icon: Building },
            { label: "Directeur de Master", value: "master", icon: BookOpen },
          ].map((type) => (
            <div
              key={type.value}
              onClick={() => setAccountType(type.value)}
              className={`p-4 text-center rounded-lg cursor-pointer border flex flex-col items-center ${
                accountType === type.value ? "bg-[#71c088] text-black shadow-lg" : "bg-white/10"
              } transition-all`}
            >
              <type.icon className="h-8 w-8 mb-2" />
              <span className="font-semibold">{type.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton Central */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={handleSubmit}
          size="lg"
          className={`bg-[#71c088] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#5a9a6e] shadow-md transition-all duration-300 ${
            !accountType || !formData.email ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!accountType || !formData.email}
        >
          Je m'inscris
        </Button>
      </div>
    </div>
  );
};