import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json(
      { error: "Le jeton est requis." },
      { status: 400 }
    );
  }

  try {
    // Vérifie si le jeton est valide
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extraire l'ID de l'utilisateur à partir du jeton décodé
    const userId = decoded.id; // Assurez-vous que 'id' correspond à la clé utilisée dans le payload du token

    return NextResponse.json(
      { message: "Le jeton est valide.", userId }, // Inclure l'ID de l'utilisateur dans la réponse
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Le lien de réinitialisation est invalide ou a expiré." },
      { status: 400 }
    );
  }
}
