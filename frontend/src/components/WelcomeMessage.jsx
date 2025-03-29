// src/components/WelcomeMessage.jsx
import React from "react";

const WelcomeMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-semibold text-gray-900">
        Welcome, <span className="italic">User.</span>
      </h1>
      <p className="mt-2 text-gray-500">
        What are we building today?
      </p>
    </div>
    
  );
};

export default WelcomeMessage;