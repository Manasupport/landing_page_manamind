import { Button } from "./ui/button";

export const ConsultationSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <img
              src="/lovable-uploads/dd891a06-c72e-4778-bc5f-a1c07003345f.png"
              alt="Yanis from Manamind"
              className="rounded-full w-48 h-48 object-cover mx-auto md:mx-0"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Besoin d'aide pour choisir votre offre ?
            </h2>
            <p className="text-lg text-slate-600">
              Hello, c'est Yanis, Growth Hacker chez Mana. Discutons ensemble pour explorer vos besoins, répondre à vos questions et vous aider à choisir l'offre idéale. Notre consultation rapide et gratuite est adaptée à vos objectifs – sans aucune obligation !
            </p>
            <Button
              size="lg"
              className="bg-manamind hover:bg-manamind/90"
              onClick={() => window.open('https://calendar.app.google/8PzSHhTa8sLE9XWf7', '_blank')}
            >
              Je réserve un point
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};