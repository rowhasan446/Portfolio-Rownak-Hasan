"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex items-center">
            <div
                onClick={toggleTheme}
                className="relative w-14 h-7 flex items-center bg-gray-200 dark:bg-gray-800 rounded-full p-1 cursor-pointer transition-colors duration-500 shadow-inner overflow-hidden border border-black/5 dark:border-white/10"
            >
                {/* Sliding Background */}
                <motion.div
                    className="absolute left-1 h-5 w-5 bg-white dark:bg-cyan-500 rounded-full shadow-md z-10"
                    animate={{ x: theme === 'dark' ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />

                {/* Icons */}
                <div className="flex justify-between w-full px-1 relative z-0">
                    <FiSun className={`text-orange-500 text-xs transition-opacity duration-300 ${theme === 'light' ? 'opacity-100' : 'opacity-40'}`} />
                    <FiMoon className={`text-blue-300 text-xs transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-40'}`} />
                </div>

                {/* Gloss Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default ThemeToggle;
