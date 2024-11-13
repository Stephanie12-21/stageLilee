// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const body = await request.formData();
//     const content = body.get("message");
//     const senderId = parseInt(body.get("sender"), 10);
//     const receiverId = parseInt(body.get("receiver"), 10);
//     const annonceId = parseInt(body.get("annonce"), 10);
//     const imageMessages = body.getAll("images");

//     // Validation des données entrantes
//     if (
//       (!content && imageMessages.length === 0) ||
//       isNaN(senderId) ||
//       isNaN(receiverId) ||
//       isNaN(annonceId)
//     ) {
//       return new NextResponse(
//         JSON.stringify({
//           message: "Un message ou une image est requis.",
//         }),
//         { status: 400 }
//       );
//     }

//     // Upload des images sur Cloudinary
//     const imageUrls = [];
//     for (const image of imageMessages) {
//       const formData = new FormData();
//       formData.append("file", image);
//       formData.append("upload_preset", "ko4bjtic");

//       const uploadResponse = await fetch(
//         "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const uploadResult = await uploadResponse.json();

//       if (uploadResponse.ok && uploadResult.secure_url) {
//         imageUrls.push(uploadResult.secure_url);
//       } else {
//         console.error("Erreur de Cloudinary:", uploadResult);
//         throw new Error("Échec du téléchargement de l'image");
//       }
//     }

//     // Création du message dans la base de données
//     const newMessage = await db.message.create({
//       data: {
//         content: content || "",
//         senderId,
//         receiverId,
//         annonceId, // connecte avec l'annonce sans l'utilisation de 'connect'
//         imageMessages: {
//           create: imageUrls.map((url) => ({
//             path: url, // Création des images avec les URLs
//           })),
//         },
//       },
//     });

//     return new NextResponse(
//       JSON.stringify({
//         message: "Message et images créés avec succès",
//         article: newMessage,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(
//       "Erreur lors de la création du message et des images :",
//       error
//     );
//     return new NextResponse(
//       JSON.stringify({ message: "Erreur interne du serveur" }),
//       { status: 500 }
//     );
//   }
// }
// // export async function GET(request) {
// //   try {
// //     // Récupérer l'`annonceId` depuis les paramètres de la requête
// //     const url = new URL(request.url);
// //     const annonceId = parseInt(url.searchParams.get("annonceId"), 10);

// //     // Validation de l'`annonceId`
// //     if (isNaN(annonceId)) {
// //       return new NextResponse(
// //         JSON.stringify({
// //           message:
// //             "L'ID de l'annonce est requis et doit être un nombre valide.",
// //         }),
// //         { status: 400 }
// //       );
// //     }

// //     // Récupérer les messages associés à l'`annonceId`
// //     const messages = await db.message.findMany({
// //       where: {
// //         annonceId: annonceId,
// //       },
// //       include: {
// //         imageMessages: true, // Inclure les images associées au message
// //       },
// //     });

// //     // Retourner les messages sous forme de réponse JSON
// //     return new NextResponse(
// //       JSON.stringify({
// //         message: "Messages récupérés avec succès",
// //         data: messages,
// //       }),
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error("Erreur lors de la récupération des messages :", error);
// //     return new NextResponse(
// //       JSON.stringify({ message: "Erreur interne du serveur" }),
// //       { status: 500 }
// //     );
// //   }
// // }
// export async function GET(request) {
//   try {
//     // Récupérer l'`annonceId` depuis les paramètres de la requête
//     const url = new URL(request.url);
//     const annonceId = parseInt(url.searchParams.get("annonceId"), 10);

//     // Validation de l'`annonceId`
//     if (isNaN(annonceId)) {
//       return new NextResponse(
//         JSON.stringify({
//           message:
//             "L'ID de l'annonce est requis et doit être un nombre valide.",
//         }),
//         { status: 400 }
//       );
//     }

//     // Récupérer l'annonce avec ses relations (images, catégorie, utilisateur, etc.)
//     const annonce = await db.annonce.findUnique({
//       where: { id: annonceId },
//       include: {
//         imageAnnonces: true, // Inclure les images associées à l'annonce
//         categorieAnnonce: true, // Inclure la catégorie de l'annonce
//         user: true, // Inclure l'utilisateur lié à l'annonce
//         messages: {
//           // Inclure les messages associés à l'annonce
//           include: {
//             sender: true, // Inclure les informations de l'expéditeur
//             receiver: true, // Inclure les informations du destinataire
//             imageMessages: true, // Inclure les images associées au message
//           },
//         },
//       },
//     });

//     if (!annonce) {
//       return new NextResponse(
//         JSON.stringify({
//           message: "Annonce non trouvée.",
//         }),
//         { status: 404 }
//       );
//     }

//     // Retourner l'annonce avec toutes ses informations sous forme de réponse JSON
//     return new NextResponse(
//       JSON.stringify({
//         message: "Annonce et ses messages récupérés avec succès",
//         annonce: {
//           id: annonce.id,
//           titre: annonce.titre,
//           description: annonce.description,
//           localisation: annonce.localisation,
//           adresse: annonce.adresse,
//           statut: annonce.statut,
//           createdAt: annonce.createdAt,
//           updatedAt: annonce.updatedAt,
//           categorieAnnonce: annonce.categorieAnnonce,
//           images: annonce.imageAnnonces.map((image) => image.path), // Liste des URLs des images associées
//           user: {
//             id: annonce.user.id,
//             name: annonce.user.name, // Nom de l'utilisateur
//             email: annonce.user.email, // Email de l'utilisateur
//           },
//           messages: annonce.messages.map((message) => ({
//             id: message.id,
//             content: message.content,
//             sender: {
//               id: message.sender.id,
//               name: message.sender.name,
//               email: message.sender.email,
//             },
//             receiver: {
//               id: message.receiver.id,
//               name: message.receiver.name,
//               email: message.receiver.email,
//             },
//             images: message.imageMessages.map((image) => image.path),
//           })),
//         },
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la récupération de l'annonce :", error);
//     return new NextResponse(
//       JSON.stringify({ message: "Erreur interne du serveur" }),
//       { status: 500 }
//     );
//   }
// }

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.formData();
    const content = body.get("message");
    const senderId = parseInt(body.get("sender"), 10);
    const receiverId = parseInt(body.get("receiver"), 10);
    const annonceId = parseInt(body.get("annonce"), 10);
    const imageMessages = body.getAll("images");

    // Validation des données entrantes
    if (
      (!content && imageMessages.length === 0) ||
      isNaN(senderId) ||
      isNaN(receiverId) ||
      isNaN(annonceId)
    ) {
      return new NextResponse(
        JSON.stringify({
          message: "Un message ou une image est requis.",
        }),
        { status: 400 }
      );
    }

    // Upload des images sur Cloudinary
    const imageUrls = [];
    for (const image of imageMessages) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ko4bjtic");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();

      if (uploadResponse.ok && uploadResult.secure_url) {
        imageUrls.push(uploadResult.secure_url);
      } else {
        console.error("Erreur de Cloudinary:", uploadResult);
        throw new Error("Échec du téléchargement de l'image");
      }
    }

    // Création du message dans la base de données
    const newMessage = await db.message.create({
      data: {
        content: content || "",
        senderId,
        receiverId,
        annonceId, // connecte avec l'annonce sans l'utilisation de 'connect'
        imageMessages: {
          create: imageUrls.map((url) => ({
            path: url, // Création des images avec les URLs
          })),
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "Message et images créés avec succès",
        article: newMessage,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la création du message et des images :",
      error
    );
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur" }),
      { status: 500 }
    );
  }
}

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userId = parseInt(searchParams.get("userId"), 10);

//     if (isNaN(userId)) {
//       return new NextResponse(
//         JSON.stringify({
//           message: "Un userId valide est requis.",
//         }),
//         { status: 400 }
//       );
//     }

//     const messages = await db.message.findMany({
//       where: {
//         OR: [{ senderId: userId }, { receiverId: userId }],
//       },
//       include: {
//         imageMessages: true,
//       },
//     });

//     console.log("Messages récupérés:", messages); // Affiche les messages récupérés

//     return new NextResponse(
//       JSON.stringify({
//         message: "Messages récupérés avec succès",
//         messages,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la récupération des messages :", error);
//     return new NextResponse(
//       JSON.stringify({ message: "Erreur interne du serveur" }),
//       { status: 500 }
//     );
//   }
// }

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get("userId"), 10);

    if (isNaN(userId)) {
      return new NextResponse(
        JSON.stringify({
          message: "Un userId valide est requis.",
        }),
        { status: 400 }
      );
    }

    // Récupération des messages avec les informations des utilisateurs (sender, receiver) et leurs images
    const messages = await db.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            phone: true,
            profileImages: {
              select: {
                path: true, // Suppose que votre modèle profileImage a un champ `path`
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            phone: true,
            profileImages: {
              select: {
                path: true,
              },
            },
          },
        },
        imageMessages: true,
        annonce: {
          select: {
            id: true,
            description: true,
            adresse: true,
            titre: true,
          },
        },
      },
    });

    console.log("Messages récupérés :", messages);

    return new NextResponse(
      JSON.stringify({
        message: "Messages récupérés avec succès",
        messages,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur" }),
      { status: 500 }
    );
  }
}
