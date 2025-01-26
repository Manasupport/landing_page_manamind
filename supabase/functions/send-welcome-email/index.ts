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
      subject: "Merci pour votre inscription à Manamind - En attente d'activation",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Bonjour ${firstName},</h2>
          
          <p>Merci de rejoindre la communauté Manamind ! Nous sommes ravis de vous accueillir parmi nos utilisateurs. 🎉</p>
          
          <p>Votre inscription a bien été prise en compte.</p>
          
          <h3>🛠 Prochaine étape :</h3>
          
          <p>Votre compte est actuellement en cours de création par nos équipes. Vous recevrez un email dans les prochaines 24 heures ouvrées contenant un lien d'accès à votre espace Manamind.</p>
          
          <p>En attendant, si vous avez des questions ou si vous souhaitez en savoir plus sur l'utilisation de Manamind, n'hésitez pas à consulter notre <a href="https://manamind.notion.site/c9d8acd29d8f464e9cbf786d4ab6fb95?v=aa38325d3c854f74b277cf850267d4a7&pvs=74" style="color: #71c088;">centre de ressources</a> ou à nous contacter directement.</p>
          
          <p>Nous avons hâte de vous voir explorer les possibilités infinies que Manamind offre pour transformer vos apprentissages en expériences mémorables.</p>
          
          <p>À très bientôt,<br>L'équipe Manamind</p>
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