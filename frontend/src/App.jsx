// src/App.jsx
import React from "react";
// main.jsx or App.jsx
import './index.css';

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ConversationPage from "./pages/ConversationPage";

const App = () => {
  return (
    <div className="min-h-screen font-sans bg-white text-gray-900">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/conversation/:projectId?" element={<ConversationPage />} />
      </Routes>
    </div>
  );
};

export default App;

