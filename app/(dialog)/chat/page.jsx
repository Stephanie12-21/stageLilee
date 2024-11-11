"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleX, Paperclip, Send } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ChatDialog = ({ isOpen, onClose, userId, senderId }) => {
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const sender = senderId;
  const receiver = userId;

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      console.log(
        `Nom : ${file.name}, Type : ${file.type}, Taille : ${file.size} octets`
      );
    });
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handleSendClick = () => {
    if (message.trim() || selectedImages.length > 0) {
      console.log("Message :", message);
      console.log("Images sélectionnées :", selectedImages);
      setMessage("");
      setSelectedImages([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && selectedImages.length === 0) {
      alert("Vous n'avez saisi aucun message.");
      return;
    }

    const formData = new FormData();
    formData.append("message", message);
    formData.append("sender", sender);
    formData.append("receiver", receiver);

    // Télécharger chaque image et l'ajouter au formData
    for (const image of selectedImages) {
      const response = await fetch(image); // Notez l'utilisation de `await`
      const blob = await response.blob();
      formData.append("images", blob, "uploaded_image.png");
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message envoyé avec succès !");
        setMessage("");
        setSelectedImages([]);
      } else {
        toast.error(result.message || "Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Erreur interne du serveur.");
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
          </div>
          <DialogFooter>
            <div className="w-full flex flex-col space-y-2 bg-white border border-gray-800 rounded-lg px-4 py-2">
              <div className="flex space-x-2 overflow-x-auto">
                {selectedImages.map((src, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={src}
                      width={50}
                      height={50}
                      alt={`selected-${index}`}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <button
                      className="absolute top-0 right-0 bg-gray-700 text-white rounded-full p-1"
                      onClick={() => {
                        setSelectedImages(
                          selectedImages.filter((_, i) => i !== index)
                        );
                        URL.revokeObjectURL(src);
                      }}
                    >
                      <CircleX color="#e71313" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <Paperclip
                  onClick={() => document.getElementById("imageUpload").click()}
                  className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
                />
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  multiple
                  onChange={handleImageUpload}
                />
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
        position="top-right"
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
