import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { userId } = params;
    const { newPassword } = await request.json();

    console.log("ID utilisateur reçu :", userId);
    console.log("Nouveau mot de passe reçu :", newPassword ? "Oui" : "Non");

    if (!userId) {
      console.log("Erreur : ID utilisateur manquant.");
      return new NextResponse(JSON.stringify({ message: "ID manquant" }), {
        status: 400,
      });
    }

    if (!newPassword) {
      console.log("Erreur : Nouveau mot de passe non fourni.");
      return new NextResponse(
        JSON.stringify({ message: "Le nouveau mot de passe est requis." }),
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: parseInt(userId, 10) },
    });

    console.log("Utilisateur trouvé :", user ? "Oui" : "Non");

    if (!user) {
      console.log("Erreur : Utilisateur non trouvé.");
      return new NextResponse(
        JSON.stringify({ message: "Utilisateur non trouvé." }),
        { status: 404 }
      );
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.hashPassword);
    console.log(
      "Le nouveau mot de passe est identique à l'ancien :",
      isSamePassword
    );

    if (isSamePassword) {
      console.log("Erreur : Le nouveau mot de passe est identique à l'ancien.");
      return new NextResponse(
        JSON.stringify({
          message:
            "Le nouveau mot de passe ne peut pas être identique à l'ancien.",
        }),
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    console.log("Nouveau mot de passe hashé avec succès.");

    await db.user.update({
      where: { id: parseInt(userId, 10) },
      data: { hashPassword: hashedNewPassword },
    });

    console.log(
      "Mot de passe mis à jour avec succès pour l'utilisateur :",
      userId
    );

    return new NextResponse(
      JSON.stringify({ message: "Mot de passe mis à jour avec succès!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe :", error);
    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la mise à jour du mot de passe.",
      }),
      { status: 500 }
    );
  }
}
