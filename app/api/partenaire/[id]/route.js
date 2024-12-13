import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Assure-toi que cette importation est correcte

// Route GET pour récupérer un article par ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const partenaire = await db.partenaire.findUnique({
      where: { id: parseInt(id) },
      include: {
        contenuPartenaire: true,
        logo: true,
      },
    });

    if (!partenaire) {
      return new NextResponse(
        JSON.stringify({ message: "partenaire non trouvé" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(partenaire), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération du partenaire :", error);
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

// // Route PUT pour mettre à jour un article avec des images
// export async function PUT(request, { params }) {
//   try {
//     const { id } = params;
//     const body = await request.formData();

//     if (!id) {
//       return new NextResponse(JSON.stringify({ message: "ID manquant" }), {
//         status: 400,
//       });
//     }

//     // Extraire les données du formulaire
//     const nom = body.get("nomMarque");
//     const email = body.get("emailMarque");
//     const phone = body.get("phoneMarque");
//     const adresse = body.get("adresseMarque");
//     const siteWeb = body.get("siteWeb");
//     const contenuPartenaire = body.getAll("contenuPartenaire"); // Pour plusieurs images
//     const logo = body.get("logo"); // Si un logo est fourni
//     const duree = body.get("duree");
//     const description = body.get("description");
//     const facebook = body.get("facebook");
//     const instagram = body.get("instagramm");
//     const twitter = body.get("twitter");
//     const tikTok = body.get("tikTok");
//     const linkedin = body.get("linkedIn");
//     const youtube = body.get("youtube");
//     const statutPartenaire = body.get("statutPartenaire");

//     if (!nom || !email || !phone || !adresse || !logo || !duree) {
//       return new NextResponse(
//         JSON.stringify({
//           message: "Tous les champs requis doivent être remplis.",
//         }),
//         { status: 400 }
//       );
//     }

//     // Mise à jour des informations de l'article
//     const updatedPartenaire = await db.partenaire.update({
//       where: { id: parseInt(id, 10) },
//       data: {
//         nom,
//         email,
//         siteWeb,
//         phone,
//         adresse,
//         facebook,
//         instagram,
//         twitter,
//         tikTok,
//         linkedin,
//         youtube,
//         duree,
//         description,
//         statutPartenaire,
//       },
//     });

//     // Si des fichiers d'images ont été fournis, mettre à jour les images
//     if (contenuPartenaire.length > 0) {
//       // Supprimer les images précédentes
//       await db.contenuPartenaire.deleteMany({
//         where: { partenaireId: updatedPartenaire.id },
//       });

//       for (const file of contenuPartenaire) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", "ko4bjtic");

//         const uploadResponse = await fetch(
//           "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         const uploadResult = await uploadResponse.json();

//         if (!uploadResponse.ok || !uploadResult.secure_url) {
//           throw new Error("Échec du téléchargement de l'image");
//         }

//         const imageUrl = uploadResult.secure_url;

//         // Ajouter la nouvelle image à la base de données
//         await db.contenuPartenaire.create({
//           data: {
//             path: imageUrl,
//             partenaireId: updatedPartenaire.id,
//           },
//         });
//       }
//     }

//     // Mise à jour du logo si un fichier logo est fourni
//     if (logo) {
//       // Récupérer le logo actuel du partenaire
//       const existingLogo = await db.logo.findFirst({
//         where: { partenaireId: updatedPartenaire.id },
//       });

//       if (existingLogo) {
//         // Supprimer le logo précédent en utilisant l'id du logo
//         await db.logo.delete({
//           where: { id: existingLogo.id }, // Utilisez l'id unique du logo ici
//         });
//       }

//       // Upload du nouveau logo
//       const logoFormData = new FormData();
//       logoFormData.append("file", logo);
//       logoFormData.append("upload_preset", "ko4bjtic");

//       const logoUploadResponse = await fetch(
//         "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
//         {
//           method: "POST",
//           body: logoFormData,
//         }
//       );

//       const logoUploadResult = await logoUploadResponse.json();
//       const logoUrl = logoUploadResult.secure_url;

//       if (!logoUploadResponse.ok || !logoUrl) {
//         throw new Error("Échec du téléchargement du logo.");
//       }

//       // Ajouter le nouveau logo à la base de données
//       await db.logo.create({
//         data: {
//           path: logoUrl,
//           partenaireId: updatedPartenaire.id,
//         },
//       });
//     }

//     return new NextResponse(
//       JSON.stringify({ message: "Article mis à jour avec succès!" }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new NextResponse(
//       JSON.stringify({ message: "Erreur lors de la mise à jour de l'article" }),
//       { status: 500 }
//     );
//   }
// }

// Route PUT pour mettre à jour un article avec des images
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.formData();

    // Vérification de l'existence de l'ID
    if (!id) {
      return new NextResponse(JSON.stringify({ message: "ID manquant" }), {
        status: 400,
      });
    }

    // Extraction des données du formulaire
    const nom = body.get("nomMarque");
    const email = body.get("emailMarque");
    const phone = body.get("phoneMarque");
    const adresse = body.get("adresseMarque");
    const siteWeb = body.get("siteWeb");
    const contenuPartenaire = body.getAll("contenuPartenaire"); // Plusieurs images
    const logo = body.get("logo"); // Si un logo est fourni
    const duree = body.get("duree");
    const description = body.get("description");
    const facebook = body.get("facebook");
    const instagram = body.get("instagramm");
    const twitter = body.get("twitter");
    const tikTok = body.get("tikTok");
    const linkedin = body.get("linkedIn");
    const youtube = body.get("youtube");
    const statutPartenaire = body.get("statutPartenaire");

    // Vérification des champs obligatoires
    if (!nom || !email || !phone || !adresse || !logo || !duree) {
      return new NextResponse(
        JSON.stringify({
          message: "Tous les champs requis doivent être remplis.",
        }),
        { status: 400 }
      );
    }

    // Mise à jour des informations de l'article
    const updatedPartenaire = await db.partenaire.update({
      where: { id: parseInt(id, 10) },
      data: {
        nom,
        email,
        siteWeb,
        phone,
        adresse,
        facebook,
        instagram,
        twitter,
        tikTok,
        linkedin,
        youtube,
        duree,
        description,
        statutPartenaire,
      },
    });

    // Mise à jour des images du partenaire si des fichiers ont été fournis
    if (contenuPartenaire.length > 0) {
      // Supprimer les images précédentes
      await db.contenuPartenaire.deleteMany({
        where: { partenaireId: updatedPartenaire.id },
      });

      for (const file of contenuPartenaire) {
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
        await db.contenuPartenaire.create({
          data: {
            path: imageUrl,
            partenaireId: updatedPartenaire.id,
          },
        });
      }
    }

    // Mise à jour du logo si un fichier logo est fourni
    if (logo) {
      // Récupérer le logo actuel du partenaire
      const existingLogo = await db.logo.findFirst({
        where: { partenaireId: updatedPartenaire.id },
      });

      if (existingLogo) {
        // Supprimer le logo précédent en utilisant l'id du logo
        await db.logo.delete({
          where: { id: existingLogo.id }, // Utilisez l'id unique du logo ici
        });
      }

      // Upload du nouveau logo
      const logoFormData = new FormData();
      logoFormData.append("file", logo);
      logoFormData.append("upload_preset", "ko4bjtic");

      const logoUploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
        {
          method: "POST",
          body: logoFormData,
        }
      );

      const logoUploadResult = await logoUploadResponse.json();
      const logoUrl = logoUploadResult.secure_url;

      if (!logoUploadResponse.ok || !logoUrl) {
        throw new Error("Échec du téléchargement du logo.");
      }

      // Ajouter le nouveau logo à la base de données
      await db.logo.create({
        data: {
          path: logoUrl,
          partenaireId: updatedPartenaire.id,
        },
      });
    }

    // Retourner la réponse de succès
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
