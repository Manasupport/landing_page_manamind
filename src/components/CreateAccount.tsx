import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AccountTypeSelector } from "./account/AccountTypeSelector";
import { AccountForm } from "./account/AccountForm";

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

      if (authError) throw authError;
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

      if (profileError) throw profileError;
      console.log('Profile updated successfully');

      if (selectedPlan === "Starter") {
        console.log('Free plan selected, redirecting to app');
        window.location.href = "https://app.manamind.fr";
      } else {
        console.log('Paid plan selected, creating checkout session');
        // Paid plan - create checkout session
        const response = await supabase.functions.invoke('create-checkout', {
          body: { 
            priceId, 
            email: formData.email 
          }
        });

        console.log('Checkout response:', response);

        if (response.error) {
          console.error('Checkout error:', response.error);
          throw response.error;
        }

        if (!response.data?.url) {
          console.error('No checkout URL in response:', response);
          throw new Error('No checkout URL received from Stripe');
        }

        // Redirect to Stripe Checkout
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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div
        className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center"
        style={{ backgroundColor: "#71c088" }}
      >
        <AccountForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </div>

      <div
        className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center"
        style={{ backgroundColor: "#182234" }}
      >
        <AccountTypeSelector
          accountType={accountType}
          setAccountType={setAccountType}
        />
      </div>
    </div>
  );
};