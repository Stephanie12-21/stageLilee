import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Fonction pour envoyer un email à l'expéditeur (lui-même)
async function sendSuspensionEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465", // Le port 465 est sécurisé
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Lilee" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: "Notification de validation d'annonces en attente",
    text: `Bonjour,\n\nDe nouvelles annonces sont en attente de validation. Veuillez les examiner et les approuver ou rejeter selon votre politique.\n\nL'équipe Lilee.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé à l'expéditeur pour validation.");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email à l'expéditeur :", error);
  }
}

// Gestion des requêtes POST pour créer une annonce
export async function POST(request) {
  try {
    const body = await request.formData();
    const titre = body.get("title");
    const description = body.get("description");
    const categorieAnnonce = body.get("category");
    const sousCategorie = body.get("subcategory");
    const localisation = body.get("localisation");
    const adresse = body.get("adresse");
    const statut = body.get("statut");
    const imageFiles = body.getAll("images");
    const userId = parseInt(body.get("userId"), 10);

    // Validation des champs requis
    if (
      !titre ||
      !description ||
      !categorieAnnonce ||
      !sousCategorie ||
      !localisation ||
      !adresse ||
      !userId ||
      imageFiles.length === 0
    ) {
      return NextResponse.json(
        {
          message:
            "Tous les champs sont requis et au moins une image doit être fournie.",
        },
        { status: 400 }
      );
    }

    // Téléchargement des images
    const imageUrls = [];
    for (const image of imageFiles) {
      // Validation de la taille de l'image (limite : 10MB)
      if (image.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { message: "Chaque image doit être inférieure à 10MB." },
          { status: 400 }
        );
      }

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ko4bjtic");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();
      if (uploadResponse.ok && uploadResult.secure_url) {
        imageUrls.push(uploadResult.secure_url);
      } else {
        throw new Error("Échec du téléchargement de l'image.");
      }
    }

    // Création de l'annonce
    const newAnnonce = await db.annonces.create({
      data: {
        titre,
        description,
        categorieAnnonce,
        sousCategorie,
        localisation,
        adresse,
        statut,
        userId,
      },
    });

    const AnnonceId = newAnnonce.id;

    // Enregistrement des images associées
    const imageInsertions = imageUrls.map((imageUrl) => {
      return db.imageAnnonce.create({
        data: {
          path: imageUrl,
          annoncesId: AnnonceId,
        },
      });
    });
    await Promise.all(imageInsertions);

    // Envoi de l'email de notification à l'expéditeur
    sendSuspensionEmail().catch((error) => {
      console.error("Erreur lors de l'envoi de l'email :", error);
    });

    return NextResponse.json(
      {
        message: "Annonce et images créés avec succès.",
        Annonce: newAnnonce,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'annonce et des images :",
      error
    );
    return NextResponse.json(
      { message: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}

// Gestion des requêtes GET pour récupérer les annonces d'un utilisateur
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get("userId"), 10);

    if (!userId) {
      return NextResponse.json(
        { message: "L'ID utilisateur (userId) est requis." },
        { status: 400 }
      );
    }

    const annonces = await db.annonces.findMany({
      where: { userId },
      include: {
        imageAnnonces: true,
      },
    });

    if (!annonces || annonces.length === 0) {
      return NextResponse.json(
        { message: "Aucune annonce trouvée pour cet utilisateur." },
        { status: 404 }
      );
    }

    return NextResponse.json(annonces, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
