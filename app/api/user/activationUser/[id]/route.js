import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

async function sendSuspensionEmail(email) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465", // Assurez-vous que le port est correct
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Notification d'activation de compte",
    text: `Bonjour,\n\nVotre compte a été activé.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de suspension envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de suspension :", error);
    throw new Error("Erreur lors de l'envoi de l'e-mail");
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { statutUser, email } = body;

    const validStatut = ["ACTIF", "SUSPENDU"];
    if (!validStatut.includes(statutUser)) {
      return NextResponse.json(
        { error: "Statut utilisateur invalide." },
        { status: 400 }
      );
    }

    const user = await db.user.update({
      where: { id: parseInt(id, 10) },
      data: { statutUser },
    });

    if (!user) {
      console.log("Erreur : Utilisateur non trouvé dans la base de données");
      return NextResponse.json(
        { error: "Utilisateur non trouvé." },
        { status: 404 }
      );
    }

    await sendSuspensionEmail(user.email); // Envoi de l'email de notification

    return NextResponse.json(
      { message: "Utilisateur suspendu avec succès et e-mail envoyé." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans l'API de suspension :", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
