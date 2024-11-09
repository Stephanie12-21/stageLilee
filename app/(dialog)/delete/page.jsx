// ConfirmDeleteModal.js
import React from "react";
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
      <DialogContent className="sm:max-w-fit flex  flex-col justify-center items-center space-y-3">
        <DialogHeader className="flex justify-center items-center space-y-4">
          <DialogTitle className="text-2xl">
            Demande de confirmation
          </DialogTitle>
          <DialogDescription className="text-xl">
            Vous êtes sur le point de définitivement supprimer ces données.
            <br /> Confirmez-vous cette opération?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between space-x-5">
          <Button onClick={onConfirm}>Oui, je confirme</Button>
          <Button onClick={onClose}>Non, je veux abandonner</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
