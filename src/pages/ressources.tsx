// src/pages/ressources.tsx
import Head from "next/head";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Sparkles, Video } from "lucide-react";
import { useState } from "react";

const Ressources = () => {
  const [openPdf, setOpenPdf] = useState<string | null>(null);
  const handleOpenPdf = (path: string) => setOpenPdf(path);

  const badges = ["Designed for clarity", "Actionable resources", "Always up to date"];

  return (
    <>
      <Head>
        <title>Centre de ressources Manamind</title>
        <meta
          name="description"
          content="Tutoriels, webinaires et ressources sélectionnées pour bien utiliser Manamind."
        />
        <link rel="canonical" href="https://www.manamind.fr/ressources" />
      </Head>

      <div className="min-h-screen bg-background text-[#0c3d5e]">
        <Navigation />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-24">
          {/* halos */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full bg-gradient-to-br from-manamind to-manamind-dark opacity-30 blur-3xl" />
            <div className="absolute -bottom-32 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-manacademy to-secondary opacity-20 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 text-center">
            {/* badge décoratif */}
            <div className="inline-flex items-center gap-2 bg-manamind/10 text-manamind-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Resources & Insights</span>
            </div>

            {/* titre principal */}
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Centre de ressources{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0c3d5e] via-manamind to-[#0c3d5e]">
                Manamind
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
              Votre hub pour maîtriser Manamind et le pilotage de vos parcours 🚀
            </p>
            <p className="text-lg text-[#0c3d5e]/80 max-w-2xl mx-auto leading-relaxed">
              Tutoriels, webinaires et accès rapide aux ressources Mana.
            </p>

            {/* badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className="rounded-full border border-[#0c3d5e]/15 bg-[#0c3d5e]/5 px-3 py-1 text-sm text-[#0c3d5e]/90"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Main Cards */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Tutoriels pour Manamind */}
              <Card className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <CardHeader className="relative z-10 text-center pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-manacademy to-manacademy-dark flex items-center justify-center shadow-md">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Tutoriels pour Manamind</CardTitle>
                  <CardDescription className="text-base text-[#0c3d5e]/80">
                    Pas à pas pour configurer vos parcours, suivre les acquis et piloter vos
                    sessions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#0c3d5e] via-manamind to-secondary text-white hover:opacity-90"
                  >
                    <Link href="/resources/academic">Parcourir les tutoriels</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Webinaire */}
              <Card className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <CardHeader className="relative z-10 text-center pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-manamind to-manamind-dark flex items-center justify-center shadow-md">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Webinaire</CardTitle>
                  <CardDescription className="text-base text-[#0c3d5e]/80">
                    Replays et inscriptions aux prochaines sessions de démonstration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#0c3d5e] via-manamind to-secondary text-white hover:opacity-90"
                  >
                    <Link href="/webinaire">Voir les webinaires</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Carte pleine largeur : Les ressources Mana */}
              <Card className="md:col-span-2 group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <CardHeader className="relative z-10 text-center pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-manamind to-manamind-dark flex items-center justify-center shadow-md">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Les ressources Mana</CardTitle>
                  <CardDescription className="text-base text-[#0c3d5e]/80">
                    Analyses, méthodes et publications sélectionnées par l’équipe Mana.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#0c3d5e] via-manamind to-secondary text-white hover:opacity-90"
                  >
                    <a
                      href="https://mana.fr/resources"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Accéder à mana.fr/resources
                    </a>
                  </Button>
                </CardContent>

                {/* arrière-plan décoratif léger */}
                <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-manamind via-transparent to-transparent" />
              </Card>
            </div>
          </div>
        </section>

        {/* Liens légaux simples */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#0c3d5e]/80">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <button
                  type="button"
                  className="hover:text-primary transition-colors"
                  onClick={() => handleOpenPdf("/pdfs/FR_EN_CGU_202409024.pdf")}
                >
                  Consulter nos Conditions Générales
                </button>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <button
                  type="button"
                  className="hover:text-primary transition-colors"
                  onClick={() =>
                    handleOpenPdf("/pdfs/FR_EN_POLITIQUE-DE-PROTECTION-DES-DONNEES.pdf")
                  }
                >
                  Politique de confidentialité
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Aperçu PDF */}
        {openPdf && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setOpenPdf(null)}
          >
            <div
              className="bg-background rounded-xl w-full max-w-5xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-lg font-semibold">Aperçu du document</h2>
                <button
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setOpenPdf(null)}
                >
                  Fermer
                </button>
              </div>
              <div className="aspect-video w-full">
                <iframe className="w-full h-full" src={openPdf} title="PDF preview" />
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Ressources;
