import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { toast } from "./ui/use-toast";
import { GraduationCap, BookOpen, User, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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

  const accountTypes = [
    { id: "Professeur permanent", icon: GraduationCap },
    { id: "Professeur vacataire", icon: User },
    { id: "Institution", icon: Home },
    { id: "Directeur de Master", icon: BookOpen },
  ];

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
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: Math.random().toString(36).slice(-8), // Generate a random password
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });

      if (authError) throw authError;

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

      if (selectedPlan === "Starter") {
        // Free plan - redirect to app
        window.location.href = "https://app.manamind.fr";
      } else {
        // Paid plan - create checkout session
        const response = await supabase.functions.invoke('create-checkout', {
          body: { 
            priceId, 
            email: formData.email 
          }
        });

        if (response.error) throw response.error;

        // Redirect to Stripe Checkout
        if (response.data?.url) {
          window.location.href = response.data.url;
        } else {
          throw new Error('No checkout URL received from Stripe');
        }
      }
    } catch (error) {
      console.error('Error:', error);
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
      <div
        className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center"
        style={{ backgroundColor: "#71c088" }}
      >
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
          <h2 className="text-4xl font-bold text-white mb-8">
            Créez et animez vos parcours
          </h2>

          <div className="space-y-6">
            <div>
              <Label
                htmlFor="lastName"
                className="text-white text-xs capitalize"
              >
                Nom
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
                className="bg-white/90 backdrop-blur-sm border-b border-gray-300 h-12 text-sm"
                placeholder="Otmany"
              />
            </div>

            <div>
              <Label
                htmlFor="firstName"
                className="text-white text-xs capitalize"
              >
                Prénom
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
                className="bg-white/90 backdrop-blur-sm border-b border-gray-300 h-12 text-sm"
                placeholder="Yanis"
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-white text-xs capitalize"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-white/90 backdrop-blur-sm border-b border-gray-300 h-12 text-sm"
                placeholder="hello@reallygreatsite.com"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-100 h-12 text-lg font-bold"
          >
            Je crée mon compte
          </Button>

          <div className="text-center mt-4 text-white text-sm">
            <a
              href="https://app.manamind.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              J'ai déjà un compte, je me connecte
            </a>
          </div>
        </form>
      </div>

      {/* Section Sélection Type Compte */}
      <div
        className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center"
        style={{ backgroundColor: "#182234" }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-white mb-8">
            Choisis le type de compte qui te correspond
          </h2>

          <RadioGroup
            value={accountType}
            onValueChange={setAccountType}
            className="grid grid-cols-2 gap-4"
          >
            {accountTypes.map(({ id, icon: Icon }) => (
              <div key={id} className="relative">
                <RadioGroupItem value={id} id={id} className="peer sr-only" />
                <Label
                  htmlFor={id}
                  className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-all peer-checked:bg-manamind peer-checked:text-black"
                >
                  <Icon className="h-12 w-12 mb-2 text-white peer-checked:text-black" />
                  <span className="text-center font-medium text-white peer-checked:text-black">
                    {id}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};