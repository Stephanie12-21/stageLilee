"use client";
import React, { useEffect, useState, useRef } from "react";
import MessageCard from "./MessageCard";
import MessageInput from "./MessageInput";
import { db } from "@/firebaseconfig";
import { ref, push, update, onValue, serverTimestamp } from "firebase/database";

const ChatRoom = ({ user, selectedChatroom }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);

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

  const me = selectedChatroom?.myData;
  const other = selectedChatroom?.otherData;
  const chatRoomId = selectedChatroom?.id;
  

  if (!selectedChatroom) {
    return <div>Sélectionnez un chatroom pour afficher les détails.</div>;
  }

  const sendMessage = async () => {
    if (message.trim() === "") return;

    try {
      const messageData = {
        chatRoomId,
        content: message,
        image: "",
        messageType: "text",
        senderId: me.id,
        receiverId: other.id,
        time: new Date().toISOString(),
        timestamp: serverTimestamp(),
      };

      const messagesRef = ref(db, `messages/${chatRoomId}`);
      await push(messagesRef, messageData);

      const chatroomRef = ref(db, `chatrooms/${chatRoomId}`);
      await update(chatroomRef, { lastMessage: message });

      setMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-10" ref={messagesContainerRef}>
        {messages?.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            me={me}
            other={other}
          />
        ))}
      </div>
      <MessageInput
        sendMessage={sendMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default ChatRoom;
