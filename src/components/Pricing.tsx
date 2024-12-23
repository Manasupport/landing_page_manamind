import { PricingCard } from "./PricingCard";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

const getEssentialPriceId = (courses: number, isAnnual: boolean) => {
  const priceMap = {
    1: {
      monthly: "price_1QXeWuEEI50AF5TQBvSRiqYk",
      yearly: "price_1QXeYkEEI50AF5TQemBkiRCS",
    },
    2: {
      monthly: "price_1QXeXGEEI50AF5TQMVSPcWyc",
      yearly: "price_1QXeZdEEI50AF5TQs0umy4oM",
    },
    3: {
      monthly: "price_1QXeXUEEI50AF5TQ5s0VBj6E",
      yearly: "price_1QXea0EEI50AF5TQE2WPOqUv",
    },
    4: {
      monthly: "price_1QXeXgEEI50AF5TQVqzmiuRd",
      yearly: "price_1QXeaHEEI50AF5TQK0q2bfG7",
    },
    5: {
      monthly: "price_1QXeY0EEI50AF5TQPIEYVWdu",
      yearly: "price_1QXeaYEEI50AF5TQuQUNTIn2",
    },
  };

  return priceMap[courses as keyof typeof priceMap]?.[isAnnual ? "yearly" : "monthly"];
};

const getProfessionalPriceId = (isAnnual: boolean) => {
  return isAnnual
    ? "price_1ProfessionalAnnualPrice"
    : "price_1ProfessionalMonthlyPrice";
};

export const Pricing = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const [essentialCourses, setEssentialCourses] = useState([1]);

  const handleSubscribe = (plan: string) => {
    if (plan === "Institution") {
      toast({
        title: "Demande de contact",
        description: "Notre équipe vous contactera prochainement.",
      });
    }
  };

  const getPriceDisplay = (monthlyPrice: string, title: string) => {
    if (monthlyPrice === "Modulable" || monthlyPrice === "0 €") return monthlyPrice;
    const numericPrice = parseInt(monthlyPrice);
    if (isNaN(numericPrice)) return monthlyPrice;

    let price = numericPrice;

    if (title === "Essential") {
      price = numericPrice * essentialCourses[0];
    }

    if (isAnnual) {
      price = price * 12 * 0.9;
    }

    return `${price} € / ${isAnnual ? "an" : "mois"}${!isAnnual && title === "Essential" ? " / parcours" : ""}`;
  };

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
        { text: `${essentialCourses[0]} à 5 parcours simultanés`, included: true },
        { text: "Jusqu'à 100 joueurs par parcours", included: true },
        { text: "Toutes les fonctionnalités", included: true },
        { text: "Tableaux de bord", included: true },
        { text: "Assistance prioritaire", included: true },
      ],
      buttonText: "Je m'abonne",
      popular: true,
      priceId: getEssentialPriceId(essentialCourses[0], isAnnual),
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
      priceId: getProfessionalPriceId(isAnnual),
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
          {basePricingData.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              price={getPriceDisplay(plan.monthlyPrice, plan.title)}
              onSubscribe={() => handleSubscribe(plan.title)}
            >
              {plan.title === "Essential" && (
                <div className="flex flex-col items-center mb-6">
                  <Label className="text-sm text-gray-600 mb-2">
                    Nombre de parcours ({essentialCourses[0]})
                  </Label>
                  <Slider
                    value={essentialCourses}
                    onValueChange={setEssentialCourses}
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
