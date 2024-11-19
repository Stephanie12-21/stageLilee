import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Récupérer les données JSON depuis le corps de la requête
    const body = await request.json();

    const testimony = body.testimony;
    const rating = parseInt(body.rating, 10); // Conversion en entier
    const userId = parseInt(body.userId, 10); // Conversion en entier

    // Affiche les données reçues pour déboguer
   // console.log("Données reçues :", { testimony, rating, userId });

    // Validation des données
    if (!testimony || isNaN(rating) || isNaN(userId)) {
      return NextResponse.json(
        {
          message: "Tous les champs sont requis et doivent être valides.",
        },
        { status: 400 }
      );
    }

    // Création du témoignage avec les données reçues
    const newTestimony = await db.temoignages.create({
      data: {
        temoignage: testimony,
        noteLilee: rating,
        userId: userId, // Assurez-vous que `userId` est bien un entier ici
      },
    });

    return NextResponse.json(
      {
        message: "Témoignage créé avec succès",
        testimony: newTestimony,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du témoignage:", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
