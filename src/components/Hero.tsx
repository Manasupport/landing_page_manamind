import { Button } from "./ui/button";

export const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-manamind to-white px-4">
      <div className="text-center animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Manamind - Build Skills, Drive Innovation
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
          La plateforme qui transforme votre apprentissage en succès mesurable.
        </p>
        <Button
          onClick={scrollToAbout}
          size="lg"
          className="bg-white text-manamind hover:bg-gray-100"
        >
          Découvrir Manamind
        </Button>
      </div>
    </section>
  );
};