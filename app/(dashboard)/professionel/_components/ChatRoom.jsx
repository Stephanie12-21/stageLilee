// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import MessageCard from "./MessageCard";
// import MessageInput from "./MessageInput";
// import { db } from "@/firebaseconfig";
// import { ref, push, update, onValue, serverTimestamp } from "firebase/database";

// const ChatRoom = ({ user, selectedChatroom }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const messagesContainerRef = useRef(null);

//   const me = selectedChatroom?.myData;
//   const other = selectedChatroom?.otherData;
//   const chatRoomId = selectedChatroom?.id;
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     if (selectedChatroom) {
//       const messagesRef = ref(db, `messages/${selectedChatroom.id}`);
//       const unsubscribe = onValue(messagesRef, (snapshot) => {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           const formattedMessages = Object.entries(data).map(
//             ([id, message]) => ({
//               id,
//               ...message,
//             })
//           );
//           setMessages(formattedMessages);
//         } else {
//           setMessages([]);
//         }
//       });

//       return () => unsubscribe();
//     }
//   }, [selectedChatroom]);

//   if (!selectedChatroom) {
//     return <div>Sélectionnez un chatroom pour afficher les détails.</div>;
//   }

//   const sendMessage = async () => {
//     if (message.trim() === "" && !image) {
//       return;
//     }

//     try {
//       const messageData = {
//         chatRoomId,
//         content: message,
//         image: image,
//         messageType: "text",
//         senderId: me.id,
//         receiverId: other.id,
//         time: new Date().toISOString(),
//         timestamp: serverTimestamp(),
//       };

//       const messagesRef = ref(db, `messages/${chatRoomId}`);
//       await push(messagesRef, messageData);

//       const chatroomRef = ref(db, `chatrooms/${chatRoomId}`);
//       await update(chatroomRef, { lastMessage: message ? message : "Images" });

//       setMessage("");
//     } catch (error) {
//       console.error("Erreur lors de l'envoi du message :", error);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex-1 overflow-y-auto p-10" ref={messagesContainerRef}>
//         {messages?.map((message) => (
//           <MessageCard
//             key={message.id}
//             message={message}
//             me={me}
//             other={other}
//           />
//         ))}
//       </div>
//       <MessageInput
//         sendMessage={sendMessage}
//         message={message}
//         setMessage={setMessage}
//         image={image}
//         setImage={setImage}
//       />
//     </div>
//   );
// };

// export default ChatRoom;

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

  const me = selectedChatroom?.myData;
  const other = selectedChatroom?.otherData;
  const chatRoomId = selectedChatroom?.id;
  const [imagePreviews, setImagePreviews] = useState([]); // Stockage des images sélectionnées

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

  if (!selectedChatroom) {
    return <div>Sélectionnez un chatroom pour afficher les détails.</div>;
  }

  // Fonction pour uploader des images sur Cloudinary
  const uploadImagesToCloudinary = async () => {
    const uploadedImageUrls = [];

    for (const preview of imagePreviews) {
      const formData = new FormData();
      formData.append("file", preview.file);
      formData.append("upload_preset", "ko4bjtic"); // Votre preset Cloudinary

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
          uploadedImageUrls.push(data.secure_url); // Sauvegarder l'URL
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
      // Uploader les images sur Cloudinary
      const imageUrls = await uploadImagesToCloudinary();

      // Préparer les données du message
      const messageData = {
        chatRoomId,
        content: message || "",
        images: imageUrls, // Ajouter les URLs des images
        messageType: imageUrls.length > 0 ? "image" : "text",
        senderId: me.id,
        receiverId: other.id,
        time: new Date().toISOString(),
        timestamp: serverTimestamp(),
      };

      // Ajouter le message dans Firebase
      const messagesRef = ref(db, `messages/${chatRoomId}`);
      await push(messagesRef, messageData);

      // Mettre à jour le dernier message du chatroom
      const chatroomRef = ref(db, `chatrooms/${chatRoomId}`);
      await update(chatroomRef, {
        lastMessage: message ? message : imageUrls.length > 0 ? "Images" : "",
      });

      // Réinitialiser les champs
      setMessage("");
      setImagePreviews([]);
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
        imagePreviews={imagePreviews}
        setImagePreviews={setImagePreviews}
      />
    </div>
  );
};

export default ChatRoom;
