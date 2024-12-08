"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MessageCircle, Loader2, Mails } from "lucide-react";
import Component from "../../_components/Chatroom";
import { ref, get, set } from "firebase/database";

import { db } from "@/firebaseconfig";
import { MessageCircleMore, UserCircle } from "lucide-react";
import Image from "next/image";

function UserCard({ name, avatarUrl, latestMessageText, time, type }) {
  return (
    <div className="flex items-center p-4 border-b relative hover:cursor-pointer">
      <div className="flex-shrink-0 mr-4 relative">
        <div className="w-12 h-12 rounded-full overflow-hidden border-4">
          {" "}
          <Image
            src={avatarUrl}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {type === "chat" && (
        <>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{name}</h2>
              <span className="text-xs text-gray-700">{time}</span>
            </div>
            <p className="text-sm text-gray-700 whitespace-normal break-words">
              {latestMessageText}
            </p>
          </div>
        </>
      )}

      {type === "user" && (
        <>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{name}</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const User = ({ userData, setSelectedChatroom }) => {
  const { status } = useSession();
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();

  const handleTabClick = (tab) => setActiveTab(tab);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchUsers = async () => {
        try {
          const response = await fetch("/api/user/getAll");
          if (response.ok) {
            const data = await response.json();
            setUsers(data.users);
          } else {
            console.error("Erreur lors de la récupération des utilisateurs.");
          }
        } catch (error) {
          console.error("Erreur réseau :", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [status]);

  const createChat = async (user) => {
    try {
      const sender = userData.id;
      const receiver = user.id;
      const userIds = [sender, receiver].sort();
      const chatroomId = userIds.join("_");

      const chatroomRef = ref(db, `chatrooms/${chatroomId}`);
      const snapshot = await get(chatroomRef);

      if (snapshot.exists()) {
        alert("La chatroom existe déjà !");
        return;
      }

      const chatroomData = {
        sender,
        receiver,
        timestamp: Date.now(),
        lastMessage: null,
      };

      await set(chatroomRef, chatroomData);
      await set(
        ref(db, `usersChatrooms/${sender}/${chatroomId}`),
        chatroomData
      );
      await set(
        ref(db, `usersChatrooms/${receiver}/${chatroomId}`),
        chatroomData
      );

      setActiveTab("chatroom");
    } catch (error) {
      console.error("Erreur lors de la création de la chatroom :", error);
    }
  };

  useEffect(() => {
    const fetchChatrooms = async () => {
      if (!userData) return;

      try {
        const userChatroomsRef = ref(db, `usersChatrooms/${userData.id}`);
        const snapshot = await get(userChatroomsRef);

        if (snapshot.exists()) {
          const chatroomData = snapshot.val();
          const chatroomIds = Object.keys(chatroomData);

          const chatroomsPromises = chatroomIds.map(async (chatroomId) => {
            const chatroomRef = ref(db, `chatrooms/${chatroomId}`);
            const chatroomSnapshot = await get(chatroomRef);

            if (chatroomSnapshot.exists()) {
              const chatroomDetails = chatroomSnapshot.val();
              return { id: chatroomId, ...chatroomDetails };
            }
            return null;
          });

          const chatroomsArray = await Promise.all(chatroomsPromises);
          const validChatrooms = chatroomsArray.filter((chatroom) => chatroom);

          setChatrooms(validChatrooms);

          // Récupérer les détails des utilisateurs
          const userIds = [
            ...new Set(
              validChatrooms.flatMap((chatroom) => [
                chatroom.sender,
                chatroom.receiver,
              ])
            ),
          ];

          const userDetailsPromises = userIds.map((id) => fetchUserDetails(id));
          const userDetailsArray = await Promise.all(userDetailsPromises);

          const userDetailsMap = userDetailsArray.reduce((acc, user) => {
            if (user) acc[user.id] = user;
            return acc;
          }, {});

          setUserDetails(userDetailsMap);
        } else {
          setChatrooms([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des chatrooms :", error);
      }
    };

    fetchChatrooms();
  }, [userData]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      if (!response.ok)
        throw new Error(
          "Erreur lors de la récupération des données utilisateur"
        );
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'utilisateur ${userId}:`,
        error
      );
      return null;
    }
  };

  const openChat = (chatroom) => {
    const isSender = chatroom.sender === userData.id;
    const otherUserId = isSender ? chatroom.receiver : chatroom.sender;
    const otherUser = userDetails[otherUserId];

    if (!otherUser) {
      console.error("Données manquantes pour l'autre participant !");
      return;
    }

    const data = {
      id: chatroom.id,
      myData: userData,
      otherData: otherUser,
    };

    setSelectedChatroom(data);
  };

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="shadow-lg h-screen overflow-auto mt-4 mb-20 bg-white rounded-lg">
      <div className="flex justify-between p-4 border-b">
        <button
          onClick={() => handleTabClick("users")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "users" ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          <UserCircle />
        </button>
        <button
          onClick={() => handleTabClick("chatroom")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "chatroom" ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          <MessageCircleMore />
        </button>
      </div>

      {activeTab === "chatroom" && (
        <div>
          {chatrooms.map((chatroom) => {
            const isSender = chatroom.sender === userData.id;
            const otherUserId = isSender ? chatroom.receiver : chatroom.sender;
            const otherUser = userDetails[otherUserId];

            return (
              <div key={chatroom.id} onClick={() => openChat(chatroom)}>
                <UserCard
                  name={`${otherUser?.prenom} ${
                    otherUser?.nom || "Chargement..."
                  }`}
                  avatarUrl={
                    otherUser?.profileImages?.[0]?.path || "/default-avatar.jpg"
                  }
                  latestMessageText={chatroom.lastMessage || "Aucun message"}
                  time={new Date(chatroom.timestamp).toLocaleString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                  type="chat"
                />
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "users" && (
        <div>
          {users
            .filter((user) => String(user.id) !== String(userData?.id))
            .map((user) => (
              <div key={user.id} onClick={() => createChat(user)}>
                <UserCard
                  name={`${user.prenom} ${user.nom}`}
                  avatarUrl={
                    user.profileImages?.[0]?.path || "/default-avatar.jpg"
                  }
                  time="2h ago"
                  type="user"
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

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
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-gray-600 text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-96 bg-white border-r shadow-sm">
        <div className="flex items-center p-4 border-b">
          <Mails className="w-6 h-6 mr-3 text-primary" />
          <h2 className="text-xl font-semibold text-gray-800">
            Centre de discussions
          </h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          <User
            userData={user}
            setSelectedChatroom={setSelectedChatroom}
            className="p-2"
          />
        </div>
      </div>

      <div className="flex-grow bg-gray-100">
        {selectedChatroom ? (
          <Component user={user} selectedChatroom={selectedChatroom} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageCircle className="w-16 h-16 mb-4 text-blue-300" />
            <p className="text-lg">
              Sélectionnez un chatroom pour commencer à discuter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageProPage;
