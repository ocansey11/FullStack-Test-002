// src/pages/WelcomePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../lib/api";

const WelcomePage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const res = await createProject(message);
    if (res?.project_id) {
      navigate(`/conversation/${res.project_id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold text-gray-900">
        Welcome, <span className="italic">User.</span>
      </h1>
      <p className="mt-2 text-gray-500 mb-6">What are we building today?</p>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl px-6">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Start typing your idea..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </form>
    </div>
  );
};

export default WelcomePage;
