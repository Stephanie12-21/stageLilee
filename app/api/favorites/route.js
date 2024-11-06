import { db } from "@/lib/db"; // Assurez-vous que db est bien importé de Prisma
import { NextResponse } from "next/server";

// POST pour ajouter un favori
export async function POST(req) {
  const { userId, annonceId } = await req.json();

  console.log("les données user reçues sont :", userId);
  console.log("les données annonce reçues sont :", annonceId);

  try {
    // Convertir userId en entier (si ce n'est pas déjà un entier)
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      return NextResponse.json(
        { error: "userId doit être un entier valide." },
        { status: 400 }
      );
    }

    // Création du favori dans la base de données
    const favoris = await db.favoris.create({
      data: {
        userId: userIdInt, // Utiliser l'ID converti
        annonceId: annonceId,
      },
    });

    return NextResponse.json(favoris, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'ajout au favori :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout aux favoris" },
      { status: 500 }
    );
  }
}

// DELETE pour supprimer un favori
export async function DELETE(req) {
  const { userId, annonceId } = await req.json();

  try {
    // Convertir userId en entier (si ce n'est pas déjà un entier)
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      return NextResponse.json(
        { error: "userId doit être un entier valide." },
        { status: 400 }
      );
    }

    // Suppression du favori dans la base de données
    const favoris = await db.favoris.deleteMany({
      where: {
        userId: userIdInt, // Utiliser l'ID converti
        annonceId: annonceId,
      },
    });

    return NextResponse.json(favoris, { status: 200 });
  } catch (error) {
    console.error("Erreur lors du retrait au favori :", error);
    return NextResponse.json(
      { error: "Erreur lors du retrait des favoris" },
      { status: 500 }
    );
  }
}

// GET pour récupérer les favoris d'un utilisateur
export async function GET(req) {
  const userId = req.headers.get("userId"); // Vous pouvez passer l'ID utilisateur dans l'en-tête de la requête

  if (!userId) {
    return NextResponse.json(
      { error: "L'ID utilisateur est requis." },
      { status: 400 }
    );
  }

  try {
    // Récupérer les annonces ajoutées aux favoris pour cet utilisateur
    const favoris = await db.favoris.findMany({
      where: {
        userId: parseInt(userId, 10),
      },
      select: {
        annonceId: true, // Nous récupérons seulement l'ID de l'annonce pour vérifier si l'annonce est dans les favoris
      },
    });

    const favorisIds = favoris.map((favori) => favori.annonceId); // Extraire les IDs des annonces favoris

    return NextResponse.json(favorisIds, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des favoris :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des favoris" },
      { status: 500 }
    );
  }
}
