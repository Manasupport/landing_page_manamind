// src/pages/webinaires.tsx
import { useEffect, useState } from "react";
import { StickyNav } from "@/components/StickyNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Webinar = {
  id: string;
  title: string;
  youtubeId: string;
  duration?: string;
};

const WEBINARS: Webinar[] = [
  {
    id: "design-pedagogique-competences",
    title:
      "Webinaire – Outiller le design pédagogique & l’approche par compétences",
    youtubeId: "n24OkLOX6GY",
    duration: "45 min",
  },
];

const BRAND = "#71c088"; // ✅ vert brand

const getThumb = (ytId: string) =>
  `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
const getEmbed = (ytId: string) =>
  `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;

export default function Webinaires() {
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Webinaires - Manamind";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f7fafc] text-[#0c3d5e]">
      <StickyNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-[#71c088] to-manamind-dark opacity-25 blur-3xl" />
          <div className="absolute -bottom-32 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-manacademy to-secondary opacity-15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#71c088]/10 text-[#71c088] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Video className="h-4 w-4" />
            <span>Webinaires Manamind</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            Replays & Sessions en direct
          </h1>
          <p className="text-lg text-[#0c3d5e]/80 max-w-2xl mx-auto leading-relaxed">
            Découvrez nos webinaires dédiés au design pédagogique, aux compétences
            et aux meilleures pratiques d’apprentissage.
          </p>
        </div>
      </section>

      {/* Liste des webinaires */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
          {WEBINARS.map((w) => (
            <Card
              key={w.id}
              className="group overflow-hidden rounded-3xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-[0_10px_30px_-10px_rgba(12,61,94,0.15)] hover:shadow-[0_18px_40px_-12px_rgba(113,192,136,0.3)] transition-all duration-500"
            >
              {/* vignette */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={getThumb(w.youtubeId)}
                  alt={w.title}
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700"
                  loading="lazy"
                />
                {/* overlay gradient lisibilité */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                {/* durée (si fournie) */}
                {w.duration && (
                  <span className="absolute top-3 right-3 z-10 text-xs text-white/95 bg-black/60 backdrop-blur px-2 py-1 rounded">
                    {w.duration}
                  </span>
                )}
                {/* play brand */}
                <button
                  onClick={() => setOpenVideoId(w.youtubeId)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label={`Lire ${w.title}`}
                >
                  <span
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105"
                    style={{ backgroundColor: BRAND }}
                  >
                    <Play className="h-8 w-8 text-white ml-1" />
                  </span>
                </button>
              </div>

              {/* contenu */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold leading-snug">
                  {w.title}
                </h3>

                <div className="mt-5">
                  <Button
                    onClick={() => setOpenVideoId(w.youtubeId)}
                    className="h-11 rounded-xl font-semibold shadow-sm active:scale-[0.99] transition-transform"
                    style={{ backgroundColor: BRAND, color: "white" }}
                  >
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
            <DialogTitle className="text-[#71c088]">Webinaire Manamind</DialogTitle>
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
