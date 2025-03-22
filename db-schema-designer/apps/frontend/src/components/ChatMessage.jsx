// // src/components/ChatMessage.jsx
// import React from "react";

// const ChatMessage = ({ role, content }) => {
//   const isUser = role === "user";
//   const isAssistant = role === "assistant";
//   // const isSystem = role === "system";

//   // Style definitions
//   const baseStyles = "max-w-xl px-4 py-2 rounded-lg text-sm sm:text-base";
//   const roleStyles = isUser
//     ? "ml-auto bg-blue-600 text-white"
//     // : isSystem
//     // ? "mx-auto bg-gray-200 text-gray-600 italic"
//     : "mr-auto bg-gray-100 text-gray-900";

//   return (
//     <div className={`${baseStyles} ${roleStyles}`}>
//       {content}
//     </div>
//   );
// };

// export default ChatMessage;


// src/components/ChatMessage.jsx
import React from "react";

const ChatMessage = ({ role, content }) => {
  const isUser = role === "user";
  const isAssistant = role === "assistant";
  
  // Return different message layouts based on role
  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-xl px-4 py-2 rounded-lg bg-blue-600 text-white">
          {content}
        </div>
      </div>
    );
  }
  
  if (isAssistant) {
    return (
      <div className="flex justify-start mb-4">
        <div className="max-w-xl px-4 py-2 rounded-lg bg-gray-100 text-gray-900">
          {content}
        </div>
      </div>
    );
  }
  
  // For system messages or any other type (optional)
  return (
    <div className="flex justify-center mb-4">
      <div className="max-w-xl px-4 py-2 rounded-lg bg-gray-200 text-gray-600 italic">
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;