import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AccountTypeSelector } from "./account/AccountTypeSelector";
import { AccountForm } from "./account/AccountForm";
import { Button } from "./ui/button";

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

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          selected_plan: selectedPlan,
          number_of_courses: numberOfCourses,
          subscription_status: selectedPlan === 'Starter' ? 'active' : 'pending'
        })
        .eq('id', authData.user?.id);

      if (profileError) throw profileError;

      if (selectedPlan === "Starter") {
        window.location.href = "https://app.manamind.fr";
      } else {
        const response = await supabase.functions.invoke('create-checkout', {
          body: { 
            priceId, 
            email: formData.email 
          }
        });

        if (!response.data?.url) throw new Error("URL de paiement manquante");

        window.location.href = response.data.url;
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Section Formulaire */}
      <div className="w-full md:w-1/2 p-8 md:p-12 bg-[#71c088] flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Créez votre compte
        </h2>
        <AccountForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Section Type de compte */}
      <div className="w-full md:w-1/2 p-8 md:p-12 bg-[#0c3d5e] flex flex-col justify-center text-white">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Choisissez votre type de compte
        </h2>
        <AccountTypeSelector
          accountType={accountType}
          setAccountType={setAccountType}
        />
      </div>

      {/* Bouton Principal au centre */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={handleSubmit}
          size="lg"
          className={`bg-[#71c088] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#5a9a6e] shadow-md transition-all duration-300 ${
            !accountType || !formData.email ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!accountType || !formData.email}
        >
          Je crée mon compte
        </Button>
      </div>
    </div>
  );
};
