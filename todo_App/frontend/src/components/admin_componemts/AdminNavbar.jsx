import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard, MdInsights, MdStore } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";

const AdminNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <>
      <aside
        className={`fixed z-40 top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 transition-transform duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold flex items-center gap-1">
            <i className="bx bxs-smile"></i> AdminHub
          </span>
          <button
            className="text-xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ✕
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded ${
              path.startsWith("/admin/dashboard")
                ? "text-blue-600 font-bold"
                : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
            }`}
          >
            <MdDashboard className="text-xl" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/users"
            className={`flex items-center gap-3 px-3 py-2 rounded ${
              path.startsWith("/admin/users")
                ? "text-blue-600 font-bold"
                : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
            }`}
          >
            <MdStore className="text-xl" />
            <span>Users</span>
          </Link>

          <Link
            to="/admin/reset-password"
            className={`flex items-center gap-3 px-3 py-2 rounded ${
              path.startsWith("/admin/reset-password")
                ? "text-blue-600 font-bold"
                : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
            }`}
          >
            <MdInsights className="text-xl" />
            <span>Reset Password</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4 space-y-2">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex items-center gap-3 px-3 py-2 rounded text-red-500 hover:text-red-700"
          >
            <FiLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Always visible toggle button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-1 m-3 fixed top-0 left-1 z-30 text-white rounded"
      >
        ☰
      </button>
    </>
  );
};

export default AdminNavbar;
