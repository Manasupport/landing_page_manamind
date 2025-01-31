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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received welcome email request");
    const { firstName, email }: WelcomeEmailRequest = await req.json();
    console.log("Email data:", { firstName, email });

    const emailResponse = await resend.emails.send({
      from: "Manamind <onboarding@resend.dev>",
      to: [email],
      subject: "Bienvenue sur Manamind - Votre compte est en cours de paramétrage !",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Bonjour ${firstName},</h2>
          
          <p>Félicitations et bienvenue dans la communauté Manamind ! 🎉 Nous sommes ravis de vous compter parmi les Manaminders. Avec Manamind, vous allez pouvoir créer et animer des parcours d'apprentissage engageants et sur mesure.</p>
          
          <p><strong>Votre compte sera paramétré dans les 24 heures ouvrées.</strong> Vous recevrez un email avec le lien permettant d'accéder à votre espace et de débuter l'expérience Manamind.</p>
          
          <p>⚠️ <strong>Utilisez impérativement l'adresse e-mail avec laquelle vous vous êtes inscrit(e) pour finaliser la création de votre compte.</strong></p>
          <p>📌 <strong>Le mot de passe que vous choisirez sera définitif.</strong> Pensez à bien le mémoriser.</p>
          
          <p>En attendant, découvrez nos tutoriels et ressources dans le Centre de Ressources :</p>
          <p><a href="https://manamind.notion.site/c9d8acd29d8f464e9cbf786d4ab6fb95?v=aa38325d3c854f74b277cf850267d4a7&pvs=74" style="color: #71c088;">➡️ Accéder au Centre de Ressources</a></p>
          
          <p>Besoin d'aide ? Contactez-nous à <a href="mailto:contact@mana.fr">contact@mana.fr</a> ou via l'icône de chat en bas à gauche.</p>

          <p>Merci encore pour votre confiance, et bienvenue dans l'univers Manamind !<br>
          <strong>L'équipe Manamind</strong></p>
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