"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FavorisPage = () => {
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const { date: session } = useSession();

  // Récupérer l'ID de l'utilisateur de la session
  if (session && session.user && session.user.id) {
    const userId = session.user.id;
    console.log("ID de l'utilisateur de la session actuelle :", userId);
  } else {
    console.log(
      "Erreur : Impossible de récupérer l'ID de l'utilisateur de la session."
    );
  }

  return (
    <div>
      <h1>Liste des favoris</h1>
      <p>ID de l&apos;utilisateur de la session actuelle : {userId} </p>
    </div>
  );
};

export default FavorisPage;
