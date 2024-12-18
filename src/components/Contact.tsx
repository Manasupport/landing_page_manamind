import { Button } from "./ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const Contact = () => {
  return (
    <>
      

      {/* Section Contactez-nous */}
      <section id="contact" className="relative py-16 px-4" style={{ backgroundColor: "#182234" }}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6 animate-fadeIn text-center">
            <h2 className="text-4xl font-bold text-white font-quattrocento">Contactez-nous</h2>
            <div className="space-y-4">
              <p className="text-lg text-white font-quattrocento">contact@mana.fr</p>
              <div className="space-y-1">
                <p className="text-base text-white font-quattrocento">24 rue Pierre Semard,</p>
                <p className="text-base text-white font-quattrocento">75009</p>
                <p className="text-base text-white font-quattrocento">PARIS</p>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10"
                onClick={() => window.open("https://facebook.com/manamind", "_blank")}
              >
                <Facebook className="h-5 w-5 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10"
                onClick={() => window.open("https://instagram.com/manadvise", "_blank")}
              >
                <Instagram className="h-5 w-5 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10"
                onClick={() => window.open("https://twitter.com/manamind", "_blank")}
              >
                <Twitter className="h-5 w-5 text-white" />
              </Button>
            </div>
            <div className="pt-6">
              <p className="text-xs text-white font-quattrocento">
                Une solution originale par
              </p>
              <img
                src="/lovable-uploads/8a236523-7325-450e-af98-859d2716368d.png"
                alt="Mana Logo"
                className="h-10 mx-auto mt-2 hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
