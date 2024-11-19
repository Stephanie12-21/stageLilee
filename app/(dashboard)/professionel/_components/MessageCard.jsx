// import Image from "next/image";
// import React from "react";

// const MessageCard = ({ message, me, other }) => {
//   const isMessageFromMe = message.senderId === me.id;

//   const formattedTime = new Date(message.time).toLocaleString("fr-FR", {
//     hour: "2-digit",
//     minute: "2-digit",
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });

//   return (
//     <div
//       key={message.id}
//       className={`flex mb-4 ${
//         isMessageFromMe ? "justify-end" : "justify-start"
//       }`}
//     >
//       {/* Conteneur flex pour l'avatar et le message */}
//       <div className="flex items-start">
//         {/* Message bubble */}
//         <div
//           className={`text-white p-2 rounded-md ${
//             isMessageFromMe ? "bg-amber-500 self-end" : "bg-gray-700 self-start"
//           }`}
//         >
//           <p className="text-base">{message.content}</p>
//           <div className="text-xs text-gray-300">{formattedTime}</div>
//         </div>
//         {/* Avatar */}
//         <div className={`w-10 h-10 ${isMessageFromMe ? "ml-2" : "mr-2"}`}>
//           {!isMessageFromMe && (
//             <Image
//               src={other.profileImages?.[0]?.path}
//               alt="image"
//               height={40}
//               width={40}
//               className="w-full h-full rounded-full object-cover"
//             />
//           )}
//           {isMessageFromMe && (
//             <Image
//               src={me.image}
//               alt="image"
//               height={40}
//               width={40}
//               className="w-full h-full rounded-full object-cover"
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageCard;

// import Image from "next/image";
// import React from "react";

// const MessageCard = ({ message, me, other }) => {
//   const isMessageFromMe = message.senderId === me.id;

//   const formattedTime = new Date(message.time).toLocaleString("fr-FR", {
//     hour: "2-digit",
//     minute: "2-digit",
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });

//   return (
//     <div
//       key={message.id}
//       className={`flex mb-4 ${
//         isMessageFromMe ? "justify-end" : "justify-start"
//       }`}
//     >
//       {/* Conteneur flex pour l'avatar et le message */}
//       <div className="flex items-start">
//         {/* Message bubble */}
//         <div
//           className={`text-white p-2 rounded-md max-w-xs ${
//             isMessageFromMe ? "bg-amber-500 self-end" : "bg-gray-700 self-start"
//           }`}
//         >
//           {/* Contenu textuel du message */}
//           {message.content && <p className="text-base">{message.content}</p>}

//           {/* Images associées au message */}
//           {message.images && message.images.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-2">
//               {message.images.map((imageUrl, index) => (
//                 <div
//                   key={index}
//                   className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden"
//                 >
//                   <Image
//                     src={imageUrl}
//                     alt={`Image ${index + 1}`}
//                     layout="fill"
//                     className="object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Date/heure du message */}
//           <div className="text-xs text-gray-300 mt-2">{formattedTime}</div>
//         </div>

//         {/* Avatar */}
//         <div className={`w-10 h-10 ${isMessageFromMe ? "ml-2" : "mr-2"}`}>
//           {!isMessageFromMe && (
//             <Image
//               src={other.profileImages?.[0]?.path}
//               alt="Avatar"
//               height={40}
//               width={40}
//               className="w-full h-full rounded-full object-cover"
//             />
//           )}
//           {isMessageFromMe && (
//             <Image
//               src={me.image}
//               alt="Avatar"
//               height={40}
//               width={40}
//               className="w-full h-full rounded-full object-cover"
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageCard;

// "use client";
// import Image from "next/image";
// import React, { useState } from "react";

// const MessageCard = ({ message, me, other }) => {
//   const isMessageFromMe = message.senderId === me.id;

//   const formattedTime = new Date(message.time).toLocaleString("fr-FR", {
//     hour: "2-digit",
//     minute: "2-digit",
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });

//   const [selectedImage, setSelectedImage] = useState(null); // État pour la lightbox

//   return (
//     <>
//       {/* Message card */}
//       <div
//         key={message.id}
//         className={`flex mb-4 ${
//           isMessageFromMe ? "justify-end" : "justify-start"
//         }`}
//       >
//         <div className="flex items-start">
//           {/* Message bubble */}
//           <div
//             className={`text-white p-2 rounded-md max-w-xs ${
//               isMessageFromMe
//                 ? "bg-amber-500 self-end"
//                 : "bg-gray-700 self-start"
//             }`}
//           >
//             {/* Contenu textuel du message */}
//             {message.content && <p className="text-base">{message.content}</p>}

//             {/* Images associées au message */}
//             {message.images && message.images.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {message.images.map((imageUrl, index) => (
//                   <div
//                     key={index}
//                     className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
//                     onClick={() => setSelectedImage(imageUrl)} // Ouvre la lightbox
//                   >
//                     <Image
//                       src={imageUrl}
//                       alt={`Image ${index + 1}`}
//                       layout="fill"
//                       className="object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Date/heure du message */}
//             <div className="text-xs text-gray-300 mt-2">{formattedTime}</div>
//           </div>

//           {/* Avatar */}
//           <div className={`w-10 h-10 ${isMessageFromMe ? "ml-2" : "mr-2"}`}>
//             {!isMessageFromMe && (
//               <Image
//                 src={other.profileImages?.[0]?.path}
//                 alt="Avatar"
//                 height={40}
//                 width={40}
//                 className="w-full h-full rounded-full object-cover"
//               />
//             )}
//             {isMessageFromMe && (
//               <Image
//                 src={me.image}
//                 alt="Avatar"
//                 height={40}
//                 width={40}
//                 className="w-full h-full rounded-full object-cover"
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Lightbox pour afficher l'image en grand */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="relative">
//             <button
//               className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2"
//               onClick={() => setSelectedImage(null)} // Fermer la lightbox
//             >
//               ✕
//             </button>
//             <Image
//               src={selectedImage}
//               alt="Image grande"
//               width={800}
//               height={800}
//               className="max-w-full max-h-screen object-contain"
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MessageCard;

import Image from "next/image";
import React, { useState } from "react";
import { Download, X } from "lucide-react"; // Importation des icônes

const MessageCard = ({ message, me, other }) => {
  const isMessageFromMe = message.senderId === me.id;

  const formattedTime = new Date(message.time).toLocaleString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [selectedImage, setSelectedImage] = useState(null); // État pour la lightbox

  // Fonction pour télécharger l'image avec un nom personnalisé
  const handleDownload = (imageUrl) => {
    const link = document.createElement("a");

    // Créer un nom de fichier personnalisé basé sur l'heure actuelle
    const customName = `image_${new Date()
      .toISOString()
      .replace(/[-:.]/g, "")}.jpg`;

    // Définir l'URL et le nom du fichier pour le téléchargement
    link.href = imageUrl;
    link.download = customName; // Le nom de fichier personnalisé
    link.click();
  };

  return (
    <>
      {/* Message card */}
      <div
        key={message.id}
        className={`flex mb-4 ${
          isMessageFromMe ? "justify-end" : "justify-start"
        }`}
      >
        <div className="flex items-start">
          {/* Message bubble */}
          <div
            className={`text-white p-2 rounded-md max-w-xs ${
              isMessageFromMe
                ? "bg-amber-500 self-end"
                : "bg-gray-700 self-start"
            }`}
          >
            {/* Contenu textuel du message */}
            {message.content && <p className="text-base">{message.content}</p>}

            {/* Images associées au message */}
            {message.images && message.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {message.images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(imageUrl)} // Ouvre la lightbox
                  >
                    <Image
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Date/heure du message */}
            <div className="text-xs text-gray-300 mt-2">{formattedTime}</div>
          </div>

          {/* Avatar */}
          <div className={`w-10 h-10 ${isMessageFromMe ? "ml-2" : "mr-2"}`}>
            {!isMessageFromMe && (
              <Image
                src={other.profileImages?.[0]?.path}
                alt="Avatar"
                height={40}
                width={40}
                className="w-full h-full rounded-full object-cover"
              />
            )}
            {isMessageFromMe && (
              <Image
                src={me.image}
                alt="Avatar"
                height={40}
                width={40}
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* Lightbox pour afficher l'image en grand */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            {/* Bouton de fermeture */}
            <button
              className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2"
              onClick={() => setSelectedImage(null)} // Fermer la lightbox
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image affichée en grand */}
            <Image
              src={selectedImage}
              alt="Image grande"
              width={800}
              height={800}
              className="max-w-full max-h-screen object-contain"
            />

            {/* Bouton de téléchargement */}
            <button
              className="absolute bottom-4 left-4 text-white bg-blue-600 hover:bg-blue-700 rounded-full p-2"
              onClick={() => handleDownload(selectedImage)} // Télécharger l'image
            >
              <Download className="w-6 h-6" /> {/* Icône de téléchargement */}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageCard;
