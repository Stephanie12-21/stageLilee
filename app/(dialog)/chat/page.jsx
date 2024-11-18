"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleX, Paperclip, Send } from "lucide-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

// Firebase imports
import { ref, set, push } from "firebase/database";
import { db } from "@/firebaseconfig";

const ChatDialog = ({ isOpen, onClose, userId, senderId, annonceId }) => {
  const [message, setMessage] = useState("");
  const sender = senderId;
  const receiver = userId;
  const annonce = annonceId;

  // Fonction pour envoyer le message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Vous n'avez saisi aucun message.");
      return;
    }

    // Références de la base de données en temps réel
    const chatRef = ref(db, `chats/${annonceId}/messages`);

    try {
      // Créer une nouvelle entrée pour le message dans Firebase Realtime Database
      const newMessageRef = push(chatRef);

      // Ajouter les données du message à la nouvelle entrée
      await set(newMessageRef, {
        message: message,
        sender: sender,
        receiver: receiver,
        annonce: annonce,
        timestamp: Date.now(), // Timestamp actuel en millisecondes
      });

      toast.success("Message envoyé avec succès !");

      // Réinitialiser le formulaire
      setMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Discussion avec le vendeur
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 overflow-y-auto">
            <p>Le destinataire du message est l&apos;utilisateur : {userId}</p>
            <p>
              L&apos;envoyeur du message est l&apos;utilisateur : {senderId}
            </p>
            <p>L&apos;annonce sélectionnée est l&apos;annonce : {annonceId}</p>
          </div>
          <DialogFooter>
            <div className="w-full flex flex-col space-y-2 bg-white border border-gray-800 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  className="flex-1 p-2 outline-none"
                />
                <Send
                  className="h-6 w-6 text-[#00A884] hover:text-[#008f6f] cursor-pointer transform rotate-45"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
      />
    </div>
  );
};

export default ChatDialog;
