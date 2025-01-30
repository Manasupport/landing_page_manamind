import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Liste des Price IDs autorisés (définis dans Stripe)
const validPriceIds = new Set([
  // Essential
  "price_1Qmc4GEEI50AF5TQswoQ36zs", // Essential 1 parcours monthly
  "price_1QXeYkEEI50AF5TQemBkiRCS", // Essential 1 parcours yearly
  "price_1QXeXGEEI50AF5TQMVSPcWyc", // Essential 2 parcours monthly
  "price_1QXeZdEEI50AF5TQs0umy4oM", // Essential 2 parcours yearly
  "price_1QXeXUEEI50AF5TQ5s0VBj6E", // Essential 3 parcours monthly
  "price_1QXea0EEI50AF5TQE2WPOqUv", // Essential 3 parcours yearly
  "price_1QXeXgEEI50AF5TQVqzmiuRd", // Essential 4 parcours monthly
  "price_1QXeaHEEI50AF5TQK0q2bfG7", // Essential 4 parcours yearly
  "price_1QXeY0EEI50AF5TQPIEYVWdu", // Essential 5 parcours monthly
  "price_1QXeaYEEI50AF5TQuQUNTIn2", // Essential 5 parcours yearly

  // Professional
  "price_1QY1FGEEI50AF5TQDpoUSNbT", // Professional monthly
  "price_1QY1FbEEI50AF5TQQ4QNdRlH", // Professional yearly
]);

serve(async (req) => {
  // Gestion des requêtes CORS préflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse le corps de la requête
    const { priceId, email } = await req.json();
    console.log('Received request:', { priceId, email });

    // Validation des champs
    if (!priceId || !email) {
      console.error('Missing required fields:', { priceId, email });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: priceId or email' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Vérifie si le priceId est valide
    if (!validPriceIds.has(priceId)) {
      console.error('Invalid priceId:', priceId);
      return new Response(
        JSON.stringify({ error: `Invalid priceId: ${priceId}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Initialisation de Stripe avec la clé secrète
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Création de la session Stripe Checkout
    console.log('Creating checkout session...');
    const session = await stripe.checkout.sessions.create({
      customer_email: email, // Associe l'email au client Stripe
      line_items: [
        {
          price: priceId, // Utilisation du priceId validé
          quantity: 1,
        },
      ],
      mode: 'subscription', // Mode d'abonnement
      success_url: 'https://app.manamind.fr', // URL après paiement réussi
      cancel_url: `${req.headers.get('origin')}/pricing`, // URL en cas d'annulation
      allow_promotion_codes: true, // Autorise les codes promo

      // 🏢 Ajout des champs TVA et adresse
      tax_id_collection: { enabled: true }, // Active la saisie du numéro de TVA
      billing_address_collection: "required", // Adresse de facturation obligatoire
      customer_creation: "if_required", // Crée un client Stripe si nécessaire
    });

    console.log('Checkout session created:', session.url);
    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error in create-checkout:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});