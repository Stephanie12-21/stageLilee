"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const sessionId = sessionStorage.getItem("session_id");

    if (sessionId) {
      fetch("/api/paiement/paiementStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            router.push(`/personnel/annonces/addAnnonce?paymentStatus=success`);
          } else {
            router.push(`/personnel/annonces/addAnnonce?paymentStatus=failed`);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la vérification du paiement", error);
        });
    }
  }, [router]);

  return <div>Vérification du paiement en cours...</div>;
};

export default SuccessPage;
