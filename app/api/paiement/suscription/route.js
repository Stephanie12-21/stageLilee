import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { priceId } = await request.json();

    if (!priceId) {
      throw new Error("priceId manquant dans la requête.");
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/cancel",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur lors de la création de la session :", error.message);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création de la session." },
      { status: 500 }
    );
  }
}
