// src/pages/tutorials.tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { StickyNav } from "@/components/StickyNav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, ArrowLeft, Sparkles } from "lucide-react";

const ResourcesTutorials = () => {
  useEffect(() => {
    document.title = "Tutoriels Manamind";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8fafc] text-[#0c3d5e]">
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

      {/* Hero */}
      <section className="relative overflow-hidden pb-10 pt-8">
        {/* halos */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-[#71c088] to-[#00a5b4] opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-[#0c3d5e] to-[#71c088] opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#71c088]/10 text-[#0c3d5e] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Tutoriels & bonnes pratiques</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Tutoriels{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0c3d5e] via-[#00a5b4] to-[#71c088]">
              Manamind
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#0c3d5e]/80 max-w-2xl mx-auto leading-relaxed">
            Choisissez votre parcours d’apprentissage et découvrez Manamind en
            vidéos immersives 🚀
          </p>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            {/* Étudiant */}
            <Card className="flex flex-col justify-between group relative overflow-hidden rounded-3xl border border-[#0c3d5e]/10 bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
              <CardHeader className="relative z-10 text-center pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#71c088]/15 flex items-center justify-center shadow-inner">
                  <GraduationCap className="h-8 w-8 text-[#0c3d5e]" />
                </div>
                <CardTitle className="text-2xl font-semibold">Espace Étudiant</CardTitle>
                <CardDescription className="text-base text-[#0c3d5e]/70">
                  Naviguer, s’auto-évaluer et suivre sa progression
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 flex flex-col flex-grow justify-between">
                <Button
                  asChild
                  size="lg"
                  className="w-full mt-auto rounded-xl bg-gradient-to-r from-[#71c088] to-[#00a5b4] text-white font-semibold shadow-md hover:scale-[1.02] transition-transform"
                >
                  <Link to="/tutorials/student">Commencer côté étudiant</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Enseignant */}
            <Card className="flex flex-col justify-between group relative overflow-hidden rounded-3xl border border-[#0c3d5e]/10 bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
              <CardHeader className="relative z-10 text-center pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00a5b4]/15 flex items-center justify-center shadow-inner">
                  <Users className="h-8 w-8 text-[#0c3d5e]" />
                </div>
                <CardTitle className="text-2xl font-semibold">Espace Enseignant</CardTitle>
                <CardDescription className="text-base text-[#0c3d5e]/70">
                  Créer des parcours engageants et piloter vos étudiants
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 flex flex-col flex-grow justify-between">
                <Button
                  asChild
                  size="lg"
                  className="w-full mt-auto rounded-xl bg-gradient-to-r from-[#0c3d5e] to-[#00a5b4] text-white font-semibold shadow-md hover:scale-[1.02] transition-transform"
                >
                  <Link to="/tutorials/teacher">Commencer côté enseignant</Link>
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
