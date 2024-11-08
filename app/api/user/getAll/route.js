import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.user.findMany({
      include: {
        profileImages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedUsers = users.map(
      ({ hashPassword, ...userData }) => userData
    );

    return NextResponse.json(
      {
        users: formattedUsers,
        message: "Informations des utilisateurs récupérées avec succès.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
