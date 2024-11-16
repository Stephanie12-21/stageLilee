import { db } from "@/lib/db"; // Assurez-vous que ce chemin est correct
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url); // Récupère les paramètres
    const token = searchParams.get("token");

    // Vérification du token
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    // Supprime l'email de la base de données
    await db.newsletter.delete({
      where: { email },
    });

    // Redirige vers la page d'accueil
    return new Response(null, {
      status: 302,
      headers: { Location: "/" }, // Redirection vers la page d'accueil
    });
  } catch (error) {
    console.error("Erreur de désabonnement :", error);

    // Redirige vers la page d'accueil en cas d'erreur
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  }
}
