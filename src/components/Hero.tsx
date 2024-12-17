import { Button } from "./ui/button";

export const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center bg-manamind relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMDAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjRkZGIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGRiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMTQ0MCAwaC0xNDQwdjUwMGgxNDQweiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-50"></div>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 space-y-8 animate-fadeIn">
          <div className="flex justify-start">
            <img
              src="/lovable-uploads/14f2e929-438f-43a0-8775-a531a8bbdba5.png"
              alt="Manamind Logo"
              className="h-32 md:h-40 animate-fadeIn hover:scale-105 transition-all duration-300"
            />
          </div>
          <p className="text-xl md:text-3xl text-white leading-relaxed text-left">
            L'expérience d'apprentissage innovante qui booste l'engagement et les compétences
          </p>
          <Button
            onClick={scrollToAbout}
            size="lg"
            className="bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6 h-auto"
          >
            J'en apprends plus !
          </Button>
        </div>
        <div className="lg:w-1/2 animate-fadeIn">
          <div className="relative">
            <img
              src="/lovable-uploads/8f01efe9-ebab-483a-95e5-166a3803975a.png"
              alt="Dashboard Preview"
              className="w-full rounded-lg shadow-2xl transform hover:scale-105 transition-duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};