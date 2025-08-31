// src/pages/teacher-tutorials.tsx
import { useState, useEffect } from "react";
import { StickyNav } from "@/components/StickyNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft, Clock, Eye, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
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
  isPremium?: boolean;
};

const BRAND = "#71c088"; // ✅ couleur principale

const TeacherTutorials = () => {
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Tutoriels Enseignants - Manamind";
  }, []);

  const tutorials: Tutorial[] = [
    {
      id: "edit-path",
      title: "Éditer votre parcours",
      summary:
        "Créer et personnaliser des parcours d’apprentissage pour vos étudiants.",
      duration: "12 min",
      views: "2,1 k",
      youtubeId: "NvEDsW7R-RY",
    },
    {
      id: "project-creation",
      title: "Créer un projet & inviter des membres",
      summary:
        "Guide pas à pas pour créer un projet et inviter les membres de l’équipe.",
      duration: "8 min",
      views: "1,8 k",
      youtubeId: "cu5404jIffc",
    },
    {
      id: "monitor-progress",
      title: "Suivre & évaluer la progression",
      summary:
        "Suivre l’avancement des étudiants et fournir un feedback pertinent.",
      duration: "15 min",
      views: "1,5 k",
      youtubeId: "UYCBPCP_Tno",
    },
    {
      id: "dashboard-workspace",
      title: "Piloter avec le Dashboard Workspace (Premium)",
      summary:
        "Fonctionnalités avancées de pilotage de projets pour aller plus loin.",
      duration: "10 min",
      views: "923",
      youtubeId: "K0WnQ8DDauQ",
      isPremium: true,
    },
    {
      id: "soft-skills-setup",
      title: "Configurer le module Soft Skills",
      summary:
        "Paramétrer les évaluations comportementales pour une vision complète.",
      duration: "7 min",
      views: "1,1 k",
      youtubeId: "XdbYMdI2dW0",
    },
  ];

  const getThumb = (ytId: string) =>
    `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  const getEmbed = (ytId: string) =>
    `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9fbfa] text-[#0c3d5e]">
      <StickyNav />

      {/* Fil d'Ariane */}
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
        {/* halos doux */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-[#71c088] to-manamind-dark opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-manacademy to-secondary opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#71c088]/10 text-[#71c088] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Tutoriels Enseignants</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Concevez, pilotez et{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0c3d5e] via-[#71c088] to-[#0c3d5e]">
              faites progresser
            </span>
            {" "}vos cohortes
          </h1>

          <p className="text-lg text-[#0c3d5e]/80 max-w-2xl mx-auto leading-relaxed">
            Des vidéos claires pour créer des parcours engageants, gérer vos groupes
            et suivre les compétences avec efficacité.
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
                  {/* Vignette vidéo */}
                  <div className="md:w-1/3 relative">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={getThumb(tutorial.youtubeId)}
                        alt={`Miniature ${tutorial.title}`}
                        className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* overlay lisibilité */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                      {/* Play brand */}
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

                      {/* Durée + Premium */}
                      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {tutorial.duration}
                      </div>
                      {tutorial.isPremium && (
                        <div className="absolute top-3 left-3 bg-[#f59e0b] text-white text-xs px-2 py-1 rounded font-medium shadow">
                          Premium
                        </div>
                      )}
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

      {/* Modal YouTube */}
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

export default TeacherTutorials;
