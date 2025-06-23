import { useTheme } from '../utils/themeChange';
import { FaMoon, FaSun } from 'react-icons/fa';
import { createElement } from 'react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const Icon = isDark ? (FaMoon as any) : (FaSun as any);

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center w-14 h-8 rounded-full px-1 transition-colors duration-300 focus:outline-none shadow-md 
        ${isDark ? 'bg-gray-700' : 'bg-yellow-300'}`}
      aria-label={`Перемкнути на ${isDark ? 'світлу' : 'темну'} тему`}
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow transition-transform duration-300 ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {createElement(Icon, {
          size: 20,
          className: `text-sm ${isDark ? 'text-blue-300' : 'text-yellow-500'}`,
        })}
      </span>
    </button>
  );
};

export default ThemeToggle;
