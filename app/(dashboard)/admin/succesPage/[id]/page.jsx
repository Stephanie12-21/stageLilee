"use client";

import { useEffect } from "react";

const SuccesPage = ({ params }) => {
  const { id } = params;

  useEffect(() => {
    if (id) {
      handleStripeSession(id);
    }
  }, [id]);

  const handleStripeSession = async (sessionId) => {
    try {
      const response = await fetch(
        `/api/stripe/session?session_id=${sessionId}`
      );
      const session = await response.json();

      if (session.payment_status === "paid") {
        // Traitez les métadonnées et enregistrez dans la base de données
        const res = await fetch("/api/save-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: session.metadata.userId,
            abonnementId: session.metadata.abonnementId,
            userName: session.metadata.userName,
            stripeSessionId: session.id,
            subscriptionId: session.subscription,
          }),
        });

        const result = await res.json();
        if (res.ok) {
          console.log("Enregistrement réussi:", result);
        } else {
          console.error("Erreur lors de l'enregistrement:", result.error);
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la session Stripe:",
        error
      );
    }
  };

  return (
    <div>
      <h1>Merci pour votre abonnement !</h1>
      <p>Votre transaction a été enregistrée avec succès.</p>
    </div>
  );
};

export default SuccesPage;
