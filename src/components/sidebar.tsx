import { NavLink } from 'react-router-dom';
import * as FcIcons from 'react-icons/fc';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import './sidebar.css'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="toggle-button" onClick={toggleSidebar}>
        <FaBars size={20} />
      </button>
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        {/* Частина 1: Заголовок */}
        <div className="sidebar-header">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <FcIcons.FcSettings size={24} /> Company Operations
          </h1>
        </div>

        {/* Частина 2: Навігаційні посилання */}
        <nav className="sidebar-nav">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Навігація</h2>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? 'text-blue-600' : 'text-gray-700'}`
            }
          >
            <FcIcons.FcComboChart size={20} /> Dashboard
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? 'text-blue-600' : 'text-gray-700'}`
            }
          >
            <FcIcons.FcBriefcase size={20} /> Projects
          </NavLink>
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? 'text-blue-600' : 'text-gray-700'}`
            }
          >
            <FcIcons.FcBusinessman size={20} /> Employees
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? 'text-blue-600' : 'text-gray-700'}`
            }
          >
            <FcIcons.FcLineChart size={20} /> Analytics
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="flex items-center gap-2">
            <FaUserCircle size={24} className="text-gray-500" />
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Роман</span>
              <span className="text-sm text-gray-500">Admin</span>
            </div>
          </div>
        </div>
    </div>
    </>
  );
};

export default Sidebar;