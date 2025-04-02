// src/components/ChatInput.jsx
import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="w-full flex justify-center px-6 pb-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl mx-auto px-4"
      >
        <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-200 py-2 px-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything"
            className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            aria-label="Chat input"
          />
          <button
            type="submit"
            className="rounded-lg  text-black px-4 py-2 hover:bg-blue-600 transition duration-200"
            aria-label="Send message"
          >
             <i class="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;