import { NextResponse } from "next/server";
import twilio from "twilio";

// Fonction pour envoyer un SMS avec le code de vérification
async function sendVerificationSMS(Phone, prenom, verificationCode) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    await client.messages.create({
      body: `Bonjour ${prenom}, votre code de vérification est : ${verificationCode}`,
      from: "+12092925180",
      to: Phone,
    });
    console.log("SMS de vérification envoyé avec succès !");
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi du SMS de vérification :",
      error.message
    );
    throw new Error("Erreur lors de l'envoi du SMS de vérification.");
  }
}

// Gestionnaire pour la méthode POST
export async function POST(req) {
  try {
    const { Phone, prenom, verificationCode } = await req.json(); // Récupérez les données JSON de la requête

    // Validation des entrées
    if (!Phone || !prenom || !verificationCode) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    await sendVerificationSMS(Phone, prenom, verificationCode);
    return NextResponse.json(
      { message: "SMS envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
