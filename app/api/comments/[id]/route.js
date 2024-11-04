import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.formData();

    console.log("editCommentId:", id);
    console.log("body:", Object.fromEntries(body.entries()));

    if (!id) {
      return new NextResponse(JSON.stringify({ message: "ID manquant" }), {
        status: 400,
      });
    }

    const commentaire = body.get("Commentaire");

    if (!commentaire) {
      return new NextResponse(
        JSON.stringify({ message: "Tous les champs doivent être renseignés." }),
        { status: 400 }
      );
    }

    const updatedComment = await db.commentaire.update({
      where: { id: parseInt(id, 10) },
      data: {
        commentaire,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Commentaire mis à jour avec succès!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du commentaire:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la mise à jour du commentaire",
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    console.log("ID du commentaire à supprimer:", id);

    if (!id) {
      return new NextResponse(JSON.stringify({ message: "ID manquant" }), {
        status: 400,
      });
    }

    await db.commentaire.delete({
      where: { id: parseInt(id, 10) },
    });

    return new NextResponse(
      JSON.stringify({ message: "Commentaire supprimé avec succès!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la suppression du commentaire",
      }),
      { status: 500 }
    );
  }
}
