import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

async function sendMessageContact(nom, prenom, email, phone, objet, message) {
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
    from: email,
    to: process.env.SMTP_USER,
    subject: objet,
    text: `
Bonjour,

Vous avez reçu un nouveau message de contact sur votre site.
Voici le message envoyé :
${message}

Informations de l'envoyeur :
Nom : ${nom}
Prénom : ${prenom}
Email : ${email}
Téléphone : ${phone}

Merci,
L'équipe de votre site.
`,
    html: `
    <p>Bonjour,</p>

    <p>Vous avez reçu un nouveau message de contact sur votre site.</p>
    <p><strong>Voici le message envoyé :</strong><br>
    ${message}</p>

    <hr>

    <h2>Informations de l'envoyeur :</h2>
    <p><strong>Nom :</strong> ${nom}<br>
    <strong>Prénom :</strong> ${prenom}<br>
    <strong>Email :</strong> ${email}<br>
    <strong>Téléphone :</strong> ${phone}</p>

    <p>Merci,<br>L'équipe de votre site.</p>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Message envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
    throw new Error("Erreur lors de l'envoi de l'e-mail");
  }
}

export async function POST(req) {
  const { nom, prenom, email, phone, objet, message } = await req.json();

  // Validation des entrées
  if (!nom || !prenom || !email || !phone || !objet || !message) {
    return NextResponse.json(
      { error: "Tous les champs sont requis." },
      { status: 400 }
    );
  }

  try {
    await sendMessageContact(nom, prenom, email, phone, objet, message);
    return NextResponse.json(
      { message: "Message envoyé à l'administrateur avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
