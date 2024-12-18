import { PricingCard } from "./PricingCard";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { Label } from "./ui/label";

const basePricingData = [
  {
    title: "Starter",
    monthlyPrice: "0 €",
    description: "Parfait pour commencer",
    features: [
      { text: "1 parcours", included: true },
      { text: "Jusqu'à 50 joueurs", included: true },
      { text: "Fonctionnalités d'édition et d'exécution", included: true },
      { text: "Centre de ressources générique", included: true },
      { text: "Assistance standard", included: true },
    ],
    buttonText: "Essayer gratuitement",
  },
  {
    title: "Essential",
    monthlyPrice: "10 €",
    description: "Pour les professeurs",
    features: [
      { text: "1 à 5 parcours simultanés", included: true },
      { text: "Jusqu'à 100 joueurs par parcours", included: true },
      { text: "Toutes les fonctionnalités", included: true },
      { text: "Tableaux de bord", included: true },
      { text: "Assistance prioritaire", included: true },
    ],
    buttonText: "Je m'abonne",
    popular: true,
  },
  {
    title: "Professional",
    monthlyPrice: "130 €",
    description: "Solution complète pour directeur de master",
    features: [
      { text: "Jusqu'à 15 parcours simultanés", included: true },
      { text: "Jusqu'à 200 joueurs par parcours", included: true },
      { text: "Tableaux de bord avancés", included: true },
      { text: "IA pour le design de parcours", included: true },
      { text: "Export AOL", included: true },
    ],
    buttonText: "Je m'abonne",
  },
  {
    title: "Institution",
    monthlyPrice: "Modulable",
    description: "Solution sur mesure",
    features: [
      { text: "100% modulable", included: true },
      { text: "Centre de ressources personnalisable", included: true },
      { text: "Support premium dédié", included: true },
      { text: "Intégrations LMS/CRM", included: true },
      { text: "KPI auditables", included: true },
    ],
    buttonText: "Personnaliser",
  },
];

export const Pricing = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const handleSubscribe = (plan: string) => {
    if (plan === "Starter") {
      navigate("/create-account");
    } else if (plan === "Institution") {
      toast({
        title: "Demande de contact",
        description: "Notre équipe vous contactera prochainement.",
      });
    } else {
      toast({
        title: "Paiement",
        description: "Redirection vers la page de paiement...",
      });
    }
  };

  const getPriceDisplay = (monthlyPrice: string) => {
    if (monthlyPrice === "Modulable" || monthlyPrice === "0 €") return monthlyPrice;
    const numericPrice = parseInt(monthlyPrice);
    if (isNaN(numericPrice)) return monthlyPrice;
    
    const price = isAnnual ? numericPrice * 12 * 0.9 : numericPrice;
    return `${price} € / ${isAnnual ? 'an' : 'mois'}${!isAnnual ? ' / parcours' : ''}`;
  };

  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">
          Découvrez nos offres
        </h2>
        <p className="text-center text-slate-600 mb-6 max-w-2xl mx-auto">
          Choisissez l'offre qui correspond le mieux à vos besoins et commencez à transformer
          l'apprentissage dans votre organisation.
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-12">
          <Label htmlFor="pricing-toggle" className={!isAnnual ? "font-bold" : ""}>Mensuel</Label>
          <Switch
            id="pricing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <Label htmlFor="pricing-toggle" className={isAnnual ? "font-bold" : ""}>
            Annuel (-10%)
          </Label>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {basePricingData.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              price={getPriceDisplay(plan.monthlyPrice)}
              onSubscribe={() => handleSubscribe(plan.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};