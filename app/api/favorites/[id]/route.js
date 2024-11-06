// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// export async function GET(req) {
//   const userId = req.headers.get("userId");
//   console.log("l'id user  reçu est :", userId);
//   if (!userId) {
//     return NextResponse.json(
//       { error: "L'ID utilisateur est requis." },
//       { status: 400 }
//     );
//   }

//   try {
//     // Récupérer les annonces avec les informations détaillées pour cet utilisateur
//     const favoris = await db.favoris.findMany({
//       where: {
//         userId: parseInt(userId, 10),
//       },
//       select: {
//         annonce: true, // Inclure toutes les informations de l'annonce
//         saveDate: true,
//       },
//     });

//     return NextResponse.json(favoris, { status: 200 });
//   } catch (error) {
//     console.error("Erreur lors de la récupération des favoris :", error);
//     return NextResponse.json(
//       { error: "Erreur lors de la récupération des favoris" },
//       { status: 500 }
//     );
//   }
// }

// Exemple d'API pour récupérer les favoris avec les annonces et leurs images
export async function GET(req) {
  const userId = req.headers.get("userId"); // Vous récupérez l'ID utilisateur dans l'en-tête

  if (!userId) {
    return NextResponse.json(
      { error: "L'ID utilisateur est requis." },
      { status: 400 }
    );
  }

  try {
    // Récupérer les favoris et les informations des annonces, y compris les images associées
    const favoris = await db.favoris.findMany({
      where: {
        userId: parseInt(userId, 10),
      },
      select: {
        saveDate: true,
        annonce: {
          select: {
            id: true,
            titre: true,
            description: true,
            localisation: true,
            adresse: true,
            statut: true,
            categorieAnnonce: true,
            imageAnnonces: {
              select: {
                id: true,
                path: true, // Assurez-vous que le modèle Prisma `imageAnnonces` contient une propriété `url`
              },
            },
          },
        },
      },
    });

    return NextResponse.json(favoris, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des favoris :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des favoris" },
      { status: 500 }
    );
  }
}
