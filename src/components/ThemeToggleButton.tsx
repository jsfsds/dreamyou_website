'use client';

import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import SunIcon from '@/components/icons/SunIcon';
import MoonIcon from '@/components/icons/MoonIcon';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-theme-1 dark:focus-visible:ring-theme-2 transition-colors duration-200 bg-transparent border-none p-4 md:p-6 rounded-full"
      aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
      style={{ background: 'none', border: 'none' }}
    >
      <span className="relative block w-16 h-16 md:w-20 md:h-20">
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
        >
          <SunIcon className="w-16 h-16 md:w-20 md:h-20 text-yellow-500" />
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
        >
          <MoonIcon className="w-16 h-16 md:w-20 md:h-20 text-blue-300" />
        </span>
      </span>
    </button>
  );
}; 