import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils"; // Pour faciliter les classes conditionnelles

const accountTypes = [
  { id: "professeur_permanent", label: "Professeur permanent", icon: "🎓" },
  { id: "professeur_vacataire", label: "Professeur vacataire", icon: "👤" },
  { id: "institution", label: "Institution", icon: "🏢" },
  { id: "directeur_master", label: "Directeur de Master", icon: "📖" },
];

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
      console.log('Début de la création du compte...');

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

        if (!response.data?.url) {
          toast({
            title: "Erreur",
            description: "URL de paiement manquante.",
            variant: "destructive",
          });
          return;
        }
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Erreur :', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Formulaire */}
      <div className="flex flex-col justify-center bg-[#71c088] px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Créez votre compte</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nom"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <input
            type="text"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-300"
          />
        </form>
      </div>

      {/* Sélection Type de compte */}
      <div className="flex flex-col justify-center bg-[#0c3d5e] px-8 py-12 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Type de compte</h2>
        <div className="grid grid-cols-2 gap-4">
          {accountTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setAccountType(type.id)}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg border transition-all",
                accountType === type.id
                  ? "bg-[#71c088] text-white border-transparent"
                  : "bg-[#0c3d5e] border-gray-300 hover:bg-[#5a9a6e]"
              )}
            >
              <span className="text-3xl">{type.icon}</span>
              <span className="mt-2">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bouton Centré */}
      <div className="col-span-2 flex justify-center py-6">
        <Button
          onClick={handleSubmit}
          size="lg"
          className={`px-8 py-3 rounded-lg font-bold shadow-md ${
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
  );
};
