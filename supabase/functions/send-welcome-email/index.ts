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
          
          <p><strong>Votre compte sera paramétré dans les 24 heures ouvrées.</strong> Vous recevrez un email avec le lien permettant d'accéder à votre espace et de débuter l'expérience Manamind.</p>
          
          <p>⚠️ <strong>Utilisez impérativement l’adresse e-mail avec laquelle vous vous êtes inscrit(e) pour finaliser la création de votre compte.</strong></p>
          <p>📌 <strong>Le mot de passe que vous choisirez sera définitif.</strong> Pensez à bien le mémoriser.</p>
          
          <p>En attendant, découvrez nos tutoriels et ressources dans le Centre de Ressources :</p>
          <p><a href="https://manamind.notion.site/c9d8acd29d8f464e9cbf786d4ab6fb95?v=aa38325d3c854f74b277cf850267d4a7&pvs=74" style="color: #71c088;">➡️ Accéder au Centre de Ressources</a></p>
          
          <p>Besoin d'aide ? Contactez-nous à <a href="mailto:contact@mana.fr">contact@mana.fr</a> ou via l'icône de chat en bas à gauche.</p>

          <p>Merci encore pour votre confiance, et bienvenue dans l'univers Manamind !<br>
          <strong>L'équipe Manamind</strong></p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

          <h2>Hello ${firstName},</h2>
          
          <p>Congratulations and welcome to the Manamind community! 🎉 We are thrilled to have you on board. With Manamind, you will be able to create and manage engaging, tailor-made learning journeys.</p>
          
          <p><strong>Your account will be set up within 24 business hours.</strong> You will receive an email with a link to access your space and start your Manamind experience.</p>

          <p>⚠️ <strong>Please make sure to use the same email address you registered with to complete your account setup.</strong></p>
          <p>📌 <strong>The password you choose will be your permanent login password.</strong> Make sure to remember it.</p>

          <p>Meanwhile, check out our tutorials and resources in the Resource Center:</p>
          <p><a href="https://manamind.notion.site/c9d8acd29d8f464e9cbf786d4ab6fb95?v=aa38325d3c854f74b277cf850267d4a7&pvs=74" style="color: #71c088;">➡️ Access the Resource Center</a></p>
          
          <p>Need help? Contact us at <a href="mailto:contact@mana.fr">contact@mana.fr</a> or via the chat icon at the bottom left of the page.</p>

          <p>Thank you again for your trust, and welcome to the Manamind universe!<br>
          <strong>The Manamind Team</strong></p>
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