import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { BookOpen, GraduationCap, Building, Users } from "lucide-react";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan, priceId, numberOfCourses, isAnnual } = location.state || {};

  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Starting account creation with data:", { formData, accountType, selectedPlan, numberOfCourses });

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

    if (!acceptTerms) {
      toast({
        title: "Conditions d'utilisation requises",
        description: "Vous devez accepter les conditions d'utilisation pour continuer",
        variant: "destructive",
      });
      return;
    }

    try {
      // Set initial subscription status based on plan
      const initialStatus = selectedPlan === "Starter" ? "active" : "pending";
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: Math.random().toString(36).slice(-8),
        options: {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            plan: selectedPlan || "Starter",
            numberOfCourses: numberOfCourses || 1,
            accountType: isAnnual ? "annuel" : "mensuel",
            subscriptionStatus: initialStatus,
          },
        },
      });

      if (authError) throw authError;

      try {
        const { data: notifyData, error: notifyError } = await supabase.functions.invoke("notify-admin", {
          body: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            plan: selectedPlan || "Starter",
            numberOfCourses: numberOfCourses || 1,
            accountType: isAnnual ? "annuel" : "mensuel",
          },
        });

        if (notifyError) console.error("Error notifying admin:", notifyError);
      } catch (notifyError) {
        console.error("Error notifying admin:", notifyError);
      }

      if (selectedPlan === "Starter") {
        window.location.href = "https://app.manamind.fr";
      } else {
        try {
          const { data, error } = await supabase.functions.invoke("create-checkout", {
            body: {
              priceId,
              email: formData.email,
            },
          });

          if (error) throw error;
          if (!data?.url) throw new Error("URL de paiement manquante");

          window.location.href = data.url;
        } catch (checkoutError) {
          toast({
            title: "Erreur lors de la redirection vers le paiement",
            description: "Une erreur est survenue. Veuillez réessayer.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du compte. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Vidéo en arrière-plan */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        src="/lovable-uploads/7021943_Meeting_Office_1920x1080.mp4"
        autoPlay
        loop
        muted
      ></video>

      {/* Contenu par-dessus la vidéo */}
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-[#71c088]/10 to-[#0c3d5e]/10 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <img
              src="/lovable-uploads/384c8e47-f179-4499-b24e-4ee8556324d9.png"
              alt="Manamind Logo"
              className="h-16 w-16 mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Créez votre compte Manamind</h1>
            <p className="text-gray-600">Rejoignez la communauté de Manaminders et transformez l'apprentissage</p>
            <div className="flex justify-center gap-4 mt-6">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 1 ? "bg-[#71c088] text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 2 ? "bg-[#71c088] text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
            </div>
          </div>

          {step === 1 ? (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-center mb-8">Choisissez votre type de compte</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Enseignant", value: "permanent", icon: GraduationCap },
                  { label: "Equipe pédagogique / Institution", value: "vacataire", icon: Users },
                  { label: "Directeur de Master / Programme", value: "master", icon: BookOpen },
                  { label: "Autre", value: "institution", icon: Building },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => {
                      setAccountType(type.value);
                      setStep(2);
                    }}
                    className={`p-6 rounded-lg border-2 flex flex-col items-center transition-all ${
                      accountType === type.value
                        ? "border-[#71c088] bg-[#71c088]/10"
                        : "border-gray-200 hover:border-[#71c088] hover:bg-[#71c088]/5"
                    }`}
                  >
                    <type.icon
                      className={`h-8 w-8 mb-3 ${
                        accountType === type.value ? "text-[#71c088]" : "text-gray-500"
                      }`}
                    />
                    <span className="font-medium text-gray-900">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-center mb-8">Complétez vos informations</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#71c088] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#71c088] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#71c088] focus:border-transparent"
                    required
                  />
                </div>
                {/* Case à cocher */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="h-4 w-4 text-[#71c088] border-gray-300 rounded focus:ring-[#71c088]"
                      required
                    />
                    <span className="text-gray-700">
                      J'accepte les{" "}
                      <a href="https://www.manamindconditions.fr" target="_blank" className="text-[#71c088] underline">
                        conditions d'utilisation de Manamind
                      </a>
                    </span>
                  </label>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#71c088] hover:bg-[#5a9a6e]">
                    Je m'inscris
                  </Button>
                </div>
              </form>
            </div>
          )}

          <p className="text-center text-sm mt-8">
            <a
              href="https://app.manamind.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#000000] hover:underline"
            >
              J'ai déjà un compte, je me connecte
            </a>
          </p>
        </div>
      </div>
    </div>
  );

};
