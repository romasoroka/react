import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FcSettings, FcComboChart, FcBriefcase, FcBusinessman, FcLineChart } from 'react-icons/fc';
import { FaBars, FaUserCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Sidebar = ({ userName = 'Роман', isAdmin = true }) => {
  const [isOpen, setIsOpen] = useState(false); // Для мобільного меню
  const [isCollapsed, setIsCollapsed] = useState(false); // Для звуження сайдбару

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Кнопка для мобільного меню */}
      <button
        className="fixed top-4 left-4 z-20 bg-blue-600 text-white px-4 py-2 rounded-lg text-base cursor-pointer md:hidden"
        onClick={toggleSidebar}
      >
        {(FaBars as any)({ size: 20 })}
      </button>

      {/* Сайдбар */}
      <div
        className={`fixed top-0 left-0 ${
          isCollapsed ? 'w-16' : 'w-60'
        } h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-[2px_0_8px_rgba(0,0,0,0.05)] flex flex-col z-10 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 overflow-hidden`}
      >
        {/* Частина 1: Заголовок */}
        <div className={`mb-8 flex items-center justify-between px-6 pt-6 ${isCollapsed ? 'hidden' : ''}`}>
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {(FcSettings as any)({ size: 24 })}
            Company Operations
          </h1>
          {/* Кнопка звуження (тільки для десктопу) */}
          <button
            className="hidden md:block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={toggleCollapse}
          >
            {(isCollapsed ? FaChevronRight : FaChevronLeft as any)({ size: 20 })}
          </button>
        </div>

        {/* Частина 2: Навігація */}
        <nav className="flex flex-col gap-2 flex-1 px-2">
          <h2
            className={`text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-4 ${
              isCollapsed ? 'hidden' : ''
            }`}
          >
            Навігація
          </h2>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all ${
                isCollapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50 dark:text-blue-300 font-semibold'
                  : 'text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
              }`
            }
          >
            {(FcComboChart as any)({ size: 20 })}
            <span className={isCollapsed ? 'hidden' : ''}>Dashboard</span>
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all ${
                isCollapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50 dark:text-blue-300 font-semibold'
                  : 'text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
              }`
            }
          >
            {(FcBriefcase as any)({ size: 20 })}
            <span className={isCollapsed ? 'hidden' : ''}>Projects</span>
          </NavLink>
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all ${
                isCollapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50 dark:text-blue-300 font-semibold'
                  : 'text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
              }`
            }
          >
            {(FcBusinessman as any)({ size: 20 })}
            <span className={isCollapsed ? 'hidden' : ''}>Employees</span>
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all ${
                isCollapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50 dark:text-blue-300 font-semibold'
                  : 'text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
              }`
            }
          >
            {(FcLineChart as any)({ size: 20 })}
            <span className={isCollapsed ? 'hidden' : ''}>Analytics</span>
          </NavLink>
        </nav>

        {/* Частина 3: Футер */}
        <div
          className={`pt-2 border-t border-gray-200 dark:border-gray-700 px-4 py-2 ${isCollapsed ? 'hidden' : ''}`}
        >
          <div className="flex items-center gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors py-3">
            {(FaUserCircle as any)({ size: 24, className: 'text-gray-500 dark:text-gray-400' })}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-200">{userName}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {isAdmin ? 'Admin' : 'User'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;