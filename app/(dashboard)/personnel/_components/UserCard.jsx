import Image from "next/image";
import React from "react";

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

export default UserCard;
