import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

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
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      

      <div style="background-color: #FCA311; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Validation de votre annonce!</h1>
      </div>

      <div style="padding: 20px; line-height: 1.5; color: #333333;">
        <p style="font-size: 16px; margin-bottom: 15px;">Bonjour,</p>

        <p style="font-size: 16px; margin-bottom: 15px;">
            Votre annonce intitulée "${annonceTitre}" a été vérifiée et publiée sur la plateforme LILEE       
        </p>

       

        <p style="font-size: 16px; margin-bottom: 15px;">À bientôt,</p>
        <p style="font-size: 16px; font-weight: bold;">L'équipe de Lilee</p>
      </div>

      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>© 2024 Lilee. Tous droits réservés.</p>
      </div>
    </div>
  `,
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
    const unsubscribeToken = jwt.sign({ abonnés }, process.env.JWT_SECRET);

    const unsubscribeUrl = `${process.env.FRONTEND_URL}/Unsubscribe?token=${unsubscribeToken}`;

    for (const { email } of abonnés) {
      const mailOptions = {
        from: `"Lilee" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Notification de nouvelles publications d'annonces ",
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      

      <div style="background-color: #FCA311; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Du nouveau  chez Lilee!</h1>
      </div>

      <div style="padding: 20px; line-height: 1.5; color: #333333;">
        <p style="font-size: 16px; margin-bottom: 15px;">Bonjour,</p>

        <p style="font-size: 16px; margin-bottom: 15px;">
          Une nouvelle annonce portant le titre "${annonceTitre}" vient d'être publiée sur la plateforme LILEE.Peut-être que cela pourrait vous intéresser.       
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${unsubscribeUrl}"
             style="display: inline-block; padding: 12px 24px; background-color:  #fdf3e1; color: #FCA311; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Se désabonner
          </a>
          
        </div>

        <p style="font-size: 16px; margin-bottom: 15px;">À bientôt,</p>
        <p style="font-size: 16px; font-weight: bold;">L'équipe de Lilee</p>
      </div>

      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>© 2024 Lilee. Tous droits réservés.</p>
      </div>
    </div>
  `,
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
