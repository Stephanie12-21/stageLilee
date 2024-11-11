import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Récupération des totaux
    const totalUsers = await db.user.count();
    const totalAnnonces = await db.annonces.count();
    const totalCompanies = await db.company.count();

    // Retourner la réponse avec les totaux
    return NextResponse.json(
      { totalUsers, totalAnnonces, totalCompanies },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des totaux :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
