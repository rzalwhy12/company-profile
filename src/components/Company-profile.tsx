'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const CompanyProfilePage: React.FC = () => {
    // Variants untuk seluruh section
    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    // Variants untuk teks (visi & misi)
    const textVariants: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    // Variants untuk gambar
    const imageVariants: Variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        // Mengubah min-h-screen menjadi h-[50vh] untuk 1/2 tinggi layar
        // Tambahkan flex dan flex-col agar konten di dalamnya bisa menyesuaikan
        <div className="bg-white text-gray-800 h-[50vh] flex flex-col font-sans overflow-x-hidden">

            {/* Vision & Mission Section - Sekarang menggunakan motion.div dengan sectionVariants */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Memicu animasi saat 30% elemen terlihat
                variants={sectionVariants} // Menerapkan sectionVariants di sini
                className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-grow"
            >
                <motion.div
                    // `textVariants` sudah diterapkan pada div ini, jadi tidak perlu `sectionVariants` lagi di sini
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={textVariants}
                    className="lg:pr-8"
                >
                    <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-2">Visi Kami</h3> {/* Mengurangi ukuran font */}
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed"> {/* Mengurangi ukuran font */}
                        Menjadi BPR terdepan yang inovatif dan terpercaya dalam membangun ekosistem keuangan yang berkelanjutan, mendukung pertumbuhan ekonomi lokal, dan meningkatkan kesejahteraan masyarakat secara digital.
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-orange-600 mt-4 mb-2">Misi Kami</h3> {/* Mengurangi ukuran font, mt */}
                    <ul className="list-disc list-inside text-sm md:text-base text-gray-700 leading-relaxed space-y-1"> {/* Mengurangi ukuran font, space-y */}
                        <li>Memberikan solusi keuangan yang adaptif dan inklusif dengan memanfaatkan teknologi terkini.</li>
                        <li>Membangun hubungan jangka panjang yang didasari kepercayaan dan transparansi.</li>
                        <li>Mengembangkan sumber daya manusia yang kompeten dan berintegritas tinggi.</li>
                        <li>Berkomitmen pada praktik bisnis yang bertanggung jawab secara sosial dan lingkungan.</li>
                    </ul>
                </motion.div>
                <motion.div
                    // `imageVariants` sudah diterapkan pada div ini, jadi tidak perlu `sectionVariants` lagi di sini
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={imageVariants}
                    className="relative w-full h-40 md:h-80 lg:h-full rounded-2xl overflow-hidden shadow-xl border border-gray-300"
                >
                    <Image
                        src="/image/HUT-SDA-7.jpg"
                        alt="Our Vision"
                        layout="fill"
                        objectFit="cover"
                        quality={80}
                        className="transition-transform duration-500 hover:scale-105"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CompanyProfilePage;