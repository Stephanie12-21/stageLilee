import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Assure-toi que cette importation est correcte

// Route GET pour récupérer un article par ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const article = await db.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: true, // Inclure les images associées
      },
    });

    if (!article) {
      return new NextResponse(
        JSON.stringify({ message: "Article non trouvé" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(article), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article :", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur" }),
      { status: 500 }
    );
  }
}

// Route DELETE pour supprimer un article par ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      console.error("ID manquant");
      return NextResponse.json({ message: "ID manquant" }, { status: 400 });
    }

    // Supprimer d'abord les images associées à l'article
    const deletedImages = await db.image.deleteMany({
      where: { articleId: parseInt(id, 10) },
    });

    if (deletedImages.count > 0) {
      console.log(
        `${deletedImages.count} images supprimées pour l'article ${id}`
      );
    } else {
      console.log("Aucune image trouvée pour cet article");
    }

    // Supprimer l'article
    const deletedArticle = await db.article.delete({
      where: { id: parseInt(id, 10) },
    });

    if (!deletedArticle) {
      console.error("Article non trouvé");
      return NextResponse.json(
        { message: "Article non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Article et images supprimés avec succès",
      article: deletedArticle,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de l'article ou de l'image:",
      error
    );
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// Route PUT pour mettre à jour un article avec des images
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.formData(); // Utilisez `formData` pour récupérer les fichiers

    if (!id) {
      return new NextResponse(JSON.stringify({ message: "ID manquant" }), {
        status: 400,
      });
    }

    // Extraire les données du formulaire
    const titre = body.get("titre");
    const contenu = body.get("contenu");
    const categorieArticle = body.get("categorieArticle");
    const files = body.getAll("files"); // Récupérer plusieurs fichiers

    // Validation des données
    if (!titre || !contenu || !categorieArticle) {
      return new NextResponse(
        JSON.stringify({ message: "Tous les champs doivent être renseignés." }),
        { status: 400 }
      );
    }

    // Mise à jour des informations de l'article
    const updatedArticle = await db.article.update({
      where: { id: parseInt(id, 10) },
      data: {
        titre,
        contenu,
        categorieArticle,
      },
    });

    // Si des fichiers d'image ont été fournis, mettre à jour les images
    if (files.length > 0) {
      // Supprimer les images précédentes
      await db.image.deleteMany({
        where: { articleId: updatedArticle.id },
      });

      for (const file of files) {
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

        const imageUrl = uploadResult.secure_url;

        // Ajouter la nouvelle image à la base de données
        await db.image.create({
          data: {
            path: imageUrl,
            articleId: updatedArticle.id,
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
