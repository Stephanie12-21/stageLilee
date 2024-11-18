"use client";
import { db } from "@/firebaseconfig";
import { push, ref, onValue } from "firebase/database";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = ({ userId, annonceId }) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) return;

    const chatRef = ref(db, `chats/${annonceId}/messages`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesList = Object.entries(data).map(([key, value]) => ({
          id: key,
          senderId: value.sender, // Correspond à sender dans Firebase
          receiverId: value.receiver, // Correspond à receiver dans Firebase
          content: value.message, // Correspond à message dans Firebase
          sentAt: new Date(value.timestamp).toLocaleString(), // Conversion de timestamp
        }));
        setMessages(messagesList);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [session, annonceId]);

  const handleSendMessage = async (
    content = newMessage,
    type = "text",
    url = null
  ) => {
    if (!session) return;

    const chatRef = ref(db, `chats/${annonceId}/messages`);

    const messageData = {
      sender: parseInt(session.user.id), // Assurez-vous que 'sender' est un nombre
      receiver: parseInt(userId), // Utilisez 'receiver' pour l'utilisateur destinataire
      message: content, // 'message' au lieu de 'content'
      type: type,
      url: url,
      timestamp: Date.now(),
    };

    try {
      await push(chatRef, messageData);
      setNewMessage("");
    } catch (err) {
      setError("Erreur lors de l'envoi du message");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      {session ? (
        <>
          <p className="mb-4">User ID: {session.user.id}</p>
          <div>
            <h2 className="text-xl font-semibold mb-4">Tous les messages</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {isLoading ? (
              <p>Chargement des messages...</p>
            ) : messages.length > 0 ? (
              <ul className="space-y-4">
                {messages.map((message) => {
                  const isSent = message.senderId === parseInt(session.user.id);
                  const isReceived =
                    message.receiverId === parseInt(session.user.id);

                  return (
                    <li key={message.id} className="border p-4 rounded-lg">
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

                      {/* Affichage de l'image si elle est présente */}
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
        <p>Veuillez vous connecter pour accéder aux messages.</p>
      )}
    </div>
  );
};

export default Page;
