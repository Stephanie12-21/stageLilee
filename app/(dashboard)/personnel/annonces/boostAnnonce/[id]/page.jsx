"use client";

import { useEffect, useState } from "react";
import BoostOffers from "../../../_components/BoostOffers";

export default function Home({ params }) {
  const { id } = params;
  const [annonceId, setAnnonceId] = useState("");
  const [titreAnnonce, setTitreAnnonce] = useState("");

  useEffect(() => {
    async function fetchAnnonce() {
      try {
        const response = await fetch(`/api/annonce/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAnnonceId(data.id);
          setTitreAnnonce(data.titre);
          console.log("titre de l'annonce:", data.titre);
        } else {
          console.error("Annonce non trouvée, avec l'id annonce :", id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'annonce :", error);
      }
    }

    fetchAnnonce();
  }, [id]);

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Boostez votre annonce portant le titre :{titreAnnonce}
      </h1>
      <BoostOffers adId={annonceId} titreAnnonce={titreAnnonce} />
    </main>
  );
}
