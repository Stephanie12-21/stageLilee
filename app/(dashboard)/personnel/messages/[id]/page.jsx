// "use client";
// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import User from "../../_components/User";
// import Component from "../../_components/Chatroom";

// const MessageProPage = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [selectedChatroom, setSelectedChatroom] = useState(null);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//   }, [status, router]);

//   useEffect(() => {
//     if (status === "authenticated") {
//       setUser(session.user);
//     }
//   }, [status, session]);

//   if (status === "loading" || !user) {
//     return <div>Chargement...</div>;
//   }

//   return (
//     <div className="flex h-screen">
//       <div className="flex-shrink-0 w-4/12 overflow-y-auto p-4">
//         <User userData={user} setSelectedChatroom={setSelectedChatroom} />
//       </div>

//       <div className="flex-grow w-3/12">
//         {selectedChatroom ? (
//           <Component user={user} selectedChatroom={selectedChatroom} />
//         ) : (
//           <div>Sélectionnez un chatroom pour afficher les détails.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageProPage;

"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MessageCircle, Users, Loader2 } from "lucide-react";

import User from "../../_components/User";
import Component from "../../_components/Chatroom";

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
      {/* Sidebar User Section */}
      <div className="w-80 bg-white border-r shadow-sm">
        <div className="flex items-center p-4 border-b">
          <Users className="w-6 h-6 mr-3 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Mes Contacts</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          <User
            userData={user}
            setSelectedChatroom={setSelectedChatroom}
            className="p-2"
          />
        </div>
      </div>

      {/* Chat Section */}
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
