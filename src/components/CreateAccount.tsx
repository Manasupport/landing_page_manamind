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
    console.log("Starting account creation with data:", { formData, accountType, selectedPlan, numberOfCourses, isAnnual });

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
            accountType: accountType,
            subscriptionStatus: initialStatus,
            isAnnual: isAnnual || false,
          },
          emailRedirectTo: 'https://app.manamind.fr'
        },
      });

      if (authError) throw authError;

      try {
        // Notify admin for all plans
        const { error: notifyError } = await supabase.functions.invoke("notify-admin", {
          body: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            plan: selectedPlan || "Starter",
            numberOfCourses: numberOfCourses || 1,
            accountType: accountType,
          },
        });

        if (notifyError) console.error("Error notifying admin:", notifyError);

        // Send welcome email
        if (selectedPlan === "Starter") {
          const { error: welcomeError } = await supabase.functions.invoke("send-welcome-email", {
            body: {
              firstName: formData.firstName,
              email: formData.email,
            },
          });

          if (welcomeError) console.error("Error sending welcome email:", welcomeError);
        }
      } catch (error) {
        console.error("Error in account notifications:", error);
      }

      if (selectedPlan === "Starter") {
        navigate("/success");
      } else {
        try {
          console.log("Creating checkout session with priceId:", priceId);
          const { data, error } = await supabase.functions.invoke("create-checkout", {
            body: {
              priceId,
              email: formData.email,
            },
          });

          if (error) throw error;
          if (!data?.url) throw new Error("URL de paiement manquante");

          console.log("Redirecting to Stripe checkout URL:", data.url);
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

  // ... keep existing code (JSX for the form UI)

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        src="/lovable-uploads/lavideo.mp4"
        autoPlay
        loop
        muted
      ></video>

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
                  { label: "Enseignant", value: "enseignant", icon: GraduationCap },
                  { label: "Equipe pédagogique / Institution", value: "Institution", icon: Users },
                  { label: "Directeur de Master / Programme", value: "Dir Master", icon: BookOpen },
                  { label: "Autre", value: "Autre", icon: Building },
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
              {/* Form component remains unchanged */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};