'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface PromotionItem {
    id: number;
    promoTitle: string;
    promoDescription: string;
    navTitle: string;
    image: string;
}

const promotionData: PromotionItem[] = [
    {
        id: 1,
        promoTitle: 'Special Promo This Month!',
        promoDescription: 'Get Special Interest up to 0.8%.',
        navTitle: 'Special Interest 0.8%',
        image: '/image/promo1.png',
    },
    {
        id: 2,
        promoTitle: 'Free Admin for Credit!',
        promoDescription: 'No minimum credit. Valid until July 31.',
        navTitle: 'Admin free',
        image: '/image/promo2.png',
    },
    {
        id: 3,
        promoTitle: 'Installment discount bonus',
        promoDescription: 'Ready to help with all your needs.',
        navTitle: 'Installment Bonus',
        image: '/image/promo3.png',
    },
];

const contentVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3, ease: 'easeIn' } },
};

const imageVariants: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.4, ease: 'easeIn' } },
};

const Promote: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const currentItem = promotionData[activeIndex];

    return (
        <section className="bg-white backdrop-blur-lg flex items-center justify-center px-4 py-8 sm:px-3 sm:py-6">
            <div className="w-full max-w-[90rem] h-auto lg:h-[50vh] flex flex-col lg:flex-row items-stretch overflow-hidden rounded-3xl shadow-2xl">

                {/* Kiri - Konten */}
                <div className="w-full lg:w-[40%]
                                bg-white/20 backdrop-blur-lg border border-white/30 text-blue-950
                                p-6 sm:p-5 md:p-10 lg:p-16 
                                rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl
                                flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={currentItem.promoTitle}
                                variants={contentVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold"
                            >
                                {currentItem.promoTitle}
                            </motion.h2>
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentItem.promoDescription}
                                variants={contentVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="text-sm sm:text-base md:text-base lg:text-lg font-light"
                            >
                                {currentItem.promoDescription}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <div className="mt-4 space-y-2 sm:space-y-3">
                        {promotionData.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveIndex(index)}
                                className={`block w-full text-left px-4 py-2 sm:px-5 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base font-medium
                                ${activeIndex === index
                                        ? 'bg-gray-100 text-orange-500 shadow-lg transform scale-[1.02]'
                                        : 'bg-gray-400/20 text-gray-700 hover:bg-gray-400/30'
                                    }`}
                            >
                                {item.navTitle}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Kanan - Gambar */}
                <div className="w-full lg:w-[62.5%] bg-white flex items-center justify-center p-4 sm:p-6">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentItem.image}
                            variants={imageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            src={currentItem.image}
                            alt={currentItem.promoTitle}
                            className="w-full h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-full object-contain"
                        />
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Promote;
