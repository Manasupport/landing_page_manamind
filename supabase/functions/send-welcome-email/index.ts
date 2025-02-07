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
  lastName: string;
  email: string;
  accountType: string;
  numberOfCourses: number;
  plan: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("📩 Starting welcome email handler");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("📥 Parsing request body...");
    const { firstName, lastName, email, accountType, numberOfCourses, plan }: WelcomeEmailRequest = await req.json();
    console.log("✅ Received request data:", { firstName, lastName, email, accountType, numberOfCourses, plan });

    if (!firstName || !lastName || !email || !accountType) {
      console.error("❌ ERROR: Missing required fields");
      throw new Error("All fields are required");
    }

    console.log("✉️ Sending email via Resend...");
    const emailResponse = await resend.emails.send({
      from: "Manamind <onboarding@resend.dev>",
      to: [email],
      subject: "Bienvenue sur Manamind - Votre compte est en cours de paramétrage !",
      html: 
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <div style="text-align: center;">
            <img src="lovable-uploads/212l.png" alt="Manamind Logo" width="150" />
            <h2 style="color: #2C3E50;">Bienvenue sur Manamind, ${firstName} !</h2>
          </div>
          <div style="background: #F7F9FC; padding: 15px; border-radius: 10px;">
            <p>Félicitations et bienvenue dans la communauté Manamind ! 🎉</p>
            <p><strong>Voici un récapitulatif de votre inscription :</strong></p>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Nom:</strong> <span style="color: #71c088;">${lastName}</span></li>
              <li><strong>Prénom:</strong> <span style="color: #71c088;">${firstName}</span></li>
              <li><strong>Email:</strong> <span style="color: #71c088;">${email}</span></li>
              <li><strong>Type de compte:</strong> <span style="color: #71c088;">${accountType}</span></li>
              <li><strong>Nombre de parcours:</strong> <span style="color: #71c088;">${numberOfCourses}</span></li>
              <li><strong>Plan choisi:</strong> <span style="color: #71c088;">${plan}</span></li>
            </ul>
            <p>Votre compte sera paramétré dans les 24 heures ouvrées. Vous recevrez un email avec le lien permettant d'accéder à votre espace.</p>
            <p>En attendant, découvrez nos tutoriels dans le <a href="https://manamind.notion.site/c9d8acd29d8f464e9cbf786d4ab6fb95?v=aa38325d3c854f74b277cf850267d4a7&pvs=74" style="color: #71c088;">Centre de Ressources</a>.</p>
            <p>Besoin d'aide ? Contactez-nous à <a href="mailto:contact@mana.fr">contact@mana.fr</a>.</p>
            <p><strong>L'équipe Manamind</strong></p>
          </div>
        </div>
      ,
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