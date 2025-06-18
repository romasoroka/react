import { useState } from 'react';
import { FaUserCircle, FaBell, FaUserShield } from 'react-icons/fa';
import './header.css';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const isAdmin = true;
  const userName = 'Roman';

  return (
    <header className="header">
      <div className="header-left">
        <span className="welcome-text">Welcome back, {userName}</span>
      </div>
      <div className="header-right">
        {isAdmin && (
          <span className="header-icon admin-icon" title="Admin">
            <FaUserShield size={20} />
          </span>
        )}
        <span className="header-icon notification-icon" title="Notifications">
          <FaBell size={20} />
        </span>
        <div className="user-menu-container">
          <span className="header-icon user-icon" onClick={toggleUserMenu}>
            <FaUserCircle size={20} />
          </span>
          {isUserMenuOpen && (
            <div className="user-menu">
              <button className="user-menu-item">Settings</button>
              <button className="user-menu-item">Log Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;