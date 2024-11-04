import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

async function sendVerificationEmail(email, prenom, resetLink) {
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
    subject: "Réinitialisation de mot de passe",
    text: `Bonjour ${prenom},\n\nCliquez sur le lien suivant pour réinitialiser votre mot de passe (valide pendant 5 minutes) : ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de réinitialisation envoyé avec succès !");
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de réinitialisation :",
      error
    );
    throw new Error("Erreur lors de l'envoi de l'e-mail");
  }
}

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "L'adresse email est requise." },
      { status: 400 }
    );
  }

  // Récupérer l'utilisateur correspondant à l'email
  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true, // Sélectionnez l'ID
      prenom: true, // Sélectionnez le prénom si disponible
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Aucun utilisateur trouvé avec cet e-mail." },
      { status: 404 }
    );
  }

  const { id, prenom } = user; // Récupérez l'ID et le prénom de l'utilisateur

  // Générer un token JWT avec une expiration de 5minutes
  const resetToken = jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: "100h",
  });
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  try {
    await sendVerificationEmail(email, prenom, resetLink);
    return NextResponse.json(
      { message: "E-mail envoyé avec succès", userId: id }, // Incluez l'ID de l'utilisateur dans la réponse si nécessaire
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
