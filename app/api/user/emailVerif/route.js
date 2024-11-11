import nodemailer from "nodemailer";
import { NextResponse } from "next/server"; // Importez NextResponse

// Fonction pour envoyer l'email de vérification
async function sendVerificationEmail(email, prenom, verificationCode) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465", // TLS/SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Vérification de vos informations personnelles",
    text: `Bonjour ${prenom},\n\nVotre code de vérification est : ${verificationCode}\n\nMerci de vérifier votre adresse email.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de vérification envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de vérification :", error);
    throw new Error("Erreur lors de l'envoi de l'e-mail"); // Propagez l'erreur
  }
}

// Gestionnaire pour la méthode POST
export async function POST(req) {
  const { email, prenom, verificationCode } = await req.json(); // Récupérez les données JSON de la requête

  // Validation des entrées
  if (!email || !prenom || !verificationCode) {
    return NextResponse.json(
      { error: "Tous les champs sont requis." },
      { status: 400 }
    );
  }

  try {
    await sendVerificationEmail(email, prenom, verificationCode);
    return NextResponse.json(
      { message: "E-mail envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 }); // Renvoie le message d'erreur
  }
}

//////////////////////////////////////////////////////////////////////////
