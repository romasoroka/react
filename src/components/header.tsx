import { useState } from 'react';
import { FaUserCircle, FaBell, FaUserShield } from 'react-icons/fa';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isAdmin = true;
  const userName = 'Roman';

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-white shadow-sm flex items-center justify-between px-8 z-[50]">
      <div className="flex items-center">
        <span className="text-xl font-semibold text-gray-800 md:text-base">
          Welcome back, {userName}
        </span>
      </div>
      <div className="flex items-center gap-6 md:gap-4">
        {isAdmin && (
          <span
            className="text-red-600 cursor-default select-none flex items-center gap-1"
            title="Admin"
          >
            {(FaUserShield as any)({ size: 20 })}
            {/* Uncomment if you want text next to the icon: */}
            {/* <span className="text-sm">Адмін</span> */}
          </span>
        )}
        <span
          className="relative text-gray-600 cursor-pointer hover:text-blue-600 flex items-center gap-1"
          title="Notifications"
        >
          {(FaBell as any)({ size: 20 })}
          {/* Uncomment if you want text next to the icon: */}
          {/* <span className="text-sm">Сповіщення</span> */}
        </span>
        <div className="relative">
          <span
            className="text-gray-600 cursor-pointer hover:text-blue-600 select-none flex items-center gap-1"
            onClick={toggleUserMenu}
          >
            {(FaUserCircle as any)({ size: 20 })}
            {/* Uncomment if you want text next to the icon: */}
            {/* <span className="text-sm">Користувач</span> */}
          </span>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-[50] overflow-hidden">
              <button
                className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={() => alert('Settings clicked')}
              >
                Settings
              </button>
              <button
                className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={() => alert('Log Out clicked')}
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