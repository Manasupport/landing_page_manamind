import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Building, Users } from "lucide-react";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan, priceId, numberOfCourses } = location.state || {};

  const [step, setStep] = useState(1);
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

  const accountTypes = [
    { label: "Professeur permanent", value: "permanent", icon: GraduationCap },
    { label: "Professeur vacataire", value: "vacataire", icon: Users },
    { label: "Institution", value: "institution", icon: Building },
    { label: "Directeur de Master", value: "master", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#71c088]/10 to-[#0c3d5e]/30">
      <div className="max-w-4xl mx-auto pt-12 px-4">
        {/* Logo and Header */}
        <div className="text-center mb-12">
          <img
            src="/lovable-uploads/Manamind.png"
            alt="Manamind Logo"
            className="h-12 mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold text-[#0c3d5e] mb-4">
            Créez votre compte Manamind
          </h1>
          <p className="text-gray-600">
            Rejoignez notre communauté d'enseignants et transformez l'apprentissage
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  s <= step ? "bg-[#71c088] text-white" : "bg-gray-200"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Choisissez votre type de compte
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {accountTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => {
                      setAccountType(type.value);
                      setStep(2);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      accountType === type.value
                        ? "border-[#71c088] bg-[#71c088]/10"
                        : "border-gray-200 hover:border-[#71c088]/50"
                    }`}
                  >
                    <type.icon className="h-8 w-8 mx-auto mb-3 text-[#0c3d5e]" />
                    <p className="font-medium text-[#0c3d5e]">{type.label}</p>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Vos informations
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#71c088] focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#71c088] focus:border-transparent"
                      placeholder="Votre prénom"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#71c088] focus:border-transparent"
                    placeholder="votre.email@example.com"
                  />
                </div>
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="text-[#0c3d5e]"
                  >
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#71c088] hover:bg-[#5a9a6e] text-white px-8"
                  >
                    Créer mon compte
                  </Button>
                </div>
              </form>
            </>
          )}
        </motion.div>

        {/* Login Link */}
        <p className="text-center mt-8 text-gray-600">
          Déjà un compte ?{" "}
          <a
            href="https://app.manamind.fr"
            className="text-[#71c088] hover:underline"
          >
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
};