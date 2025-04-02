import React from "react";

const ChatMessage = ({ role, content }) => {
  const isUser = role === "user";
  const isAssistant = role === "assistant";
  
  // Return different message layouts based on role
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="bg-green-500 text-black px-4 py-2 my-2 rounded-xl max-w-[70%] shadow-md">
          {content}
        </div>
      </div>
    );
  }
  
  if (isAssistant) {
    return (
      <div className="flex justify-start">
        <div className="bg-blue-500 text-white px-4 py-2 my-2 rounded-xl max-w-[70%] shadow">
          {content}
        </div>
      </div>
    );
  }
  
  // For system messages or any other type (optional)
  return (
    <div className="flex justify-center mb-4">
      <div className="">
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;