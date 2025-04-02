// src/components/SidebarItem.jsx
import React from "react";

export function SidebarItem({ icon, text, active, alert, expanded }) {
  return (
    <li
      className={`
        relative flex items-center py-2 px-3
        font-medium rounded-md cursor-pointer transition-colors group
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"}
      `}
    >
      <span
        className={`
          truncate transition-all
          ${expanded ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0"}
        `}
      >
        {text}
      </span>

      {/* Tooltip (for collapsed state) */}
      {!expanded && (
        <div
          className="absolute left-full z-10 ml-2 bg-white text-gray-800 text-xs shadow px-2 py-1 rounded invisible opacity-0 group-hover:visible group-hover:opacity-100 transition"
        >
          {text}
        </div>
      )}
    </li>
  );
}

export default SidebarItem;
