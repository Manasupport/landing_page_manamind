import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  plan: string;
  numberOfCourses: number;
  accountType: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const userData: UserData = await req.json();
    
    const emailHtml = `
      <h2>Nouvel utilisateur inscrit sur Manamind</h2>
      <p><strong>Nom:</strong> ${userData.lastName}</p>
      <p><strong>Prénom:</strong> ${userData.firstName}</p>
      <p><strong>Email:</strong> ${userData.email}</p>
      <p><strong>Plan choisi:</strong> ${userData.plan}</p>
      <p><strong>Nombre de parcours:</strong> ${userData.numberOfCourses}</p>
      <p><strong>Type de compte:</strong> ${userData.accountType}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Manamind <onboarding@resend.dev>",
        to: ["yanis@manadvise.fr"],
        subject: "Nouvel utilisateur Manamind",
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in notify-admin function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);