"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ref, get, set } from "firebase/database";
import UserCard from "./UserCard";
import { db } from "@/firebaseconfig";
import { MessageCircleMore, UserCircle } from "lucide-react";

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

export default User;
