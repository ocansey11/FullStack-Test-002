// src/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <div className="flex items-center">
        <span className="text-lg font-medium">🌟 KeyMap</span>
      </div>
      <div className="flex items-center">
        <img
          src="https://i.pravatar.cc/40?img=3"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;