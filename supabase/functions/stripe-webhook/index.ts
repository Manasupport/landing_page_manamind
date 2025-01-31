import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  
  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      signature || '',
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    );

    console.log('Processing event:', event.type);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const customerId = session.customer;
        const subscriptionId = session.subscription;

        if (customerId && subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const customer = await stripe.customers.retrieve(customerId);
          
          if ('email' in customer) {
            // Update profile status
            const { data: profiles, error: profileError } = await supabase
              .from('profiles')
              .update({
                "Statut de l'abonnement": 'active',
                "Date de reconduction de l'abonnement": new Date(subscription.current_period_end * 1000).toISOString()
              })
              .eq('email', customer.email)
              .select();

            if (profileError) {
              console.error('Error updating profile:', profileError);
              throw profileError;
            }

            // Send welcome email after payment confirmation
            try {
              const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', customer.email)
                .single();

              if (userError) throw userError;

              await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-welcome-email`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
                },
                body: JSON.stringify({
                  firstName: userData.Prenom,
                  email: userData.email,
                }),
              });

              // Notify admin after payment confirmation
              await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/notify-admin`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
                },
                body: JSON.stringify({
                  firstName: userData.Prenom,
                  lastName: userData.Nom,
                  email: userData.email,
                  plan: userData["Plan choisi"],
                  numberOfCourses: userData["Nombre de parcours"],
                  accountType: userData["Type de compte"],
                }),
              });
            } catch (error) {
              console.error('Error sending welcome email:', error);
            }

            console.log('Profile updated successfully:', profiles);
          }
        }
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object;
        const updatedCustomer = await stripe.customers.retrieve(updatedSubscription.customer as string);
        
        if ('email' in updatedCustomer) {
          await supabase
            .from('profiles')
            .update({
              "Date de reconduction de l'abonnement": new Date(updatedSubscription.current_period_end * 1000).toISOString()
            })
            .eq('email', updatedCustomer.email);
        }
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        const customer = await stripe.customers.retrieve(deletedSubscription.customer as string);
        
        if ('email' in customer) {
          await supabase
            .from('profiles')
            .update({
              "Statut de l'abonnement": 'inactive',
              "Date de reconduction de l'abonnement": null
            })
            .eq('email', customer.email);
        }
        break;
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    );
  }
});