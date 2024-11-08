import nodemailer from "nodemailer";
import { NextResponse } from "next/server"; // Importez NextResponse

// Fonction pour envoyer l'email de suspension
async function sendSuspensionEmail(email, raison) {
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
    subject: "Notification de suspension de compte",
    text: `Bonjour,\n\nVotre compte a été suspendu pour la raison suivante :\n\n"${raison}"\n\nMerci de contacter l'administration si vous avez des questions.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de suspension envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de suspension :", error);
    throw new Error("Erreur lors de l'envoi de l'e-mail");
  }
}

// Gestionnaire pour la méthode POST
export async function POST(req) {
  try {
    const { email, raison } = await req.json(); // Récupérez les données JSON de la requête

    // Validation des entrées
    if (!email || !raison) {
      return NextResponse.json(
        { error: "Tous les champs (email, raison) sont requis." },
        { status: 400 }
      );
    }

    // Envoi de l'email de suspension
    await sendSuspensionEmail(email, raison);

    return NextResponse.json(
      { message: "E-mail de suspension envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans l'API de suspension :", error);
    return NextResponse.json({ error: error.message }, { status: 500 }); // Renvoie le message d'erreur
  }
}
