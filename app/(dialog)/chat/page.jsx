import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import React from "react";

const ChatDialog = ({ isOpen, onClose, userId, senderId }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed bottom-0 right-0 mb-4 mr-4 z-50 max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Discussion avec le vendeur</h2>
          <DialogClose asChild></DialogClose>
        </div>
        <div className="h-[400px] w-[400px] overflow-y-auto">
          <p>Le destinataire du message est l&apos; utilisateur : {userId}</p>
          <p>L&apos;envoyeur du message est l&apos; utilisateur : {senderId}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
