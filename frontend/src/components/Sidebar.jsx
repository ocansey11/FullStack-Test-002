// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProjects } from "../lib/api";
import SidebarItem from "./SidebarItem";
import { FaBars, FaPlus, FaXmark } from "react-icons/fa6";

const Sidebar = ({ isOpen, onToggle, projectId }) => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects().then(setProjects).catch(console.error);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="p-2 bg-gray-100 hover:bg-gray-200 rounded shadow ml-2 mt-2"
        aria-label="Open Sidebar"
      >
        <FaBars />
      </button>
    );
  }

  return (
    <aside className="w-[15%] min-w-[240px] max-w-sm bg-gray-100 shadow-[4px_0_10px_rgba(0,0,0,0.1)] h-full flex flex-col p-4">
      <button
        onClick={onToggle}
        className="self-end mb-4 p-2 hover:bg-gray-200 rounded"
        aria-label="Close Sidebar"
      >
        <FaXmark />
      </button>

      <div className="text-lg font-semibold mb-4 flex items-center justify-between">
        <span>My Projects</span>
        <button
          onClick={() => navigate("/")}
          className="p-1 hover:bg-gray-200 rounded"
          title="New Project"
        >
          <FaPlus className="text-sm text-gray-600 hover:text-black" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto space-y-1 text-sm">
        {projects.map((project) => (
          <Link key={project.id} to={`/conversation/${project.id}`}>
            <SidebarItem
              text={project.preview}
              active={projectId === project.id}
              alert={false}
              expanded={isOpen}
            />
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
