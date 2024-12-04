import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

async function sendSuspensionEmail(email, raison, annonceTitre) {
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
    to: email,
    subject: "Notification de suspension d'annonce",
    text: `Bonjour,\n\nVotre annonce portant le titre "${annonceTitre}" a été suspendue pour la raison suivante :\n\n"${raison}"\n\nMerci de contacter l'administration si vous avez des questions.`,
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
    const { raison, statut, email, annonceTitre } = body;

    const validStatut = ["PUBLIEE", "DESACTIVEE", "EN_ATTENTE_DE_VALIDATION"];
    if (!validStatut.includes(statut)) {
      return NextResponse.json(
        { error: "Statut utilisateur invalide." },
        { status: 400 }
      );
    }

    if (!raison) {
      console.log("Erreur : Champs requis manquant");
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    // Mise à jour du statut de l'annonce dans la base de données
    const annonce = await db.annonces.update({
      where: { id: parseInt(id, 10) },
      data: { statut },
    });

    if (!annonce) {
      console.log("Erreur : Annonce non trouvée dans la base de données");
      return NextResponse.json(
        { error: "Annonce non trouvée." },
        { status: 404 }
      );
    }

    // Envoi de l'email de suspension
    await sendSuspensionEmail(email, raison, annonceTitre);

    return NextResponse.json(
      { message: "Annonce suspendue avec succès et e-mail envoyé." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans l'API de suspension :", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
