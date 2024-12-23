import { PricingCard } from "./PricingCard";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

// 🎯 **Gestion des Identifiants de Prix**
const PRICE_MAP = {
  Essential: {
    1: { monthly: "price_1QXeWuEEI50AF5TQBvSRiqYk", yearly: "price_1QXeYkEEI50AF5TQemBkiRCS" },
    2: { monthly: "price_1QXeXGEEI50AF5TQMVSPcWyc", yearly: "price_1QXeZdEEI50AF5TQs0umy4oM" },
    3: { monthly: "price_1QXeXUEEI50AF5TQ5s0VBj6E", yearly: "price_1QXea0EEI50AF5TQE2WPOqUv" },
    4: { monthly: "price_1QXeXgEEI50AF5TQVqzmiuRd", yearly: "price_1QXeaHEEI50AF5TQK0q2bfG7" },
    5: { monthly: "price_1QXeY0EEI50AF5TQPIEYVWdu", yearly: "price_1QXeaYEEI50AF5TQuQUNTIn2" },
  },
  Professional: {
    monthly: "price_1QY1FGEEI50AF5TQDpoUSNbT",
    yearly: "price_1QY1FbEEI50AF5TQQ4QNdRlH",
  },
};

// 🛠️ **Obtenir les Identifiants de Prix**
const getPriceId = (plan: string, courses: number, isAnnual: boolean) => {
  if (plan === "Essential") {
    return PRICE_MAP.Essential[courses]?.[isAnnual ? "yearly" : "monthly"];
  }
  if (plan === "Professional") {
    return isAnnual ? PRICE_MAP.Professional.yearly : PRICE_MAP.Professional.monthly;
  }
  return null;
};

// 💳 **Composant Pricing**
export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [essentialCourses, setEssentialCourses] = useState(1);
  const navigate = useNavigate();

  const handleSubscribe = (plan: string, priceId?: string) => {
    if (plan === "Institution") {
      toast({
        title: "Demande de contact",
        description: "Notre équipe vous contactera prochainement.",
      });
      return;
    }

    if (priceId) {
      navigate("/create-account", {
        state: {
          selectedPlan: plan,
          priceId,
          numberOfCourses: plan === "Essential" ? essentialCourses : 15,
        },
      });
    } else {
      toast({
        title: "Erreur",
        description: "Identifiant de prix introuvable.",
        variant: "destructive",
      });
    }
  };

  const calculatePrice = (basePrice: string, plan: string) => {
    if (basePrice === "Modulable" || basePrice === "0 €") return basePrice;
    let price = parseInt(basePrice);
    if (isNaN(price)) return basePrice;

    if (plan === "Essential") {
      price *= essentialCourses;
    }
    if (isAnnual) {
      price *= 12 * 0.9;
    }

    return `${price} € / ${isAnnual ? "an" : "mois"}${plan === "Essential" && !isAnnual ? " / parcours" : ""}`;
  };

  const pricingPlans = [
    {
      title: "Starter",
      monthlyPrice: "0 €",
      description: "Parfait pour commencer",
      features: [
        "1 parcours",
        "Jusqu'à 50 joueurs",
        "Fonctionnalités d'édition et d'exécution",
        "Centre de ressources générique",
        "Assistance standard",
      ],
      buttonText: "Essayer gratuitement",
    },
    {
      title: "Essential",
      monthlyPrice: "10 €",
      description: "Pour les professeurs",
      features: [
        `${essentialCourses} à 5 parcours simultanés`,
        "Jusqu'à 100 joueurs par parcours",
        "Toutes les fonctionnalités",
        "Tableaux de bord",
        "Assistance prioritaire",
      ],
      buttonText: "Je m'abonne",
      priceId: getPriceId("Essential", essentialCourses, isAnnual),
    },
    {
      title: "Professional",
      monthlyPrice: "130 €",
      description: "Solution complète pour directeur de master",
      features: [
        "Jusqu'à 15 parcours simultanés",
        "Jusqu'à 200 joueurs par parcours",
        "Tableaux de bord avancés",
        "IA pour le design de parcours",
        "Export AOL",
      ],
      buttonText: "Je m'abonne",
      popular: true,
      priceId: getPriceId("Professional", essentialCourses, isAnnual),
    },
    {
      title: "Institution",
      monthlyPrice: "Modulable",
      description: "Solution sur mesure",
      features: [
        "100% modulable",
        "Centre de ressources personnalisable",
        "Support premium dédié",
        "Intégrations LMS/CRM",
        "KPI auditables",
      ],
      buttonText: "Personnaliser",
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">
          Découvrez nos offres
        </h2>
        <div className="flex items-center justify-center gap-4 mb-12">
          <Label htmlFor="pricing-toggle" className={!isAnnual ? "font-bold" : ""}>
            Mensuel
          </Label>
          <Switch id="pricing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
          <Label htmlFor="pricing-toggle" className={isAnnual ? "font-bold" : ""}>
            Annuel (-10%)
          </Label>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              description={plan.description}
              price={calculatePrice(plan.monthlyPrice, plan.title)}
              features={plan.features.map((feature) => ({ text: feature, included: true }))}
              buttonText={plan.buttonText}
              popular={plan.popular}
              onSubscribe={() => handleSubscribe(plan.title, plan.priceId)}
            >
              {plan.title === "Essential" && (
                <div className="flex flex-col items-center mb-6">
                  <Label className="text-sm text-gray-600 mb-2">Nombre de parcours ({essentialCourses})</Label>
                  <Slider
                    value={[essentialCourses]}
                    onValueChange={(val) => setEssentialCourses(val[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-3/4"
                  />
                </div>
              )}
            </PricingCard>
          ))}
        </div>
      </div>
    </section>
  );
};
