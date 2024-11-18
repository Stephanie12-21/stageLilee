import Image from "next/image"; // Utiliser Image de Next.js
import React from "react";

function UserCard({ name, avatarUrl, latestMessageText, time, type }) {
  return (
    <div className="flex items-center p-4 border-b relative hover:cursor-pointer">
      {/* Avatar on the left */}
      <div className="flex-shrink-0 mr-4 relative">
        <div className="w-12 h-12 rounded-full overflow-hidden border-4">
          {" "}
          {/* Bordure rouge autour de l'image */}
          <Image
            src={avatarUrl} // L'URL de l'avatar
            alt="User Avatar"
            width={40} // Largeur de l'image
            height={40} // Hauteur de l'image
            className="w-full h-full object-cover" // Pour ajuster l'image
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

export default UserCard;
