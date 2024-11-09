import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const annonces = await db.annonces.findMany({
      include: {
        imageAnnonces: true,
        user: true,
        commentaire: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Formater les annonces et leurs images
    const formattedAnnonces = annonces.map((annonce) => ({
      ...annonce,
      imageUrl:
        annonce.imageAnnonces.length > 0 ? annonce.imageAnnonces[0].path : null,
    }));

    return NextResponse.json(formattedAnnonces, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
