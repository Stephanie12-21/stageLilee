// import { stripe } from "@/lib/stripe"; // Assurez-vous que ce fichier exporte une instance Stripe correctement configurée.
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const body = await request.text(); // Récupère le corps brut de la requête.
//   const signature = headers().get("Stripe-Signature"); // Récupère la signature Stripe.

//   if (!signature) {
//     return new NextResponse("Missing Stripe-Signature header", { status: 400 });
//   }

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET // Assurez-vous que cette variable d'environnement est définie.
//     );
//     console.log("event:", event);
//   } catch (error) {
//     console.error("Webhook signature verification failed:", error.message);
//     return new NextResponse("Invalid signature", { status: 400 });
//   }

//   // Vérifie si l'événement correspond à un type attendu (par exemple, checkout.session.completed)
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object; // L'objet session contient les données de la session de paiement.
//     console.log("Checkout session completed:", session);
//     const subscription = await stripe.subscriptions.retrieve(
//       session.subscription
//     );
//     console.log("subscription :", subscription);

//     // Ajoutez ici la logique pour gérer l'événement, comme mettre à jour votre base de données.
//   } else {
//     console.log(`Unhandled event type: ${event.type}`);
//   }

//   // Répondez avec un statut 200 pour indiquer que le webhook a bien été reçu.
//   return new NextResponse("Webhook received", { status: 200 });
// }

// import { db } from "@/lib/db";
// import { stripe } from "@/lib/stripe";
// import { update } from "firebase/database";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

// export async function POST(request) {
//   const body = await request.text();
//   const signature = request.headers().get("Stripe-Signature");
//   let event = Stripe.Event;

//   //vérification de la signature du webhook
//   try {
//     event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
//   } catch (error) {
//     console.log("Webhook signature verification failed:", error);
//     return new NextResponse(`Webhook error :${error}`, { status: 400 });
//   }

//   //autre vérification
//   try {
//     switch (event.type) {
//       case "checkout.session.completed":
//         const session = await stripe.checkout.sessions.retrieve(
//           event.data.object.id,
//           {
//             expand: ["line_items"],
//           }
//         );
//         const customerId = session.customer;
//         const customerDetails = session.customer_details;
//         if (customerDetails?.titre) {
//           const annonce = await db.annonces.findUnique({
//             where: { titre: customerDetails.titre },
//           });
//           if (!annonce) throw new Error("Annonce non trouvée");
//           if (!annonce.customerId) {
//             await db.annonces.update({
//               where: { id: annonce.id },
//               data: { customerId },
//             });
//           }
//           const line_items = session.line_items?.data || [];
//           for (const item of line_items) {
//             const priceId = item.price?.id;
//             const isSubscritpion = item.price?.type === "recurring";
//             if (isSubscritpion) {
//               let finDate = new Date();
//               let plan;

//               if (
//                 priceId === process.env.STRIPE_BADGE_URGENT_PRIX_ID ||
//                 process.env.STRIPE_BOOST_MEDIUM_PRIX_ID ||
//                 process.env.STRIPE_BOOST_STANDARD_PRIX_ID
//               ) {
//                 finDate.setDate(finDate.getDay() + 7);
//               } else if (
//                 priceId === process.env.STRIPE_BADGE_UNE_PREMIUM_PRIX_ID ||
//                 process.env.STRIPE_BOOST_MEDIUM_PRIX_ID ||
//                 STRIPE_BOOST_PREMIUM_PRIX_ID
//               ) {
//                 finDate.setMonth(finDate.getMonth() + 1);
//               } else {
//                 throw new Error("Invalid priceId");
//               }
//               //pour ajouter les données dans la table boost si elles n'existent pas encore sinon, ça va la mettre à jour
//               await db.boost.upsert({
//                 where: { annonceId: annonce.id },
//                 create: {
//                   annonceId: annonce.id,
//                   debutDate: new Date(),
//                   finDate: finDate,
//                   plan: plan,
//                   period:
//                     priceId ===
//                     (process.env.STRIPE_BADGE_UNE_PREMIUM_PRIX_ID ||
//                       process.env.STRIPE_BOOST_PREMIUM_PRIX_ID)
//                       ? "SEMAINE"
//                       : "MOIS",
//                 },
//                 update: {
//                   plan: plan,
//                   period:
//                     priceId ===
//                     (process.env.STRIPE_BADGE_UNE_PREMIUM_PRIX_ID ||
//                       process.env.STRIPE_BOOST_PREMIUM_PRIX_ID)
//                       ? "SEMAINE"
//                       : "MOIS",
//                   debutDate: new Date(),
//                   finDate: finDate,
//                 },
//               });
//               await db.annonces.update({
//                 where: { annonceId: annonce.id },
//                 data: { plan: plan },
//               });
//             } else {
//               //one time purchase
//             }
//           }
//         }
//         break;
//       default:
//         console.log(`${event.type} non pris en compte`);
//     }
//   } catch (error) {
//     console.log("Erreur pour la pirse en compte de l'event:", error);
//     return new NextResponse(`Webhook error :${error}`, { status: 400 });
//   }
//   return new NextResponse("Webhook received", { status: 200 });
// }

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const { annonceId, priceId } = await request.json();

    if (!annonceId || !priceId) {
      return new NextResponse("Données manquantes", { status: 400 });
    }

    // Définir le plan et la durée en fonction de priceId
    let plan, periode, finDate;
    const debutDate = new Date();

    if (priceId === process.env.STRIPE_BADGE_URGENT_PRIX_ID) {
      plan = "URGENT";
      periode = "SEMAINE";
      finDate = new Date(debutDate.setDate(debutDate.getDate() + 7));
    } else if (priceId === process.env.STRIPE_BADGE_UNE_PREMIUM_PRIX_ID) {
      plan = "UNE";
      periode = "MOIS";
      finDate = new Date(debutDate.setMonth(debutDate.getMonth() + 1));
    } else if (priceId === process.env.STRIPE_BADGE_UNE_MEDIUM_PRIX_ID) {
      plan = "UNE";
      periode = "SEMAINE";
      finDate = new Date(debutDate.setMonth(debutDate.getMonth() + 1));
    } else if (priceId === process.env.STRIPE_BOOST_STANDARD_PRIX_ID) {
      plan = "RECOMMANDATION";
      periode = "SEMAINE";
      finDate = new Date(debutDate.setDate(debutDate.getDate() + 7));
    } else if (priceId === process.env.STRIPE_BOOST_PREMIUM_PRIX_ID) {
      plan = "RECOMMANDATION";
      periode = "SEMAINE";
      finDate = new Date(debutDate.setDate(debutDate.getDate() + 7));
    } else if (priceId === process.env.STRIPE_BOOST_MEDIUM_PRIX_ID) {
      plan = "RECOMMANDATION";
      periode = "MOIS";
      finDate = new Date(debutDate.setDate(debutDate.getDate() + 7));
    } else {
      return new NextResponse("Offre invalide", { status: 400 });
    }

    // Mise à jour ou création du boost dans la base de données
    const boost = await db.boost.upsert({
      where: { annonceId: parseInt(annonceId) },
      update: { plan, periode, debutDate: new Date(), finDate },
      create: {
        annonceId: parseInt(annonceId),
        plan,
        periode,
        debutDate: new Date(),
        finDate,
      },
    });

    return NextResponse.json(boost);
  } catch (error) {
    console.error(error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
