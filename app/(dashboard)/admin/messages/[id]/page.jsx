// "use client";

// import { useSession } from "next-auth/react";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const { data: session } = useSession();
//   const [sentMessages, setSentMessages] = useState([]);
//   const [receivedMessages, setReceivedMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (session?.user.id) {
//         try {
//           const response = await fetch(`/api/chat?userId=${session.user.id}`);
//           const data = await response.json();
//           console.log("Données reçues :", data); // Vérifiez la structure des données reçues

//           if (response.ok) {
//             // Afficher tous les messages pour vérifier leur structure
//             console.log("Messages reçus :", data.messages); // Vérifier la structure de chaque message

//             // Séparer les messages envoyés et reçus
//             const sent = data.messages.filter(
//               (messages) => messages.senderId === session.user.id
//             );
//             const received = data.messages.filter(
//               (messages) => messages.receiverId === session.user.id
//             );

//             console.log("Messages envoyés :", sent);
//             console.log("Messages reçus :", received);

//             setSentMessages(sent);
//             setReceivedMessages(received);
//           } else {
//             console.error(
//               "Erreur lors de la récupération des messages :",
//               data.messages
//             );
//           }
//         } catch (error) {
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
//             <h2>Messages envoyés</h2>
//             {sentMessages.length > 0 ? (
//               <ul>
//                 {sentMessages.map((messages) => (
//                   <li key={messages.id}>
//                     {messages.content} {messages.imageMessages?.path[0] && "📷"}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Aucun message envoyé trouvé.</p>
//             )}
//           </div>
//           <div>
//             <h2>Messages reçus</h2>
//             {receivedMessages.length > 0 ? (
//               <ul>
//                 {receivedMessages.map((messages) => (
//                   <li key={messages.id}>
//                     {messages.content} {messages.imageMessages?.path[0] && "📷"}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Aucun message reçu trouvé.</p>
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
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (session?.user.id) {
        const userId = session.user.id;
        console.log("userId dans session :", userId);

        try {
          const response = await fetch(`/api/chat?userId=${userId}`);
          const data = await response.json();
          console.log("Données reçues :", data);

          if (response.ok) {
            // Vérifier la présence des messages
            if (!data.messages || data.messages.length === 0) {
              console.log("Aucun message trouvé.");
            }

            const sent = data.messages.filter((message) => {
              console.log(
                `Vérification message envoyé : senderId=${message.senderId}, userId=${userId}`
              );
              return message.senderId === userId;
            });

            const received = data.messages.filter((message) => {
              console.log(
                `Vérification message reçu : receiverId=${message.receiverId}, userId=${userId}`
              );
              return message.receiverId === userId;
            });

            console.log("Messages envoyés :", sent);
            console.log("Messages reçus :", received);

            setSentMessages(sent);
            setReceivedMessages(received);
          } else {
            console.error(
              "Erreur lors de la récupération des messages :",
              data.message || data.messages
            );
          }
        } catch (error) {
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
            <h2>Messages envoyés</h2>
            {sentMessages.length > 0 ? (
              <ul>
                {sentMessages.map((message) => (
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
                      <strong>Date :</strong> {message.date}
                    </p>{" "}
                    {/* Affichage de la date du message */}
                    {message.imageMessages?.path[0] && (
                      <p>
                        <strong>Image :</strong>{" "}
                        <Image
                          width={50}
                          height={50}
                          src={message.imageMessages.path[0]}
                          alt="Message image"
                        />
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun message envoyé trouvé.</p>
            )}
          </div>
          <div>
            <h2>Messages reçus</h2>
            {receivedMessages.length > 0 ? (
              <ul>
                {receivedMessages.map((message) => (
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
                      <strong>Date :</strong> {message.date}
                    </p>{" "}
                    {/* Affichage de la date du message */}
                    {message.imageMessages?.path[0] && (
                      <p>
                        <strong>Image :</strong>{" "}
                        <Image
                          height={50}
                          width={50}
                          src={message.imageMessages.path[0]}
                          alt="Message image"
                        />
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun message reçu trouvé.</p>
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
