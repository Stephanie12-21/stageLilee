import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db"; // Assurez-vous d'avoir bien configuré la connexion à votre base de données

// Fonction pour vérifier le mot de passe actuel
export async function verifyCurrentPassword(userId, currentPassword) {
  if (!userId) {
    return NextResponse.json(
      { error: "L'ID utilisateur est requis" },
      { status: 400 }
    );
  }

  try {
    // Convertir userId en entier (si nécessaire)
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      return NextResponse.json(
        { error: "ID utilisateur invalide" },
        { status: 400 }
      );
    }

    // Rechercher l'utilisateur dans la base de données par son ID
    const user = await db.user.findUnique({
      where: { id: userIdInt },
      select: { hashPassword: true },
    });

    if (!user) {
      // Si l'utilisateur n'existe pas
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    // Vérifier si le mot de passe actuel correspond au mot de passe hashé dans la base de données
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.hashPassword
    );

    if (!passwordMatch) {
      // Si les mots de passe ne correspondent pas
      return NextResponse.json(
        { error: "Le mot de passe actuel est incorrect" },
        { status: 400 }
      );
    }

    // Si le mot de passe est correct
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // En cas d'erreur interne
    console.error("Erreur lors de la vérification du mot de passe :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}

// API pour vérifier le mot de passe actuel
export async function POST(req) {
  try {
    const { userId, currentPassword } = await req.json();
    console.log("Données reçues : ", userId, "et", currentPassword);

    // Vérifier si userId est défini
    if (!userId) {
      return NextResponse.json(
        { error: "L'ID utilisateur est requis" },
        { status: 400 }
      );
    }

    // Vérification du mot de passe actuel
    return await verifyCurrentPassword(userId, currentPassword);
  } catch (error) {
    // Si l'extraction des données échoue
    console.error("Erreur lors du traitement de la requête :", error);
    return NextResponse.json(
      { error: "Données invalides ou requête mal formée" },
      { status: 400 }
    );
  }
}
