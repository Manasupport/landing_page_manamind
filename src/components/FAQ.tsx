import React from "react";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

export const FAQ = () => {
  const navigate = useNavigate();

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0c3d5e]">
          Questions fréquentes
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">

            {/* Question 1 */}
            <AccordionItem value="item-1" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Qu’est-ce que Manamind ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Manamind est une application pédagogique qui permet de concevoir, animer et suivre des programmes de formation interactifs. 
                Que vous soyez une école, une université ou une entreprise, Manamind aide à créer des expériences d’apprentissage sur mesure pour engager les apprenants et maximiser l’impact des formations. 🎓🚀
              </AccordionContent>
            </AccordionItem>

            {/* Question 2 */}
            <AccordionItem value="item-2" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">À qui s’adresse Manamind ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Manamind est conçu pour :
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li><strong>Les encadrants</strong> : enseignants, professeurs, formateurs ou tuteurs.</li>
                  <li><strong>Les apprenants</strong> : étudiants, professionnels en formation continue ou en reconversion.</li>
                  <li><strong>Les institutions</strong> : écoles, universités, entreprises et centres de formation.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Question 3 */}
            <AccordionItem value="item-3" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Puis-je personnaliser mes parcours de formation ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Oui ! Manamind permet d’intégrer vos propres contenus (vidéos, documents, quiz) et de collaborer avec des tuteurs et formateurs pour créer une expérience sur mesure.
              </AccordionContent>
            </AccordionItem>

            {/* Question 4 */}
            <AccordionItem value="item-4" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Comment souscrire à Manamind ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                C'est simple ! Cliquez sur <strong>"Je m'abonne"</strong>, choisissez votre offre, et nous nous occupons du reste. Notre équipe vous accueillera avec un café virtuel ☕️ 😊.
              </AccordionContent>
            </AccordionItem>

            {/* Question 5 */}
            <AccordionItem value="item-5" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Est-ce qu’on peut tester avant de s’engager ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Oui ! Avec notre <a href="/#pricing" className="text-[#71c088] font-semibold hover:underline">Plan Starter</a> gratuit, vous pouvez créer un parcours et inviter jusqu’à 50 participants. 
                C’est une excellente façon de tester la plateforme sans engagement. 🚀
              </AccordionContent>
            </AccordionItem>

            {/* Question 6 */}
            <AccordionItem value="item-6" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Existe-t-il une version gratuite ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Oui, notre <a href="/#pricing" className="text-[#71c088] font-semibold hover:underline">Plan Starter</a> est entièrement gratuit, sans engagement et sans frais cachés. 
                Testez librement Manamind et découvrez toutes ses fonctionnalités ! 🎉
              </AccordionContent>
            </AccordionItem>

            {/* Question 7 */}
            <AccordionItem value="item-7" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Comment installer et configurer Manamind ?</span>
              </AccordionTrigger>
             

```tsx
              <AccordionContent className="pt-4 text-gray-600">
                Manamind est 100% en ligne, aucune installation nécessaire. Une fois votre compte créé, vous pouvez immédiatement commencer à concevoir vos parcours. 
                Notre équipe est également disponible pour vous accompagner dans la prise en main. ✨
              </AccordionContent>
            </AccordionItem>

            {/* Question 8 */}
            <AccordionItem value="item-8" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Comment contacter l’assistance en cas de besoin ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Notre chat intégré (la petite bulle verte en bas à droite) est accessible à tout moment, et bonne nouvelle : ce n’est pas un robot ! 💬
                Un membre de notre équipe vous répondra rapidement pour vous aider. 🚀
              </AccordionContent>
            </AccordionItem>

            {/* Question 9 */}
            <AccordionItem value="item-9" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Et si on a déjà un LMS (Learning Management System) ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Aucun souci ! Manamind peut s’intégrer avec votre système existant grâce à nos connecteurs intelligents. Nous facilitons la transition sans casse-tête. 💡
              </AccordionContent>
            </AccordionItem>

            {/* Question 10 */}
            <AccordionItem value="item-10" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Que se passe-t-il si je souhaite résilier mon abonnement ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Vous pouvez résilier à tout moment via votre espace personnel ou en contactant notre support. Nous vous accompagnons dans la démarche et vous recevrez une confirmation par e-mail. 😊
              </AccordionContent>
            </AccordionItem>

            {/* Question 11 */}
            <AccordionItem value="item-11" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Le logiciel est-il conforme au RGPD et que deviennent mes données après la résiliation ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Oui, Manamind est entièrement conforme au RGPD. Vos données sont stockées en toute sécurité pendant la durée de votre abonnement + un délai de 2 ans. 
                Si votre compte reste inactif pendant cette période, elles seront automatiquement supprimées. 🔐
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </div>
    </section>
  );
};