import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Assurez-vous que l'importation fonctionne correctement

import jwt from "jsonwebtoken";

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

  // Générer un token sécurisé pour le lien de désabonnement
  const unsubscribeToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Expire dans 7 jours
  });

  // URL de désabonnement
  const unsubscribeUrl = `${process.env.FRONTEND_URL}/Unsubscribe?token=${unsubscribeToken}`;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Notification d'abonnement à la newsletter",
    html: `
      <p>Bonjour,</p>
      <p>Merci de vous être abonné à la newsletter de Lilee.</p>
      <p>Si vous souhaitez vous désabonner, cliquez sur le bouton ci-dessous : ${unsubscribeUrl}</p>
      <a href="${unsubscribeUrl}" style="text-decoration: underline; color: blue;">Se désabonner</a>
      <p>À bientôt,</p>
      <p>L'équipe de Lilee</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès !");
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
