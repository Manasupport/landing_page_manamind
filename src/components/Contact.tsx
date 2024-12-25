import { Button } from "./ui/button";
import { Mail, Linkedin } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="relative py-16 px-4" style={{ backgroundColor: "#0c3d5e" }}>
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6 animate-fadeIn text-center">
          <h2 className="text-4xl font-bold text-white font-quattrocento">Contactez-nous</h2>
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10"
                onClick={() => window.location.href = "mailto:contact@mana.fr"}
              >
                <Mail className="h-5 w-5 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10"
                onClick={() => window.open("https://linkedin.com/company/manadvise", "_blank")}
              >
                <Linkedin className="h-5 w-5 text-white" />
              </Button>
            </div>
            <p className="text-base text-white font-quattrocento">24 rue Pierre Semard, 75009 PARIS</p>
          </div>
          <div className="pt-6 space-y-2">
            <img
              src="/lovable-uploads/Manamind.png"
              alt="Manamind Logo"
              className="h-10 mx-auto"
            />
            <p className="text-xs text-white font-quattrocento">
              une solution originale par
            </p>
            <img
              src="/lovable-uploads/8a236523-7325-450e-af98-859d2716368d.png"
              alt="Mana Logo"
              className="h-10 mx-auto hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};