import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Fonction GET pour récupérer tous les témoignages avec les informations utilisateur, y compris l'image
export async function GET() {
  try {
    // Récupère tous les témoignages avec les informations de l'utilisateur et l'image associée
    const testimonies = await db.temoignages.findMany({
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            profileImages: true, // Inclure l'image de l'utilisateur
          },
        },
      },
    });

    // console.log("données reçues :", testimonies);
    // Retourne les témoignages et les informations utilisateur (avec image) sous forme de réponse JSON
    return NextResponse.json(
      {
        message:
          "Liste de témoignages avec informations utilisateur et image récupérée avec succès",
        testimonies: testimonies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des témoignages:", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
