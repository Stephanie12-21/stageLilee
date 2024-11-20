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
