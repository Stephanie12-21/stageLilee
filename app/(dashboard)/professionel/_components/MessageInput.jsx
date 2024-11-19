"use client";
import React from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";

const MessageInput = ({ sendMessage, message, setMessage }) => {
  return (
    <div className="flex items-center p-4 border-t border-gray-200">
      <FaPaperclip className="text-gray-700 mr-2 cursor-pointer" />

      <input
        type="text"
        placeholder="type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border-none p-2 outline-none"
      />

      <FaPaperPlane
        onClick={() => {
          sendMessage();
        }}
        className="text-gray-700 ml-2 cursor-pointer"
      />
    </div>
  );
};

export default MessageInput;
