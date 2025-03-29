// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onToggle, projectId }) => {
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="absolute top-20 left-2 z-20 p-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
      >
        ➤ Open
      </button>
    );
  }

  return (
    <aside className="w-[30%] min-w-[240px] max-w-sm bg-gray-100 border-r border-gray-200 h-full flex flex-col p-4 relative">
      {/* Close Button */}
      <button
        onClick={onToggle}
        className="absolute top-4 right-4 text-gray-600 hover:text-black"
        aria-label="Close Sidebar"
      >
        ✕
      </button>

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>

      <Link
        to="/"
        className="mb-4 inline-block text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        + New Project
      </Link>

      <nav className="flex-1 overflow-y-auto space-y-2 text-sm">
        <Link
          to="/conversation/project-1"
          className={`block px-3 py-2 rounded-md ${
            projectId === "project-1"
              ? "bg-black text-white"
              : "hover:bg-gray-200 text-gray-700"
          }`}
        >
          Project 1
        </Link>
        <Link
          to="/conversation/project-2"
          className={`block px-3 py-2 rounded-md ${
            projectId === "project-2"
              ? "bg-black text-white"
              : "hover:bg-gray-200 text-gray-700"
          }`}
        >
          Project 2
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
