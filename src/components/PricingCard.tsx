import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Check } from "lucide-react";

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
  children?: React.ReactNode;
  priceId?: string;
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
  const handleClick = () => {
    if (title === "Institution") {
      window.open("https://calendar.app.google/8PzSHhTa8sLE9XWf7", "_blank");
    } else {
      onSubscribe();
    }
  };

  return (
    <Card
      className={`relative flex flex-col h-full transition-all duration-200 hover:shadow-lg ${
        popular ? "border-manamind shadow-md scale-105" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-manamind text-white px-4 py-1 rounded-full text-sm font-medium">
          Populaire
        </div>
      )}
      <CardHeader className="flex-none pb-6">
        <CardTitle className="text-2xl font-bold text-[#0c3d5e]">{title}</CardTitle>
        <CardDescription className="text-xl font-semibold mt-2">{price}</CardDescription>
        <p className="text-gray-600 min-h-[48px] mt-2">{description}</p>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        {children}
        
        <ul className="space-y-4 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3 min-h-[48px] group"
            >
              <span className="mt-0.5 flex-shrink-0">
                <Check 
                  className={`w-5 h-5 ${
                    feature.included 
                      ? "text-manamind" 
                      : "text-gray-300"
                  }`}
                />
              </span>
              <span 
                className={`text-sm sm:text-base ${
                  feature.included 
                    ? "text-gray-700" 
                    : "text-gray-400"
                }`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        <Button
          onClick={handleClick}
          className={`w-full mt-auto ${
            popular 
              ? "bg-manamind hover:bg-manamind-dark text-white" 
              : "bg-[#0c3d5e] hover:bg-[#0a3450] text-white"
          }`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};