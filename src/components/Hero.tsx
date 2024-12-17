import { Button } from "./ui/button";

export const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-manamind to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMDAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjRkZGIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGRiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMTQ0MCAwaC0xNDQwdjUwMGgxNDQweiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-50 animate-pulse"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-12 animate-fadeIn text-center">
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/14f2e929-438f-43a0-8775-a531a8bbdba5.png"
              alt="Manamind Logo"
              className="h-32 md:h-40 animate-fadeIn hover:scale-105 transition-all duration-300"
            />
          </div>
          <p className="text-xl md:text-3xl text-white leading-relaxed font-quattrocento">
            L'expérience d'apprentissage innovante qui booste l'engagement et les compétences
          </p>
          <Button
            onClick={scrollToAbout}
            size="lg"
            className="bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-quattrocento px-8 py-6 h-auto"
          >
            J'en apprends plus !
          </Button>
        </div>
      </div>
    </section>
  );
};