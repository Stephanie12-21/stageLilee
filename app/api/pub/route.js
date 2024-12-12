import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.formData();
    const nomMarque = body.get("nomMarque");
    const emailMarque = body.get("emailMarque");
    const phoneMarque = body.get("phoneMarque");
    const adresseMarque = body.get("adresseMarque");
    const siteWeb = body.get("siteWeb");
    const debutPub = body.get("debutPub");
    const finPub = body.get("finPub");
    const statutPub = body.get("statutPub");
    const contenuPub = body.getAll("contenuPub");

    console.log(
      nomMarque,
      emailMarque,
      phoneMarque,
      adresseMarque,
      siteWeb,
      debutPub,
      finPub,
      statutPub
    );

    if (
      !nomMarque ||
      !emailMarque ||
      !phoneMarque ||
      !adresseMarque ||
      !debutPub ||
      !finPub ||
      !statutPub
    ) {
      return new NextResponse(
        JSON.stringify({
          message: "Tous les champs sont requis.",
        }),
        { status: 400 }
      );
    }

    // Conversion des dates en format ISO-8601
    const parsedDebutPub = new Date(debutPub);
    const parsedFinPub = new Date(finPub);

    if (isNaN(parsedDebutPub) || isNaN(parsedFinPub)) {
      return new NextResponse(
        JSON.stringify({
          message: "Les dates fournies ne sont pas valides.",
        }),
        { status: 400 }
      );
    }

    const imageUrls = [];
    for (const image of contenuPub) {
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
        throw new Error("Échec de l'upload de l'image.");
      }
    }

    const newPublicite = await db.publicite.create({
      data: {
        nomMarque,
        phoneMarque,
        adresseMarque,
        debutPub: parsedDebutPub,
        finPub: parsedFinPub,
        emailMarque,
        siteWeb,
      },
    });

    const publiciteId = newPublicite.id;
    const imageInsertions = imageUrls.map((imageUrl) =>
      db.contenuPub.create({
        data: { path: imageUrl, publiciteId },
      })
    );

    await Promise.all(imageInsertions);

    return new NextResponse(
      JSON.stringify({
        message: "Publicite et images créés avec succès.",
        publicite: newPublicite,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'article et des images :",
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
    const publicites = await db.publicite.findMany({
      include: { contenuPub: true },
      orderBy: { createdAt: "desc" },
    });

    const formattedPub = publicites.map((publicite) => ({
      ...publicite,
      imageUrl: publicite.contenuPub[0]?.path || null,
    }));

    return new NextResponse(JSON.stringify(formattedPub), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des publicite :", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}
