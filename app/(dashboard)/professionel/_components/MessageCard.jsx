import Image from "next/image";
import React from "react";

const MessageCard = ({ message, me, other }) => {
  const isMessageFromMe = message.senderId === me.id;

  const formattedTime = new Date(message.time).toLocaleString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div
      key={message.id}
      className={`flex mb-4 ${
        isMessageFromMe ? "justify-end" : "justify-start"
      }`}
    >
      {/* Conteneur flex pour l'avatar et le message */}
      <div className="flex items-start">
        {/* Message bubble */}
        <div
          className={`text-white p-2 rounded-md ${
            isMessageFromMe ? "bg-amber-500 self-end" : "bg-gray-700 self-start"
          }`}
        >
          <p className="text-base">{message.content}</p>
          <div className="text-xs text-gray-300">{formattedTime}</div>
        </div>
        {/* Avatar */}
        <div className={`w-10 h-10 ${isMessageFromMe ? "ml-2" : "mr-2"}`}>
          {!isMessageFromMe && (
            <Image
              src={other.profileImages?.[0]?.path}
              alt="image"
              height={40}
              width={40}
              className="w-full h-full rounded-full object-cover"
            />
          )}
          {isMessageFromMe && (
            <Image
              src={me.image}
              alt="image"
              height={40}
              width={40}
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
