import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

if (!RESEND_API_KEY) {
  console.error("⚠️ ERROR: RESEND_API_KEY is not set.");
}

const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  numberOfCourses: number;
  plan: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("📩 Starting welcome email handler");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("📥 Parsing request body...");
    const { firstName, lastName, email, accountType, numberOfCourses, plan }: WelcomeEmailRequest = await req.json();
    console.log("✅ Received request data:", { firstName, lastName, email, accountType, numberOfCourses, plan });

    if (!firstName || !lastName || !email || !accountType || !plan) {
      console.error("❌ ERROR: Missing required fields");
      throw new Error("All fields are required");
    }

    console.log(`📌 Sending email for plan: ${plan}`);

    // Sélection du contenu du mail selon le plan
    const emailContent =
      plan === "Starter" ? getStarterEmail(firstName) : getPaidPlanEmail(firstName);

    console.log("✉️ Sending email via Resend...");
    const emailResponse = await resend.emails.send({
      from: "Manamind <no-reply@manamind.fr>",
      to: [email],
      subject: "🚀 Bienvenue sur Manamind – Votre compte est en cours de paramétrage !",
      html: emailContent,
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
      JSON.stringify({ error: error.message, details: "An error occurred while sending the welcome email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

// 📩 Email pour le Plan Starter
const getStarterEmail = (firstName: string) => `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Bienvenue sur Manamind</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0;">
    
    <table align="center" width="100%" style="max-width: 600px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
      
      <tr>
        <td align="center" style="padding-bottom: 20px;">
          <img src="https://i.postimg.cc/W3wNygJs/MIND-BLC.png" alt="Manamind Logo" width="150">
        </td>
      </tr>

      <tr>
        <td align="center" style="color: #000000; font-size: 24px; font-weight: bold;">
          Bienvenue sur Manamind, ${firstName} !
        </td>
      </tr>

      <tr>
        <td style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <p style="color: #000000; font-size: 18px; font-weight: bold;">🛠️ Paramétrage en cours...</p>
          <p>Vous allez recevoir un mail d'accès à la plateforme pour créer votre compte et configurer votre espace Starter.</p>
          <p>💡 Bonne nouvelle ! Avec le Plan Starter, vous bénéficiez gratuitement de toutes les fonctionnalités essentielles :</p>
          <ul>
            <li>1 parcours interactif</li>
            <li>Jusqu'à 50 participants</li>
            <li>Accès aux outils d'édition et d'animation</li>
          </ul>
          <p>100% gratuit et sans engagement – parfait pour tester Manamind en toute liberté ! 🚀</p>
        </td>
      </tr>

      <tr>
        <td align="center" style="padding: 20px;">
          <a href="https://manamind.notion.site" 
             style="background-color: #71c088; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
            📚 Découvrir le Centre de Ressources
          </a>
        </td>
      </tr>

      <tr>
        <td align="center" style="padding: 20px 0; font-size: 14px; color: #666;">
          Besoin d’aide ? Contactez-nous à 
          <a href="mailto:support_manamind@mana.fr" style="color: #71c088;">support_manamind@mana.fr</a>.
        </td>
      </tr>

      <tr>
        <td align="center" style="padding-top: 10px; font-size: 14px; color: #333;">
          Merci pour votre confiance, et bienvenue dans l’univers Manamind !  
          <br><strong>L’équipe Manamind</strong>
        </td>
      </tr>

    </table>
  </body>
  </html>
`;

// 📩 Email pour les plans payants (Essential et Professional)
const getPaidPlanEmail = (firstName: string) => `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Bienvenue sur Manamind</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0;">
    
    <table align="center" width="100%" style="max-width: 600px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
      
      <tr>
        <td align="center" style="padding-bottom: 20px;">
          <img src="https://i.postimg.cc/W3wNygJs/MIND-BLC.png" alt="Manamind Logo" width="150">
        </td>
      </tr>

      <tr>
        <td align="center" style="color: #000000; font-size: 24px; font-weight: bold;">
          Bienvenue sur Manamind, ${firstName} !
        </td>
      </tr>

      <tr>
        <td style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <p style="color: #000000; font-size: 18px; font-weight: bold;">🛠️ Paramétrage en cours...</p>
          <p>Dès réception de votre paiement, vous recevrez un mail d'accès à la plateforme pour créer votre compte et configurer votre espace.</p>
          <p>En attendant, pour débuter l'expérience Manamind, vous pouvez naviguer dans le Centre de Ressources où vous trouverez des tutos de prise en main à la plateforme, des contenus pédagogiques et de nombreux modèles prêts à l'usage.</p>
        </td>
      </tr>

      <tr>
        <td align="center">
          <a href="https://manamind.notion.site" style="background-color: #71c088; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
            📚 Découvrir le Centre de Ressources
          </a>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0; font-size: 14px; color: #666;">
          Besoin d’aide ? Contactez-nous à 
          <a href="mailto:support_manamind@mana.fr" style="color: #71c088;">support_manamind@mana.fr</a>.
        </td>
      </tr>

      <tr>
        <td align="center" style="padding-top: 10px; font-size: 14px; color: #333;">
          Merci pour votre confiance, et bienvenue dans l’univers Manamind !  
          <br><strong>L’équipe Manamind</strong>
        </td>
      </tr>
      

    </table>
  </body>
  </html>
`;

serve(handler);