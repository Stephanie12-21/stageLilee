import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.formData();
    const content = body.get("message");
    const senderId = parseInt(body.get("sender"), 10);
    const receiverId = parseInt(body.get("receiver"), 10);
    const imageMessages = body.getAll("images");

    if (
      (!content && imageMessages.length === 0) ||
      isNaN(senderId) ||
      isNaN(receiverId)
    ) {
      return new NextResponse(
        JSON.stringify({
          message: "Un message ou une image est requis.",
        }),
        { status: 400 }
      );
    }

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

    const newMessage = await db.message.create({
      data: {
        content: content || "",
        senderId,
        receiverId,
      },
    });

    const messageId = newMessage.id;

    const imageInsertions = imageUrls.map((imageUrl) =>
      db.imageMessages.create({
        data: {
          path: imageUrl,
          messageId,
        },
      })
    );

    await Promise.all(imageInsertions);

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

//     // Vérification si le userId est valide
//     if (isNaN(userId)) {
//       return new NextResponse(
//         JSON.stringify({
//           message: "Un userId valide est requis.",
//         }),
//         { status: 400 }
//       );
//     }

//     // Récupérer les messages où l'utilisateur est soit l'expéditeur soit le destinataire
//     const messages = await db.message.findMany({
//       where: {
//         OR: [{ senderId: userId }, { receiverId: userId }],
//       },
//       include: {
//         imageMessages: true, // Inclut les messages d'image associés, si nécessaire
//       },
//     });

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

    const messages = await db.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        imageMessages: true,
      },
    });

    console.log("Messages récupérés:", messages); // Affiche les messages récupérés

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
