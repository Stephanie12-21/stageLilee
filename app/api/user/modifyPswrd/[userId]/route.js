import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    // Récupérez l'ID utilisateur depuis les paramètres
    const { userId } = params;
    const { password } = await request.json();

    // Vérifiez si l'ID utilisateur est manquant
    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "ID manquant" }), {
        status: 400,
      });
    }

    // Vérifiez si le mot de passe est manquant
    if (!password) {
      return new NextResponse(
        JSON.stringify({ message: "Le mot de passe est requis." }),
        {
          status: 400,
        }
      );
    }

    // Hash du mot de passe avec bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Mise à jour de l'utilisateur dans la base de données
    const updatedUser = await db.user.update({
      where: { id: parseInt(userId, 10) }, // Assurez-vous de convertir l'ID en nombre si nécessaire
      data: {
        hashPassword: hashedPassword,
      },
    });

    // Si l'utilisateur n'a pas été trouvé
    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({ message: "Utilisateur non trouvé." }),
        {
          status: 404,
        }
      );
    }

    // Succès de la mise à jour
    return new NextResponse(
      JSON.stringify({ message: "Mot de passe réinitialisé avec succès!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    // En cas d'erreur serveur, retourner un message générique
    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la réinitialisation du mot de passe.",
      }),
      {
        status: 500,
      }
    );
  }
}
