import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.formData(); // Utilisez formData pour récupérer les fichiers

    if (!id) {
      return new NextResponse(JSON.stringify({ message: "ID manquant" }), {
        status: 400,
      });
    }

    // Extraire les données du formulaire
    const nomSociete = body.get("nomSociete");
    const siret = body.get("siret");
    const codePostal = body.get("codePostal");
    const adresse = body.get("adresse");
    const ville = body.get("ville");
    const secteurActivite = body.get("secteurActivite");
    const typeSociete = body.get("typeSociete").trim(); // Supprime les espaces
    const images = body.getAll("image"); // Récupérer plusieurs fichiers

    console.log("Données de la société reçues :", {
      secteurActivite,
      typeSociete,
      ville,
      adresse,
      codePostal,
      siret,
      nomSociete,
      images,
    });

    // Vérification de la validité du type de société
    const validTypes = [
      "ENTREPRISE_INDIVIDUELLE",
      "SOCIETE_PRIVEE",
      "SOCIETE_PUBLIQUE",
      "COOPERATIVE",
      "ASSOCIATION",
    ];

    if (!validTypes.includes(typeSociete)) {
      console.error("Type de société invalide :", typeSociete);
      return NextResponse.json(
        { message: "Type de société invalide." },
        { status: 400 }
      );
    }
    // Validation des données
    if (!nomSociete || !adresse || !ville || !codePostal || !siret) {
      return new NextResponse(
        JSON.stringify({ message: "Tous les champs doivent être renseignés." }),
        { status: 400 }
      );
    }

    // Mise à jour des informations de l'utilisateur
    const updatedCompany = await db.company.update({
      where: { id: parseInt(id, 10) },
      data: {
        siret,
        nomSociete,
        ville,
        codePostal,
        adresse,
      },
    });

    // Si des fichiers d'image ont été fournis, mettre à jour les images
    if (images.length > 0) {
      await db.profileImage.deleteMany({
        where: { userId: updatedCompany.id },
      });

      for (const file of images) {
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

        await db.profileImage.create({
          data: {
            path: imageUrl,
            companyId: updatedCompany.id,
          },
        });
      }
    }

    return new NextResponse(
      JSON.stringify({ message: "Utilisateur mis à jour avec succès!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la mise à jour de l'utilisateur",
      }),
      { status: 500 }
    );
  }
}

// export async function DELETE(req, { params }) {
//   const companyId = params.id;

//   if (!companyId) {
//     return NextResponse.json(
//       { message: "ID du company manquant." },
//       { status: 400 }
//     );
//   }

//   try {
//     // Rechercher l'utilisateur et les images associées par ID
//     const company = await db.company.findUnique({
//       where: { id: parseInt(companyId, 10) },
//     });

//     if (!company) {
//       return NextResponse.json(
//         { message: "Utilisateur non trouvé." },
//         { status: 404 }
//       );
//     }

//     // Suppression des utilisateurs associés à cette société
//     await db.user.deleteMany({
//       where: { companyId: parseInt(companyId, 10) },
//     });
//     // Supprimer le company
//     await db.company.delete({
//       where: { id: parseInt(companyId, 10) },
//     });

//     return NextResponse.json(
//       { message: "Utilisateur et images supprimés avec succès." },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la suppression de la société :", error);
//     return NextResponse.json(
//       { message: "Erreur interne du serveur." },
//       { status: 500 }
//     );
//   }
// }
export async function DELETE(req, { params }) {
  const companyId = params.id; // ID de la société à supprimer

  if (!companyId) {
    return NextResponse.json(
      { message: "ID de la société manquant." },
      { status: 400 }
    );
  }

  try {
    // Rechercher la société par ID
    const company = await db.company.findUnique({
      where: { id: parseInt(companyId, 10) },
    });

    if (!company) {
      return NextResponse.json(
        { message: "Société non trouvée." },
        { status: 404 }
      );
    }

    // Suppression des utilisateurs associés à cette société
    await db.user.deleteMany({
      where: { companyId: parseInt(companyId, 10) },
    });

    // Suppression de la société
    await db.company.delete({
      where: { id: parseInt(companyId, 10) },
    });

    return NextResponse.json(
      { message: "Société et utilisateurs associés supprimés avec succès." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de la société :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
