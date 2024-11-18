// "use client";

// import React, { useState, useEffect } from "react";
// import UserCard from "./UserCard";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { query, where, getDocs } from "firebase/firestore";
// import { collection, serverTimestamp, addDoc } from "firebase/firestore";
// import { db } from "@/firebaseconfig";
// import { push, ref, set } from "firebase/database";

// const User = ({ userData }) => {
//   const { data: session, status } = useSession();
//   const [activeTab, setActiveTab] = useState("users");
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const router = useRouter();

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   // Redirection si non connecté
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//   }, [status, router]);

//   // Récupérer tous les utilisateurs depuis la base de données
//   useEffect(() => {
//     if (status === "authenticated") {
//       const fetchUsers = async () => {
//         try {
//           const response = await fetch("/api/user/getAll");
//           if (response.ok) {
//             const data = await response.json();
//             setUsers(data.users); // Assurez-vous que 'data.users' contient bien un tableau d'utilisateurs
//           } else {
//             console.error("Erreur lors de la récupération des utilisateurs");
//           }
//         } catch (error) {
//           console.error("Erreur réseau :", error);
//         } finally {
//           setLoading(false); // Passer à false une fois que les données sont récupérées
//         }
//       };

//       fetchUsers();
//     }
//   }, [status]);

//   // Fonction pour créer un chatroom avec seulement les IDs des utilisateurs
//   const createChat = async (user) => {
//     try {
//       // Vérification si le chatroom existe déjà entre l'utilisateur courant et l'utilisateur sélectionné
//       const existingChatRoomQuery = query(
//         collection(db, "chatrooms"),
//         where("users", "array-contains", user.id),
//         where("users", "array-contains", userData.id)
//       );

//       const existingChatRoomSnapshot = await getDocs(existingChatRoomQuery);
//       if (!existingChatRoomSnapshot.empty) {
//         alert("Chatroom already exists!");
//         return;
//       }

//       const chatroomRef = ref(db, "chatrooms");
//       const chatroomData = push(chatroomRef);
//       await set(chatroomData, {
//         sender: userData.id,
//         receiver: user.id,
//         timestamp: Date.now(),
//       });
//       console.log("Chatroom created with ID:", chatroomRef.id);
//       setActiveTab("chatroom"); // Passer à l'onglet Chatrooms après création
//     } catch (error) {
//       console.log("Error creating chatroom:", error);
//     }
//   };

//   return (
//     <div className="shadow-lg h-screen overflow-auto mt-4 mb-20 bg-white rounded-lg">
//       {/* Tabs */}
//       <div className="flex justify-between p-4 border-b">
//         <button
//           onClick={() => handleTabClick("users")}
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           Users
//         </button>
//         <button
//           onClick={() => handleTabClick("chatroom")}
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === "chatroom" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           ChatRoom
//         </button>
//       </div>

//       {/* Chat Room Tab */}
//       <div>
//         {activeTab === "chatroom" && (
//           <>
//             <h1 className="px-4 text-base font-semibold">ChatRooms</h1>
//             <UserCard
//               name="Katty"
//               avatarUrl="https://res.cloudinary.com/dtryutlkz/image/upload/v1731399830/ixqce5t3fkrs7e3qstg2.jpg"
//               latestMessageText="Logfnjgshfdghfdgfjhgdfghgjfdhgjfdhgqjfa jicheug rh"
//               time="2h ago"
//               type="chat"
//             />
//           </>
//         )}
//       </div>

//       {/* Users Tab */}
//       <div>
//         {activeTab === "users" && (
//           <>
//             <h1 className="px-4 text-base font-semibold">Users</h1>
//             {loading ? (
//               <p>Chargement ...</p>
//             ) : (
//               users
//                 .filter((user) => String(user.id) !== String(userData?.id)) // Assurez-vous que les IDs sont en string
//                 .map((user) => (
//                   <div key={user.id} onClick={() => createChat(user)}>
//                     <UserCard
//                       name={`${user.prenom} ${user.nom}`}
//                       avatarUrl={
//                         user.profileImages?.[0]?.path || "/default-avatar.jpg"
//                       }
//                       time="2h ago"
//                       type="user"
//                     />
//                   </div>
//                 ))
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;
// "use client";
// import React, { useState, useEffect } from "react";
// import UserCard from "./UserCard";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { ref, get, set } from "firebase/database"; // Pas besoin de query ici
// import { db } from "@/firebaseconfig"; // Utilisation de la configuration db pour Realtime Database

// const User = ({ userData }) => {
//   const { data: session, status } = useSession();
//   const [activeTab, setActiveTab] = useState("users");
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const router = useRouter();

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//   }, [status, router]);

//   useEffect(() => {
//     if (status === "authenticated") {
//       const fetchUsers = async () => {
//         try {
//           const response = await fetch("/api/user/getAll");
//           if (response.ok) {
//             const data = await response.json();
//             setUsers(data.users);
//           } else {
//             console.error("Erreur lors de la récupération des utilisateurs");
//           }
//         } catch (error) {
//           console.error("Erreur réseau :", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUsers();
//     }
//   }, [status]);

//   const createChat = async (user) => {
//     try {
//       // Créer un identifiant unique pour la chatroom basé sur les IDs des utilisateurs
//       const sender = userData.id;
//       const receiver = user.id;

//       // Vérifie si la chatroom existe déjà
//       const chatroomRef = ref(db, "chatrooms/");
//       const snapshot = await get(chatroomRef);
//       if (snapshot.exists()) {
//         alert("Chatroom already exists!");
//         return;
//       }

//       // Créer la chatroom si elle n'existe pas
//       const chatroomData = {
//         sender: sender,
//         receiver: receiver,
//         timestamp: Date.now(), // Utilisation d'une date ISO pour le timestamp
//       };

//       await set(chatroomRef, chatroomData);
//       console.log("Chatroom created!");

//       setActiveTab("chatroom"); // Passer à l'onglet Chatrooms après création
//     } catch (error) {
//       console.error("Error creating chatroom:", error);
//     }
//   };

//   return (
//     <div className="shadow-lg h-screen overflow-auto mt-4 mb-20 bg-white rounded-lg">
//       <div className="flex justify-between p-4 border-b">
//         <button
//           onClick={() => handleTabClick("users")}
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           Users
//         </button>
//         <button
//           onClick={() => handleTabClick("chatroom")}
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === "chatroom" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           ChatRoom
//         </button>
//       </div>

//       <div>
//         {activeTab === "chatroom" && (
//           <>
//             <h1 className="px-4 text-base font-semibold">ChatRooms</h1>
//             <UserCard
//               name="Katty"
//               avatarUrl="https://res.cloudinary.com/dtryutlkz/image/upload/v1731399830/ixqce5t3fkrs7e3qstg2.jpg"
//               latestMessageText="Logfnjgshfdghfdgfjhgdfghgjfdhgjfdhgqjfa jicheug rh"
//               time="2h ago"
//               type="chat"
//             />
//           </>
//         )}
//       </div>

//       <div>
//         {activeTab === "users" && (
//           <>
//             <h1 className="px-4 text-base font-semibold">Users</h1>
//             {loading ? (
//               <p>Chargement ...</p>
//             ) : (
//               users
//                 .filter((user) => String(user.id) !== String(userData?.id))
//                 .map((user) => (
//                   <div key={user.id} onClick={() => createChat(user)}>
//                     <UserCard
//                       name={`${user.prenom} ${user.nom}`}
//                       avatarUrl={
//                         user.profileImages?.[0]?.path || "/default-avatar.jpg"
//                       }
//                       time="2h ago"
//                       type="user"
//                     />
//                   </div>
//                 ))
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;

// "use client";

// import React, { useState, useEffect } from "react";
// import UserCard from "./UserCard";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { ref, get, set } from "firebase/database"; // Utilisation de Realtime Database
// import { db } from "@/firebaseconfig"; // Assurez-vous que la config de DB est correcte

// const User = ({ userData }) => {
//   const { data: session, status } = useSession();
//   const [activeTab, setActiveTab] = useState("users");
//   const [loading, setLoading] = useState(true);
//   const [loading2, setLoading2] = useState(true);
//   const [users, setUsers] = useState([]);
//   const router = useRouter();
//   const [chatrooms, setChatrooms] = useState([]);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//   }, [status, router]);

//   useEffect(() => {
//     if (status === "authenticated") {
//       const fetchUsers = async () => {
//         try {
//           const response = await fetch("/api/user/getAll");
//           if (response.ok) {
//             const data = await response.json();
//             setUsers(data.users);
//           } else {
//             console.error("Erreur lors de la récupération des utilisateurs");
//           }
//         } catch (error) {
//           console.error("Erreur réseau :", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUsers();
//     }
//   }, [status]);

//   const createChat = async (user) => {
//     try {
//       const sender = userData.id;
//       const receiver = user.id;

//       // Crée un identifiant unique pour la chatroom en triant les IDs
//       const userIds = [sender, receiver];
//       userIds.sort(); // Trie les IDs pour garantir que l'ID de chatroom soit le même
//       const chatroomId = userIds.join("_"); // Création de l'ID de la chatroom

//       // Vérifie si la chatroom existe déjà
//       const chatroomRef = ref(db, `chatrooms/${chatroomId}`);
//       const snapshot = await get(chatroomRef);
//       if (snapshot.exists()) {
//         alert("Chatroom already exists!");
//         return;
//       }

//       // Créer la chatroom si elle n'existe pas
//       const chatroomData = {
//         sender: sender,
//         receiver: receiver,
//         timestamp: Date.now(),
//         latestMessage: null,
//       };

//       await set(chatroomRef, chatroomData);
//       console.log("Chatroom created!");

//       setActiveTab("chatroom"); // Passer à l'onglet Chatrooms après création
//     } catch (error) {
//       console.error("Error creating chatroom:", error);
//     }
//   };

//   //get user chatrooms
//   useEffect(() => {
//     const fetchChatrooms = async () => {
//       if (!userData) return;

//       setLoading2(true);

//       try {
//         const chatroomsRef = ref(db, "chatrooms");
//         const snapshot = await get(chatroomsRef);

//         if (snapshot.exists()) {
//           const chatroomData = snapshot.val();

//           // Filtrer les chatrooms où l'utilisateur est impliqué
//           const userChatrooms = Object.entries(chatroomData)
//             .filter(
//               ([key, chatroom]) =>
//                 chatroom.sender === userData.id ||
//                 chatroom.receiver === userData.id
//             )
//             .map(([key, chatroom]) => ({
//               id: key,
//               ...chatroom,
//             }));

//           console.log("Chatrooms récupérées :", userChatrooms);
//           userChatrooms.forEach((chatroom) => {
//             console.log(
//               `Sender: ${chatroom.sender}, Receiver: ${chatroom.receiver}`
//             );
//           });
//         } else {
//           console.log("Aucune chatroom trouvée.");
//           setChatrooms([]);
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération des chatrooms :", error);
//       } finally {
//         setLoading2(false);
//       }
//     };

//     fetchChatrooms();
//   }, [userData]);

//   if (loading) {
//     return <p>Chargement des chatrooms...</p>;
//   }

//   if (chatrooms.length === 0) {
//     return <p>Aucune chatroom trouvée.</p>;
//   }

//   return (
//     <div className="shadow-lg h-screen overflow-auto mt-4 mb-20 bg-white rounded-lg">
//       <div className="flex justify-between p-4 border-b">
//         <button
//           onClick={() => handleTabClick("users")}
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           Users
//         </button>
//         <button
//           onClick={() => handleTabClick("chatroom")}
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === "chatroom" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           ChatRoom
//         </button>
//       </div>

//       <div>
//         {activeTab === "chatroom" && (
//           <>
//             <h1 className="px-4 text-base font-semibold">ChatRooms</h1>
//             {chatrooms.map((chatroom) => (
//               <div key={chatroom.id} onClick={() => createChat(chatroom)}>
//                 <UserCard
//                   name={chatroom.chatroomData.receiver.nom}
//                   avatarUrl={
//                     chatroom.chatroomData.receiver?.profileImages[0]?.path
//                   }
//                   latestMessageText={
//                     chatroom.chatroomData.receiver.latestMessage
//                   }
//                   time="2h ago"
//                   type="chat"
//                 />
//               </div>
//             ))}
//           </>
//         )}
//       </div>

//       <div>
//         {activeTab === "users" && (
//           <>
//             <h1 className="px-4 text-base font-semibold">Users</h1>
//             {loading ? (
//               <p>Chargement ...</p>
//             ) : (
//               users
//                 .filter((user) => String(user.id) !== String(userData?.id))
//                 .map((user) => (
//                   <div key={user.id} onClick={() => createChat(user)}>
//                     <UserCard
//                       name={`${user.prenom} ${user.nom}`}
//                       avatarUrl={
//                         user.profileImages?.[0]?.path || "/default-avatar.jpg"
//                       }
//                       time="2h ago"
//                       type="user"
//                     />
//                   </div>
//                 ))
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;

// "use client";

// import React, { useState, useEffect } from "react";
// import UserCard from "./UserCard";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { ref, get, set } from "firebase/database"; // Firebase Realtime Database
// import { db } from "@/firebaseconfig"; // Assurez-vous que la configuration Firebase est correcte

// const User = ({ userData, setSelectedChatroom, selectedChatroom }) => {
//   const { data: session, status } = useSession();
//   const [activeTab, setActiveTab] = useState("users");
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [chatrooms, setChatrooms] = useState([]);
//   const [userDetails, setUserDetails] = useState({});
//   const router = useRouter();

//   const handleTabClick = (tab) => setActiveTab(tab);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//   }, [status, router]);

//   // Fetch all users
//   useEffect(() => {
//     if (status === "authenticated") {
//       const fetchUsers = async () => {
//         try {
//           const response = await fetch("/api/user/getAll");
//           if (response.ok) {
//             const data = await response.json();
//             setUsers(data.users);
//           } else {
//             console.error("Erreur lors de la récupération des utilisateurs.");
//           }
//         } catch (error) {
//           console.error("Erreur réseau :", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUsers();
//     }
//   }, [status]);

//   const createChat = async (user) => {
//     try {
//       const sender = userData.id;
//       const receiver = user.id;

//       // Create a unique ID for the chatroom
//       const userIds = [sender, receiver].sort(); // Sort IDs to maintain uniqueness
//       const chatroomId = userIds.join("_");

//       // Check if the chatroom already exists
//       const chatroomRef = ref(db, `chatrooms/${chatroomId}`);
//       const snapshot = await get(chatroomRef);
//       if (snapshot.exists()) {
//         alert("Chatroom already exists!");
//         return;
//       }

//       // Create the chatroom if it doesn't exist
//       const chatroomData = {
//         sender,
//         receiver,
//         timestamp: Date.now(),
//         latestMessage: null,
//       };

//       await set(chatroomRef, chatroomData);
//       console.log("Chatroom created!");

//       setActiveTab("chatroom"); // Switch to Chatrooms tab after creation
//     } catch (error) {
//       console.error("Error creating chatroom:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchChatrooms = async () => {
//       if (!userData) return;

//       setLoading(true);

//       try {
//         const chatroomsRef = ref(db, "chatrooms");
//         const snapshot = await get(chatroomsRef);

//         if (snapshot.exists()) {
//           const chatroomData = snapshot.val();

//           console.log("Données des chatrooms reçues :", chatroomData);

//           const userChatrooms = Object.entries(chatroomData)
//             .filter(
//               ([, chatroom]) =>
//                 chatroom.sender === userData.id ||
//                 chatroom.receiver === userData.id
//             )
//             .map(([key, chatroom]) => ({
//               id: key,
//               ...chatroom,
//             }));

//           console.log("Chatrooms filtrées pour l'utilisateur :", userChatrooms);

//           setChatrooms(userChatrooms);

//           // Récupérer les informations des senders et receivers
//           const userIds = [
//             ...new Set(
//               userChatrooms.flatMap((chatroom) => [
//                 chatroom.sender,
//                 chatroom.receiver,
//               ])
//             ),
//           ];

//           console.log("IDs des utilisateurs (senders/receivers) :", userIds);

//           const userDetailsPromises = userIds.map((id) => fetchUserDetails(id));
//           const userDetailsArray = await Promise.all(userDetailsPromises);

//           const userDetailsMap = userDetailsArray.reduce((acc, user) => {
//             if (user) acc[user.id] = user;
//             return acc;
//           }, {});

//           console.log(
//             "Détails des utilisateurs (senders/receivers) :",
//             userDetailsMap
//           );
//           setUserDetails(userDetailsMap);
//         } else {
//           console.log("Aucune chatroom trouvée.");
//           setChatrooms([]);
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération des chatrooms :", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatrooms();
//   }, [userData]);

//   const fetchUserDetails = async (userId) => {
//     try {
//       console.log(
//         `Récupération des détails pour l'utilisateur avec l'ID : ${userId}`
//       );
//       const response = await fetch(`/api/user/${userId}`);
//       if (!response.ok)
//         throw new Error(
//           "Erreur lors de la récupération des données utilisateur"
//         );
//       const data = await response.json();
//       console.log(`Détails de l'utilisateur ${userId} reçus :`, data.user);
//       return data.user;
//     } catch (error) {
//       console.error(
//         `Erreur lors de la récupération de l'utilisateur ${userId} :`,
//         error
//       );
//       return null;
//     }
//   };

//   // const openChat = (chatroom) => {
//   //   const receiverData = userDetails[chatroom.receiver];
//   //   const data = {
//   //     id: chatroom.id,
//   //     myData: userData,
//   //     otherData: receiverData,
//   //   };
//   //   setSelectedChatroom(data);
//   // };
//   const openChat = (chatroom) => {
//     // Vérifiez que les données existent dans userDetails
//     const receiverData = userDetails[chatroom.receiver];

//     // Si receiverData est undefined, loggez-le pour voir d'où vient le problème
//     console.log("Receiver data:", receiverData);

//     // Créez l'objet de données à transmettre
//     const data = {
//       id: chatroom.id,
//       myData: userData, // Vos données
//       otherData: receiverData, // Les données du destinataire (receiver)
//     };

//     // Loggez l'objet data pour vérifier sa structure
//     console.log("openChat data:", data);

//     // Passez les données à setSelectedChatroom
//     setSelectedChatroom(data);
//     console.log("données de setSelectedChatroom:", selectedChatroom);
//   };

//   if (loading) {
//     return <p>Chargement des données...</p>;
//   }

//   return (
//     <div className="shadow-lg h-screen overflow-auto mt-4 mb-20 bg-white rounded-lg">
//       <div className="flex justify-between p-4 border-b">
//         <button
//           onClick={() => handleTabClick("users")}
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           Users
//         </button>
//         <button
//           onClick={() => handleTabClick("chatroom")}
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === "chatroom" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           ChatRoom
//         </button>
//       </div>

//       <div>
//         {activeTab === "chatroom" && (
//           <>
//             <h1 className="px-4 text-base font-semibold">ChatRooms</h1>
//             {chatrooms.map((chatroom) => (
//               <div
//                 key={chatroom.id}
//                 onClick={() => {
//                   openChat(chatroom);
//                 }}
//               >
//                 <UserCard
//                   name={userDetails[chatroom.receiver]?.nom || "Chargement..."}
//                   avatarUrl={
//                     userDetails[chatroom.receiver]?.profileImages?.[0]?.path ||
//                     "/default-avatar.jpg"
//                   }
//                   latestMessageText={chatroom.latestMessage || "Aucun message"}
//                   time="2h ago"
//                   type="chat"
//                 />
//               </div>
//             ))}
//           </>
//         )}
//       </div>

//       <div>
//         {activeTab === "users" && (
//           <>
//             <h1 className="px-4 text-base font-semibold">Users</h1>
//             {users
//               .filter((user) => String(user.id) !== String(userData?.id))
//               .map((user) => (
//                 <div key={user.id} onClick={() => createChat(user)}>
//                   <UserCard
//                     name={`${user.prenom} ${user.nom}`}
//                     avatarUrl={
//                       user.profileImages?.[0]?.path || "/default-avatar.jpg"
//                     }
//                     time="2h ago"
//                     type="user"
//                   />
//                 </div>
//               ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;

"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ref, get, serverTimestamp, query } from "firebase/database";
import UserCard from "./UserCard";
import { db } from "@/firebaseconfig";

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

  // Fetch all users
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
        alert("Chatroom already exists!");
        return;
      }

      const chatroomData = {
        sender,
        receiver,
        timestamp: Date.now(),
        latestMessage: null,
      };

      await set(chatroomRef, chatroomData);
      console.log("Chatroom created!");

      setActiveTab("chatroom");
    } catch (error) {
      console.error("Error creating chatroom:", error);
    }
  };

  useEffect(() => {
    const fetchChatrooms = async () => {
      if (!userData) return;

      setLoading(true);

      try {
        const chatroomsRef = ref(db, "chatrooms");
        const snapshot = await get(chatroomsRef);

        if (snapshot.exists()) {
          const chatroomData = snapshot.val();

          const userChatrooms = Object.entries(chatroomData)
            .filter(
              ([, chatroom]) =>
                chatroom.sender === userData.id ||
                chatroom.receiver === userData.id
            )
            .map(([key, chatroom]) => ({
              id: key,
              ...chatroom,
            }));

          setChatrooms(userChatrooms);

          const userIds = [
            ...new Set(
              userChatrooms.flatMap((chatroom) => [
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
          console.log("Aucune chatroom trouvée.");
          setChatrooms([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des chatrooms :", error);
      } finally {
        setLoading(false);
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

  // const openChat = (chatroom) => {
  //   console.log("Chatroom clicked:", chatroom);
  //   const receiverData = userDetails[chatroom.receiver];
  //   console.log("Receiver data:", receiverData);

  //   if (!receiverData) {
  //     console.error("Receiver data is missing!");
  //     return;
  //   }

  //   const data = {
  //     id: chatroom.id,
  //     myData: userData,
  //     otherData: receiverData,
  //   };

  //   console.log("Data to setSelectedChatroom:", data);
  //   setSelectedChatroom(data);
  // };

  // const openChat = (chatroom) => {
  //   // Assurez-vous que les données du receiver existent
  //   const receiverData = userDetails[chatroom.receiver];
  //   console.log("Receiver data:", receiverData); // Pour vérifier la structure des données

  //   if (!receiverData) {
  //     console.error("Receiver data is missing!");
  //     return; // On arrête l'exécution si les données sont manquantes
  //   }

  //   const data = {
  //     id: chatroom.id,
  //     myData: userData,
  //     otherData: receiverData,
  //   };

  //   console.log("Data to setSelectedChatroom:", data);

  //   setSelectedChatroom(data);
  // };
  const openChat = (chatroom) => {
    // Vérifiez que les données existent dans userDetails
    const receiverData = userDetails[chatroom.receiver];
    console.log("Receiver data in openChat:", receiverData); // Log pour vérifier les données du receiver

    if (!receiverData) {
      console.error("Receiver data is missing!");
      return; // On arrête l'exécution si les données sont manquantes
    }

    const data = {
      id: chatroom.id,
      myData: userData,
      otherData: receiverData,
    };

    console.log("Data to setSelectedChatroom:", data); // Log pour vérifier les données envoyées à setSelectedChatroom

    setSelectedChatroom(data); // On met à jour selectedChatroom
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
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => handleTabClick("chatroom")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "chatroom" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          ChatRoom
        </button>
      </div>

      <div>
        {activeTab === "chatroom" && (
          <>
            <h1 className="px-4 text-base font-semibold">ChatRooms</h1>
            {chatrooms.map((chatroom) => (
              <div key={chatroom.id} onClick={() => openChat(chatroom)}>
                <UserCard
                  name={userDetails[chatroom.receiver]?.nom || "Chargement..."}
                  avatarUrl={
                    userDetails[chatroom.receiver]?.profileImages?.[0]?.path ||
                    "/default-avatar.jpg"
                  }
                  latestMessageText={chatroom.latestMessage || "Aucun message"}
                  time="2h ago"
                  type="chat"
                />
              </div>
            ))}
          </>
        )}
      </div>

      <div>
        {activeTab === "users" && (
          <>
            <h1 className="px-4 text-base font-semibold">Users</h1>
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
          </>
        )}
      </div>
    </div>
  );
};

export default User;
