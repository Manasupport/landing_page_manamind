// src/pages/tutorials-student.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StickyNav } from "@/components/StickyNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft, Clock, Eye, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Tutorial = {
  id: string;
  title: string;
  summary: string;
  duration: string;
  views: string;
  youtubeId: string;
};

const BRAND = "#71c088"; // ✅ couleur principale

// IDs YouTube
const YT_ETUDIANT_PARCOURS = "4Yf6bdqeWyw";
const YT_SOFT_SKILLS = "tXhS4CT9tg8";

const StudentTutorials = () => {
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Tutoriels Étudiants - Manamind";
  }, []);

  const tutorials: Tutorial[] = [
    {
      id: "comprendre-parcours",
      title: "Comprendre votre parcours",
      summary:
        "Se repérer sur la plateforme, accéder aux tâches et livrables, suivre ses compétences.",
      duration: "3 min 04 s",
      views: "1,3 k",
      youtubeId: YT_ETUDIANT_PARCOURS,
    },
    {
      id: "module-soft-skills",
      title: "Module Soft Skills",
      summary:
        "Réaliser des évaluations de compétences comportementales (auto/entre pairs).",
      duration: "4 min 29 s",
      views: "856",
      youtubeId: YT_SOFT_SKILLS,
    },
  ];

  const getThumb = (ytId: string) =>
    `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  const getEmbed = (ytId: string) =>
    `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9fbfa] text-[#0c3d5e]">
      <StickyNav />

      {/* Fil d'ariane */}
      <div className="pt-20 pb-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="hover:bg-transparent">
            <Link to="/tutorials" className="text-[#0c3d5e]/70 hover:text-[#0c3d5e]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux tutoriels
            </Link>
          </Button>
        </div>
      </div>

      {/* En-tête */}
      <section className="relative overflow-hidden pb-10 pt-6">
        {/* halos */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-[#71c088] to-manamind-dark opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-manacademy to-secondary opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#71c088]/10 text-[#71c088] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Tutoriels Étudiants</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Prenez en main{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0c3d5e] via-[#71c088] to-[#0c3d5e]">
              Manamind
            </span>
          </h1>

          <p className="text-lg text-[#0c3d5e]/80 max-w-2xl mx-auto leading-relaxed">
            Des vidéos courtes et claires pour maîtriser votre parcours, comprendre vos tâches
            et suivre vos progrès.
          </p>
        </div>
      </section>

      {/* Liste des tutoriels */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {tutorials.map((tutorial, index) => (
              <Card
                key={tutorial.id}
                className="group overflow-hidden rounded-3xl border border-black/5 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-[0_10px_30px_-10px_rgba(12,61,94,0.15)] hover:shadow-[0_18px_40px_-12px_rgba(113,192,136,0.3)] transition-all duration-500"
              >
                <div className="md:flex">
                  {/* Vignette */}
                  <div className="md:w-1/3 relative">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={getThumb(tutorial.youtubeId)}
                        alt={`Miniature ${tutorial.title}`}
                        className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                      {/* Play bouton */}
                      <button
                        onClick={() => setOpenVideoId(tutorial.youtubeId)}
                        className="absolute inset-0 flex items-center justify-center"
                        aria-label={`Lire ${tutorial.title}`}
                      >
                        <span
                          className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105"
                          style={{ backgroundColor: BRAND }}
                        >
                          <Play className="h-8 w-8 text-white ml-1" />
                        </span>
                      </button>
                      {/* Durée */}
                      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {tutorial.duration}
                      </div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#71c088]/10 text-[#71c088]">
                        Tutoriel {index + 1}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-[#0c3d5e]/70">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {tutorial.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {tutorial.views}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold leading-snug mb-2">
                      {tutorial.title}
                    </h3>

                    <p className="text-[#0c3d5e]/80 mb-4">{tutorial.summary}</p>

                    <Button
                      className="h-10 rounded-xl font-semibold shadow-sm active:scale-[0.99] transition-transform"
                      style={{ backgroundColor: BRAND, color: "white" }}
                      onClick={() => setOpenVideoId(tutorial.youtubeId)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Voir le tutoriel
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal vidéo */}
      <Dialog open={!!openVideoId} onOpenChange={() => setOpenVideoId(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-[#71c088]">Tutoriel Manamind</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {openVideoId && (
              <iframe
                className="w-full h-full"
                src={getEmbed(openVideoId)}
                title="Vidéo tutoriel Manamind"
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
};

export default StudentTutorials;
