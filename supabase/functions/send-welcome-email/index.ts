import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

if (!RESEND_API_KEY) {
  console.error("⚠️ ERROR: RESEND_API_KEY is not set.");
}

const resend = new Resend(RESEND_API_KEY);

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
  console.log("📩 Starting welcome email handler");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("📥 Parsing request body...");
    const { firstName, email }: WelcomeEmailRequest = await req.json();
    console.log("✅ Received request data:", { firstName, email });

    if (!firstName || !email) {
      console.error("❌ ERROR: Missing required fields");
      throw new Error("All fields are required");
    }

    console.log("✉️ Sending email via Resend...");
    const emailResponse = await resend.emails.send({
      from: "Manamind <onboarding@resend.dev>",
      to: [email],
      subject: "Bienvenue sur Manamind – Votre compte est en cours de paramétrage !",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto;">
          <div style="text-align: center;">
            <img src="/lovable-uploads/Manamind.png" alt="Manamind Logo" width="150" />
            <h2 style="color: #2C3E50;">Bienvenue sur Manamind, ${firstName} !</h2>
          </div>
          <div style="background: #F7F9FC; padding: 15px; border-radius: 10px; margin-top: 20px;">
            <p>Félicitations et bienvenue dans la communauté Manamind ! 🎉</p>
            <p>Nous sommes ravis de vous compter parmi les Manaminders. Avec Manamind, vous allez pouvoir concevoir et animer des parcours d’apprentissage engageants et sur mesure.</p>

            <h3>🛠️ Paramétrage de votre compte</h3>
            <p>Si vous avez <strong>finalisé votre paiement</strong>, votre compte est en cours de configuration et sera paramétré sous <strong>24 heures ouvrées</strong>. Vous recevrez un email contenant votre lien d’accès pour débuter votre expérience Manamind.</p>

            <h3>📚 Découvrez Manamind dès maintenant !</h3>
            <p>En attendant, vous pouvez consulter nos tutoriels et ressources pour vous familiariser avec la plateforme :</p>
            <p>
              ➡️ <a href="https://manamind.notion.site/c9d8acd29d8f464e9cbf786d4ab6fb95?v=aa38325d3c854f74b277cf850267d4a7&pvs=74" 
              style="color: #71c088; text-decoration: none; font-weight: bold;">Accéder au Centre de Ressources</a>
            </p>

            <h3>💬 Besoin d’aide ?</h3>
            <p>Notre équipe est disponible pour répondre à toutes vos questions.</p>
            <p>📩 Contactez-nous à <a href="mailto:contact@mana.fr" style="color: #71c088; text-decoration: none;">contact@mana.fr</a></p>
            <p>💬 Ou via le chat intégré dans votre espace Manamind.</p>

            <p style="margin-top: 20px; font-weight: bold; text-align: center;">
              Merci encore pour votre confiance, et bienvenue dans l’univers Manamind ! 🚀
            </p>
          </div>
        </div>
      `,
    });

    console.log("✅ Email sent successfully:", JSON.stringify(emailResponse, null, 2));

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("❌ ERROR in send-welcome-email function:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
    });

    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "An error occurred while sending the welcome email" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);