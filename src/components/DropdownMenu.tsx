'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface DropdownItem {
    id: string;
    label: string;
}

interface DropdownMenuProps {
    items: DropdownItem[];
    activeId: string;
    onChange: (id: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, activeId, onChange }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as HTMLElement)?.closest('.dropdown-container')) {
                setOpen(false);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="lg:hidden relative mb-6 z-10 dropdown-container">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
                <span>
                    {items.find(item => item.id === activeId)?.label || 'Pilih Informasi'}
                </span>
                <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto"
                    >
                        {items.map(item => (
                            <li
                                key={item.id}
                                onClick={() => {
                                    onChange(item.id);
                                    setOpen(false);
                                }}
                                className={`px-4 py-2 text-sm cursor-pointer transition duration-150 hover:bg-blue-50 ${activeId === item.id ? 'bg-gray-50 text-orange-400 font-semibold' : 'text-gray-700'
                                    }`}
                            >
                                {item.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DropdownMenu;
