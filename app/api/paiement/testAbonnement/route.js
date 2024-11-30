import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeData = {
  urgent: {
    priceId: process.env.STRIPE_BADGE_URGENT_PRIX_ID,
    checkoutUrl: process.env.STRIPE_BADGE_URGENT,
  },
  une_premium: {
    priceId: process.env.STRIPE_BADGE_UNE_PREMIUM_PRIX_ID,
    checkoutUrl: process.env.STRIPE_BADGE_UNE_PREMIUM,
  },
  une_medium: {
    priceId: process.env.STRIPE_BADGE_UNE_STANDARD_PRIX_ID,
    checkoutUrl: process.env.STRIPE_BADGE_UNE_STANDARD,
  },
  medium: {
    priceId: process.env.STRIPE_BOOST_MEDIUM_PRIX_ID,
    checkoutUrl: process.env.STRIPE_BOOST_MEDIUM,
  },
  premium: {
    priceId: process.env.STRIPE_BOOST_PREMIUM_PRIX_ID,
    checkoutUrl: process.env.STRIPE_BOOST_PREMIUM,
  },
  standard: {
    priceId: process.env.STRIPE_BOOST_STANDARD_PRIX_ID,
    checkoutUrl: process.env.STRIPE_BOOST_STANDARD,
  },
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { boostType, adId, titreAnnonce } = body;

    const data = stripeData[boostType];
    if (!data) {
      return NextResponse.json(
        { error: "Type de boost invalide ou données manquantes." },
        { status: 400 }
      );
    }

    if (data.checkoutUrl) {
      return NextResponse.json({ url: data.checkoutUrl }, { status: 200 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        adId,
        titreAnnonce,
        boostType,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe :", error);
    return NextResponse.json(
      { error: "Une erreur s'est produite lors de la création de la session." },
      { status: 500 }
    );
  }
}
