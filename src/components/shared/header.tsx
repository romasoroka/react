import { useState } from "react";
import { FaUserCircle, FaBell, FaUserShield } from "react-icons/fa";
import ThemeToggle from "../ui/ThemeButton";
import { useSidebarContext } from "../../context/SidebarContext";

const Header = ({ isAdmin = true, userName = "Roman" }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isCollapsed } = useSidebarContext();

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <header
      className={`fixed top-0 h-16 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between px-6 md:px-4 z-50 transition-all duration-300 ease-in-out ${
        isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-60 w-[calc(100%-15rem)]"
      }`}
    >
      <div className="flex items-center">
        <span className="text-xl font-semibold text-gray-800 dark:text-gray-100 md:text-base">
          З поверненням, {userName}
        </span>
      </div>
      <div className="flex items-center gap-6 md:gap-3">
        <ThemeToggle />
        {isAdmin && (
          <span
            className="text-red-600 cursor-default select-none flex items-center gap-1"
            title="Admin"
          >
            {(FaUserShield as any)({ size: 20 })}
          </span>
        )}
        <span
          className="relative text-gray-600 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
          title="Notifications"
        >
          {(FaBell as any)({ size: 20 })}
        </span>
        <div className="relative">
          <span
            className="text-gray-600 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 select-none flex items-center gap-1"
            onClick={toggleUserMenu}
          >
            {(FaUserCircle as any)({ size: 20 })}
          </span>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50 overflow-hidden">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => alert("Settings clicked")}
              >
                Settings
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => alert("Log Out clicked")}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
