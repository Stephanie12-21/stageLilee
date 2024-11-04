import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.formData(); // Récupère les données du formulaire

    // Affiche les données brutes du formulaire dans la console pour déboguer
    console.log("Données brutes du formulaire : ", Array.from(body.entries()));

    const commentaire = body.get("Commentaire");
    const userId = parseInt(body.get("IdUser"), 10);

    // Nettoie et décode `IdAnnonce`
    const annoncesIdRaw = body.get("IdAnnonce");
    const annoncesId = annoncesIdRaw
      ? parseInt(decodeURIComponent(annoncesIdRaw).replace("id=", ""), 10)
      : NaN;

    // Affiche les données reçues dans la console
    console.log("Données reçues : ", { commentaire, userId, annoncesId });

    // Validation des données
    if (!commentaire || isNaN(annoncesId) || isNaN(userId)) {
      return NextResponse.json(
        {
          message: "Tous les champs sont requis et doivent être valides.",
        },
        { status: 400 }
      );
    }

    // Création du commentaire avec les données reçues
    const newCommentaire = await db.commentaire.create({
      data: {
        commentaire,
        annoncesId,
        userId,
      },
    });

    return NextResponse.json(
      {
        message: "Commentaire créé avec succès",
        Commentaire: newCommentaire,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du commentaire:", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

//sans l'image du profil
// export async function GET(request) {
//   try {
//     // Extraire l'id de l'annonce depuis les paramètres de la requête
//     const { searchParams } = new URL(request.url);
//     const annoncesId = parseInt(searchParams.get("annoncesId"), 10);

//     // Vérifier si l'id de l'annonce est valide
//     if (isNaN(annoncesId)) {
//       return NextResponse.json(
//         {
//           message: "L'identifiant de l'annonce est requis et doit être valide.",
//         },
//         { status: 400 }
//       );
//     }

//     // Récupérer les commentaires associés à l'annonce
//     const commentaires = await db.commentaire.findMany({
//       where: { annoncesId },
//       include: {
//         user: true,
//       },
//     });

//     return NextResponse.json(
//       {
//         message: `Commentaires pour l'annonce ${annoncesId} récupérés avec succès.`,
//         commentaires,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la récupération des commentaires:", error);
//     return NextResponse.json(
//       { message: "Erreur interne du serveur" },
//       { status: 500 }
//     );
//   }
// }

//avec l'image du profil
export async function GET(request) {
  try {
    // Extraire l'id de l'annonce depuis les paramètres de la requête
    const { searchParams } = new URL(request.url);
    const annoncesId = parseInt(searchParams.get("annoncesId"), 10);

    // Vérifier si l'id de l'annonce est valide
    if (isNaN(annoncesId)) {
      return NextResponse.json(
        {
          message: "L'identifiant de l'annonce est requis et doit être valide.",
        },
        { status: 400 }
      );
    }

    // Récupérer les commentaires associés à l'annonce, incluant l'utilisateur et son image de profil
    const commentaires = await db.commentaire.findMany({
      where: { annoncesId },
      include: {
        user: {
          include: {
            profileImages: {
              select: {
                path: true, // Inclure le chemin de l'image
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: `Commentaires pour l'annonce ${annoncesId} récupérés avec succès.`,
        commentaires: commentaires.map((commentaire) => ({
          ...commentaire,
          user: {
            ...commentaire.user,
            profileImage: commentaire.user.profileImages[0]?.path, // Récupérer la première image de profil si disponible
          },
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
