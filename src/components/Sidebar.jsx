// Sidebar.jsx
import React, { useState } from "react";
import { Home, BarChart2, Settings, User, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard    " },
  { name: "Layanan", icon: BarChart2, path: "/layanan" },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Profile", icon: User, path: "/profile" },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 fixed top-4 left-4 z-50 bg-white rounded-md shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md w-64 z-40 transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:shadow-none`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1 className="text-indigo-600 font-bold text-xl">Penggilingan</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map(({ name, icon: Icon, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                className={`flex items-center px-4 py-3 mx-3 rounded-md mb-2 text-sm font-medium hover:bg-indigo-50
                  ${
                    active ? "bg-indigo-100 text-indigo-700" : "text-gray-600"
                  }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay (only on mobile when sidebar is open) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
