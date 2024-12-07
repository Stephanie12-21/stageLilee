"use client";

import React, { useEffect, useState, useRef } from "react";
import { db } from "@/firebaseconfig";
import { ref, push, update, onValue, serverTimestamp } from "firebase/database";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, ImageIcon, X, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ConfirmDeleteModal from "@/app/(dialog)/delete/page";

const MessageCard = ({ message, me, other }) => {
  const isMessageFromMe = message.senderId === me.id;
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formattedTime = new Date(message.time).toLocaleString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleDeleteClick = (id) => {
    setSelectedAnnonceId(id);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedAnnonceId(null);
  };
  return (
    <>
      <div
        key={message.id}
        className={`flex mb-4 items-start ${
          isMessageFromMe ? "justify-end" : "justify-start"
        }`}
      >
        {!isMessageFromMe && (
          <div className="w-10 h-10 mr-2">
            <Image
              src={other.profileImages?.[0]?.path || "/default-avatar.jpg"}
              alt="Avatar"
              height={40}
              width={40}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        )}

        <div
          className={`flex flex-col ${
            isMessageFromMe ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`text-white p-2 rounded-md max-w-xs ${
              isMessageFromMe
                ? "bg-amber-500 self-end"
                : "bg-gray-700 self-start"
            }`}
          >
            {message.content && <p className="text-base">{message.content}</p>}

            {message.images && message.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {message.images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative w-[250px] h-[250px] bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(imageUrl)}
                  >
                    <Image
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="text-xs text-gray-300 mt-2">{formattedTime}</div>
          </div>
        </div>

        {isMessageFromMe && (
          <div className="w-10 h-10 ml-2">
            <Image
              src={me.image || "/default-avatar.jpg"}
              alt="Avatar"
              height={40}
              width={40}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          style={{
            backdropFilter: "blur(10px)",
            margin: 0,
            padding: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            boxSizing: "border-box",
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white hover:bg-[#9B9B9B] p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <Image
              src={selectedImage}
              alt="Image grande"
              width={800}
              height={800}
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

const MessageInput = ({
  sendMessage,
  message,
  setMessage,
  imagePreviews,
  setImagePreviews,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImagePreview = (index) => {
    const newPreviews = [...imagePreviews];
    URL.revokeObjectURL(newPreviews[index].preview);
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  return (
    <div className="space-y-2 p-4 bg-background border-t">
      {imagePreviews.length > 0 && (
        <ScrollArea className="flex gap-2 pb-2" style={{ maxHeight: "100px" }}>
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative inline-block">
              <Image
                src={preview.preview}
                alt="Preview"
                width={50}
                height={50}
                className="rounded-md object-cover"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0"
                onClick={() => removeImagePreview(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </ScrollArea>
      )}
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Ecrire un message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow"
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />
        <Button
          size="icon"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default function ChatInterface({ selectedChatroom }) {
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedChatroomId, setSelectedChatRoomId] = useState(false);
  const [messages, setMessages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const messagesEndRef = useRef(null);

  const me = selectedChatroom?.myData;
  const other = selectedChatroom?.otherData;
  const chatRoomId = selectedChatroom?.id;

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
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        } else {
          setMessages([]);
        }
      });

      return () => unsubscribe();
    }
  }, [selectedChatroom]);

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

  const handleDeleteClick = (chatRoomId) => {
    setSelectedChatRoomId(chatRoomId);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedChatRoomId(null);
  };

  const handleConfirmDelete = () => {
    console.log("les données sont effacées");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shadow-md sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={other?.profileImages?.[0]?.path || "/default-avatar.jpg"}
              alt={`${other?.prenom} ${other?.nom}`}
            />
            <AvatarFallback>
              {other?.prenom?.[0]}
              {other?.nom?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">
              {other?.prenom} {other?.nom}
            </h2>
          </div>
        </div>

        <DropdownMenu>
          <div className="flex items-center space-x-3 bg-dark rounded-full p-2">
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <MoreVertical className="h-5 w-5 text-white" />
              </Button>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent align="end" className="w-64 mt-2">
            <DropdownMenuItem onClick={() => handleDeleteClick(chatRoomId)}>
              Supprimer cette discussion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="flex-1 py-4">
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages?.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              me={me}
              other={other}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <MessageInput
        sendMessage={sendMessage}
        message={message}
        setMessage={setMessage}
        imagePreviews={imagePreviews}
        setImagePreviews={setImagePreviews}
      />

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
