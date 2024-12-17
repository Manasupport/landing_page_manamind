import { Button } from "./ui/button";

export const ConsultationSection = () => {
  return (
    <section className="bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-xl">
          <div className="flex-shrink-0">
            <img
              src="/lovable-uploads/cdb627a7-7452-4ceb-8748-55cc8c9e90ee.png"
              alt="Yanis"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div className="flex-grow space-y-4">
            <h3 className="text-2xl font-bold">Besoin d'aide pour choisir votre offre ?</h3>
            <p className="text-gray-300 max-w-3xl">
              Hello, c'est Yanis, Growth Hacker chez Mana. Discutons ensemble pour explorer vos besoins, répondre à vos questions et vous aider à choisir l'offre idéale. Notre consultation rapide et gratuite est adaptée à vos objectifs – sans aucune obligation !
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button
              className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-full font-medium"
            >
              Je réserve un point
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};