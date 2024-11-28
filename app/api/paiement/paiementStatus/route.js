// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//   try {
//     const { sessionId } = await request.json();

//     if (!sessionId) {
//       return NextResponse.json(
//         { error: "L'identifiant de session est requis." },
//         { status: 400 }
//       );
//     }

//     // Récupérer les détails de la session de paiement
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (session.payment_status === "paid") {
//       // Paiement validé
//       return NextResponse.json({
//         success: true,
//         message: "Paiement validé.",
//         sessionDetails: session,
//       });
//     } else {
//       // Paiement non validé
//       return NextResponse.json({
//         success: false,
//         message: "Paiement non validé ou en attente.",
//         sessionDetails: session,
//       });
//     }
//   } catch (error) {
//     console.error("Erreur lors de la récupération du statut de paiement :", error.message);
//     return NextResponse.json(
//       { error: "Erreur interne lors de la récupération du statut de paiement." },
//       { status: 500 }
//     );
//   }
// }
//CODE QUI MARCHE
// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//   try {
//     const { sessionId } = await request.json();

//     if (!sessionId) {
//       return NextResponse.json(
//         { error: "L'identifiant de session est requis." },
//         { status: 400 }
//       );
//     }

//     // Récupérer les détails de la session de paiement
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (session.payment_status === "paid") {
//       return NextResponse.json({
//         success: true,
//         message: "Paiement validé.",
//         sessionDetails: session,
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "Paiement non validé ou en attente.",
//         sessionDetails: session,
//       });
//     }
//   } catch (error) {
//     console.error(
//       "Erreur lors de la récupération du statut de paiement :",
//       error.message
//     );
//     return NextResponse.json(
//       {
//         error: "Erreur interne lors de la récupération du statut de paiement.",
//       },
//       { status: 500 }
//     );
//   }
// }

//CODE TEST 
// api/paiement/paiementStatus.js
import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "L'identifiant de session est requis." },
        { status: 400 }
      );
    }

    // Récupérer les détails de la session de paiement
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      return NextResponse.json({
        success: true,
        message: "Paiement validé.",
        sessionDetails: session,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Paiement non validé ou en attente.",
        sessionDetails: session,
      });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du statut de paiement :", error.message);
    return NextResponse.json(
      { error: "Erreur interne lors de la récupération du statut de paiement." },
      { status: 500 }
    );
  }
}
