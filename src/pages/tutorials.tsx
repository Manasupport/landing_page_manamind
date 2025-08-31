// src/pages/tutorials.tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { StickyNav } from "@/components/StickyNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, ArrowLeft, Sparkles } from "lucide-react";

const ResourcesTutorials = () => {
  useEffect(() => {
    document.title = "Tutoriels Manamind";
  }, []);

  return (
    <div className="min-h-screen bg-background text-[#0c3d5e]">
      <StickyNav />

      {/* Fil d'ariane */}
      <div className="pt-20 pb-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="hover:bg-transparent">
            <Link to="/ressources" className="text-[#0c3d5e]/70 hover:text-[#0c3d5e]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au centre de ressources
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero doux & élégant */}
      <section className="relative overflow-hidden pb-4 pt-8">
        {/* halos */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-manamind to-manamind-dark opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-manacademy to-secondary opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-manamind/10 text-manamind-dark px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Tutoriels & bonnes pratiques</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Choisissez votre{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0c3d5e] via-manamind to-[#0c3d5e]">
              parcours d’apprentissage
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#0c3d5e]/80 max-w-2xl mx-auto leading-relaxed">
            Des vidéos courtes, structurées et actionnables pour prendre en main Manamind,
            côté apprenant ou côté enseignant.
          </p>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Étudiant */}
            <Card
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-[0_10px_30px_-10px_rgba(12,61,94,0.15)] hover:shadow-[0_18px_40px_-12px_rgba(12,61,94,0.25)] transition-all duration-500"
            >
              {/* halo */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(70%_70%_at_50%_0%,rgba(16,185,129,0.10),transparent)]" />
              <CardHeader className="relative z-10 text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg ring-1 ring-white/40">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Espace Étudiant</CardTitle>
                <CardDescription className="text-[#0c3d5e]/80">
                  Naviguer, réaliser ses tâches et suivre sa progression en douceur.
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 pt-2">
                <ul className="grid gap-2 text-sm text-[#0c3d5e]/85 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Découvrir son parcours
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Auto-évaluations & compétences
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Suivre l’avancement
                  </li>
                </ul>

                <Button
                  asChild
                  size="lg"
                  className="w-full h-11 rounded-xl font-semibold shadow-sm active:scale-[0.99] transition-transform bg-gradient-to-r from-green-400 to-emerald-600 text-white hover:opacity-90"
                >
                  <Link to="/tutorials/student" aria-label="Accéder aux tutoriels étudiants">
                    Commencer à apprendre
                    <GraduationCap className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Enseignant */}
            <Card
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-[0_10px_30px_-10px_rgba(12,61,94,0.15)] hover:shadow-[0_18px_40px_-12px_rgba(12,61,94,0.25)] transition-all duration-500"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(70%_70%_at_50%_0%,rgba(12,61,94,0.10),transparent)]" />
              <CardHeader className="relative z-10 text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-manadvise to-manadvise-dark flex items-center justify-center shadow-lg ring-1 ring-white/40">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Espace Enseignant</CardTitle>
                <CardDescription className="text-[#0c3d5e]/80">
                  Construire des parcours engageants et piloter ses cohortes.
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 pt-2">
                <ul className="grid gap-2 text-sm text-[#0c3d5e]/85 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-manadvise" /> Création de parcours & ressources
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-manadvise" /> Gestion des étudiants & groupes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-manadvise" /> Suivi des acquis & tableaux de bord
                  </li>
                </ul>

                <Button
                  asChild
                  size="lg"
                  className="w-full h-11 rounded-xl font-semibold shadow-sm active:scale-[0.99] transition-transform bg-gradient-to-r from-manadvise to-secondary text-white hover:opacity-90"
                >
                  <Link to="/tutorials/teacher" aria-label="Accéder aux tutoriels enseignants">
                    Démarrer côté enseignant
                    <Users className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesTutorials;
