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
    <div className="fixed bottom-6  flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto px-4"
      >
        <div className="w-full flex items-center bg-white rounded-full shadow-sm border border-gray-200 py-3 px-4">
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
            className="ml-2 p-2 rounded-full bg-black text-white hover:bg-gray-800 focus:outline-none"
            aria-label="Send message"
          >
             {/* The submitt will be a logo of an enter button */}
            Submitt 
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;