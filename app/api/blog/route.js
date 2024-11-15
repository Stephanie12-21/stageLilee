import { db } from "@/lib/db";
import { NextResponse } from "next/server"; 

export async function POST(request) {
  try {
    // Extraire le corps de la requête
    const body = await request.formData(); // Utilisez `formData` pour récupérer les fichiers

    const titre = body.get("titre");
    const contenu = body.get("contenu");
    const categorieArticle = body.get("categorieArticle");
    const imageFiles = body.getAll("images"); // Récupère les fichiers d'images

    // Validation des données
    if (!titre || !contenu || !categorieArticle || imageFiles.length === 0) {
      return new NextResponse(
        JSON.stringify({
          message:
            "Tous les champs sont requis et au moins une image doit être fournie.",
        }),
        { status: 400 }
      );
    }

    // Si des images sont uploadées via Cloudinary
    const imageUrls = [];
    for (const image of imageFiles) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ko4bjtic"); // Remplace par ton preset Cloudinary

      // Envoi de l'image à Cloudinary
      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();
      if (uploadResponse.ok && uploadResult.secure_url) {
        imageUrls.push(uploadResult.secure_url); // Récupère l'URL de l'image uploadée
      } else {
        throw new Error("Image upload failed");
      }
    }

    // Création de l'article avec les données reçues
    const newArticle = await db.article.create({
      data: {
        titre,
        contenu,
        categorieArticle,
      },
    });

    const articleId = newArticle.id;

    const imageInsertions = imageUrls.map((imageUrl) => {
      return db.image.create({
        data: {
          path: imageUrl,
          articleId: articleId,
        },
      });
    });

    await Promise.all(imageInsertions); // Associer les images à l'article

    return new NextResponse(
      JSON.stringify({
        message: "Article et images créés avec succès",
        article: newArticle,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'article et des images :",
      error
    );
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur" }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const articles = await db.article.findMany({
      include: {
        images: true, // Assurez-vous d'inclure les images associées
      },
      orderBy: {
        createdAt: "desc", // Ordre décroissant selon la date de création
      },
    });

    // Formater les articles et leurs images
    const formattedArticles = articles.map((article) => ({
      ...article,
      imageUrl: article.images.length > 0 ? article.images[0].path : null, // Utilisez la première image associée
    }));

    return new NextResponse(JSON.stringify(formattedArticles), {
      status: 200,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur" }),
      {
        status: 500,
      }
    );
  }
}
