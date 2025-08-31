// src/pages/webinaires.tsx
import { useEffect, useState } from "react";
import { StickyNav } from "@/components/StickyNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Video } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Webinar = {
  id: string;
  title: string;
  youtubeId: string;
  duration?: string; // optionnel si tu veux l'afficher sur la vignette
};

const WEBINARS: Webinar[] = [
  {
    id: "design-pedagogique-competences",
    title: "Webinaire – Outiller le design pédagogique & l’approche par compétences",
    youtubeId: "n24OkLOX6GY",
  },
];

const getThumb = (ytId: string) => `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
const getEmbed = (ytId: string) =>
  `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;

export default function Webinaires() {
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Webinaires - Manamind";
  }, []);

  return (
    <div className="min-h-screen bg-background text-[#0c3d5e]">
      <StickyNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-manamind to-manamind-dark opacity-30 blur-3xl" />
          <div className="absolute -bottom-32 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-manacademy to-secondary opacity-20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-manamind/10 text-manamind-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Video className="h-4 w-4" />
            <span>Webinaires Manamind</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            Replays & Sessions en direct
          </h1>
          <p className="text-lg text-[#0c3d5e]/80 max-w-2xl mx-auto leading-relaxed">
            Découvrez nos webinaires dédiés au design pédagogique, aux compétences et aux bonnes pratiques d’apprentissage.
          </p>
        </div>
      </section>

      {/* Liste des webinaires */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2">
          {WEBINARS.map((w) => (
            <Card key={w.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img
                  src={getThumb(w.youtubeId)}
                  alt={w.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <button
                  onClick={() => setOpenVideoId(w.youtubeId)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label={`Lire ${w.title}`}
                >
                  <span className="w-16 h-16 rounded-full bg-manamind/90 flex items-center justify-center shadow-md hover:bg-manamind transition-colors">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </span>
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{w.title}</h3>
                <div className="mt-4">
                  <Button onClick={() => setOpenVideoId(w.youtubeId)}>
                    <Play className="mr-2 h-4 w-4" />
                    Regarder le replay
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Modal YouTube */}
      <Dialog open={!!openVideoId} onOpenChange={() => setOpenVideoId(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-[#0c3d5e]">Webinaire Manamind</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {openVideoId && (
              <iframe
                className="w-full h-full"
                src={getEmbed(openVideoId)}
                title="Webinaire Manamind"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
