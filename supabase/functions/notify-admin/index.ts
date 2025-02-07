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
  subscriptionPeriodicity: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const userData: UserData = await req.json();
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <div style="text-align: center;">
          <img src="/public/lovable-uploads/manamind.png" alt="Manamind Logo" width="150" />
          <h2 style="color: #2C3E50;">Nouvel utilisateur inscrit sur Manamind</h2>
        </div>
        <div style="background: #F7F9FC; padding: 15px; border-radius: 10px;">
          <ul style="list-style: none; padding: 0;">
            <li><strong>Nom:</strong> <span style="color: #71c088;">${userData.lastName}</span></li>
            <li><strong>Prénom:</strong> <span style="color: #71c088;">${userData.firstName}</span></li>
            <li><strong>Email:</strong> <span style="color: #71c088;">${userData.email}</span></li>
            <li><strong>Plan choisi:</strong> <span style="color: #71c088;">${userData.plan}</span></li>
            <li><strong>Nombre de parcours:</strong> <span style="color: #71c088;">${userData.numberOfCourses}</span></li>
            <li><strong>Type de compte:</strong> <span style="color: #71c088;">${userData.accountType}</span></li>
            <li><strong>Périodicité de l'abonnement:</strong> <span style="color: #71c088;">${userData.subscriptionPeriodicity}</span></li>
          </ul>
        </div>
      </div>
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
