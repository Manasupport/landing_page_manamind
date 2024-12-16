import { Button } from "./ui/button";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Contactez-nous</h2>
        <p className="text-gray-600 mb-8">
          Vous avez des questions ? Notre équipe est là pour vous aider à trouver la meilleure solution
          pour votre organisation.
        </p>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full md:w-auto px-8"
            onClick={() => window.location.href = "mailto:contact@manamind.fr"}
          >
            contact@manamind.fr
          </Button>
          <div className="flex justify-center space-x-4">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-manamind"
              onClick={() => window.open("https://linkedin.com/company/manamind", "_blank")}
            >
              LinkedIn
            </Button>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-manamind"
              onClick={() => window.open("https://twitter.com/manamind", "_blank")}
            >
              Twitter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};