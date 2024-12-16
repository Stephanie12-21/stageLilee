import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalUsers = await db.user.count();
    const totalAnnonces = await db.annonces.count();
    const totalEntreprises = await db.company.count();
    const totalPartenaires = await db.partenaire.count();

    // Récupérer les données journalières pour chaque table
    const userStats = await db.$queryRaw`
      SELECT DATE("createdAt") as date, COUNT(id) as count
      FROM "user"
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt") ASC;
    `;

    const annonceStats = await db.$queryRaw`
      SELECT DATE("createdAt") as date, COUNT(id) as count
      FROM "annonces"
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt") ASC;
    `;

    const companyStats = await db.$queryRaw`
      SELECT DATE("createdAt") as date, COUNT(id) as count
      FROM "company"
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt") ASC;
    `;

    const partenaireStats = await db.$queryRaw`
      SELECT DATE("createdAt") as date, COUNT(id) as count
      FROM "partenaire"
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt") ASC;
    `;

    // Créer un tableau pour chaque date disponible
    const allDates = [
      ...userStats.map((entry) => entry.date),
      ...annonceStats.map((entry) => entry.date),
      ...companyStats.map((entry) => entry.date),
      ...partenaireStats.map((entry) => entry.date),
    ];

    // Fusionner les dates, enlever les doublons et les trier
    const uniqueDates = [...new Set(allDates)].sort();

    // Fusionner les données pour chaque modèle en fonction de la date
    const dailyStats = uniqueDates.map((date) => {
      // Recherche du nombre d'éléments pour chaque modèle à la date donnée
      const userCount =
        userStats.find((entry) => entry.date === date)?.count || 0;
      const annonceCount =
        annonceStats.find((entry) => entry.date === date)?.count || 0;
      const companyCount =
        companyStats.find((entry) => entry.date === date)?.count || 0;
      const partenaireCount =
        partenaireStats.find((entry) => entry.date === date)?.count || 0;

      return {
        date: date, // La date formatée en YYYY-MM-DD
        utilisateurs: userCount.toString(), // Conversion en string
        annonces: annonceCount.toString(),
        companies: companyCount.toString(),
        partenaires: partenaireCount.toString(),
      };
    });

    // Calcul des totaux journaliers (assurez-vous que les totaux sont corrects)
    const dailyTotal = dailyStats.reduce(
      (acc, current) => {
        acc.utilisateurs += parseInt(current.utilisateurs);
        acc.annonces += parseInt(current.annonces);
        acc.companies += parseInt(current.companies);
        acc.partenaires += parseInt(current.partenaires);
        return acc;
      },
      { utilisateurs: 0, annonces: 0, companies: 0, partenaires: 0 }
    );

    // Retourner les résultats
    return NextResponse.json(
      {
        totalUsers: totalUsers.toString(),
        totalAnnonces: totalAnnonces.toString(),
        totalEntreprises: totalEntreprises.toString(),
        totalPartenaires: totalPartenaires.toString(),
        dailyStats,
        dailyTotal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
