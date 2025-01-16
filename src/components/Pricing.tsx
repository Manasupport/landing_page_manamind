import { PricingCard } from "./PricingCard";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

const getEssentialPriceId = (courses: number, isAnnual: boolean) => {
  const priceMap = {
    1: { monthly: "price_1QXeWuEEI50AF5TQBvSRiqYk", yearly: "price_1QXeYkEEI50AF5TQemBkiRCS" },
    2: { monthly: "price_1QXeXGEEI50AF5TQMVSPcWyc", yearly: "price_1QXeZdEEI50AF5TQs0umy4oM" },
    3: { monthly: "price_1QXeXUEEI50AF5TQ5s0VBj6E", yearly: "price_1QXea0EEI50AF5TQE2WPOqUv" },
    4: { monthly: "price_1QXeXgEEI50AF5TQVqzmiuRd", yearly: "price_1QXeaHEEI50AF5TQK0q2bfG7" },
    5: { monthly: "price_1QXeY0EEI50AF5TQPIEYVWdu", yearly: "price_1QXeaYEEI50AF5TQuQUNTIn2" },
  };
  return priceMap[courses]?.[isAnnual ? "yearly" : "monthly"];
};

const getProfessionalPriceId = (isAnnual: boolean) => {
  return isAnnual
    ? "price_1QY1FbEEI50AF5TQQ4QNdRlH"
    : "price_1QY1FGEEI50AF5TQDpoUSNbT";
};

export const Pricing = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);
  const [essentialCourses, setEssentialCourses] = useState([1]);

  const handleSubscribe = (plan: string, priceId?: string) => {
    if (plan === "Institution") {
      window.open("https://calendar.app.google/8PzSHhTa8sLE9XWf7", "_blank");
      return;
    }

    if (plan === "Starter") {
      navigate("/create-account", {
        state: {
          selectedPlan: plan,
          numberOfCourses: 1,
        },
      });
      return;
    }

    if (priceId) {
      navigate("/create-account", {
        state: {
          selectedPlan: plan,
          priceId: priceId,
          numberOfCourses: plan === "Essential" ? essentialCourses[0] : 15,
        },
      });
    } else {
      toast({
        title: "Erreur d'abonnement",
        description: "Impossible de récupérer l'identifiant de l'offre.",
        variant: "destructive",
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
      description: "Parfait pour prendre en main l'outil",
      features: [
        { text: "1 parcours", included: true },
        { text: "Jusqu'à 50 participants", included: true },
        { text: "Toutes les fonctionnalités d'édition et d'exécution", included: true },
        { text: "Centre de ressources générique", included: true },
        { text: "Assistance standard", included: true },
      ],
      buttonText: "Essayer gratuitement",
    },
    {
      title: "Essential",
      monthlyPrice: "10 €",
      description: "Solution pour enseignants et équipes pédagogiques",
      features: [
        { text: "Jusqu'à 5 parcours simultanés", included: true },
        { text: "Jusqu'à 80 participants par parcours", included: true },
        { text: "Toutes les fonctionnalités d'édition et d'exécution", included: true },
        { text: "Tableaux de bord de reporting et de pilotage", included: true },
        { text: "Centre de ressources générique", included: true },
        { text: "Assistance prioritaire", included: true },
      ],
      buttonText: "Je m'abonne",
      priceId: getEssentialPriceId(essentialCourses[0], isAnnual),
    },
    {
      title: "Professional",
      monthlyPrice: "130 €",
      description: "Idéal pour animer des programmes ou départements académiques.",
      features: [
        { text: "Jusqu'à 15 parcours simultanés", included: true },
        { text: "Jusqu'à 150 participants par parcours", included: true },
        { text: "Toutes les fonctionnalités d'édition, d'execution et d'administration ", included: true },
        { text: "Tableaux de bord de reporting et de pilotage consolidés", included: true },
        { text: "IA pour le design de parcours", included: true },
        { text: "Centre de ressources générique", included: true },
        { text: "Export des données", included: true },
        { text: "Assistance prioritaire", included: true },
      ],
      buttonText: "Je m'abonne",
      popular: true,
      priceId: getProfessionalPriceId(isAnnual),
    },
    {
      title: "Institution",
      monthlyPrice: "Sur demande",
      description: "Solution sur mesure pour une institution",
      features: [
        { text: "100% modulable", included: true },
        { text: "Fonctionnalités d'édition, d'execution et d'administration personnalisables", included: true },
        { text: "Tableaux de bord de reporting et de pilotage consolidés", included: true },
        { text: "IA pour le design de parcours", included: true },
        { text: "Centre de ressources personnalisable", included: true },
        { text: "Intégration Learning Management System (LMS)", included: true },
        { text: "Export des données, parfait pour l'auditabilité !", included: true },
        { text: "Assistance spécialisée avec un chef de projet dédié", included: true },
      ],
      buttonText: "Prendre rendez-vous",
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#0c3d5e]">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {basePricingData.map((plan, index) => (
            <div className="flex flex-col items-stretch" key={index}>
              {plan.title === "Essential" && (
                <div className="mb-6 h-[60px]">{/* Ajout d'un espace pour aligner */}</div>
              )}
              <PricingCard
                key={plan.title}
                {...plan}
                price={getPriceDisplay(plan.monthlyPrice, plan.title)}
                onSubscribe={() => handleSubscribe(plan.title, plan.priceId)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};