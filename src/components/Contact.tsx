import { Button } from "./ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const Contact = () => {
  return (
    <section className="relative bg-gradient-to-r from-manamind to-manamind-light py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8 animate-fadeIn text-center">
          <h2 className="text-5xl font-bold text-black">Contactez-nous</h2>
          <div className="space-y-4">
            <p className="text-2xl text-black">contact@mana.fr</p>
            <div className="space-y-1">
              <p className="text-xl text-black">24 rue Pierre Semard,</p>
              <p className="text-xl text-black">75009</p>
              <p className="text-xl text-black">PARIS</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-black/10"
              onClick={() => window.open("https://facebook.com/manamind", "_blank")}
            >
              <Facebook className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-black/10"
              onClick={() => window.open("https://instagram.com/manamind", "_blank")}
            >
              <Instagram className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-black/10"
              onClick={() => window.open("https://twitter.com/manamind", "_blank")}
            >
              <Twitter className="h-6 w-6" />
            </Button>
          </div>
          <div className="pt-8">
            <p className="text-sm text-black">Une solution originale par</p>
            <img
              src="/lovable-uploads/bc1e3af7-9f0b-4866-b704-e6c4486c8500.png"
              alt="Mana Logo"
              className="h-12 mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};