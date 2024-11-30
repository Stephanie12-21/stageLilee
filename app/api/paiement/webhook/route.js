import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function webhookHandler(req, res) {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("Metadata:", session.metadata);
    }

    res.status(200).send("Success");
  } catch (error) {
    console.error("Erreur Webhook :", error);
    res.status(400).send("Webhook Error");
  }
}
