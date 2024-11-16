"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const Unsubscribe = () => {
  const searchParams = useSearchParams(); // Accéder aux paramètres de l'URL
  const router = useRouter();
  const token = searchParams.get("token"); // Récupérer le token depuis l'URL

  useEffect(() => {
    const handleUnsubscribe = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `/api/newsletter/unsubscribe?token=${token}`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          // Redirige vers la page d'accueil après un délai
          setTimeout(() => {
            router.push("/");
          }, 3000); // Redirige après 3 secondes
        } else {
          console.error("Erreur lors du désabonnement");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    };

    handleUnsubscribe();
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Vous avez été désabonné.</h1>
      <p className="mt-4">
        Vous allez être redirigé vers la page d&apos;accueil.
      </p>
    </div>
  );
};

export default Unsubscribe;
