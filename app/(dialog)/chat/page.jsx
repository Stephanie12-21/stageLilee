import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import React from "react";

const ChatBubble = ({ isOpen, onClose, userId }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed bottom-0 right-0 mb-4 mr-4 z-50 max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Discussion avec le vendeur</h2>
          <DialogClose asChild></DialogClose>
        </div>
        <div className="h-[400px] w-[400px] overflow-y-auto">
          <p>
            Mon message que je souhaite envoyé à l&apos; utilisateur : {userId}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBubble;
