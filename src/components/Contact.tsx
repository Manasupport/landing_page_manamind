import { Button } from "./ui/button";
import { Linkedin, Twitter, Mail } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-12 animate-fadeIn">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Contactez-nous</h2>
          <p className="text-gray-600 mb-12 text-center text-lg">
            Vous avez des questions ? Notre équipe est là pour vous aider à trouver la meilleure
            solution pour votre organisation.
          </p>
          <div className="space-y-8">
            <Button
              variant="outline"
              className="w-full md:w-auto px-8 py-6 h-auto text-lg font-medium hover:bg-manamind hover:text-white transition-all duration-300"
              onClick={() => window.location.href = "mailto:contact@manamind.fr"}
            >
              <Mail className="mr-2 h-5 w-5" />
              contact@manamind.fr
            </Button>
            <div className="flex justify-center space-x-6">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-manamind hover:bg-manamind/10 transition-all duration-300"
                onClick={() => window.open("https://linkedin.com/company/manamind", "_blank")}
              >
                <Linkedin className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-manamind hover:bg-manamind/10 transition-all duration-300"
                onClick={() => window.open("https://twitter.com/manamind", "_blank")}
              >
                <Twitter className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};