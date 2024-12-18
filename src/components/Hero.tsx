import { Button } from "./ui/button";

export const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center bg-manamind relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMDAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjRkZGIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGRiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMTQ0MCAwaC0xNDQwdjUwMGgxNDQweiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-50"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 font-telegraph">
            Manamind
          </h1>
          <p className="text-3xl md:text-4xl text-white leading-relaxed font-telegraph opacity-90 mb-8">
            L'expérience d'apprentissage innovante qui booste l'engagement et les compétences
          </p>
          <Button
            onClick={scrollToAbout}
            size="lg"
            className="bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6 h-auto font-telegraph"
          >
            J'en apprends plus !
          </Button>
        </div>
      </div>
    </section>
  );
};