// src/pages/HomePage.jsx
import React from "react";
import Header from "../components/Header";
import WelcomeMessage from "../components/WelcomeMessage";
import ChatInput from "../components/ChatInput";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    // ✅ Navigate to conversation page and pass initial message
    navigate("/conversation", {
      state: { initialUserMessage: message },
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center">
        <WelcomeMessage />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default HomePage;
