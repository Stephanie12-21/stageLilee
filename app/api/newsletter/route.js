// import nodemailer from "nodemailer";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db"; // Assurez-vous que l'importation fonctionne correctement

// // Fonction pour envoyer l'email de confirmation d'abonnement à la newsletter
// async function sendNewsletterEmail(email) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: process.env.SMTP_PORT === "465", // Secure si port 465
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: email,
//     subject: "Notification d'abonnement à la newsletter",
//     text: `Bonjour,\n\nMerci de vous être abonné à la newsletter de Lilee.\nVous recevrez bientôt des nouvelles intéressantes !`,
//   };

//   try {
//     // Envoi de l'email
//     await transporter.sendMail(mailOptions);
//     console.log("Email d'abonnement envoyé avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de l'envoi de l'email :", error);
//     throw new Error("Erreur lors de l'envoi de l'email de confirmation");
//   }
// }

// // Fonction API pour gérer l'abonnement à la newsletter
// export async function POST(request) {
//   try {
//     const { email } = await request.json(); // Récupération de l'email du corps de la requête

//     // Validation de l'email
//     if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
//       return new NextResponse(JSON.stringify({ message: "Email invalide." }), {
//         status: 400,
//       });
//     }

//     // Vérifier si l'email est déjà enregistré dans la base de données
//     const existingEmail = await db.newsletter.findUnique({
//       where: { email }, // Vérifier si l'email est déjà enregistré
//     });

//     if (existingEmail) {
//       //   return new NextResponse(
//       //     JSON.stringify({ message: "Cet email est déjà abonné." }),
//       //     { status: 400 }
//       //   );
//       return res.status(409).json({ message: "Cet email est déjà abonné." });
//     }

//     // Enregistrement de l'email dans la base de données
//     await db.newsletter.create({
//       data: { email },
//     });

//     // Envoi de l'email de confirmation
//     await sendNewsletterEmail(email);

//     // Retourner une réponse de succès
//     return new NextResponse(
//       JSON.stringify({
//         message: "Vous êtes maintenant abonné à la newsletter.",
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erreur dans l'API :", error);
//     return new NextResponse(
//       JSON.stringify({ message: "Erreur interne du serveur." }),
//       { status: 500 }
//     );
//   }
// }

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Assurez-vous que l'importation fonctionne correctement

// Fonction pour envoyer l'email de confirmation d'abonnement à la newsletter
async function sendNewsletterEmail(email) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465", // Secure si port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Notification d'abonnement à la newsletter",
    text: `Bonjour,\n\nMerci de vous être abonné à la newsletter de Lilee.\nVous recevrez bientôt des nouvelles intéressantes !`,
  };

  try {
    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    console.log("Email d'abonnement envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error("Erreur lors de l'envoi de l'email de confirmation");
  }
}

// Fonction API pour gérer l'abonnement à la newsletter
export async function POST(request) {
  try {
    const { email } = await request.json(); // Récupération de l'email du corps de la requête

    // Validation de l'email
    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      return new NextResponse(JSON.stringify({ message: "Email invalide." }), {
        status: 400,
      });
    }

    // Vérifier si l'email est déjà enregistré dans la base de données
    const existingEmail = await db.newsletter.findUnique({
      where: { email }, // Vérifier si l'email est déjà enregistré
    });

    if (existingEmail) {
      // Si l'email existe déjà, retournez une réponse 409 (conflit)
      return new NextResponse(
        JSON.stringify({ message: "Cet email est déjà abonné." }),
        { status: 409 }
      );
    }

    // Enregistrement de l'email dans la base de données
    await db.newsletter.create({
      data: { email },
    });

    // Envoi de l'email de confirmation
    await sendNewsletterEmail(email);

    // Retourner une réponse de succès
    return new NextResponse(
      JSON.stringify({
        message: "Vous êtes maintenant abonné à la newsletter.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans l'API :", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}
