import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();

    const { userId, abonnementId, userName, stripeSessionId, subscriptionId } =
      body;

    if (
      !userId ||
      !abonnementId ||
      !userName ||
      !stripeSessionId ||
      !subscriptionId
    ) {
      return new Response(JSON.stringify({ error: "Données manquantes" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const values = [
      userId,
      abonnementId,
      userName,
      stripeSessionId,
      subscriptionId,
    ];

    const Abonnement = await db.Abonnement.create({
      data: {
        userId: userId,
        abonnementId: abonnementId,
        userName: userName,
        stripeSessionId: stripeSessionId,
        subscriptionId: subscriptionId,
      },
    });

    await db.execute(query, values);

    return new Response(
      JSON.stringify({ message: "Abonnement enregistré avec succès" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'abonnement :", error);

    return new Response(
      JSON.stringify({
        error: "Erreur interne du serveur",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
