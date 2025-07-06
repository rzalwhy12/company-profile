'use client'; // Pastikan ini ada di baris paling atas

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'; // Menggunakan ikon dari lucide-react

// --- Interface untuk data artikel ---
interface ArticleItem {
    id: number;
    image: string;
    title: string;
    description: string; // Deskripsi singkat atau tag yang muncul di bawah judul
    date: string;
}

// --- Data Dummy Artikel ---
const articles: ArticleItem[] = [
    {
        id: 1,
        image: '/image/articles/1.jpg', // Ganti dengan path gambar Anda
        title: 'BPR SDA Percepat Digitalisasi Kredit dengan AI EStates',
        description: 'BPR SDA berkolaborasi dengan AI EStates untuk percepatan proses kredit.',
        date: '05 Jul 2024',
    },
    {
        id: 2,
        image: '/image/articles/3.jpeg', // Ganti dengan path gambar Anda
        title: 'Informasi Perubahan Nomor Virtual Account (VA) BCA Top Up Saldo',
        description: 'Berlaku efektif mulai tanggal 25 Juni 2024, ada perubahan nomor VA BCA untuk Top Up Saldo.',
        date: '28 Jun 2024',
    },
    {
        id: 3,
        image: '/image/articles/2.jpg', // Ganti dengan path gambar Anda
        title: 'Frugal Living, Bagaimana Cara Mencapainya?',
        description: 'Pelajari tips dan trik untuk menerapkan gaya hidup hemat dan cerdas finansial.',
        date: '31 May 2024',
    },
    {
        id: 4,
        image: '/image/articles/4.jpeg', // Contoh gambar tambahan
        title: 'Inovasi Layanan Terbaru untuk Kemudahan Transaksi Anda',
        description: 'Kami menghadirkan fitur-fitur baru di aplikasi mobile banking kami.',
        date: '20 May 2024',
    },
    {
        id: 5,
        image: '/image/articles/5.jpg', // Contoh gambar tambahan
        title: 'Tips Aman Bertransaksi Online dengan Universal BPR',
        description: 'Jaga keamanan data Anda dengan panduan bertransaksi online yang aman.',
        date: '15 May 2024',
    },
    {
        id: 6,
        image: '/image/articles/6.jpg', // Contoh gambar tambahan
        title: 'Investasi Cerdas: Pilihan Tepat untuk Masa Depan Anda',
        description: 'Mulai investasi dengan produk unggulan dari BPR SDA.',
        date: '10 May 2024',
    },
];

// --- Komponen Card Artikel ---
const ArticleCard: React.FC<{ article: ArticleItem }> = ({ article }) => {
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Animasi sekali saat masuk viewport
            className="flex-none w-[320px] md:w-[360px] lg:w-[380px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 mx-3" // mx-3 untuk jarak antar kartu
        >
            <div className="relative w-full h-48 overflow-hidden">
                <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2 truncate">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.description}</p>
                <div className="flex justify-between items-center text-gray-500 text-xs">
                    <span>{article.date}</span>
                    <a href="#" className="text-blue-700 hover:text-blue-900 flex items-center group">
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

// --- Komponen Utama Artikel ---
const Article: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollSpeed = useRef(1); // Kecepatan scroll, bisa diatur
    const animationFrameId = useRef<number | null>(null);
    const [isHovered, setIsHovered] = useState(false); // Untuk menghentikan auto-scroll saat hover

    // Fungsi untuk melakukan auto-scroll
    const autoScroll = useCallback(() => {
        if (scrollContainerRef.current && !isHovered) {
            scrollContainerRef.current.scrollLeft += scrollSpeed.current;

            // Jika sudah mencapai akhir, kembali ke awal untuk efek looping
            if (scrollContainerRef.current.scrollLeft >= scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth) {
                scrollContainerRef.current.scrollLeft = 0; // Langsung kembali ke awal
            }
        }
        animationFrameId.current = requestAnimationFrame(autoScroll);
    }, [isHovered]);

    useEffect(() => {
        // Memulai auto-scroll
        animationFrameId.current = requestAnimationFrame(autoScroll);

        // Cleanup saat komponen dilepas
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [autoScroll]);

    // Fungsi untuk navigasi manual
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -400, // Scroll 400px ke kiri
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 400, // Scroll 400px ke kanan
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-12">
                    The latest information from us
                </h2>

                {/* Carousel Container */}
                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        onMouseEnter={() => setIsHovered(true)} // Hentikan auto-scroll saat mouse masuk
                        onMouseLeave={() => setIsHovered(false)} // Lanjutkan auto-scroll saat mouse keluar
                        className="flex overflow-x-auto pb-6 custom-scrollbar" // custom-scrollbar untuk styling scrollbar
                        style={{ scrollBehavior: 'auto' }} // Tetapkan ke 'auto' agar scroll manual dan auto-scroll tidak bertabrakan dengan 'smooth'
                    >
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                        {/* Duplicate cards for a seamless loop effect (optional, but good for carousels) */}
                        {articles.map((article) => (
                            <ArticleCard key={`loop-${article.id}`} article={article} />
                        ))}
                    </div>

                    {/* Navigation Arrows (Optional, bisa disembunyikan jika hanya auto-scroll) */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-10">
                        <button
                            onClick={scrollLeft}
                            className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors hidden md:block"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors hidden md:block"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Lihat Selengkapnya Link */}
                <div className="text-center mt-12">
                    <a href="#" className="inline-flex items-center text-orange-400 font-semibold text-lg hover:text-orange-600 transition-colors">
                        see more
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Custom Scrollbar Styling (Tambahkan ini di file CSS global Anda, misal globals.css) */}
            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
            height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 10px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #aaa;
            }
        `}</style>
        </section>
    );
};

export default Article;