// "use client";
// import React, { useEffect } from "react";
// import MessageCard from "./MessageCard";
// import MessageInput from "./MessageInput";

// const ChatRoom = ({ user, selectedChatroom }) => {
//   useEffect(() => {
//     console.log("Selected chatroom in ChatRoom.jsx:", selectedChatroom);
//   }, [selectedChatroom]);

// const messages = [
//   {
//     id: 1,
//     sender: "katty",
//     avatarUrl:
//       "https://res.cloudinary.com/dtryutlkz/image/upload/v1731399830/ixqce5t3fkrs7e3qstg2.jpg",
//     content: "Hey test",
//     time: "2h ago",
//   },
//   {
//     id: 2,
//     sender: "douglas",
//     avatarUrl:
//       "https://res.cloudinary.com/dtryutlkz/image/upload/v1731399830/ixqce5t3fkrs7e3qstg2.jpg",
//     content: "Hey wassup",
//     time: "2h ago",
//   },
// ];

//   return (
// <div className="flex flex-col h-screen">
//   <div className="flex-1 overflow-y-auto p-10">
//     {/* message card */}
//     {messages?.map((message) => (
//       <MessageCard key={message.id} message={message} user={"douglas"} />
//     ))}
//   </div>
//   {/* message input */}
//   <MessageInput />
// </div>
//   );
// };

// export default ChatRoom;
// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import MessageCard from "./MessageCard";
// import MessageInput from "./MessageInput";
// import { db } from "@/firebaseconfig";
// import { ref, get, serverTimestamp, query } from "firebase/database";
// import {
//   addDoc,
//   collection,
//   doc,
//   onSnapshot,
//   orderBy,
//   updateDoc,
//   where,
// } from "firebase/firestore";

// const ChatRoom = ({ user, selectedChatroom }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState("");
//   const messagesContainerRef = useRef(null);
//   useEffect(() => {
//     console.log("From ChatRoom, selectedChatroom:", selectedChatroom);
//   }, [selectedChatroom]);

//   const me = selectedChatroom?.myData;
//   const other = selectedChatroom?.otherData;
//   const chatRoomId = selectedChatroom?.id;

//   if (!selectedChatroom) {
//     return <div>Sélectionnez un chatroom pour afficher les détails.</div>;
//   }
//   const sendMessage = async (e) => {
//     const messageCollection = collection(db, "messages");
//     if (message.trim() === "") {
//       return;
//     }
//     try {
//       const messageData = {
//         chatRoomId,
//         content: message,
//         image: "",
//         messageType: "text",
//         senderId: me.id,
//         receiverId: other.id,
//         timestamp: serverTimestamp(),
//       };
//       await addDoc(messageCollection, messageData);
//       setMessage("");

//       //maj with lastmessage
//       const chatroomRef = doc(db, "chatrooms", chatRoomId);
//       await updateDoc(chatroomRef, { lastMessage: messageData });
//     } catch (error) {
//       console.log("erreur:", error);
//     }
//   };
//   return (
//     <div>
//       <h1>Chatroom Details</h1>
//       <p>Chatroom ID: {selectedChatroom.id}</p>
//       <p>Receiver Name: {selectedChatroom.otherData?.nom || "Inconnu"}</p>
//       <p>Last Message: {selectedChatroom.latestMessage || "Aucun message"}</p>
//       <div className="flex flex-col h-screen">
//         <div className="flex-1 overflow-y-auto p-10">
//           {/* message card */}
//           {/* {messages?.map((message) => (
//             <MessageCard key={message.id} message={message} user={"douglas"} />
//           ))} */}
//         </div>
//         {/* message input */}
//         <MessageInput
//           sendMessage={sendMessage}
//           message={message}
//           setMessage={setMessage}
//         />
//       </div>
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

  useEffect(() => {
    console.log("From ChatRoom, selectedChatroom:", selectedChatroom);

    if (selectedChatroom) {
      // Fetch messages for the current chatroom
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

      // Clean up the listener when the component unmounts or chatroom changes
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
        timestamp: serverTimestamp(),
      };

      // Add the message to the database
      const messagesRef = ref(db, `messages/${chatRoomId}`);
      await push(messagesRef, messageData);

      // Update the last message in the chatroom
      const chatroomRef = ref(db, `chatrooms/${chatRoomId}`);
      await update(chatroomRef, { lastMessage: message });

      setMessage(""); // Clear the input field
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

  return (
    <div>
      <h1>Chatroom Details</h1>
      <p>Chatroom ID: {selectedChatroom.id}</p>
      <p>Receiver Name: {selectedChatroom.otherData?.nom || "Inconnu"}</p>
      <p>Last Message: {selectedChatroom.latestMessage || "Aucun message"}</p>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto p-10" ref={messagesContainerRef}>
          {messages?.map((msg) => (
            <MessageCard key={msg.id} message={msg} user={me.id} />
          ))}
        </div>
        <MessageInput
          sendMessage={sendMessage}
          message={message}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
