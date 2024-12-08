// import { db } from "@/lib/db";
// import jwt from "jsonwebtoken";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const token = searchParams.get("token");

//     const { email } = jwt.verify(token, process.env.JWT_SECRET);

//     await db.newsletter.delete({
//       where: { email },
//     });

//     return new Response(null, {
//       status: 302,
//       headers: { Location: "/" },
//     });
//   } catch (error) {
//     console.error("Erreur de désabonnement :", error);

//     return new Response(null, {
//       status: 302,
//       headers: { Location: "/" },
//     });
//   }
// }

import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

// Forcer le comportement dynamique
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    // Extraire les paramètres de recherche à partir de nextUrl
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return new Response("Token manquant", { status: 400 });
    }

    // Vérification du token JWT
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    // Suppression de l'e-mail de la newsletter
    await db.newsletter.delete({
      where: { email },
    });

    // Redirection après suppression
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  } catch (error) {
    console.error("Erreur de désabonnement :", error);

    // Redirection en cas d'erreur
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  }
}
