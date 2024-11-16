// import { db } from "@/lib/db";
// import nodemailer from "nodemailer";
// import { NextResponse } from "next/server";

// async function sendNewsletterNotification(titre) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: process.env.SMTP_PORT === "465",
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   try {
//     // Récupérer tous les abonnés
//     const abonnés = await db.newsletter.findMany({ select: { email: true } });

//     if (!abonnés || abonnés.length === 0) {
//       console.log("Aucun abonné trouvé.");
//       return;
//     }

//     // Envoyer un email à chaque abonné
//     for (const { email } of abonnés) {
//       const mailOptions = {
//         from: `"Lilee" <${process.env.SMTP_USER}>`,
//         to: email,
//         subject: "Nouvelle annonce publiée sur LILEE",
//         text: `Bonjour,\n\nUne nouvelle article intitulée "${titre}" vient d'être publiée sur notre plateforme.\n\nDécouvrez-la dès maintenant !\n\nMerci de nous suivre.\n\nL'équipe de LILEE.`,
//       };

//       await transporter.sendMail(mailOptions);
//       console.log(`Notification envoyée à : ${email}`);
//     }
//   } catch (error) {
//     console.error("Erreur lors de l'envoi des notifications :", error);
//     throw new Error("Erreur lors de l'envoi des notifications aux abonnés.");
//   }
// }

// export async function POST(request) {
//   try {
//     // Extraire le corps de la requête
//     const body = await request.formData(); // Utilisez `formData` pour récupérer les fichiers

//     const titre = body.get("titre");
//     const contenu = body.get("contenu");
//     const categorieArticle = body.get("categorieArticle");
//     const imageFiles = body.getAll("images"); // Récupère les fichiers d'images

//     // Validation des données
//     if (!titre || !contenu || !categorieArticle || imageFiles.length === 0) {
//       return new NextResponse(
//         JSON.stringify({
//           message:
//             "Tous les champs sont requis et au moins une image doit être fournie.",
//         }),
//         { status: 400 }
//       );
//     }

//     // Si des images sont uploadées via Cloudinary
//     const imageUrls = [];
//     for (const image of imageFiles) {
//       const formData = new FormData();
//       formData.append("file", image);
//       formData.append("upload_preset", "ko4bjtic"); // Remplace par ton preset Cloudinary

//       // Envoi de l'image à Cloudinary
//       const uploadResponse = await fetch(
//         "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const uploadResult = await uploadResponse.json();
//       if (uploadResponse.ok && uploadResult.secure_url) {
//         imageUrls.push(uploadResult.secure_url); // Récupère l'URL de l'image uploadée
//       } else {
//         throw new Error("Image upload failed");
//       }
//     }

//     // Création de l'article avec les données reçues
//     const newArticle = await db.article.create({
//       data: {
//         titre,
//         contenu,
//         categorieArticle,
//       },
//     });

//     const articleId = newArticle.id;

//     const imageInsertions = imageUrls.map((imageUrl) => {
//       return db.image.create({
//         data: {
//           path: imageUrl,
//           articleId: articleId,
//         },
//       });
//     });

//     await Promise.all(imageInsertions); // Associer les images à l'article
//     await sendNewsletterNotification();
//     return new NextResponse(
//       JSON.stringify({
//         message: "Article et images créés avec succès",
//         article: newArticle,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(
//       "Erreur lors de la création de l'article et des images :",
//       error
//     );
//     return new NextResponse(
//       JSON.stringify({ message: "Erreur interne du serveur" }),
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     const articles = await db.article.findMany({
//       include: {
//         images: true, // Assurez-vous d'inclure les images associées
//       },
//       orderBy: {
//         createdAt: "desc", // Ordre décroissant selon la date de création
//       },
//     });

//     // Formater les articles et leurs images
//     const formattedArticles = articles.map((article) => ({
//       ...article,
//       imageUrl: article.images.length > 0 ? article.images[0].path : null, // Utilisez la première image associée
//     }));

//     return new NextResponse(JSON.stringify(formattedArticles), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la récupération des articles :", error);
//     return new NextResponse(
//       JSON.stringify({ message: "Erreur interne du serveur" }),
//       {
//         status: 500,
//       }
//     );
//   }
// }

import { db } from "@/lib/db";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Fonction pour envoyer des notifications aux abonnés de la newsletter
async function sendNewsletterNotification(titre) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Récupérer tous les abonnés
    const abonnés = await db.newsletter.findMany({ select: { email: true } });

    if (!abonnés.length) {
      console.log("Aucun abonné trouvé.");
      return;
    }

    // Envoyer un email à chaque abonné
    for (const { email } of abonnés) {
      const mailOptions = {
        from: `"Lilee" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Nouvelle annonce publiée sur LILEE",
        text: `Bonjour,\n\nUn nouvel article intitulé "${titre}" vient d'être publié sur notre plateforme.\n\nDécouvrez-le dès maintenant !\n\nMerci de nous suivre.\n\nL'équipe de LILEE.`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Notification envoyée à : ${email}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des notifications :", error);
    throw new Error("Erreur lors de l'envoi des notifications.");
  }
}

export async function POST(request) {
  try {
    // Lire les données envoyées via FormData
    const body = await request.formData();
    const titre = body.get("titre");
    const contenu = body.get("contenu");
    const categorieArticle = body.get("categorieArticle");
    const images = body.getAll("images");

    // Validation des champs
    if (!titre || !contenu || !categorieArticle || images.length === 0) {
      return new NextResponse(
        JSON.stringify({
          message:
            "Tous les champs sont requis et au moins une image doit être fournie.",
        }),
        { status: 400 }
      );
    }

    // Upload des images sur Cloudinary
    const imageUrls = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ko4bjtic"); // Remplacez par votre preset Cloudinary

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
        throw new Error("Échec de l'upload de l'image.");
      }
    }

    // Création de l'article dans la base de données
    const newArticle = await db.article.create({
      data: { titre, contenu, categorieArticle },
    });

    // Association des images à l'article
    const articleId = newArticle.id;
    const imageInsertions = imageUrls.map((imageUrl) =>
      db.image.create({
        data: { path: imageUrl, articleId },
      })
    );

    await Promise.all(imageInsertions);

    // Envoi des notifications aux abonnés
    await sendNewsletterNotification(titre);

    return new NextResponse(
      JSON.stringify({
        message: "Article et images créés avec succès.",
        article: newArticle,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'article et des images :",
      error
    );
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Récupérer les articles avec leurs images associées
    const articles = await db.article.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    // Formater les articles et leurs images
    const formattedArticles = articles.map((article) => ({
      ...article,
      imageUrl: article.images[0]?.path || null, // Utilise la première image associée
    }));

    return new NextResponse(JSON.stringify(formattedArticles), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}
