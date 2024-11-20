// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { db } from "@/firebaseconfig";
// import { ref, push, update, onValue, serverTimestamp } from "firebase/database";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Send, ImageIcon, X } from "lucide-react";

// const MessageCard = ({ message, me, other }) => {
//   const isMyMessage = message.senderId === me.id;
//   return (
//     <div
//       className={`flex ${isMyMessage ? "justify-end" : "justify-start"} mb-4`}
//     >
//       {!isMyMessage && (
//         <Avatar className="h-8 w-8 mr-2">
//           <AvatarImage
//             src={other?.profileImages?.[0]?.path || "/default-avatar.jpg"}
//             alt={`${other?.prenom} ${other?.nom}`}
//           />
//           <AvatarFallback>
//             {other?.prenom?.[0]}
//             {other?.nom?.[0]}
//           </AvatarFallback>
//         </Avatar>
//       )}
//       <Card
//         className={`max-w-[70%] ${
//           isMyMessage ? "bg-primary text-primary-foreground" : "bg-secondary"
//         }`}
//       >
//         <CardContent className="p-3">
//           {message.messageType === "image" &&
//             message.images.map((img, index) => (
//               <Image
//                 key={index}
//                 src={img}
//                 alt="Sent image"
//                 width={200}
//                 height={200}
//                 className="rounded-md mb-2"
//               />
//             ))}
//           {message.content && <p className="break-words">{message.content}</p>}
//           <span className="text-xs opacity-50 mt-1 block">
//             {new Date(message.time).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </span>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// const MessageInput = ({
//   sendMessage,
//   message,
//   setMessage,
//   imagePreviews,
//   setImagePreviews,
// }) => {
//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newPreviews = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));
//     setImagePreviews([...imagePreviews, ...newPreviews]);
//   };

//   const removeImagePreview = (index) => {
//     const newPreviews = [...imagePreviews];
//     URL.revokeObjectURL(newPreviews[index].preview);
//     newPreviews.splice(index, 1);
//     setImagePreviews(newPreviews);
//   };

//   return (
//     <div className="space-y-2">
//       {imagePreviews.length > 0 && (
//         <ScrollArea
//           className="flex flex-nowrap gap-2 pb-2"
//           style={{ maxHeight: "100px" }}
//         >
//           {imagePreviews.map((preview, index) => (
//             <div key={index} className="relative inline-block">
//               <Image
//                 src={preview.preview}
//                 alt="Preview"
//                 width={50}
//                 height={50}
//                 className="rounded-md"
//               />
//               <Button
//                 size="icon"
//                 variant="destructive"
//                 className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0"
//                 onClick={() => removeImagePreview(index)}
//               >
//                 <X className="h-3 w-3" />
//               </Button>
//             </div>
//           ))}
//         </ScrollArea>
//       )}
//       <div className="flex items-center space-x-2">
//         <Input
//           type="text"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-grow"
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           multiple
//           accept="image/*"
//           className="hidden"
//         />
//         <Button
//           size="icon"
//           variant="outline"
//           onClick={() => fileInputRef.current?.click()}
//         >
//           <ImageIcon className="h-4 w-4" />
//         </Button>
//         <Button onClick={sendMessage}>
//           <Send className="h-4 w-4 mr-2" />
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default function Component({ user, selectedChatroom }) {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const messagesEndRef = useRef(null);

//   const me = selectedChatroom?.myData;
//   const other = selectedChatroom?.otherData;
//   const chatRoomId = selectedChatroom?.id;

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
//           messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//         } else {
//           setMessages([]);
//         }
//       });

//       return () => unsubscribe();
//     }
//   }, [selectedChatroom]);

//   if (!selectedChatroom || !other) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   const uploadImagesToCloudinary = async () => {
//     const uploadedImageUrls = [];

//     for (const preview of imagePreviews) {
//       const formData = new FormData();
//       formData.append("file", preview.file);
//       formData.append("upload_preset", "ko4bjtic");

//       try {
//         const response = await fetch(
//           "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           uploadedImageUrls.push(data.secure_url);
//         } else {
//           console.error(
//             "Erreur lors de l'upload de l'image :",
//             await response.text()
//           );
//         }
//       } catch (error) {
//         console.error("Erreur lors de l'upload Cloudinary :", error);
//       }
//     }

//     return uploadedImageUrls;
//   };

//   const sendMessage = async () => {
//     if (message.trim() === "" && imagePreviews.length === 0) {
//       return;
//     }

//     try {
//       const imageUrls = await uploadImagesToCloudinary();

//       const messageData = {
//         chatRoomId,
//         content: message || "",
//         images: imageUrls,
//         messageType: imageUrls.length > 0 ? "image" : "text",
//         senderId: me.id,
//         receiverId: other.id,
//         time: new Date().toISOString(),
//         timestamp: serverTimestamp(),
//       };

//       const messagesRef = ref(db, `messages/${chatRoomId}`);
//       await push(messagesRef, messageData);

//       const chatroomRef = ref(db, `chatrooms/${chatRoomId}`);
//       await update(chatroomRef, {
//         lastMessage: message ? message : imageUrls.length > 0 ? "Images" : "",
//       });

//       setMessage("");
//       setImagePreviews([]);
//     } catch (error) {
//       console.error("Erreur lors de l'envoi du message :", error);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-background">
//       <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shadow-md sticky top-0 z-10">
//         <div className="flex items-center space-x-4">
//           <Avatar className="h-10 w-10">
//             <AvatarImage
//               src={other?.profileImages?.[0]?.path || "/default-avatar.jpg"}
//               alt={`${other?.prenom} ${other?.nom}`}
//             />
//             <AvatarFallback>
//               {other?.prenom?.[0]}
//               {other?.nom?.[0]}
//             </AvatarFallback>
//           </Avatar>
//           <div>
//             <h2 className="text-lg font-bold">
//               {other?.prenom} {other?.nom}
//             </h2>
//           </div>
//         </div>
//       </div>

//       <ScrollArea className="flex-1 p-4">
//         <div className="space-y-4">
//           {messages?.map((message) => (
//             <MessageCard
//               key={message.id}
//               message={message}
//               me={me}
//               other={other}
//             />
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//       </ScrollArea>

//       <div className="border-t p-4">
//         <MessageInput
//           sendMessage={sendMessage}
//           message={message}
//           setMessage={setMessage}
//           imagePreviews={imagePreviews}
//           setImagePreviews={setImagePreviews}
//         />
//       </div>
//     </div>
//   );
// }
//code qui marche 1//
// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { db } from "@/firebaseconfig";
// import { ref, push, update, onValue, serverTimestamp } from "firebase/database";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Send, ImageIcon, X } from "lucide-react";

// const ChatRoom = ({ user, selectedChatroom }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [modalImage, setModalImage] = useState(null); // Gère l'image affichée en modal
//   const messagesContainerRef = useRef(null);

//   const me = selectedChatroom?.myData;
//   const other = selectedChatroom?.otherData;
//   const chatRoomId = selectedChatroom?.id;

//   // Charger les messages depuis Firebase
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

//   // Fonction pour uploader des images sur Cloudinary
//   const uploadImagesToCloudinary = async () => {
//     const uploadedImageUrls = [];

//     for (const preview of imagePreviews) {
//       const formData = new FormData();
//       formData.append("file", preview.file);
//       formData.append("upload_preset", "ko4bjtic");

//       try {
//         const response = await fetch(
//           "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           uploadedImageUrls.push(data.secure_url);
//         } else {
//           console.error(
//             "Erreur lors de l'upload de l'image :",
//             await response.text()
//           );
//         }
//       } catch (error) {
//         console.error("Erreur lors de l'upload Cloudinary :", error);
//       }
//     }

//     return uploadedImageUrls;
//   };

//   // Fonction pour envoyer un message
//   const sendMessage = async () => {
//     if (message.trim() === "" && imagePreviews.length === 0) {
//       return;
//     }

//     try {
//       const imageUrls = await uploadImagesToCloudinary();

//       const messageData = {
//         chatRoomId,
//         content: message || "",
//         images: imageUrls,
//         messageType: imageUrls.length > 0 ? "image" : "text",
//         senderId: me.id,
//         receiverId: other.id,
//         time: new Date().toISOString(),
//         timestamp: serverTimestamp(),
//       };

//       const messagesRef = ref(db, `messages/${chatRoomId}`);
//       await push(messagesRef, messageData);

//       const chatroomRef = ref(db, `chatrooms/${chatRoomId}`);
//       await update(chatroomRef, {
//         lastMessage: message ? message : imageUrls.length > 0 ? "Images" : "",
//       });

//       setMessage("");
//       setImagePreviews([]);
//     } catch (error) {
//       console.error("Erreur lors de l'envoi du message :", error);
//     }
//   };

//   // Composant Navbar
//   const Navbar = () => {
//     if (!other) return null;

//     return (
//       <div className="bg-primary text-primary-foreground p-4 flex items-center sticky top-0 z-10 shadow-md">
//         <div className="flex items-center space-x-4">
//           <div className="h-10 w-10 rounded-full overflow-hidden">
//             <Image
//               width={50}
//               height={50}
//               src={other?.profileImages?.[0]?.path || "/default-avatar.jpg"}
//               alt={`${other?.prenom} ${other?.nom}`}
//               className="h-full w-full object-cover"
//             />
//           </div>
//           <div>
//             <h1 className="text-lg font-semibold">
//               {other?.prenom} {other?.nom}
//             </h1>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const MessageCard = ({ message }) => {
//     const isMyMessage = message.senderId === me.id;

//     return (
//       <div
//         className={`flex ${isMyMessage ? "justify-end" : "justify-start"} mb-4`}
//       >
//         <div
//           className={`max-w-[70%] p-3 rounded-lg ${
//             isMyMessage
//               ? "bg-primary text-primary-foreground"
//               : "bg-secondary text-secondary-foreground"
//           }`}
//         >
//           {message.messageType === "image" &&
//             message.images.map((img, index) => (
//               <Image
//                 width={300}
//                 height={300}
//                 key={index}
//                 src={img}
//                 alt="Image envoyée"
//                 className="rounded-md mb-2 max-w-full cursor-pointer"
//                 onClick={() => setModalImage(img)} // Ouvre l'image dans la modal
//               />
//             ))}
//           {message.content && <p className="break-words">{message.content}</p>}
//           <span className="text-xs opacity-50 mt-1 block">
//             {new Date(message.time).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </span>
//         </div>
//       </div>
//     );
//   };

//   const MessageInput = ({
//     sendMessage,
//     message,
//     setMessage,
//     imagePreviews,
//     setImagePreviews,
//   }) => {
//     const fileInputRef = useRef(null);

//     const handleFileChange = (e) => {
//       const files = Array.from(e.target.files);
//       const newPreviews = files.map((file) => ({
//         file,
//         preview: URL.createObjectURL(file),
//       }));
//       setImagePreviews([...imagePreviews, ...newPreviews]);
//     };

//     const removeImagePreview = (index) => {
//       const newPreviews = [...imagePreviews];
//       URL.revokeObjectURL(newPreviews[index].preview);
//       newPreviews.splice(index, 1);
//       setImagePreviews(newPreviews);
//     };

//     return (
//       <div className="space-y-2">
//         {imagePreviews.length > 0 && (
//           <ScrollArea
//             className="flex flex-nowrap gap-2 pb-2"
//             style={{ maxHeight: "100px" }}
//           >
//             {imagePreviews.map((preview, index) => (
//               <div key={index} className="relative inline-block">
//                 <Image
//                   src={preview.preview}
//                   alt="Preview"
//                   width={50}
//                   height={50}
//                   className="rounded-md"
//                 />
//                 <Button
//                   size="icon"
//                   variant="destructive"
//                   className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0"
//                   onClick={() => removeImagePreview(index)}
//                 >
//                   <X className="h-3 w-3" />
//                 </Button>
//               </div>
//             ))}
//           </ScrollArea>
//         )}
//         <div className="flex items-center space-x-2">
//           {/* <Button
//           size="icon"
//           variant="default"
//           onClick={() => fileInputRef.current?.click()}
//         >
//           <ImageIcon className="h-4 w-4" />
//         </Button> */}
//           <Input
//             type="text"
//             placeholder="Type a message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-grow"
//             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             multiple
//             accept="image/*"
//             className="hidden"
//           />
//           <Button
//             size="icon"
//             variant="outline"
//             onClick={() => fileInputRef.current?.click()}
//           >
//             <ImageIcon className="h-4 w-4" />
//           </Button>
//           <Button onClick={sendMessage}>
//             <Send className="h-4 w-4 mr-2" />
//           </Button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Navbar */}
//       <Navbar />

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4" ref={messagesContainerRef}>
//         {messages?.map((message) => (
//           <MessageCard key={message.id} message={message} />
//         ))}
//       </div>

//       <div className="border-t p-4">
//         <MessageInput
//           sendMessage={sendMessage}
//           message={message}
//           setMessage={setMessage}
//           imagePreviews={imagePreviews}
//           setImagePreviews={setImagePreviews}
//         />
//       </div>

//       {/* Modal pour afficher une image en grand */}
//       {modalImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//           <div className="relative">
//             <Image
//               width={800}
//               height={800}
//               src={modalImage}
//               alt="Agrandie"
//               className="max-w-full max-h-screen rounded-md"
//             />
//             <button
//               className="absolute top-2 right-2 bg-white text-black rounded-full p-2"
//               onClick={() => setModalImage(null)}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatRoom;
//code qui marche 2//

"use client";
import React, { useEffect, useState, useRef } from "react";
import { db } from "@/firebaseconfig";
import { ref, push, update, onValue, serverTimestamp } from "firebase/database";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Send, ImageIcon, X } from "lucide-react";

const MessageCard = ({ message, me, other, onImageClick }) => {
  const isMyMessage = message.senderId === me.id;
  return (
    <div
      className={`flex ${isMyMessage ? "justify-end" : "justify-start"} mb-4`}
    >
      {!isMyMessage && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage
            src={other?.profileImages?.[0]?.path || "/default-avatar.jpg"}
            alt={`${other?.prenom} ${other?.nom}`}
          />
          <AvatarFallback>
            {other?.prenom?.[0]}
            {other?.nom?.[0]}
          </AvatarFallback>
        </Avatar>
      )}
      <Card
        className={`max-w-[70%] ${
          isMyMessage ? "bg-primary text-primary-foreground" : "bg-secondary"
        }`}
      >
        <CardContent className="p-3">
          {message.messageType === "image" &&
            message.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt="Sent image"
                width={200}
                height={200}
                className="rounded-md mb-2 cursor-pointer"
                onClick={() => onImageClick(img)}
              />
            ))}
          {message.content && <p className="break-words">{message.content}</p>}
          <span className="text-xs opacity-50 mt-1 block">
            {new Date(message.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </CardContent>
      </Card>
    </div>
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
    <div className="space-y-2">
      {imagePreviews.length > 0 && (
        <ScrollArea
          className="flex flex-nowrap gap-2 pb-2"
          style={{ maxHeight: "100px" }}
        >
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative inline-block">
              <Image
                src={preview.preview}
                alt="Preview"
                width={50}
                height={50}
                className="rounded-md"
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
          <Send className="h-4 w-4 mr-2" />
        </Button>
      </div>
    </div>
  );
};

export default function Component({ user, selectedChatroom }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // État pour l'image sélectionnée
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
            <h2 className="text-lg font-bold">
              {other?.prenom} {other?.nom}
            </h2>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages?.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              me={me}
              other={other}
              onImageClick={setSelectedImage}
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

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="p-0 max-w-2xl">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected"
              width={800}
              height={800}
              className="rounded-md"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
