import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Récupère la liste des prix
  const prices = await stripe.prices.list({ limit: 10 });

  // Récupère les détails des produits associés aux prix
  const pricesWithProducts = await Promise.all(
    prices.data.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);
      return {
        ...price,
        nickname: product.name,
      };
    })
  );

  return NextResponse.json(pricesWithProducts.reverse());
}
