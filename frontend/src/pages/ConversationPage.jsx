import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProjectMessages,
  sendMessageToProject,
} from "../lib/api";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const ConversationPage = () => {
  const { projectId } = useParams();
  const [conversation, setConversation] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load messages on mount
  useEffect(() => {
    if (!projectId) return;
    getProjectMessages(projectId).then(setConversation);
  }, [projectId]);

  // Send message
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Optimistically update UI
    const userMessage = { role: "user", content: message };
    setConversation((prev) => [...prev, userMessage]);

    try {
      const res = await sendMessageToProject(projectId, message);
      const assistantMessage = {
        role: "assistant",
        content: res.response,
      };
      setConversation((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Message send error:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((o) => !o)}
          projectId={projectId}
        />

        <div className="flex flex-col flex-1 bg-white m-5">
          <div className="flex-grow overflow-y-auto px-24 py-12">
            {conversation
              .filter((msg) => msg.role !== "system")
              .map((msg, idx) => (
                <ChatMessage key={idx} role={msg.role} content={msg.content} />
              ))}
          </div>

          <div className="flex-1 flex items-center justify-center h-[10%] min-h-16">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
