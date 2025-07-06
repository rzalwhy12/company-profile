// components/BranchDropdown.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface BranchItem {
    id: string;
    name: string;
    type: string;
    address: string;
}

interface BranchDropdownProps {
    branches: BranchItem[];
    selectedBranchId: string | null;
    onSelectBranch: (branchId: string) => void;
}

const BranchDropdown: React.FC<BranchDropdownProps> = ({ branches, selectedBranchId, onSelectBranch }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (branchId: string) => {
        onSelectBranch(branchId);
        setIsOpen(false);
    };

    const currentSelection = branches.find(b => b.id === selectedBranchId) || branches[0]; // Default ke cabang pertama jika belum ada yang terpilih

    return (
        <div className="relative w-full mb-4 lg:hidden"> {/* Hanya tampil di lg ke bawah */}
            <button
                type="button"
                className="flex justify-between items-center w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{currentSelection ? `${currentSelection.name} (${currentSelection.type})` : 'Pilih Cabang'}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>

            {isOpen && (
                <ul
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                    tabIndex={-1}
                    role="listbox"
                >
                    {branches.map((branch) => (
                        <li
                            key={branch.id}
                            className={`cursor-pointer select-none relative py-2 pl-4 pr-9 ${
                                branch.id === selectedBranchId ? 'text-blue-600 bg-blue-50' : 'text-gray-900 hover:bg-gray-100'
                            }`}
                            onClick={() => handleSelect(branch.id)}
                            role="option"
                            aria-selected={branch.id === selectedBranchId}
                        >
                            <span className="font-normal block truncate">
                                {branch.name} ({branch.type}) - {branch.address}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BranchDropdown;