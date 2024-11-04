import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.formData();
    const titre = body.get("title");
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
        localisation,
        adresse,
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

    return NextResponse.json(
      {
        message: "Annonce et images créés avec succès",
        Annonce: newAnnonce,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'annonce et des images:",
      error
    );
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
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
        { message: "userId est requis" },
        { status: 400 }
      );
    }

    const annonces = await db.annonces.findMany({
      where: { userId: userId },
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
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
