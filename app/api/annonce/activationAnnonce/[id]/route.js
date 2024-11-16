// import nodemailer from "nodemailer";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// async function sendSuspensionEmail(email, annonceTitre) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: process.env.SMTP_PORT === "465",
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });
//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: email,
//     subject: "Notification d'activation d'annonce",
//     text: `Bonjour,\n\nVotre annonce portant le titre "${annonceTitre}" a été vérifiée et publiée sur la plateforme LILEE.\n\nMerci de contacter l'administration si vous avez des questions.`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Email de suspension envoyé avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de l'envoi de l'email de suspension :", error);
//     throw new Error("Erreur lors de l'envoi de l'e-mail");
//   }
// }
// async function sendNewsletterEmail(email) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: process.env.SMTP_PORT === "465",
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   const unsubscribeToken = jwt.sign({ email }, process.env.JWT_SECRET);

//   const unsubscribeUrl = `${process.env.FRONTEND_URL}/Unsubscribe?token=${unsubscribeToken}`;

//   const mailOptions = {
//     from: `"Lilee" <${process.env.SMTP_USER}>`, // Ceci définit le nom d'affichage
//     to: email,
//     subject: "Bienvenue à la newsletter Lilee",
//     html: `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">

//       <div style="background-color: #FCA311; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
//         <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Bienvenue chez Lilee!</h1>
//       </div>

//       <div style="padding: 20px; line-height: 1.5; color: #333333;">
//         <p style="font-size: 16px; margin-bottom: 15px;">Bonjour,</p>

//         <p style="font-size: 16px; margin-bottom: 15px;">
//           Nous sommes ravis de vous compter parmi nos abonnés ! Vous recevrez désormais nos dernières actualités, conseils et offres exclusives directement dans votre boîte mail.
//         </p>

//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${unsubscribeUrl}"
//              style="display: inline-block; padding: 12px 24px; background-color:  #fdf3e1; color: #FCA311; text-decoration: none; border-radius: 4px; font-weight: bold;">
//             Se désabonner
//           </a>

//         </div>

//         <p style="font-size: 16px; margin-bottom: 15px;">À bientôt,</p>
//         <p style="font-size: 16px; font-weight: bold;">L'équipe de Lilee</p>
//       </div>

//       <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
//         <p>© 2024 Lilee. Tous droits réservés.</p>
//       </div>
//     </div>
//   `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Email envoyé avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de l'envoi de l'email :", error);
//     throw new Error("Erreur lors de l'envoi de l'email de confirmation");
//   }
// }

// export async function PUT(request, { params }) {
//   try {
//     const { id } = params;
//     const body = await request.json();
//     const { statut, email, annonceTitre } = body;
//     const validStatut = ["PUBLIEE", "DESACTIVEE"];
//     if (!validStatut.includes(statut)) {
//       return NextResponse.json(
//         { error: "Statut utilisateur invalide." },
//         { status: 400 }
//       );
//     }

//     // Mise à jour du statut de l'annonce dans la base de données
//     const annonce = await db.annonces.update({
//       where: { id: parseInt(id, 10) },
//       data: { statut },
//     });

//     if (!annonce) {
//       console.log("Erreur : Annonce non trouvée dans la base de données");
//       return NextResponse.json(
//         { error: "Annonce non trouvée." },
//         { status: 404 }
//       );
//     }

//     // Envoi de l'email de suspension
//     await sendSuspensionEmail(email, annonceTitre);
//     await sendNewsletterEmail(email);

//     return NextResponse.json(
//       { message: "Annonce suspendue avec succès et e-mail envoyé." },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erreur dans l'API de suspension :", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Fonction pour envoyer un email à l'auteur de l'annonce
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

// Fonction pour envoyer une notification aux abonnés de la newsletter
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
    // Récupérer tous les abonnés
    const abonnés = await db.newsletter.findMany({ select: { email: true } });

    if (!abonnés || abonnés.length === 0) {
      console.log("Aucun abonné trouvé.");
      return;
    }

    // Envoyer un email à chaque abonné
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

// API PUT pour mettre à jour le statut d'une annonce
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { statut, email, annonceTitre } = body;

    // Vérifier que le statut est valide
    const validStatut = ["PUBLIEE", "DESACTIVEE"];
    if (!validStatut.includes(statut)) {
      return NextResponse.json(
        { error: "Statut utilisateur invalide." },
        { status: 400 }
      );
    }

    // Mettre à jour le statut de l'annonce
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

    // Envoi de l'email à l'auteur de l'annonce
    await sendSuspensionEmail(email, annonceTitre);

    // Envoi de notifications aux abonnés de la newsletter (si l'annonce est publiée)
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
