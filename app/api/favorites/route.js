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
