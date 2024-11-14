// "use client";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (session?.user.id) {
//         const userId = session.user.id;
//         console.log("userId dans session :", userId);

//         try {
//           const response = await fetch(`/api/chat?userId=${userId}`);
//           const data = await response.json();
//           console.log("Données reçues de l'API :", data);
//           if (response.ok) {
//             if (!data.messages || data.messages.length === 0) {
//               console.log("Aucun message trouvé.");
//             }
//             setMessages(data.messages);
//           } else {
//             setError(
//               data.message || "Erreur lors de la récupération des messages."
//             );
//             console.error(
//               "Erreur lors de la récupération des messages :",
//               data.message || data.messages
//             );
//           }
//         } catch (error) {
//           setError("Erreur réseau : " + error.message);
//           console.error("Erreur réseau :", error);
//         }
//       }
//     };

//     fetchMessages();
//   }, [session?.user.id]);

//   return (
//     <div>
//       <h1>Page</h1>
//       {session ? (
//         <>
//           <p>User ID: {session.user.id}</p>
//           <div>
//             <h2>Tous les messages</h2>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             {messages.length > 0 ? (
//               <ul>
//                 {messages.map((message) => {
//                   console.log("Message envoyé par l'API:", message);

//                   const isSent =
//                     message.senderId === parseInt(session.user.id, 10);
//                   const isReceived =
//                     message.receiverId === parseInt(session.user.id, 10);

//                   console.log("isSent:", isSent, "isReceived:", isReceived);

//                   return (
//                     <li key={message.id}>
//                       <p>
//                         <strong>Expéditeur :</strong> {message.senderId}
//                       </p>
//                       <p>
//                         <strong>Destinataire :</strong> {message.receiverId}
//                       </p>
//                       <p>
//                         <strong>Contenu :</strong> {message.content}
//                       </p>
//                       <p>
//                         <strong>Date :</strong> {message.sentAt}
//                       </p>

//                       {isSent && (
//                         <p>
//                           <strong>Status :</strong> Message envoyé
//                         </p>
//                       )}
//                       {isReceived && (
//                         <p>
//                           <strong>Status :</strong> Message reçu
//                         </p>
//                       )}

//                       {message.imageMessages?.[0]?.path && (
//                         <p>
//                           <strong>Image :</strong>
//                           <Image
//                             width={100}
//                             height={100}
//                             src={message.imageMessages[0].path}
//                             alt="Message image"
//                           />
//                         </p>
//                       )}
//                     </li>
//                   );
//                 })}
//               </ul>
//             ) : (
//               <p>Aucun message trouvé.</p>
//             )}
//           </div>
//         </>
//       ) : (
//         <p>You are not logged in.</p>
//       )}
//     </div>
//   );
// };

// export default Page;
// "use client";

// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true); // Ajout d'un état de chargement

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (session?.user?.id) {
//         const userId = session.user.id;

//         try {
//           const response = await fetch(`/api/chat?userId=${userId}`);
//           const data = await response.json();

//           if (response.ok) {
//             setMessages(data.messages || []);
//           } else {
//             setError(
//               data.message || "Erreur lors de la récupération des messages."
//             );
//           }
//         } catch (error) {
//           setError("Erreur réseau : " + error.message);
//         } finally {
//           setLoading(false); // Fin du chargement
//         }
//       }
//     };

//     fetchMessages();
//   }, [session?.user?.id]);

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-4">
//       <h1 className="text-2xl font-semibold mb-4">Messages</h1>
//       {session ? (
//         <div className="space-y-4">
//           {loading && (
//             <p className="text-gray-400">Chargement des messages...</p>
//           )}
//           {error && <p className="text-red-500">{error}</p>}
//           {!loading && messages.length > 0
//             ? messages.map((message) => {
//                 const isSent = message.senderId === session.user.id;
//                 const user = isSent ? message.receiver : message.sender;

//                 // Utilisation de l'image de profil ou d'une image par défaut
//                 const profileImage =
//                   user?.profileImages?.[0]?.path || "/default-avatar.png";

//                 return (
//                   <div
//                     key={message.id}
//                     className={`flex justify-between items-center p-4 rounded-md shadow-md ${
//                       isSent ? "bg-blue-700" : "bg-gray-800"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-4">
//                       {/* Image de profil */}
//                       <Image
//                         src={profileImage}
//                         alt={`${user?.nom || "Utilisateur"} ${
//                           user?.prenom || ""
//                         }`}
//                         width={40}
//                         height={40}
//                         className="rounded-full object-cover"
//                       />

//                       {/* Contenu du message */}
//                       <div>
//                         <p className="text-lg font-medium">
//                           {isSent
//                             ? "Vous"
//                             : `${user?.nom || "Expéditeur"} ${
//                                 user?.prenom || ""
//                               }`}
//                         </p>
//                         <p className="text-gray-400">{message.content}</p>
//                         <p className="text-sm text-gray-500">
//                           {new Intl.DateTimeFormat("fr-FR", {
//                             day: "2-digit",
//                             month: "2-digit",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           }).format(new Date(message.sentAt))}
//                         </p>
//                         {/* Affichage de l'image jointe si elle existe */}
//                         {message.imageMessages?.[0]?.path && (
//                           <div className="mt-2">
//                             <Image
//                               src={message.imageMessages[0].path}
//                               alt="Image jointe"
//                               width={100}
//                               height={100}
//                               className="rounded-md"
//                             />
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Indicateur de message envoyé/reçu */}
//                     <div className="text-sm text-gray-400">
//                       {isSent ? "Envoyé" : "Reçu"}
//                     </div>
//                   </div>
//                 );
//               })
//             : !loading && <p>Aucun message trouvé.</p>}
//         </div>
//       ) : (
//         <p>Vous n&apos;êtes pas connecté.</p>
//       )}
//     </div>
//   );
// };

// export default Page;
//AVEC MODAL DE REPLY
// "use client";

// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [replyModal, setReplyModal] = useState(false); // État pour le modal
//   const [selectedMessage, setSelectedMessage] = useState(null); // Message sélectionné
//   const [replyContent, setReplyContent] = useState(""); // Contenu de la réponse

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (session?.user?.id) {
//         const userId = session.user.id;

//         try {
//           const response = await fetch(`/api/chat?userId=${userId}`);
//           const data = await response.json();

//           if (response.ok) {
//             setMessages(data.messages || []);
//           } else {
//             setError(
//               data.message || "Erreur lors de la récupération des messages."
//             );
//           }
//         } catch (error) {
//           setError("Erreur réseau : " + error.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchMessages();
//   }, [session?.user?.id]);

//   const openReplyModal = (message) => {
//     setSelectedMessage(message);
//     setReplyModal(true);
//   };

//   const closeReplyModal = () => {
//     setSelectedMessage(null);
//     setReplyModal(false);
//     setReplyContent("");
//   };

//   const handleReply = async () => {
//     if (!replyContent.trim()) return; // Empêche l'envoi de réponses vides

//     try {
//       const response = await fetch("/api/chat/reply", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: session?.user?.id,
//           originalMessageId: selectedMessage.id,
//           content: replyContent,
//         }),
//       });

//       if (response.ok) {
//         const repliedMessage = await response.json();
//         setMessages((prevMessages) => [...prevMessages, repliedMessage]);
//         closeReplyModal(); // Fermer le modal après l'envoi
//       } else {
//         const data = await response.json();
//         setError(data.message || "Erreur lors de l'envoi de la réponse.");
//       }
//     } catch (error) {
//       setError("Erreur réseau : " + error.message);
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-4">
//       <h1 className="text-2xl font-semibold mb-4">Messages</h1>
//       {session ? (
//         <div className="space-y-4">
//           {loading && (
//             <p className="text-gray-400">Chargement des messages...</p>
//           )}
//           {error && <p className="text-red-500">{error}</p>}
//           {!loading && messages.length > 0
//             ? messages.map((message) => {
//                 const isSent = message.senderId === session.user.id;
//                 const user = isSent ? message.receiver : message.sender;

//                 const profileImage =
//                   user?.profileImages?.[0]?.path || "/default-avatar.png";

//                 return (
//                   <div
//                     key={message.id}
//                     className={`flex justify-between items-center p-4 rounded-md shadow-md ${
//                       isSent ? "bg-blue-700" : "bg-gray-800"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-4">
//                       <Image
//                         src={profileImage}
//                         alt={`${user?.nom || "Utilisateur"} ${
//                           user?.prenom || ""
//                         }`}
//                         width={40}
//                         height={40}
//                         className="rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="text-lg font-medium">
//                           {isSent
//                             ? "Vous"
//                             : `${user?.nom || "Expéditeur"} ${
//                                 user?.prenom || ""
//                               }`}
//                         </p>
//                         <p className="text-gray-400">{message.content}</p>
//                         <p className="text-sm text-gray-500">
//                           {new Intl.DateTimeFormat("fr-FR", {
//                             day: "2-digit",
//                             month: "2-digit",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           }).format(new Date(message.sentAt))}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => openReplyModal(message)}
//                       className="text-blue-400 hover:text-blue-600"
//                     >
//                       Répondre
//                     </button>
//                   </div>
//                 );
//               })
//             : !loading && <p>Aucun message trouvé.</p>}
//         </div>
//       ) : (
//         <p>Vous n&apos;êtes pas connecté.</p>
//       )}

//       {/* Modal de réponse */}
//       {replyModal && selectedMessage && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white text-black p-6 rounded-lg w-96">
//             <h2 className="text-lg font-semibold mb-4">
//               Répondre à {selectedMessage.sender.nom}
//             </h2>
//             <textarea
//               value={replyContent}
//               onChange={(e) => setReplyContent(e.target.value)}
//               placeholder="Écrivez votre réponse..."
//               className="w-full p-2 border rounded-md"
//               rows="4"
//             ></textarea>
//             <div className="mt-4 flex justify-end space-x-2">
//               <button
//                 onClick={closeReplyModal}
//                 className="px-4 py-2 bg-gray-300 rounded-md"
//               >
//                 Annuler
//               </button>
//               <button
//                 onClick={handleReply}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
//               >
//                 Envoyer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;

// "use client";
// import { Paperclip, Send } from "lucide-react";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const [message, setMessage] = useState("");
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [replyModal, setReplyModal] = useState(false); // État pour le modal
//   const [selectedMessage, setSelectedMessage] = useState(null); // Message sélectionné
//   const [replyContent, setReplyContent] = useState(""); // Contenu de la réponse
//   const [selectedImages, setSelectedImages] = useState([]); // Images sélectionnées

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (session?.user?.id) {
//         const userId = session.user.id;

//         try {
//           const response = await fetch(`/api/chat?userId=${userId}`);
//           const data = await response.json();

//           if (response.ok) {
//             setMessages(data.messages || []);
//           } else {
//             setError(
//               data.message || "Erreur lors de la récupération des messages."
//             );
//           }
//         } catch (error) {
//           setError("Erreur réseau : " + error.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchMessages();
//   }, [session?.user?.id]);

//   const openReplyModal = (message) => {
//     setSelectedMessage(message);
//     setReplyModal(true);
//     setReplyContent(""); // Réinitialise le contenu de la réponse à chaque ouverture du modal
//   };

//   const closeReplyModal = () => {
//     setSelectedMessage(null);
//     setReplyModal(false);
//   };

//   const handleReply = async () => {
//     if (!replyContent.trim()) return; // Empêche l'envoi de réponses vides

//     try {
//       const response = await fetch("/api/chat/reply", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: session?.user?.id,
//           originalMessageId: selectedMessage.id,
//           content: replyContent,
//           images: selectedImages, // Ajouter les images sélectionnées
//         }),
//       });

//       if (response.ok) {
//         const repliedMessage = await response.json();
//         setMessages((prevMessages) => [...prevMessages, repliedMessage]);
//         closeReplyModal(); // Fermer le modal après l'envoi
//       } else {
//         const data = await response.json();
//         setError(data.message || "Erreur lors de l'envoi de la réponse.");
//       }
//     } catch (error) {
//       setError("Erreur réseau : " + error.message);
//     }
//   };

//   const handleImageUpload = (event) => {
//     const files = Array.from(event.target.files);
//     files.forEach((file) => {
//       console.log(
//         `Nom : ${file.name}, Type : ${file.type}, Taille : ${file.size} octets`
//       );
//     });
//     const imageUrls = files.map((file) => URL.createObjectURL(file));
//     setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-4">
//       <h1 className="text-2xl font-semibold mb-4">Messages</h1>
//       {session ? (
//         <div className="space-y-4">
//           {loading && (
//             <p className="text-gray-400">Chargement des messages...</p>
//           )}
//           {error && <p className="text-red-500">{error}</p>}
//           {!loading && messages.length > 0
//             ? messages.map((message) => {
//                 const isSent = message.senderId === session.user.id;
//                 const user = isSent ? message.receiver : message.sender;

//                 const profileImage =
//                   user?.profileImages?.[0]?.path || "/default-avatar.png";

//                 return (
//                   <div
//                     key={message.id}
//                     className={`flex justify-between items-center p-4 rounded-md shadow-md ${
//                       isSent ? "bg-blue-700" : "bg-gray-800"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-4">
//                       <Image
//                         src={profileImage}
//                         alt={`${user?.nom || "Utilisateur"} ${
//                           user?.prenom || ""
//                         }`}
//                         width={40}
//                         height={40}
//                         className="rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="text-lg font-medium">
//                           {isSent
//                             ? "Vous"
//                             : `${user?.nom || "Expéditeur"} ${
//                                 user?.prenom || ""
//                               }`}
//                         </p>
//                         <p className="text-gray-400">{message.content}</p>
//                         <p className="text-sm text-gray-500">
//                           {new Intl.DateTimeFormat("fr-FR", {
//                             day: "2-digit",
//                             month: "2-digit",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           }).format(new Date(message.sentAt))}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => openReplyModal(message)}
//                       className="text-blue-400 hover:text-blue-600"
//                     >
//                       Répondre
//                     </button>
//                   </div>
//                 );
//               })
//             : !loading && <p>Aucun message trouvé.</p>}
//         </div>
//       ) : (
//         <p>Vous n&apos;êtes pas connecté.</p>
//       )}

//       {/* Modal de réponse */}
//       {replyModal && selectedMessage && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white text-black p-6 rounded-lg w-96">
//             <h2 className="text-lg font-semibold mb-4">
//               Répondre à {selectedMessage.sender.nom}
//             </h2>

//             {/* Affichage des anciens messages dans le modal */}
//             <div className="space-y-2 mb-4">
//               {messages.map((message) => {
//                 const isSent = message.senderId === session.user.id; // Vérifier si le message a été envoyé par l'utilisateur actuel
//                 return (
//                   <div
//                     key={message.id}
//                     className={`p-3 rounded-md shadow-md ${
//                       isSent
//                         ? "bg-gray-700 text-white"
//                         : "bg-blue-500 text-white"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <Image
//                         src={
//                           isSent
//                             ? "/default-avatar.png"
//                             : message.sender.profileImages[0]?.path ||
//                               "/default-avatar.png"
//                         }
//                         alt={`${message.sender.nom} ${message.sender.prenom}`}
//                         width={30}
//                         height={30}
//                         className="rounded-full object-cover"
//                       />
//                       <p className="ml-2 text-sm">{message.content}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Zone de saisie pour la réponse */}
//             <div className="flex items-center space-x-2">
//               <Paperclip
//                 onClick={() => document.getElementById("imageUpload").click()}
//                 className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
//               />
//               <input
//                 id="imageUpload"
//                 type="file"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 multiple
//                 onChange={handleImageUpload}
//               />
//               <input
//                 type="text"
//                 value={replyContent}
//                 onChange={(e) => setReplyContent(e.target.value)}
//                 placeholder="Message"
//                 className="flex-1 p-2 outline-none"
//               />
//               <Send
//                 onClick={handleReply}
//                 className="h-6 w-6 text-[#00A884] hover:text-[#008f6f] cursor-pointer transform rotate-45"
//               />
//             </div>
//             <div className="mt-4 flex justify-end space-x-2">
//               <button
//                 onClick={closeReplyModal}
//                 className="px-4 py-2 bg-gray-300 rounded-md"
//               >
//                 Annuler
//               </button>
//               <button
//                 onClick={handleReply}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
//               >
//                 Envoyer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;

// "use client";

// import { CircleX, Paperclip, Send } from "lucide-react";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const [message, setMessage] = useState("");
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedMessage, setSelectedMessage] = useState(null); // Message sélectionné
//   const [replyContent, setReplyContent] = useState(""); // Contenu de la réponse
//   const [selectedImages, setSelectedImages] = useState([]); // Images sélectionnées

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (session?.user?.id) {
//         const userId = session.user.id;

//         try {
//           const response = await fetch(`/api/chat?userId=${userId}`);
//           const data = await response.json();

//           if (response.ok) {
//             // Trier les messages par ordre décroissant (dernier d'abord)
//             const sortedMessages = data.messages.sort(
//               (a, b) => new Date(b.sentAt) - new Date(a.sentAt)
//             );
//             setMessages(sortedMessages);

//             // Sélectionner automatiquement le premier message
//             if (sortedMessages.length > 0) {
//               setSelectedMessage(sortedMessages[0]);
//             }
//           } else {
//             setError(
//               data.message || "Erreur lors de la récupération des messages."
//             );
//           }
//         } catch (error) {
//           setError("Erreur réseau : " + error.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchMessages();
//   }, [session?.user?.id]);

//   const handleReply = async () => {
//     if (!replyContent.trim()) return;

//     try {
//       const response = await fetch("/api/chat/reply", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: session?.user?.id,
//           originalMessageId: selectedMessage.id,
//           content: replyContent,
//           images: selectedImages,
//         }),
//       });

//       if (response.ok) {
//         const repliedMessage = await response.json();
//         setMessages((prevMessages) => [...prevMessages, repliedMessage]);
//         setReplyContent("");
//       } else {
//         const data = await response.json();
//         setError(data.message || "Erreur lors de l'envoi de la réponse.");
//       }
//     } catch (error) {
//       setError("Erreur réseau : " + error.message);
//     }
//   };

//   const handleImageUpload = (event) => {
//     const files = Array.from(event.target.files);
//     files.forEach((file) => {
//       console.log(
//         `Nom : ${file.name}, Type : ${file.type}, Taille : ${file.size} octets`
//       );
//     });
//     const imageUrls = files.map((file) => URL.createObjectURL(file));
//     setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
//   };
//   const handleSendClick = () => {
//     if (message.trim() || selectedImages.length > 0) {
//       console.log("Message :", message);
//       console.log("Images sélectionnées :", selectedImages);
//       setMessage("");
//       setSelectedImages([]);
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-4">
//       <h1 className="text-2xl font-semibold mb-4">Messages</h1>

//       {session ? (
//         <div className="flex">
//           {/* Colonne de gauche : Liste des messages */}
//           <div className="w-1/3 space-y-4 overflow-y-auto h-screen border-r border-gray-700 pr-4">
//             {loading && <p className="text-gray-400">Chargement...</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             {!loading && messages.length > 0 ? (
//               messages.map((message) => {
//                 const isSent = message.senderId === session.user.id;
//                 const user = isSent ? message.receiver : message.sender;

//                 return (
//                   <div
//                     key={message.id}
//                     onClick={() => setSelectedMessage(message)}
//                     className={`p-4 rounded-md shadow-md cursor-pointer ${
//                       selectedMessage?.id === message.id
//                         ? "bg-blue-700"
//                         : "bg-gray-800"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-4">
//                       <Image
//                         src={
//                           user?.profileImages?.[0]?.path ||
//                           "/default-avatar.png"
//                         }
//                         alt={`${user?.nom || "Utilisateur"} ${
//                           user?.prenom || ""
//                         }`}
//                         width={40}
//                         height={40}
//                         className="rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="text-lg font-medium">
//                           {isSent
//                             ? "Vous"
//                             : `${user?.nom || "Expéditeur"} ${
//                                 user?.prenom || ""
//                               }`}
//                         </p>
//                         <p className="text-gray-400 truncate">
//                           {message.content}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>Aucun message trouvé.</p>
//             )}
//           </div>

//           {/* Colonne de droite : Conversation */}
//           <div className="w-2/3 p-4 space-y-4">
//             {selectedMessage ? (
//               <>
//                 {/* Détails de l'utilisateur et message principal */}
//                 <div className="flex items-center space-x-4">
//                   <Image
//                     src={
//                       selectedMessage.sender?.profileImages?.[0]?.path ||
//                       "/default-avatar.png"
//                     }
//                     alt="Expéditeur"
//                     width={50}
//                     height={50}
//                     className="rounded-full object-cover"
//                   />
//                   <div>
//                     <h2 className="text-lg font-medium">
//                       {selectedMessage.sender.nom}{" "}
//                       {selectedMessage.sender.prenom}
//                     </h2>
//                     <div className="mt-2 space-y-2">
//                       {messages
//                         .filter((msg) => msg.id === selectedMessage.id)
//                         .map((msg, index) => (
//                           <div key={index} className="text-sm text-gray-300">
//                             <p className="bg-gray-700 p-2 rounded-md shadow">
//                               {msg.content}
//                             </p>
//                           </div>
//                         ))}
//                     </div>
//                     <p className="text-gray-400">
//                       {new Intl.DateTimeFormat("fr-FR", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       }).format(new Date(selectedMessage.sentAt))}
//                     </p>
//                     {/* Affichage des anciens messages */}
//                   </div>
//                 </div>

//                 {/* Zone de réponse */}
//                 {/* <div className="w-full flex flex-col space-y-2 bg-white border border-gray-800 rounded-lg px-4 py-2">
//                   <div className="flex space-x-2 overflow-x-auto">
//                     {selectedImages.map((src, index) => (
//                       <div key={index} className="relative">
//                         <Image
//                           src={src}
//                           width={50}
//                           height={50}
//                           alt={`selected-${index}`}
//                           className="h-20 w-20 object-cover rounded-md"
//                         />
//                         <button
//                           className="absolute top-0 right-0 bg-gray-700 text-white rounded-full p-1"
//                           onClick={() => {
//                             setSelectedImages(
//                               selectedImages.filter((_, i) => i !== index)
//                             );
//                             URL.revokeObjectURL(src);
//                           }}
//                         >
//                           <CircleX color="#e71313" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <Paperclip
//                       onClick={() =>
//                         document.getElementById("imageUpload").click()
//                       }
//                       className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
//                     />
//                     <input
//                       id="imageUpload"
//                       type="file"
//                       accept="image/*"
//                       style={{ display: "none" }}
//                       multiple
//                       onChange={handleImageUpload}
//                     />
//                     <input
//                       type="text"
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       placeholder="Message"
//                       className="flex-1 p-2 outline-none"
//                     />
//                     <Send
//                       className="h-6 w-6 text-[#00A884] hover:text-[#008f6f] cursor-pointer transform rotate-45"
//                       onClick={handleSendClick}
//                     />
//                   </div>
//                 </div> */}
//                 <div className="w-full flex flex-col space-y-2 bg-white border border-gray-800 rounded-lg px-4 py-2">
//                   {/* Zone d'images sélectionnées */}
//                   <div className="flex space-x-2 overflow-x-auto">
//                     {selectedImages.map((src, index) => (
//                       <div key={index} className="relative">
//                         <Image
//                           src={src}
//                           width={50}
//                           height={50}
//                           alt={`selected-${index}`}
//                           className="h-20 w-20 object-cover rounded-md"
//                         />
//                         <button
//                           className="absolute top-0 right-0 bg-gray-700 text-white rounded-full p-1"
//                           onClick={() => {
//                             setSelectedImages(
//                               selectedImages.filter((_, i) => i !== index)
//                             );
//                             URL.revokeObjectURL(src);
//                           }}
//                         >
//                           <CircleX color="#e71313" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Champ de saisie du message */}
//                   <div className="flex items-center space-x-2">
//                     <Paperclip
//                       onClick={() =>
//                         document.getElementById("imageUpload").click()
//                       }
//                       className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
//                     />
//                     <input
//                       id="imageUpload"
//                       type="file"
//                       accept="image/*"
//                       style={{ display: "none" }}
//                       multiple
//                       onChange={handleImageUpload}
//                     />
//                     <input
//                       type="text"
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       placeholder="Message"
//                       className="flex-1 p-2 outline-none bg-gray-100 text-black rounded-md "
//                     />
//                     <Send
//                       className="h-6 w-6 text-[#00A884] hover:text-[#008f6f] cursor-pointer transform rotate-45"
//                       onClick={handleSendClick}
//                     />
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <p>Sélectionnez un message pour voir la conversation.</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Vous n&apos;êtes pas connecté.</p>
//       )}
//     </div>
//   );
// };

// export default Page;

// "use client";

// import { Paperclip, Send, Search } from "lucide-react";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const [message, setMessage] = useState("");
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [replyContent, setReplyContent] = useState("");
//   const [selectedImages, setSelectedImages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (session?.user?.id) {
//         const userId = session.user.id;

//         try {
//           const response = await fetch(`/api/chat?userId=${userId}`);
//           const data = await response.json();

//           if (response.ok) {
//             const sortedMessages = data.messages.sort(
//               (a, b) => new Date(b.sentAt) - new Date(a.sentAt)
//             );
//             setMessages(sortedMessages);
//             if (sortedMessages.length > 0) {
//               setSelectedMessage(sortedMessages[0]);
//             }
//           } else {
//             setError(
//               data.message || "Erreur lors de la récupération des messages."
//             );
//           }
//         } catch (error) {
//           setError("Erreur réseau : " + error.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchMessages();
//   }, [session?.user?.id]);

//   const handleReply = async () => {
//     if (!replyContent.trim()) return;

//     try {
//       const response = await fetch("/api/chat/reply", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: session?.user?.id,
//           originalMessageId: selectedMessage.id,
//           content: replyContent,
//           images: selectedImages,
//         }),
//       });

//       if (response.ok) {
//         const repliedMessage = await response.json();
//         setMessages((prevMessages) => [...prevMessages, repliedMessage]);
//         setReplyContent("");
//       } else {
//         const data = await response.json();
//         setError(data.message || "Erreur lors de l'envoi de la réponse.");
//       }
//     } catch (error) {
//       setError("Erreur réseau : " + error.message);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-white">
//       {/* Liste des conversations */}
//       <div className="w-80 border-r border-gray-200">
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center bg-gray-100 rounded-lg p-2">
//             <Search className="w-4 h-4 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Rechercher..."
//               className="bg-transparent ml-2 outline-none w-full text-gray-700"
//             />
//           </div>
//         </div>

//         <div className="overflow-y-auto h-[calc(100vh-73px)]">
//           {loading && <p className="p-4 text-gray-500">Chargement...</p>}
//           {error && <p className="p-4 text-red-500">{error}</p>}

//           {!loading && messages.length > 0 ? (
//             messages.map((message) => {
//               const isSent = message.senderId === session?.user?.id;
//               const user = isSent ? message.receiver : message.sender;

//               return (
//                 <div
//                   key={message.id}
//                   onClick={() => setSelectedMessage(message)}
//                   className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
//                     selectedMessage?.id === message.id ? "bg-gray-100" : ""
//                   }`}
//                 >
//                   <Image
//                     src={
//                       user?.profileImages?.[0]?.path || "/default-avatar.png"
//                     }
//                     alt={`${user?.nom || "Utilisateur"} ${user?.prenom || ""}`}
//                     width={48}
//                     height={48}
//                     className="rounded-full object-cover"
//                   />
//                   <div className="ml-4 flex-1">
//                     <div className="flex justify-between">
//                       <span className="font-semibold text-gray-900">
//                         {isSent
//                           ? "Vous"
//                           : `${user?.nom || "Expéditeur"} ${
//                               user?.prenom || ""
//                             }`}
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         {new Intl.DateTimeFormat("fr-FR", {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         }).format(new Date(message.sentAt))}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-500 truncate">
//                       {message.content}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="p-4 text-gray-500">Aucun message trouvé.</p>
//           )}
//         </div>
//       </div>

//       {/* Zone de chat */}
//       <div className="flex-1 flex flex-col">
//         {selectedMessage ? (
//           <>
//             <div className="p-4 border-b border-gray-200">
//               <div className="flex items-center">
//                 <Image
//                   src={
//                     selectedMessage.sender?.profileImages?.[0]?.path ||
//                     "/default-avatar.png"
//                   }
//                   alt={`${selectedMessage.sender?.nom || ""} ${
//                     selectedMessage.sender?.prenom || ""
//                   }`}
//                   width={40}
//                   height={40}
//                   className="rounded-full object-cover"
//                 />
//                 <span className="ml-4 font-semibold text-gray-900">
//                   {selectedMessage.sender.nom} {selectedMessage.sender.prenom}
//                 </span>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//               {/* Ici vous pouvez ajouter l'historique des messages de la conversation */}
//             </div>

//             <div className="p-4 border-t border-gray-200">
//               <div className="flex items-center space-x-2">
//                 <Paperclip
//                   onClick={() => document.getElementById("imageUpload").click()}
//                   className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
//                 />
//                 <input
//                   id="imageUpload"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   multiple
//                 />
//                 <input
//                   type="text"
//                   value={replyContent}
//                   onChange={(e) => setReplyContent(e.target.value)}
//                   placeholder="Votre message..."
//                   className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none text-gray-700"
//                 />
//                 <Send
//                   onClick={handleReply}
//                   className="h-6 w-6 text-blue-500 hover:text-blue-600 cursor-pointer transform rotate-45"
//                 />
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             Sélectionnez une conversation pour commencer
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;

// "use client";

// import { Paperclip, Send, Search, Info } from "lucide-react";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const [message, setMessage] = useState("");
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [replyContent, setReplyContent] = useState("");
//   const [selectedImages, setSelectedImages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (session?.user?.id) {
//         const userId = session.user.id;

//         try {
//           const response = await fetch(`/api/chat?userId=${userId}`);
//           const data = await response.json();

//           if (response.ok) {
//             const sortedMessages = data.messages.sort(
//               (a, b) => new Date(b.sentAt) - new Date(a.sentAt)
//             );
//             setMessages(sortedMessages);
//             if (sortedMessages.length > 0) {
//               setSelectedMessage(sortedMessages[0]);
//             }
//           } else {
//             setError(
//               data.message || "Erreur lors de la récupération des messages."
//             );
//           }
//         } catch (error) {
//           setError("Erreur réseau : " + error.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchMessages();
//   }, [session?.user?.id]);

//   const handleReply = async () => {
//     if (!replyContent.trim()) return;

//     try {
//       const response = await fetch("/api/chat/reply", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: session?.user?.id,
//           originalMessageId: selectedMessage.id,
//           content: replyContent,
//           images: selectedImages,
//         }),
//       });

//       if (response.ok) {
//         const repliedMessage = await response.json();
//         setMessages((prevMessages) => [...prevMessages, repliedMessage]);
//         setReplyContent("");
//       } else {
//         const data = await response.json();
//         setError(data.message || "Erreur lors de l'envoi de la réponse.");
//       }
//     } catch (error) {
//       setError("Erreur réseau : " + error.message);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-white">
//       {/* Liste des conversations */}
// <div className="w-80 border-r border-gray-200">
//   <div className="p-4 border-b border-gray-200">
//     <div className="flex items-center bg-gray-100 rounded-lg p-2">
//       <Search className="w-4 h-4 text-gray-500" />
//       <input
//         type="text"
//         placeholder="Rechercher..."
//         className="bg-transparent ml-2 outline-none w-full text-gray-700"
//       />
//     </div>
//   </div>

//   <div className="overflow-y-auto h-[calc(100vh-73px)]">
//     {loading && <p className="p-4 text-gray-500">Chargement...</p>}
//     {error && <p className="p-4 text-red-500">{error}</p>}

//     {!loading && messages.length > 0 ? (
//       messages.map((message) => {
//         const isSent = message.senderId === session?.user?.id;
//         const user = isSent ? message.receiver : message.sender;

//         return (
//           <div
//             key={message.id}
//             onClick={() => setSelectedMessage(message)}
//             className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
//               selectedMessage?.id === message.id ? "bg-gray-100" : ""
//             }`}
//           >
//             <Image
//               src={
//                 user?.profileImages?.[0]?.path || "/default-avatar.png"
//               }
//               alt={`${user?.nom || "Utilisateur"} ${user?.prenom || ""}`}
//               width={48}
//               height={48}
//               className="rounded-full object-cover"
//             />
//             <div className="ml-4 flex-1">
//               <div className="flex justify-between">
//                 <span className="font-semibold text-gray-900">
//                   {isSent
//                     ? "Vous"
//                     : `${user?.nom || "Expéditeur"} ${
//                         user?.prenom || ""
//                       }`}
//                 </span>
// <span className="text-sm text-gray-500">
//   {new Intl.DateTimeFormat("fr-FR", {
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(message.sentAt))}
// </span>
//               </div>
//               <p className="text-sm text-gray-500 truncate">
//                 {message.content}
//               </p>
//             </div>
//           </div>
//         );
//       })
//     ) : (
//       <p className="p-4 text-gray-500">Aucun message trouvé.</p>
//     )}
//   </div>
// </div>

//       {/* Zone de chat */}
// <div className="flex-1 flex flex-col">
//   {selectedMessage ? (
//     <>
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <Image
//               src={
//                 selectedMessage.sender?.profileImages?.[0]?.path ||
//                 "/default-avatar.png"
//               }
//               alt={`${selectedMessage.sender?.nom || ""} ${
//                 selectedMessage.sender?.prenom || ""
//               }`}
//               width={40}
//               height={40}
//               className="rounded-full object-cover"
//             />
//             <span className="ml-4 font-semibold text-gray-900">
//               {selectedMessage.sender.nom} {selectedMessage.sender.prenom}
//             </span>
//           </div>
//           <button
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             onClick={() => {
//               /* Ajoutez ici la logique pour afficher les informations */
//             }}
//           >
//             <Info className="w-6 h-6 text-gray-600" />
//           </button>
//         </div>
//       </div>

// <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//   {/* Ici vous pouvez ajouter l'historique des messages de la conversation */}
// </div>

// <div className="p-4 border-t border-gray-200">
//   <div className="flex items-center space-x-2">
//     <Paperclip
//       onClick={() => document.getElementById("imageUpload").click()}
//       className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
//     />
//     <input
//       id="imageUpload"
//       type="file"
//       accept="image/*"
//       className="hidden"
//       multiple
//     />
//     <input
//       type="text"
//       value={replyContent}
//       onChange={(e) => setReplyContent(e.target.value)}
//       placeholder="Votre message..."
//       className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none text-gray-700"
//     />
//     <Send
//       onClick={handleReply}
//       className="h-6 w-6 text-blue-500 hover:text-blue-600 cursor-pointer transform rotate-45"
//     />
//   </div>
//       </div>
//     </>
//   ) : (
//     <div className="flex items-center justify-center h-full text-gray-500">
//       Sélectionnez une conversation pour commencer
//     </div>
//   )}
// </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import { Badge } from "@/components/ui/badge";
import { Paperclip, Send, Search, Info, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { db } from "@/firebaseconfig"; // Assurez-vous que la configuration est correcte
import { ref, onValue } from "firebase/database";

const Page = () => {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [showInfoDropdown, setShowInfoDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search term

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowInfoDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Récupérer les messages depuis Firebase
  const fetchMessages = () => {
    const messagesRef = ref(db, "chats");
    onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messagesList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setMessages(messagesList);
          setFilteredMessages(messagesList); // Initialiser les messages filtrés
          setLoading(false); // Fin du chargement
        } else {
          setLoading(false); // Fin du chargement, même si aucune donnée n'a été récupérée
        }
      },
      (error) => {
        console.error("Erreur de récupération des messages:", error);
        setError("Erreur lors de la récupération des messages.");
        setLoading(false); // Fin du chargement même en cas d'erreur
      }
    );
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filtrer les messages en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMessages(messages); // Si le terme de recherche est vide, afficher tous les messages
    } else {
      const filtered = messages.filter((message) =>
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(filtered); // Définir les messages filtrés
    }
  }, [searchTerm, messages]);

  // Fonction de réponse à un message
  const handleReply = async () => {
    if (!replyContent.trim()) return;

    if (!session?.user?.id) {
      setError("Utilisateur non connecté.");
      return;
    }

    try {
      const response = await fetch("/api/chat/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          originalMessageId: selectedMessage.id,
          content: replyContent,
          images: selectedImages,
        }),
      });

      if (response.ok) {
        const repliedMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, repliedMessage]);
        setReplyContent("");
        setSelectedMessage(repliedMessage); // Mettre à jour le message sélectionné après la réponse
      } else {
        const data = await response.json();
        setError(data.message || "Erreur lors de l'envoi de la réponse.");
      }
    } catch (error) {
      setError("Erreur réseau : " + error.message);
    }
  };

  const toggleInfoDropdown = () => {
    setShowInfoDropdown(!showInfoDropdown);
  };

  const handleSeeAnnonce = () => {
    router.push(`/Annonces/id=${selectedMessage?.annonce?.id}`);
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-80 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-lg p-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent ml-2 outline-none w-full text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Ajout de la fonctionnalité de recherche
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-73px)]">
          {loading && <p className="p-4 text-gray-500">Chargement...</p>}
          {error && <p className="p-4 text-red-500">{error}</p>}

          {!loading && messages.length > 0 ? (
            filteredMessages.map((message) => {
              const isSent = message.senderId === session?.user?.id;
              const user = isSent ? message.receiver : message.sender;

              return (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                    selectedMessage?.id === message.id ? "bg-gray-100" : ""
                  }`}
                >
                  <Image
                    src={
                      user?.profileImages?.[0]?.path || "/default-avatar.png"
                    }
                    alt={`${user?.nom || "Utilisateur"} ${user?.prenom || ""}`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">
                        {isSent
                          ? "Vous"
                          : `${user?.nom || "Expéditeur"} ${
                              user?.prenom || ""
                            }`}
                      </span>
                      {/* <span className="text-sm text-gray-500">
                        {new Intl.DateTimeFormat("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(message.sentAt))}
                      </span> */}
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {message.content}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="p-4 text-gray-500">Aucun message trouvé.</p>
          )}
        </div>
      </div>

      {/* Zone de chat */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between relative">
                <div className="flex items-center">
                  <Image
                    src={
                      selectedMessage.sender?.profileImages?.[0]?.path ||
                      "/default-avatar.png"
                    }
                    alt={`${selectedMessage.sender?.nom || ""} ${
                      selectedMessage.sender?.prenom || ""
                    }`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <span className="ml-4 font-semibold text-gray-900">
                    {selectedMessage.sender.nom} {selectedMessage.sender.prenom}
                  </span>
                </div>
                <div className="relative" ref={dropdownRef}>
                  <button
                    className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${
                      showInfoDropdown ? "bg-gray-100" : ""
                    }`}
                    onClick={toggleInfoDropdown}
                  >
                    <Info className="w-5 h-5 text-gray-500" />
                  </button>
                  {showInfoDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200">
                      <button
                        onClick={handleSeeAnnonce}
                        className="block w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      ></button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 text-gray-700">
                {selectedMessage.content}
              </div>
            </div>

            {/* Réponse */}
            <div className="flex-1 p-4 border-t border-gray-200">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Répondre..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <button
                onClick={handleReply}
                className="mt-2 bg-blue-500 text-white rounded-md p-2"
              >
                <Send className="w-5 h-5 inline-block mr-2" />
                Répondre
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <p className="text-gray-500">
              Sélectionnez un message pour afficher le détail.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
