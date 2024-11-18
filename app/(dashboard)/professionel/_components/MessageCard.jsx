import Image from "next/image";
import React from "react";

const MessageCard = ({ message, user }) => {
  const isMessageFromMe = message.sender === user;

  return (
    <div
      key={message.id}
      className={`flex mb-4 ${
        isMessageFromMe ? "justify-end" : "justify-start"
      }`}
    >
      {/* Conteneur flex pour l'avatar et le message */}
      <div className="flex items-start">
        {/* Avatar */}
        <div className={`w-10 h-10 ${isMessageFromMe ? "ml-2" : "mr-2"}`}>
          <Image
            src={message.avatarUrl}
            alt="image"
            height={40}
            width={40}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Message bubble */}
        <div
          className={`text-white p-2 rounded-md ${
            isMessageFromMe ? "bg-amber-500 self-end" : "bg-gray-700 self-start"
          }`}
        >
          <p className="text-base">{message.content}</p>
          <div className="text-xs text-gray-300">{message.time}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
