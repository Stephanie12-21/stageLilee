"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Star, Save } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const StarRatingDialog = ({
  isOpen,
  onClose,
  commentId,
  currentRating = 0,
}) => {
  const [rating, setRating] = useState(currentRating);
  const [savedRating, setSavedRating] = useState(currentRating);
  const [hover, setHover] = useState(0);
  const [isEditing, setIsEditing] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  useEffect(() => {
    setRating(currentRating);
    setSavedRating(currentRating);
  }, [currentRating]);

  const handleSave = async () => {
    setSavedRating(rating);
    console.log("note attribuée :", `${rating}`);
    console.log("commentaire sélectionné :", `${commentId}`);

    if (!commentId) {
      console.log("ID du commentaire non pris en charge");
      return;
    }

    const formData = new FormData();
    formData.append("note", rating);
    formData.append("idComment", commentId);

    console.log("Données envoyées à l'API :", {
      note: rating,
      idComment: commentId,
    });

    try {
      const response = await fetch(`/api/notes/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Erreur lors de l'enregistrement de la note: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Réponse du serveur :", data);

      setIsEditing(false);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.log("Erreur détectée :", error);
    }
  };

  const handleReset = () => {
    setIsConfirmDialogOpen(true);
  };

  const confirmReset = async () => {
    try {
      const response = await fetch(`/api/notes/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idComment: commentId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Erreur lors de la suppression de la note: ${errorData.message}`
        );
      }

      const data = await response.json();
      console.log("Réponse de la suppression :", data);

      setRating(0);
      setSavedRating(0);
      setHover(0);
      setIsEditing(true);
      setIsConfirmDialogOpen(false);
    } catch (error) {
      console.log("Erreur détectée lors de la suppression :", error);
    }
  };

  const handleClose = () => {
    setRating(savedRating);
    setIsEditing(true);
    setHover(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md flex flex-col items-center space-y-4">
        <DialogHeader className="flex flex-col items-center space-y-2">
          <DialogTitle className="text-2xl">
            {isEditing ? "Donnez votre note" : "Note enregistrée"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isEditing
              ? "Sélectionnez le nombre d'étoiles pour donner votre avis"
              : "Voici votre note actuelle"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-1 py-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`transition-all duration-200 transform ${
                isEditing ? "hover:scale-110" : ""
              }`}
              onClick={() => isEditing && setRating(star)}
              onMouseEnter={() => isEditing && setHover(star)}
              onMouseLeave={() => isEditing && setHover(0)}
              disabled={!isEditing}
            >
              <Star
                size={40}
                className={`${
                  star <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        <p className="text-gray-600 h-6 text-lg">
          {isEditing
            ? rating
              ? `${rating} étoile${rating > 1 ? "s" : ""} sélectionnée`
              : "Cliquez pour noter"
            : `Note enregistrée : ${savedRating} étoile${
                savedRating > 1 ? "s" : ""
              }`}
        </p>

        <DialogFooter className="flex w-full justify-center gap-3 pt-4">
          {savedRating ? (
            <>
              <Button onClick={handleReset} className="flex items-center gap-2">
                Réinitialiser
              </Button>
              <Button onClick={handleClose} variant="secondary">
                Annuler
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleSave}
                disabled={!rating}
                className="flex items-center gap-2"
                variant={rating ? "default" : "secondary"}
              >
                <Save size={16} />
                Enregistrer
              </Button>
              <Button onClick={handleClose} variant="secondary">
                Annuler
              </Button>
            </>
          )}
        </DialogFooter>

        {showAlert && (
          <Alert className="absolute bottom-4 right-4 bg-green-100 border-green-500">
            <AlertDescription className="text-green-700">
              Note enregistrée avec succès !
            </AlertDescription>
          </Alert>
        )}

        <AlertDialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer la note ? Cette action est
                irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                onClick={() => setIsConfirmDialogOpen(false)}
                variant="secondary"
              >
                Annuler
              </Button>
              <Button onClick={confirmReset} variant="destructive">
                Confirmer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
};

export default StarRatingDialog;
