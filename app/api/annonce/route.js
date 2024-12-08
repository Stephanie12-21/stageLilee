import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

async function sendSuspensionEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // const mailOptions = {
  //   from: `"Lilee" <${process.env.SMTP_USER}>`,
  //   to: process.env.SMTP_USER,
  //   subject: "Notification de validation d'annonces en attente",
  //   text: `Bonjour,\n\nDe nouvelles annonces sont en attente de validation. Veuillez les examiner et les approuver ou rejeter selon votre politique.\n\nL'équipe Lilee.`,
  // };
  const mailOptions = {
    from: `"Lilee" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: "Notification de validation d'annonces en attente",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px;">
      
      <div style="background-color: #FCA311; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Validation d'annonces requise</h1>
      </div>

      <div style="padding: 20px; line-height: 1.6; color: #333333;">
        <p style="font-size: 16px; margin-bottom: 15px;">Bonjour,</p>

        <p style="font-size: 16px; margin-bottom: 15px;">
          De nouvelles annonces ont été modifiées et nécessitent votre validation. Veuillez examiner ces annonces pour les approuver ou les rejeter, conformément à votre politique.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.ADMIN_DASHBOARD_URL}" 
             style="display: inline-block; padding: 12px 24px; background-color: #FCA311; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
            Accéder au tableau de bord
          </a>
        </div>

        <p style="font-size: 16px; margin-bottom: 15px;">Merci pour votre diligence,</p>
        <p style="font-size: 16px; font-weight: bold;">L'équipe Lilee</p>
      </div>

      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>© 2024 Lilee. Tous droits réservés.</p>
      </div>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé à l'expéditeur pour validation.");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email à l'expéditeur :", error);
  }
}

export async function POST(request) {
  try {
    const body = await request.formData();
    const titre = body.get("title");
    const prix = body.get("prix");
    const typeTarif = body.get("tarifType");
    const description = body.get("description");
    const categorieAnnonce = body.get("category");
    const sousCategorie = body.get("subcategory");
    const localisation = body.get("localisation");
    const adresse = body.get("adresse");
    const statut = body.get("statut");
    const imageFiles = body.getAll("images");
    const userId = parseInt(body.get("userId"), 10);

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

    const imageUrls = [];
    for (const image of imageFiles) {
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

    const newAnnonce = await db.annonces.create({
      data: {
        titre,
        description,
        categorieAnnonce,
        sousCategorie,
        localisation,
        adresse,
        prix,
        typeTarif,
        statut,
        userId,
      },
    });

    const AnnonceId = newAnnonce.id;

    const imageInsertions = imageUrls.map((imageUrl) => {
      return db.imageAnnonce.create({
        data: {
          path: imageUrl,
          annoncesId: AnnonceId,
        },
      });
    });
    await Promise.all(imageInsertions);

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
