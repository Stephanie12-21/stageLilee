import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

async function sendValidationAnnonceEmail() {
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

export async function GET(request, { params }) {
  const { id } = params;

  const numericId = parseInt(id.split("=")[1], 10);

  console.log("ID numérique :", numericId);

  if (isNaN(numericId)) {
    return NextResponse.json({ message: "ID invalide" }, { status: 400 });
  }

  try {
    const annonce = await db.annonces.findUnique({
      where: { id: numericId },
      include: {
        imageAnnonces: true,
        user: {
          include: {
            profileImages: true,
          },
        },
      },
    });

    if (!annonce) {
      return NextResponse.json(
        { message: "Annonce non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(annonce, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'annonce :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      console.error("ID manquant");
      return NextResponse.json({ message: "ID manquant" }, { status: 400 });
    }

    const deletedImages = await db.imageAnnonce.deleteMany({
      where: { annoncesId: parseInt(id, 10) },
    });
    const deletedComment = await db.commentaire.deleteMany({
      where: { annoncesId: parseInt(id, 10) },
    });

    if (deletedImages.count > 0) {
      console.log(
        `${deletedImages.count} images supprimées pour l'annonce ${id}`
      );
    } else {
      console.log("Aucune image trouvée pour cet article");
    }

    if (deletedComment.count > 0) {
      console.log(
        `${deletedComment.count} commentaires supprimés pour l'annonce ${id}`
      );
    } else {
      console.log("Aucun commentaire trouvé pour cet article");
    }

    const deletedAnnonces = await db.annonces.delete({
      where: { id: parseInt(id, 10) },
    });

    if (!deletedAnnonces) {
      console.error("Annonces non trouvé");
      return NextResponse.json(
        { message: "Annonce non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Annonces et images supprimés avec succès",
      annonce: deletedAnnonces,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de l'annonce ou de l'image:",
      error
    );
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    let id;

    if (params.id) {
      id = decodeURIComponent(params.id);
      if (id.includes("=")) {
        id = id.split("=")[1];
      }
    }

    console.log("ID extrait après décodage :", id);

    if (!id || isNaN(parseInt(id, 10))) {
      return NextResponse.json(
        { message: "ID invalide ou manquant." },
        { status: 400 }
      );
    }

    const idToUse = parseInt(id, 10);

    // Corps de la logique pour la mise à jour
    const body = await request.formData();
    const titre = body.get("titre");
    const description = body.get("description");
    const categorieAnnonce = body.get("categorieAnnonce");
    const sousCategorie = body.get("sousCategorie");
    const prix = body.get("prix");
    const typeTarif = body.get("typeTarif");
    const localisation = body.get("localisation");
    const adresse = body.get("adresse");
    const statut = body.get("statut");
    const userId = parseInt(body.get("userId"), 10);
    const imageFiles = body.getAll("files");

    if (
      !titre ||
      !description ||
      !categorieAnnonce ||
      !sousCategorie ||
      !statut ||
      !adresse ||
      !localisation ||
      isNaN(userId)
    ) {
      return NextResponse.json(
        { message: "Tous les champs doivent être renseignés." },
        { status: 400 }
      );
    }

    const updatedAnnonce = await db.annonces.update({
      where: { id: idToUse },
      data: {
        titre,
        description,
        adresse,
        typeTarif,
        prix,
        localisation,
        categorieAnnonce,
        sousCategorie,
        statut,
        userId,
      },
    });

    if (imageFiles.length > 0) {
      await db.imageAnnonce.deleteMany({
        where: { annoncesId: updatedAnnonce.id },
      });

      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ko4bjtic");

        const uploadResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok || !uploadResult.secure_url) {
          throw new Error("Échec du téléchargement de l'image");
        }

        await db.imageAnnonce.create({
          data: {
            path: uploadResult.secure_url,
            annoncesId: updatedAnnonce.id,
          },
        });
      }
    }
    await sendValidationAnnonceEmail();

    return NextResponse.json(
      { message: "Article mis à jour avec succès!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour de l'article" },
      { status: 500 }
    );
  }
}
