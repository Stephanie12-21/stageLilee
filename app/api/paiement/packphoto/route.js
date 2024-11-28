// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//   try {
//     const { additionalPhotos } = await request.json();

//     if (!additionalPhotos || additionalPhotos <= 0) {
//       return NextResponse.json(
//         { error: "Le nombre de photos supplémentaires est invalide." },
//         { status: 400 }
//       );
//     }

//     // Créer une session de paiement Stripe
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "EUR",
//             product_data: {
//               name: "Pack Photo supplémentaire",
//               description: `Ajout de ${additionalPhotos} photo(s) supplémentaire(s).`,
//             },
//             unit_amount: 100,
//           },
//           quantity: additionalPhotos,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.FRONTEND_URL}/success`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     });

//     // Retourne l'URL de redirection Stripe
//     return NextResponse.json({ url: session.url });
//   } catch (error) {
//     console.error("Erreur lors de la création de la session :", error.message);
//     return NextResponse.json(
//       { error: "Une erreur est survenue lors de la création de la session." },
//       { status: 500 }
//     );
//   }
// }

import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { additionalPhotos } = await request.json();

    if (!additionalPhotos || additionalPhotos <= 0) {
      return NextResponse.json(
        { error: "Le nombre de photos supplémentaires est invalide." },
        { status: 400 }
      );
    }

    // Créer une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: "Pack Photo supplémentaire",
              description: `Ajout de ${additionalPhotos} photo(s) supplémentaire(s).`,
            },
            unit_amount: 100,
          },
          // quantity: additionalPhotos,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/personnel/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/personnel/cancel`,
    });

    // Retourne l'URL de redirection Stripe
    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Erreur lors de la création de la session :", error.message);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création de la session." },
      { status: 500 }
    );
  }
}
