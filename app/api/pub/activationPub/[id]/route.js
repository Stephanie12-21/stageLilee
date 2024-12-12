import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";


async function sendSuspensionEmail(email,) {
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
    subject: "Notification d'activation de publicité",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      

      <div style="background-color: #FCA311; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Validation de votre annonce!</h1>
      </div>

      <div style="padding: 20px; line-height: 1.5; color: #333333;">
        <p style="font-size: 16px; margin-bottom: 15px;">Bonjour,</p>

        <p style="font-size: 16px; margin-bottom: 15px;">
            Votre publicité intitulée  publiée sur la plateforme LILEE       
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

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { statutPub, email } = body;

    const validStatut = ["ACTIVE", "SUSPENDUE"];
    if (!validStatut.includes(statutPub)) {
      return NextResponse.json(
        { error: "Statut utilisateur invalide." },
        { status: 400 }
      );
    }

    const publicite = await db.publicite.update({
      where: { id: parseInt(id, 10) },
      data: { statutPub },
    });

    if (!publicite) {
      console.log("Annonce non trouvée.");
      return NextResponse.json(
        { error: "Annonce non trouvée." },
        { status: 404 }
      );
    }

    await sendSuspensionEmail(email);

   

    return NextResponse.json(
      { message: "Mise à jour réussie et emails envoyés." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans l'API :", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
