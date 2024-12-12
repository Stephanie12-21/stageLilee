import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function GET(request, { params }) {
  // Extraire les paramètres de recherche depuis l'URL

  const sessionId = params.id;

  if (!sessionId) {
    return new Response(JSON.stringify({ error: "Session ID manquant" }), {
      status: 400,
    });
  }

  try {
    // Récupérer la session de paiement Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log("Session récupérée avec succès:", session);

    // Retourner les données de la session
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la session:",
      error.message
    );
    return new Response(
      JSON.stringify({ error: "Erreur interne du serveur" }),
      { status: 500 }
    );
  }
}
