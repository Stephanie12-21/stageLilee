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
      from: "+17754297570",
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

// import { NextResponse } from "next/server";
// import twilio from "twilio";

// // Fonction pour valider le format E.164 d'un numéro de téléphone
// function isValidPhoneNumber(phone) {
//   const phoneRegex = /^\+\d{8,15}$/; // Format international E.164
//   return phoneRegex.test(phone);
// }

// // Fonction pour envoyer un SMS avec le code de vérification
// async function sendVerificationSMS(phone, prenom, verificationCode) {
//   // Instanciation du client Twilio
//   const client = twilio(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
//   );

//   try {
//     // Création et envoi du message
//     await client.messages.create({
//       body: `Bonjour ${prenom}, votre code de vérification est : ${verificationCode}`,
//       from: "+17754297570", // Utilisez la variable d'environnement pour le numéro Twilio
//       to: phone,
//     });
//     console.log("SMS de vérification envoyé avec succès !");
//   } catch (error) {
//     console.error(
//       "Erreur lors de l'envoi du SMS de vérification :",
//       error.message
//     );
//     throw new Error(
//       "Impossible d'envoyer le SMS. Vérifiez vos identifiants ou le numéro de téléphone."
//     );
//   }
// }

// // Gestionnaire pour la méthode POST
// export async function POST(req) {
//   try {
//     // Récupération des données JSON de la requête
//     const { phone, prenom, verificationCode } = await req.json();

//     // Validation des entrées
//     if (!phone || !prenom || !verificationCode) {
//       return NextResponse.json(
//         { error: "Tous les champs sont requis." },
//         { status: 400 }
//       );
//     }

//     // Vérification du format du numéro de téléphone
//     if (!isValidPhoneNumber(phone)) {
//       return NextResponse.json(
//         { error: "Numéro de téléphone invalide. Utilisez le format E.164." },
//         { status: 400 }
//       );
//     }

//     // Envoi du SMS
//     await sendVerificationSMS(phone, prenom, verificationCode);

//     // Réponse de succès
//     return NextResponse.json(
//       { message: "SMS envoyé avec succès" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erreur dans le gestionnaire POST :", error.message);
//     return NextResponse.json(
//       { error: error.message || "Une erreur est survenue." },
//       { status: 500 }
//     );
//   }
// }
