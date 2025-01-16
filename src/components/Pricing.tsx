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

  const featuresData = [
    ["1 parcours", "Jusqu'à 5 parcours simultanés", "Jusqu'à 15 parcours simultanés", "100% modulable"],
    ["Jusqu'à 50 participants", "Jusqu'à 80 participants par parcours", "Jusqu'à 150 participants par parcours", ""],
    [
      "Toutes les fonctionnalités d'édition et d'exécution",
      "Toutes les fonctionnalités d'édition et d'exécution",
      "Toutes les fonctionnalités d'édition, d'exécution et d'administration",
      "Fonctionnalités d'édition, d'exécution et d'administration personnalisables",
    ],
    [
      "Centre de ressources générique",
      "Centre de ressources générique",
      "Centre de ressources générique",
      "Centre de ressources personnalisable",
    ],
    ["Assistance standard", "Assistance prioritaire", "Assistance prioritaire", "Assistance spécialisée"],
    ["", "Tableaux de bord de reporting et de pilotage", "IA pour le design de parcours", "Intégration LMS"],
  ];

  const pricingTitles = ["Starter", "Essential", "Professional", "Institution"];
  const pricingButtons = ["Essayer gratuitement", "Je m'abonne", "Je m'abonne", "Prendre rendez-vous"];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTitles.map((title, colIdx) => (
            <div
              key={title}
              className={`border p-4 rounded-lg shadow ${
                colIdx === 2 ? "border-green-500" : "border-gray-200"
              }`}
            >
              <h3 className="text-xl font-bold text-center mb-4">{title}</h3>
              <ul className="space-y-2">
                {featuresData.map((row, rowIdx) => (
                  <li
                    key={`${title}-${rowIdx}`}
                    className={`${
                      row[colIdx] ? "text-gray-800" : "text-gray-400"
                    } flex items-center`}
                  >
                    {row[colIdx] || "Non inclus"}
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center">
                <button
                  className={`px-4 py-2 rounded ${
                    colIdx === 2 ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                  }`}
                  onClick={() => handleSubscribe(title)}
                >
                  {pricingButtons[colIdx]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};