import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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

    // Supprimer d'abord les images associées à l'article
    const deletedImages = await db.imageAnnonce.deleteMany({
      where: { annoncesId: parseInt(id, 10) }, // Correction ici
    });
    const deletedComment = await db.commentaire.deleteMany({
      where: { annoncesId: parseInt(id, 10) }, // Correction ici
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

    // Supprimer l'article
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
    const idParam = params.id;
    const id = idParam.includes("=") ? idParam.split("=")[1] : idParam;

    console.log("ID extrait:", id);

    if (!id || isNaN(parseInt(id, 10))) {
      return new NextResponse(
        JSON.stringify({ message: "ID invalide ou manquant." }),
        { status: 400 }
      );
    }

    const body = await request.formData();
    const titre = body.get("titre");
    const description = body.get("description");
    const categorieAnnonce = body.get("category");
    const localisation = body.get("localisation");
    const adresse = body.get("adresse");
    const statut = body.get("statut");
    const imageFiles = body.getAll("images");
    const userId = parseInt(body.get("userId"), 10);

    if (
      !titre ||
      !description ||
      !categorieAnnonce ||
      !statut ||
      !adresse ||
      !localisation ||
      !userId ||
      imageFiles.length === 0
    ) {
      return new NextResponse(
        JSON.stringify({ message: "Tous les champs doivent être renseignés." }),
        { status: 400 }
      );
    }

    const updatedAnnonce = await db.annonces.update({
      where: { id: parseInt(id, 10) },
      data: {
        titre,
        description,
        adresse,
        localisation,
        categorieAnnonce,
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

    return new NextResponse(
      JSON.stringify({ message: "Article mis à jour avec succès!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur lors de la mise à jour de l'article" }),
      { status: 500 }
    );
  }
}
