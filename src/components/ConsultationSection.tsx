import { Button } from "./ui/button";

export const ConsultationSection = () => {
  return (
    <section
      id="help-offer"
      className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-12">
        {/* Contenu textuel */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
            Besoin d'aide pour choisir votre offre ?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Hello, c'est Yanis, Growth Hacker chez{" "}
            <span className="text-[#71c088] font-semibold">Mana</span>. Discutons pour répondre à vos questions, explorer vos besoins et vous aider à choisir l'offre idéale. Prenons rendez-vous, c’est rapide, gratuit et sans obligation !
          </p>
          <div>
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

        {/* Image centrée avec effets */}
        <div className="flex-shrink-0 relative">
          <div className="rounded-full bg-gradient-to-tr from-[#71c088] via-[#5ea374] to-[#4d9365] w-56 h-56 md:w-64 md:h-64 flex items-center justify-center shadow-lg">
            <img
              src="/lovable-uploads/dd891a06-c72e-4778-bc5f-a1c07003345f.png"
              alt="Yanis from Manamind"
              className="rounded-full w-48 h-48 md:w-56 md:h-56 object-cover border-4 border-white shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};