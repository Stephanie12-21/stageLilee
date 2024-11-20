"use client";

import React, { useEffect, useState, useRef } from "react";
import { db } from "@/firebaseconfig";
import { ref, push, update, onValue, serverTimestamp } from "firebase/database";
import Image from "next/image";

const ChatRoom = ({ user, selectedChatroom }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [modalImage, setModalImage] = useState(null); // Gère l'image affichée en modal
  const messagesContainerRef = useRef(null);

  const me = selectedChatroom?.myData;
  const other = selectedChatroom?.otherData;
  const chatRoomId = selectedChatroom?.id;

  // Charger les messages depuis Firebase
  useEffect(() => {
    if (selectedChatroom) {
      const messagesRef = ref(db, `messages/${selectedChatroom.id}`);
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedMessages = Object.entries(data).map(
            ([id, message]) => ({
              id,
              ...message,
            })
          );
          setMessages(formattedMessages);
        } else {
          setMessages([]);
        }
      });

      return () => unsubscribe();
    }
  }, [selectedChatroom]);

  // Fonction pour uploader des images sur Cloudinary
  const uploadImagesToCloudinary = async () => {
    const uploadedImageUrls = [];

    for (const preview of imagePreviews) {
      const formData = new FormData();
      formData.append("file", preview.file);
      formData.append("upload_preset", "ko4bjtic");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          uploadedImageUrls.push(data.secure_url);
        } else {
          console.error(
            "Erreur lors de l'upload de l'image :",
            await response.text()
          );
        }
      } catch (error) {
        console.error("Erreur lors de l'upload Cloudinary :", error);
      }
    }

    return uploadedImageUrls;
  };

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (message.trim() === "" && imagePreviews.length === 0) {
      return;
    }

    try {
      const imageUrls = await uploadImagesToCloudinary();

      const messageData = {
        chatRoomId,
        content: message || "",
        images: imageUrls,
        messageType: imageUrls.length > 0 ? "image" : "text",
        senderId: me.id,
        receiverId: other.id,
        time: new Date().toISOString(),
        timestamp: serverTimestamp(),
      };

      const messagesRef = ref(db, `messages/${chatRoomId}`);
      await push(messagesRef, messageData);

      const chatroomRef = ref(db, `chatrooms/${chatRoomId}`);
      await update(chatroomRef, {
        lastMessage: message ? message : imageUrls.length > 0 ? "Images" : "",
      });

      setMessage("");
      setImagePreviews([]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

  // Composant Navbar
  const Navbar = () => {
    if (!other) return null;

    return (
      <div className="bg-primary text-primary-foreground p-4 flex items-center sticky top-0 z-10 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image
              width={50}
              height={50}
              src={other?.profileImages?.[0]?.path || "/default-avatar.jpg"}
              alt={`${other?.prenom} ${other?.nom}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold">
              {other?.prenom} {other?.nom}
            </h1>
          </div>
        </div>
      </div>
    );
  };

  const MessageCard = ({ message }) => {
    const isMyMessage = message.senderId === me.id;

    return (
      <div
        className={`flex ${isMyMessage ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`max-w-[70%] p-3 rounded-lg ${
            isMyMessage
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          {message.messageType === "image" &&
            message.images.map((img, index) => (
              <Image
                width={300}
                height={300}
                key={index}
                src={img}
                alt="Image envoyée"
                className="rounded-md mb-2 max-w-full cursor-pointer"
                onClick={() => setModalImage(img)} // Ouvre l'image dans la modal
              />
            ))}
          {message.content && <p className="break-words">{message.content}</p>}
          <span className="text-xs opacity-50 mt-1 block">
            {new Date(message.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4" ref={messagesContainerRef}>
        {messages?.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez un message..."
            className="flex-grow px-4 py-2 border rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Envoyer
          </button>
        </div>
      </div>

      {/* Modal pour afficher une image en grand */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative">
            <Image
              width={800}
              height={800}
              src={modalImage}
              alt="Agrandie"
              className="max-w-full max-h-screen rounded-md"
            />
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2"
              onClick={() => setModalImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
