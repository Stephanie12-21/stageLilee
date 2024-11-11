// "use client";

// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null); // État pour gérer les erreurs

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (session?.user.id) {
//         const userId = session.user.id;
//         console.log("userId dans session :", userId); // Vérification de l'ID de l'utilisateur

//         try {
//           const response = await fetch(`/api/chat?userId=${userId}`);
//           const data = await response.json();
//           console.log("Données reçues :", data);

//           if (response.ok) {
//             // Vérifier la présence des messages
//             if (!data.messages || data.messages.length === 0) {
//               console.log("Aucun message trouvé.");
//             }

//             setMessages(data.messages); // Placer tous les messages dans l'état
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
//             {error && <p style={{ color: "red" }}>{error}</p>}{" "}
//             {/* Affichage de l'erreur */}
//             {messages.length > 0 ? (
//               <ul>
//                 {messages.map((message) => (
//                   <li key={message.id}>
//                     <p>
//                       <strong>Expéditeur :</strong> {message.senderId}
//                     </p>
//                     <p>
//                       <strong>Destinataire :</strong> {message.receiverId}
//                     </p>
//                     <p>
//                       <strong>Contenu :</strong> {message.content}
//                     </p>
//                     <p>
//                       <strong>Date :</strong> {message.sentAt}
//                     </p>
//                     {message.imageMessages &&
//                       message.imageMessages.length > 0 &&
//                       message.imageMessages[0]?.path && (
//                         <p>
//                           <strong>Image :</strong>{" "}
//                           <Image
//                             width={100}
//                             height={100}
//                             src={message.imageMessages[0].path}
//                             alt="Message image"
//                           />
//                         </p>
//                       )}
//                   </li>
//                 ))}
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
"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (session?.user.id) {
        const userId = session.user.id;
        console.log("userId dans session :", userId);

        try {
          const response = await fetch(`/api/chat?userId=${userId}`);
          const data = await response.json();
          console.log("Données reçues de l'API :", data); // Affichage des données

          if (response.ok) {
            if (!data.messages || data.messages.length === 0) {
              console.log("Aucun message trouvé.");
            }
            setMessages(data.messages); // Placer tous les messages dans l'état
          } else {
            setError(
              data.message || "Erreur lors de la récupération des messages."
            );
            console.error(
              "Erreur lors de la récupération des messages :",
              data.message || data.messages
            );
          }
        } catch (error) {
          setError("Erreur réseau : " + error.message);
          console.error("Erreur réseau :", error);
        }
      }
    };

    fetchMessages();
  }, [session?.user.id]);

  return (
    <div>
      <h1>Page</h1>
      {session ? (
        <>
          <p>User ID: {session.user.id}</p>
          <div>
            <h2>Tous les messages</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {messages.length > 0 ? (
              <ul>
                {messages.map((message) => {
                  console.log("Message reçu:", message);

                  // Vérification des conditions d'affichage des messages
                  const isSent = message.senderId === session.user.id;
                  const isReceived = message.receiverId === session.user.id;

                  console.log("isSent:", isSent, "isReceived:", isReceived);

                  // Ajout d'une condition pour afficher même si le message est envoyé ou reçu
                  return (
                    <li key={message.id}>
                      <p>
                        <strong>Expéditeur :</strong> {message.senderId}
                      </p>
                      <p>
                        <strong>Destinataire :</strong> {message.receiverId}
                      </p>
                      <p>
                        <strong>Contenu :</strong> {message.content}
                      </p>
                      <p>
                        <strong>Date :</strong> {message.sentAt}
                      </p>

                      {/* Afficher un message envoyé ou reçu */}
                      {isSent && (
                        <p>
                          <strong>Status :</strong> Message envoyé
                        </p>
                      )}
                      {isReceived && (
                        <p>
                          <strong>Status :</strong> Message reçu
                        </p>
                      )}

                      {/* Affichage de l'image si elle existe */}
                      {message.imageMessages?.[0]?.path && (
                        <p>
                          <strong>Image :</strong>{" "}
                          <Image
                            width={100}
                            height={100}
                            src={message.imageMessages[0].path}
                            alt="Message image"
                          />
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Aucun message trouvé.</p>
            )}
          </div>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Page;
