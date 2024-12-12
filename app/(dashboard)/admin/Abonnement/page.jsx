"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

export default function Abonnement() {
  const { data: session, status } = useSession();
  const [abonnementSelectionne, setAbonnementSelectionne] = useState(null);

  // Vérifier si la session est disponible
  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (!session) {
    return <div>Vous devez être connecté pour souscrire à un abonnement.</div>;
  }

  const userId = session.user?.id || "ID inconnu";
  const userName = `${session.user?.name || ""} ${
    session.user?.prenom || ""
  }`.trim();
  
  const userEmail = session.user?.email || "Email inconnu";

  // Liste des abonnements disponibles
  const abonnements = [
    {
      id: 1,
      nom: "Plan standard",
      prix: "5€ / mois",
      description: "Accès limité avec fonctionnalités de base.",
    },
    {
      id: 2,
      nom: "Plan medium",
      prix: "10€ / mois",
      description: "Fonctionnalités avancées pour un usage régulier.",
      
    },
    {
      id: 3,
      nom: "Plan Premium",
      prix: "20€ / mois",
      description: "Toutes les fonctionnalités sans limites.",
    }, 
  ];

  const handleCheckout = async (abonnementId) => {
    try {
      const response = await fetch("/api/annonce/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          abonnementId,
          userId,
          userName,
          userEmail,
          successUrl: `${window.location.origin}/admin/succesPage/{CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur inconnue");
      }

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Erreur lors de la création de la session Stripe:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Choisissez votre abonnement
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {abonnements.map((abonnement) => (
          <div
            key={abonnement.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              width: "300px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              textAlign: "center",
              backgroundColor:
                abonnementSelectionne?.id === abonnement.id
                  ? "#f7f9fc"
                  : "white",
            }}
            onClick={() => setAbonnementSelectionne(abonnement)}
          >
            <h3 style={{ marginBottom: "10px", color: "#333" }}>
              {abonnement.nom}
            </h3>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              {abonnement.prix}
            </p>
            <p
              style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}
            >
              {abonnement.description}
            </p>
            <button
              onClick={() => handleCheckout(abonnement.id)}
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#635bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Souscrire
            </button>
          </div>
        ))}
      </div>

      {abonnementSelectionne && (
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <h2>Abonnement sélectionné :</h2>
          <span>
            <strong>{abonnementSelectionne.nom}</strong> -{" "}
            {abonnementSelectionne.prix}
          </span>{" "}
          <br />
          <span>
            User qui veut souscrire à l&apos;abonnement : {userId} avec les
            infos : {userName} et {userEmail}
          </span>
        </div>
      )}
    </div>
  );
}
