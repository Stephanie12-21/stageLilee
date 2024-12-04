import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

async function sendSuspensionEmail(email, annonceTitre) {
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
    from: `"Lilee" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Notification d'activation d'annonce",
    text: `Bonjour,\n\nVotre annonce intitulée "${annonceTitre}" a été vérifiée et publiée sur la plateforme LILEE.\n\nMerci de nous contacter pour toute question.\n\nL'équipe Lilee.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email envoyé à l'auteur : ${email}`);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email à l'auteur :", error);
    throw new Error("Erreur lors de l'envoi de l'email à l'auteur.");
  }
}

async function sendNewsletterNotification(annonceTitre) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const abonnés = await db.newsletter.findMany({ select: { email: true } });

    if (!abonnés || abonnés.length === 0) {
      console.log("Aucun abonné trouvé.");
      return;
    }

    for (const { email } of abonnés) {
      const mailOptions = {
        from: `"Lilee" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Nouvelle annonce publiée sur LILEE",
        text: `Bonjour,\n\nUne nouvelle annonce intitulée "${annonceTitre}" vient d'être publiée sur notre plateforme.\n\nDécouvrez-la dès maintenant !\n\nMerci de nous suivre.\n\nL'équipe de LILEE.`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Notification envoyée à : ${email}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des notifications :", error);
    throw new Error("Erreur lors de l'envoi des notifications aux abonnés.");
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { statut, email, annonceTitre } = body;

    const validStatut = ["PUBLIEE", "DESACTIVEE", "EN_ATTENTE_DE_VALIDATION"];
    if (!validStatut.includes(statut)) {
      return NextResponse.json(
        { error: "Statut utilisateur invalide." },
        { status: 400 }
      );
    }

    const annonce = await db.annonces.update({
      where: { id: parseInt(id, 10) },
      data: { statut },
    });

    if (!annonce) {
      console.log("Annonce non trouvée.");
      return NextResponse.json(
        { error: "Annonce non trouvée." },
        { status: 404 }
      );
    }

    await sendSuspensionEmail(email, annonceTitre);

    if (statut === "PUBLIEE") {
      await sendNewsletterNotification(annonceTitre);
    }

    return NextResponse.json(
      { message: "Mise à jour réussie et emails envoyés." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans l'API :", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
