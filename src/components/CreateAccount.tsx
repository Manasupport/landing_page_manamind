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
      console.log('Starting account creation process...');
      
      // Sign up the user
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

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }
      console.log('User signed up successfully:', authData);

      // Update the profile with subscription information
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          selected_plan: selectedPlan,
          number_of_courses: numberOfCourses,
          subscription_status: selectedPlan === 'Starter' ? 'active' : 'pending'
        })
        .eq('id', authData.user?.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }
      console.log('Profile updated successfully');

      if (selectedPlan === "Starter") {
        console.log('Free plan selected, redirecting to app');
        window.location.href = "https://app.manamind.fr";
      } else {
        console.log('Paid plan selected, creating checkout session');
        
        const response = await supabase.functions.invoke('create-checkout', {
          body: { 
            priceId, 
            email: formData.email 
          }
        });

        console.log('Checkout response:', response);

        if (response.error) {
          console.error('Checkout error:', response.error);
          toast({
            title: "Erreur",
            description: "Erreur lors de la création de la session de paiement. Veuillez réessayer.",
            variant: "destructive",
          });
          return;
        }

        if (!response.data?.url) {
          console.error('No checkout URL in response:', response);
          toast({
            title: "Erreur",
            description: "URL de paiement manquante. Veuillez réessayer.",
            variant: "destructive",
          });
          return;
        }

        console.log('Redirecting to Stripe checkout:', response.data.url);
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error in account creation:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Formulaire */}
      <div
        className="w-full p-8 md:p-12 flex flex-col justify-center items-center"
        style={{ backgroundColor: "#71c088" }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">Créez et animez vos parcours</h2>
        <AccountForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Sélection du type de compte */}
      <div
        className="w-full p-8 md:p-12 flex flex-col justify-center items-center"
        style={{ backgroundColor: "#0c3d5e" }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">Choisissez le type de compte</h2>
        <AccountTypeSelector
          accountType={accountType}
          setAccountType={setAccountType}
        />

        {/* Bouton Centré */}
        <div className="mt-12 w-full flex justify-center">
          <Button
            onClick={handleSubmit}
            size="lg"
            className={`px-8 py-3 rounded-lg font-bold text-white shadow-md transition-all ${
              accountType && formData.firstName && formData.email
                ? "bg-[#71c088] hover:bg-[#5a9a6e]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!accountType || !formData.firstName || !formData.email}
          >
            Je crée mon compte
          </Button>
        </div>
      </div>
    </div>
  );
};
