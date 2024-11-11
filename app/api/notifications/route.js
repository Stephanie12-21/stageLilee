import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

async function sendVerificationEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: "Vérification des annonces en attente",
    text: `Bonjour Lilee,\n\nDe nouvelles annonces sont en attente de votre validation. Veuillez les vérifier et les publier.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de vérification envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de vérification :", error);
    throw new Error("Erreur lors de l'envoi de l'e-mail");
  }
}

export async function POST(req) {
  try {
    await sendVerificationEmail();
    return NextResponse.json(
      { message: "E-mail envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
