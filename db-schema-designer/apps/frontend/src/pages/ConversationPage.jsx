// src/pages/ConversationPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import Header from "../components/Header";
import ChatMessage from "../components/ChatMessage";

const ConversationPage = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const { initialUserMessage } = location.state || {};

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 👈 Sidebar toggle state

  const [conversation, setConversation] = useState(() => {
    const systemMessage = {
      role: "system",
      content: "You are a helpful assistant. Ask questions to help build a database schema.",
    };

    const userMessage = initialUserMessage
      ? { role: "user", content: initialUserMessage }
      : null;

    return userMessage ? [systemMessage, userMessage] : [systemMessage];
  });

  useEffect(() => {
    if (initialUserMessage) {
      const reply = {
        role: "assistant",
        content: "Great! What kind of database are you thinking of?",
      };

      const timeout = setTimeout(() => {
        setConversation((prev) => [...prev, reply]);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [initialUserMessage]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    setConversation((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const aiReply = {
        role: "assistant",
        content: "Thanks! Can you tell me about the entities you'd like in your database?",
      };
      setConversation((prev) => [...prev, aiReply]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar toggle logic */}
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          projectId={projectId}
        />

        {/* Chat Area */}
        <div className="flex flex-col flex-1 relative bg-white">
          <div className="flex-grow overflow-y-auto p-6 flex flex-col justify-end">
            {conversation
              .filter((msg) => msg.role !== "system")
              .map((msg, idx) => (
                <ChatMessage key={idx} role={msg.role} content={msg.content} />
              ))}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center h-[10%] min-h-16">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
