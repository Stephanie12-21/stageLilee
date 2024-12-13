import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

async function sendSuspensionEmail(email, raison) {
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
    subject: "Notification de suspension de votre publicité",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      

      <div style="background-color: #FCA311; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Suspension de votre publicité!</h1>
      </div>

      <div style="padding: 20px; line-height: 1.5; color: #333333;">
        <p style="font-size: 16px; margin-bottom: 15px;">Bonjour,</p>

        <p style="font-size: 16px; margin-bottom: 15px;">
            Votre publicité a été suspendue pour la raison suivante :\n\n"${raison}"       
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
    const { raison, statutPartenaire } = body;

    const validStatut = ["ACTIF", "SUSPENDU"];
    if (!validStatut.includes(statutPartenaire)) {
      return NextResponse.json(
        { error: "Statut publicité invalide." },
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

    const partenaire = await db.partenaire.update({
      where: { id: parseInt(id, 10) },
      data: { statutPartenaire },
    });

    if (!partenaire) {
      console.log("Erreur : Publicité non trouvé dans la base de données");
      return NextResponse.json(
        { error: "Publicité non trouvé." },
        { status: 404 }
      );
    }

    await sendSuspensionEmail(partenaire.email, raison);

    return NextResponse.json(
      { message: "Utilisateur suspendu avec succès et e-mail envoyé." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans l'API de suspension :", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
