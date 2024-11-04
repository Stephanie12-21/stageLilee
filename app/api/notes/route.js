import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.formData();

    const note = parseInt(body.get("note"), 10);
    const commentId = parseInt(body.get("idComment"), 10);

    if (isNaN(note) || isNaN(commentId)) {
      return NextResponse.json(
        { message: "Tous les champs sont requis et doivent être valides." },
        { status: 400 }
      );
    }

    const updatedComment = await db.commentaire.update({
      where: { id: commentId },
      data: { note },
    });

    return NextResponse.json(
      {
        message: "Note ajoutée ou mise à jour avec succès",
        commentaire: updatedComment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la note:", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();

    const commentId = parseInt(body.idComment, 10);

    if (isNaN(commentId)) {
      return NextResponse.json(
        { message: "L'ID du commentaire est requis et doit être valide." },
        { status: 400 }
      );
    }

    const updatedComment = await db.commentaire.update({
      where: { id: commentId },
      data: { note: null },
    });

    return NextResponse.json(
      {
        message: "Note supprimée avec succès",
        commentaire: updatedComment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de la note:", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
