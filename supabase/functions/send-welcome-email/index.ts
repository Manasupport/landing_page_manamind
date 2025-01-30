import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  firstName: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, email }: WelcomeEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Manamind <onboarding@resend.dev>",
      to: [email],
      subject: "Bienvenue sur Manamind - Votre compte est en cours de paramétrage !",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Bonjour ${firstName},</h2>
          
          <p>Félicitations et bienvenue dans la communauté Manamind ! 🎉 Nous sommes ravis de vous compter parmi les Manaminders. Avec Manamind, vous allez pouvoir créer et animer des parcours d'apprentissage engageants et sur mesure.</p>
          
          <p>Votre compte sera paramétré dans les 24 heures ouvrées. Vous allez recevoir un email contenant le lien pour accéder à votre espace et débuter l'expérience Manamind.</p>
          
          <p>En attendant, vous pouvez déjà découvrir nos tutoriels et ressources dans le Centre de ressources pour prendre en main la plateforme et vous familiariser avec ses fonctionnalités:</p>
          
          <p><a href="https://manamind.notion.site/c9d8acd29d8f464e9cbf786d4ab6fb95?v=aa38325d3c854f74b277cf850267d4a7&pvs=74" style="color: #71c088;">➡️ Accéder au Centre de Ressources</a></p>
          
          <p>Nous restons disponibles pour répondre à toutes vos questions.<br>
          N'hésitez pas à nous contacter à tout moment à l'adresse contact@mana.fr</p>
          
          <p>Merci encore pour votre confiance, et bienvenue dans l'univers Manamind !<br>
          L'équipe Manamind</p>
        </div>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);