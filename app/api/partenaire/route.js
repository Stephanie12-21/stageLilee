import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.formData();
    const nom = body.get("nomMarque");
    const email = body.get("emailMarque");
    const phone = body.get("phoneMarque");
    const adresse = body.get("adresseMarque");
    const siteWeb = body.get("siteWeb");
    const contenuPartenaire = body.getAll("contenuPub");
    const logo = body.get("logo");
    const duree = body.get("duree");
    const description = body.get("description");
    const facebook = body.get("facebook");
    const instagram = body.get("instagramm");
    const twitter = body.get("twitter");
    const tikTok = body.get("tikTok");
    const linkedin = body.get("linkedIn");
    const youtube = body.get("youtube");
    const statutPartenaire = body.get("statutPartenaire");

    if (!nom || !email || !phone || !adresse || !logo || !duree) {
      return new NextResponse(
        JSON.stringify({
          message: "Tous les champs requis doivent être remplis.",
        }),
        { status: 400 }
      );
    }

    const imageUrls = [];
    for (const image of contenuPartenaire) {
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
        throw new Error("Échec de l'upload d'une image partenaire.");
      }
    }

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
      throw new Error("Échec de l'upload du logo.");
    }

    const newPartenaire = await db.partenaire.create({
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

    const partenaireId = newPartenaire.id;

    const imageInsertions = imageUrls.map((imageUrl) =>
      db.contenuPartenaire.create({
        data: { path: imageUrl, partenaireId },
      })
    );

    await db.logo.create({
      data: { path: logoUrl, partenaireId },
    });

    await Promise.all(imageInsertions);

    return new NextResponse(
      JSON.stringify({
        message: "Partenaire et images créés avec succès.",
        partenaire: newPartenaire,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout du partenaire, du logo et des contenus partenaires :",
      error
    );
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const partenaires = await db.partenaire.findMany({
      include: { contenuPartenaire: true, logo: true },
      orderBy: { createdAt: "desc" },
    });

    const formattedPartenaires = partenaires.map((partenaire) => ({
      ...partenaire,
      logoUrl: partenaire.logo[0]?.path || null,
      contenuUrls: partenaire.contenuPartenaire.map((contenu) => contenu.path),
    }));

    return new NextResponse(JSON.stringify(formattedPartenaires), {
      status: 200,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des partenaires :", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}
