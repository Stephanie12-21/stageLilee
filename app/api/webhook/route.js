// import Stripe from "stripe";
// import { stripe } from "@/lib/stripe";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const body = await request.text();
//   const signature = headers().get("Stripe-Signature");

//   let event = Stripe.Event;
//    try{
//     event = stripe.webhooks.constructEvent(
//         body,
//         signature,
//         process.env.STRIPE_WEBHOOK_SECRET!
//     )
//    } catch(error){
//     return new NextResponse("ivalide signature", {status:400})
//    }
//    const session = event.data.object as Stripe.Checkout.Session;
// }


import { stripe } from "@/lib/stripe"; // Assurez-vous que ce fichier exporte une instance Stripe correctement configurée.
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.text(); // Récupère le corps brut de la requête.
  const signature = headers().get("Stripe-Signature"); // Récupère la signature Stripe.

  if (!signature) {
    return new NextResponse("Missing Stripe-Signature header", { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET // Assurez-vous que cette variable d'environnement est définie.
    );
    console.log("event:", event);
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // Vérifie si l'événement correspond à un type attendu (par exemple, checkout.session.completed)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object; // L'objet session contient les données de la session de paiement.
    console.log("Checkout session completed:", session);
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );
    console.log("subscription :", subscription);

    // Ajoutez ici la logique pour gérer l'événement, comme mettre à jour votre base de données.
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  // Répondez avec un statut 200 pour indiquer que le webhook a bien été reçu.
  return new NextResponse("Webhook received", { status: 200 });
}
