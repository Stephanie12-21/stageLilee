// "use client";
// import { db } from "@/firebaseconfig";
// import { push, ref, onValue } from "firebase/database";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [newMessage, setNewMessage] = useState("");
//   const [error, setError] = useState(null);
//   const [annonces, setAnnonces] = useState([]);
//   const [annonceId, setAnnonceId] = useState(null); // État pour stocker l'ID de l'annonce sélectionnée

//   // Récupérer toutes les annonces disponibles
//   const fetchAnnonces = async () => {
//     try {
//       const response = await fetch("/api/annonce/getAll");
//       const data = await response.json();

//       // Filtrer les annonces pour exclure celles qui ont un statut "DESACTIVEE"
//       const filteredData = data
//         .filter((annonce) => annonce.statut !== "DESACTIVEE")
//         .map((annonce) => {
//           console.log("Annonce:", annonce);
//           console.log(
//             "Utilisateur associé:",
//             `${annonce.user.nom} ${annonce.user.prenom}`
//           );

//           // Récupérer toutes les notes associées à cette annonce
//           const notes = annonce.commentaire
//             .map((c) => c.note)
//             .filter((note) => note !== null); // Exclure les notes nulles

//           console.log("Notes associées :", notes);

//           if (notes.length > 0) {
//             // Calculer la moyenne des notes
//             const total = notes.reduce((acc, note) => acc + note, 0);
//             const average = total / notes.length;
//             console.log("Moyenne des notes :", average.toFixed(2));

//             // Ajouter la moyenne à l'annonce sans la formater à l'avance
//             annonce.averageNote = average;
//           } else {
//             console.log("Aucune note trouvée pour cette annonce.");
//             annonce.averageNote = 0;
//           }

//           return annonce; // Retourner l'annonce avec la moyenne mise à jour
//         });

//       setAnnonces(filteredData); // Mettre à jour les annonces filtrées
//     } catch (error) {
//       console.error("Erreur lors de la récupération des utilisateurs :", error);
//     }
//   };

//   useEffect(() => {
//     fetchAnnonces();
//   }, []);

//   // Une fois qu'une annonce est sélectionnée, récupère ses messages
//   useEffect(() => {
//     if (!session || !annonceId) return;

//     const chatRef = ref(db, `chats/${annonceId}/messages`);

//     const unsubscribe = onValue(chatRef, (snapshot) => {
//       console.log("Données récupérées de Firebase:", annonceId);
//       const data = snapshot.val();
//       if (data) {
//         const messagesList = Object.entries(data).map(([key, value]) => ({
//           id: key,
//           senderId: value.sender, // Correspond à sender dans Firebase
//           receiverId: value.receiver, // Correspond à receiver dans Firebase
//           content: value.message, // Correspond à message dans Firebase
//           sentAt: new Date(value.timestamp).toLocaleString(), // Conversion de timestamp
//         }));
//         setMessages(messagesList);
//       }
//       setIsLoading(false);
//     });

//     return () => unsubscribe();
//   }, [session, annonceId]);

//   const handleSendMessage = async (content = newMessage, type = "text", url = null) => {
//     if (!session || !annonceId) return;

//     const chatRef = ref(db, `chats/${annonceId}/messages`);

//     const messageData = {
//       sender: parseInt(session.user.id), // Assurez-vous que 'sender' est un nombre
//       receiver: parseInt(userId), // Utilisez 'receiver' pour l'utilisateur destinataire
//       message: content, // 'message' au lieu de 'content'
//       type: type,
//       url: url,
//       timestamp: Date.now(),
//     };

//     try {
//       await push(chatRef, messageData);
//       setNewMessage(""); // Efface le message une fois envoyé
//     } catch (err) {
//       setError("Erreur lors de l'envoi du message");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Messages</h1>
//       {session ? (
//         <>
//           <p className="mb-4">User ID: {session.user.id}</p>

//           {/* Sélectionner l'annonce à afficher */}
//           <div>
//             <h2>Choisissez une annonce</h2>
//             {annonces.length > 0 ? (
//               <select
//                 onChange={(e) => setAnnonceId(e.target.value)}
//                 value={annonceId}
//                 className="p-2 border rounded-lg"
//               >
//                 <option value="">Sélectionner une annonce</option>
//                 {annonces.map((annonce) => (
//                   <option key={annonce.id} value={annonce.id}>
//                     {annonce.titre} - {annonce.user.nom} {annonce.user.prenom}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <p>Aucune annonce disponible.</p>
//             )}
//           </div>

//           {/* Affichage des messages */}
//           {annonceId && (
//             <div className="messages-container mb-6">
//               <h2 className="text-xl font-semibold mb-4">Tous les messages</h2>
//               {error && <p className="text-red-500 mb-4">{error}</p>}

//               {isLoading ? (
//                 <p>Chargement des messages...</p>
//               ) : messages.length > 0 ? (
//                 <div className="messages-list space-y-4">
//                   {messages.map((message) => {
//                     const isSent = message.senderId === parseInt(session.user.id);
//                     const isReceived = message.receiverId === parseInt(session.user.id);

//                     return (
//                       <div key={message.id} className="message-item p-4 border rounded-lg">
//                         <p>
//                           <strong>Expéditeur :</strong> {message.senderId}
//                         </p>
//                         <p>
//                           <strong>Destinataire :</strong> {message.receiverId}
//                         </p>
//                         <p>
//                           <strong>Contenu :</strong> {message.content}
//                         </p>
//                         <p>
//                           <strong>Date :</strong> {message.sentAt}
//                         </p>

//                         {isSent && <p><strong>Status :</strong> Message envoyé</p>}
//                         {isReceived && <p><strong>Status :</strong> Message reçu</p>}
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <p>Aucun message trouvé.</p>
//               )}
//             </div>
//           )}
//         </>
//       ) : (
//         <p>Veuillez vous connecter pour accéder aux messages.</p>
//       )}
//     </div>
//   );
// };

// export default Page;
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ChatRoom from "../../_components/ChatRoom";
import User from "../../_components/User";

const MessageProPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedChatroom, setSelectedChatroom] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session.user);
    }
  }, [status, session]);

  if (status === "loading" || !user) {
    return <div>Chargement...</div>;
  }

  // return (
  //   <div className="flex h-screen">
  //     <div className="flex-shrink-0 w-4/12 overflow-y-auto p-4">
  //       <User userData={user} setSelectedChatroom={setSelectedChatroom} />;{" "}
  //     </div>

  //     <div className="flex-grow w-3/12">
  //       <ChatRoom user={user} setSelectedChatroom={selectedChatroom} />
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex h-screen">
      <div className="flex-shrink-0 w-4/12 overflow-y-auto p-4">
        <User userData={user} setSelectedChatroom={setSelectedChatroom} />
      </div>

      <div className="flex-grow w-3/12">
        {/* Vérification de selectedChatroom */}
        {selectedChatroom ? (
          <ChatRoom user={user} selectedChatroom={selectedChatroom} />
        ) : (
          <div>Sélectionnez un chatroom pour afficher les détails.</div>
        )}
      </div>
    </div>
  );
};

export default MessageProPage;
