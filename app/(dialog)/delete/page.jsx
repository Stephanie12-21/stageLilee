import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center gap-4">
          <AlertTriangle className="h-16 w-16 text-yellow-500" />
          <DialogTitle className="text-2xl font-bold text-center">
            Confirmation de suppression
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-lg text-primary py-4">
          Êtes-vous sûr de vouloir supprimer définitivement ces données ?
          <br />
          Cette action est irréversible.
        </DialogDescription>
        <DialogFooter className="flex flex-col w-full sm:flex-col gap-2 sm:gap-4 mt-4">
          <Button
            variant="destructive"
            className="w-full sm:w-auto"
            onClick={onConfirm}
          >
            Oui, supprimer
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
