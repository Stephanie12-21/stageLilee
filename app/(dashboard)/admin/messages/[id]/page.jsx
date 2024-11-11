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
          console.log("Données reçues de l'API :", data);
          if (response.ok) {
            if (!data.messages || data.messages.length === 0) {
              console.log("Aucun message trouvé.");
            }
            setMessages(data.messages);
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
                  console.log("Message envoyé par l'API:", message);

                  const isSent =
                    message.senderId === parseInt(session.user.id, 10);
                  const isReceived =
                    message.receiverId === parseInt(session.user.id, 10);

                  console.log("isSent:", isSent, "isReceived:", isReceived);

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

                      {message.imageMessages?.[0]?.path && (
                        <p>
                          <strong>Image :</strong>
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
