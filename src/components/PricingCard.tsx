import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  popular?: boolean;
  onSubscribe: () => void;
  children?: React.ReactNode; // Ajout pour intégrer du contenu dynamique (curseur)
}

export const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  popular,
  onSubscribe,
  children,
}: PricingCardProps) => {
  return (
    <Card
      className={`relative transition-all duration-200 hover:shadow-lg ${
        popular ? "border-manamind shadow-md scale-105" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-manamind text-white px-4 py-1 rounded-full text-sm font-medium">
          Populaire
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-xl font-semibold">{price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">{description}</p>
        
        {/* Contenu dynamique */}
        {children}

        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  feature.included ? "bg-manamind/20 text-manamind" : "bg-gray-100 text-gray-400"
                }`}
              >
                {feature.included ? "✓" : "×"}
              </span>
              <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        <Button
          onClick={onSubscribe}
          className={`w-full ${
            popular ? "bg-manamind hover:bg-manamind-dark" : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};
