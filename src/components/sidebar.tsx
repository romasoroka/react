import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FcSettings, FcComboChart, FcBriefcase, FcBusinessman, FcLineChart } from 'react-icons/fc';
import { FaBars, FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-[20] bg-blue-600 text-white px-4 py-2 rounded-lg text-base cursor-pointer md:hidden"
        onClick={toggleSidebar}
      >
        {(FaBars as any)({ size: 20 })}
      </button>
      <div
        className={`fixed top-0 left-0 w-60 h-screen bg-gradient-to-b from-white to-gray-50 shadow-[2px_0_8px_rgba(0,0,0,0.05)] p-6 flex flex-col z-[10] transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-60`}
      >
        {/* Частина 1: Заголовок */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            {(FcSettings as any)({ size: 24 })}
            Company Operations
          </h1>
        </div>

        {/* Частина 2: Навігація */}
        <nav className="flex flex-col gap-2 flex-1">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Навігація
          </h2>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all ${
                isActive
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`
            }
          >
            {(FcComboChart as any)({ size: 20 })}
            Dashboard
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all ${
                isActive
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`
            }
          >
            {(FcBriefcase as any)({ size: 20 })}
            Projects
          </NavLink>
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all ${
                isActive
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`
            }
          >
            {(FcBusinessman as any)({ size: 20 })}
            Employees
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all ${
                isActive
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`
            }
          >
            {(FcLineChart as any)({ size: 20 })}
            Analytics
          </NavLink>
        </nav>

        {/* Частина 3: Футер */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            {(FaUserCircle as any)({ size: 24, className: 'text-gray-500' })}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">Роман</span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;