import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const userId = params.id;

  // Vérification de la présence de l'ID utilisateur
  if (!userId) {
    return NextResponse.json(
      { message: "ID de l'utilisateur manquant." },
      { status: 400 }
    );
  }

  try {
    // Conversion de l'ID en entier
    const id = parseInt(userId, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "ID de l'utilisateur invalide." },
        { status: 400 }
      );
    }

    // Rechercher l'utilisateur par ID
    const user = await db.user.findUnique({
      where: { id },
      include: {
        profileImages: true,
        company: true,
      },
    });

    // Vérification si l'utilisateur existe
    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé." },
        { status: 404 }
      );
    }

    // Exclure le mot de passe de la réponse
    const { hashPassword, ...userData } = user;

    // Afficher toutes les données récupérées dans la console
    console.log("Données utilisateur récupérées :", userData);

    return NextResponse.json(
      {
        user: userData,
        message: "Informations de l'utilisateur récupérées avec succès.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
