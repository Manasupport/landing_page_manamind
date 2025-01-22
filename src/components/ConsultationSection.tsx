import { Button } from "./ui/button";

export const ConsultationSection = () => {
  return (
    <section
      id="help-offer" // Ajout de l'ID pour redirection
      className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center md:text-left md:flex-row md:items-center gap-12">
        {/* Image centrée avec animation */}
        <div className="flex-shrink-0">
          <img
            src="/lovable-uploads/dd891a06-c72e-4778-bc5f-a1c07003345f.png"
            alt="Yanis from Manamind"
            className="rounded-full w-40 h-40 object-cover shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Contenu textuel */}
        <div className="space-y-6 max-w-lg mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
            Besoin d'aide pour choisir votre offre ?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Hello, c'est Yanis, Growth Hacker chez{" "}
            <span className="text-[#71c088] font-semibold">Mana</span>. Discutons pour répondre à vos questions, explorer vos besoins et vous aider à choisir l'offre idéale. Prenons rendez-vous, c’est rapide, gratuit et sans obligation !
          </p>

          {/* Bouton centré */}
          <div className="flex justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-[#71c088] hover:bg-[#5ea374] text-white px-6 py-3 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
              onClick={() =>
                window.open("https://calendar.app.google/8PzSHhTa8sLE9XWf7", "_blank")
              }
            >
              Je réserve un rendez-vous
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};