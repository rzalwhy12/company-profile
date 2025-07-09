// src/components/AboutUsClientPage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import DropdownMenu from '@/components/DropdownMenu';
// import BranchLocatorLeaflet from '@/components/BranchLocator'; // <--- HAPUS ATAU KOMENTARI INI
import CompanyProfilePage from '@/components/Company-profile';
import CustomerComplaintForm from '@/components/CustomerComplaintForm';
import dynamic from 'next/dynamic'; // <--- IMPORT dynamic dari next/dynamic

// Dynamic import for BranchLocatorLeaflet
const DynamicBranchLocatorLeaflet = dynamic(() => import('@/components/BranchLocator'), {
    ssr: false, // <-- INI KUNCI UTAMANYA! Jangan render di server
    loading: () => <p>Loading map location...</p>, // Opsional: Tampilkan indikator loading
});


interface AboutNavItem {
    id: string;
    label: string;
    title: string;
    content: React.ReactNode;
}

const aboutUsContent: AboutNavItem[] = [
    {
        id: 'mission-statement',
        label: 'Mission Statement, Values & Company Motto',
        title: 'Mission Statement, Values & Company Motto',
        content:
            <div className="w-full flex justify-center py-4">
                <CompanyProfilePage />
            </div>
    },
    {
        id: 'customer-complaints',
        label: 'Customer Complaints',
        title: 'Customer Complaints',
        content: (
            <div className="w-full flex justify-center py-4">
                <CustomerComplaintForm />
            </div>
        ),
    },
    {
        id: 'office-locations',
        label: 'Office Branch Locations',
        title: 'Office Branch Locations',
        content: (
            <div className="w-full flex justify-center py-4">
                {/* Gunakan komponen yang diimpor secara dinamis di sini */}
                <DynamicBranchLocatorLeaflet />
            </div>
        ),
    },
];


const contentVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3, ease: 'easeIn' } },
};


interface AboutUsClientPageProps {
    initialId: string;
}

const AboutUsClientPage: React.FC<AboutUsClientPageProps> = ({ initialId }) => {
    const router = useRouter();
    const [activeContentId, setActiveContentId] = useState<string>(initialId || 'mission-statement');

    const params = useParams();
    const currentIdFromUrl = params.id as string;

    useEffect(() => {
        if (currentIdFromUrl && currentIdFromUrl !== activeContentId) {
            setActiveContentId(currentIdFromUrl);
        }
    }, [currentIdFromUrl, activeContentId]);

    const handleDropdownChange = (id: string) => {
        setActiveContentId(id);
        router.push(`/about/${id}`);
    };

    const currentContent = aboutUsContent.find(item => item.id === activeContentId);


    return (
        <div className="bg-gradient-to-br from-gray-100 via-white to-gray-50 min-h-screen font-sans">
            {/* Banner */}
            <div className="relative w-full h-80 flex items-center justify-center overflow-hidden">
                <Image
                    src="/image/rzal2.png"
                    alt="Tentang Kami Banner"
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    className="absolute z-0"
                />
            </div>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4 text-sm text-gray-600 ">
                <Link href="/" className="hover:underline">HOME</Link>
                <span className="mx-2">/</span>
                <Link href="/about/mission-statement" className="hover:underline">About us</Link>
                <span className="mx-2">/</span>
                <span className="font-semibold text-blue-700">{currentContent?.label || '...'}</span>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 ">
                {/* Dropdown (Mobile) */}
                <DropdownMenu
                    items={aboutUsContent.map(item => ({ id: item.id, label: item.label }))}
                    activeId={activeContentId}
                    onChange={handleDropdownChange}
                />

                {/* Sidebar (Desktop) */}
                <nav className="hidden lg:block w-1/4 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-blue-50 p-6 sticky top-24 transition-transform duration-300 hover:scale-[1.01]">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 border-b pb-2 tracking-wide">About SDA</h3>
                    <ul className="space-y-2">
                        {aboutUsContent.map(item => (
                            <li key={item.id}>
                                <Link
                                    href={`/about/${item.id}`}
                                    className={`block w-full px-4 py-2 rounded-lg transition-colors duration-300 text-sm ${activeContentId === item.id
                                        ? 'bg-gradient-to-r from-indigo-100 to-blue-100 text-blue-900 font-semibold'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="w-full lg:w-3/4 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-blue-100 p-8 transition-all duration-300 hover:scale-[1.01]">
                    <AnimatePresence mode="wait">
                        {currentContent ? (
                            <motion.div
                                key={currentContent.id}
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <h2 className="text-3xl md:text-4xl font-light text-blue-900 mb-6 tracking-tight">
                                    {currentContent.title}
                                </h2>
                                <div className="prose prose-blue max-w-none text-gray-700">
                                    {currentContent.content}
                                </div>
                            </motion.div>
                        ) : (
                            <p className="text-gray-600">Konten tidak ditemukan.</p>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default AboutUsClientPage;