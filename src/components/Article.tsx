'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';


import { BackendlessService, BackendlessArticle } from '@/lib/backendlessArticle';

// --- Komponen Card Artikel (sedikit diubah agar kompatibel dengan BackendlessArticle) ---
const ArticleCard: React.FC<{ article: BackendlessArticle }> = ({ article }) => {
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    // Pastikan properti seperti `title`, `thumbnail`, `created` ada
    // Berikan nilai default atau lakukan pengecekan jika properti mungkin `undefined`
    const imageUrl = article.thumbnail || '/placeholder-image.jpg'; // Gambar placeholder jika tidak ada thumbnail
    const title = article.title || 'No Title';
    const description = article.content ? article.content.substring(0, 100) + '...' : 'No description available.'; // Gunakan sebagian content sebagai deskripsi
    const date = article.created ? BackendlessService.formatDate(article.created) : 'Unknown Date';

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex-none w-[320px] md:w-[360px] lg:w-[380px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 mx-3"
        >
            <div className="relative w-full h-48 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    className="transition-transform duration-500 hover:scale-105"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2 truncate">{title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
                <div className="flex justify-between items-center text-gray-500 text-xs">
                    <span>{date}</span>
                    <a href={`/articles/${article.slug || article.objectId}`} className="text-blue-700 hover:text-blue-900 flex items-center group">
                        Read More
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
    const scrollSpeed = useRef(1);
    const animationFrameId = useRef<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [articles, setArticles] = useState<BackendlessArticle[]>([]); // State untuk menyimpan artikel dari Backendless
    const [loading, setLoading] = useState(true); // State untuk loading
    const [error, setError] = useState<string | null>(null); // State untuk error

    // --- Ambil data artikel dari Backendless saat komponen di-mount ---
    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedArticles = await BackendlessService.getPublishedArticles();
                setArticles(fetchedArticles);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch articles.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []); // Array dependensi kosong agar hanya berjalan sekali saat mount

    // Fungsi untuk melakukan auto-scroll
    const autoScroll = useCallback(() => {
        if (scrollContainerRef.current && !isHovered && articles.length > 0) { // Pastikan ada artikel sebelum scroll
            scrollContainerRef.current.scrollLeft += scrollSpeed.current;

            // Logika looping: gulir kembali ke awal ketika mencapai setengah dari lebar konten
            // Ini akan bekerja lebih baik dengan duplikasi kartu
            const scrollWidth = scrollContainerRef.current.scrollWidth;
            const clientWidth = scrollContainerRef.current.clientWidth;

            // Jika sudah scroll melewati "set" kartu pertama, reset ke awal set kedua
            // Ini asumsi kita menduplikasi set kartu yang sama persis
            if (scrollContainerRef.current.scrollLeft >= scrollWidth / 2) {
                 scrollContainerRef.current.scrollLeft -= (scrollWidth / 2); // Kembali ke awal set duplikat
            }
        }
        animationFrameId.current = requestAnimationFrame(autoScroll);
    }, [isHovered, articles.length]); // Tambahkan articles.length sebagai dependency

    useEffect(() => {
        // Memulai auto-scroll hanya jika ada artikel dan tidak sedang loading/error
        if (!loading && !error && articles.length > 0) {
            animationFrameId.current = requestAnimationFrame(autoScroll);
        }

        // Cleanup saat komponen dilepas atau ketika kondisi berubah
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [autoScroll, loading, error, articles.length]); // Tambahkan dependencies

    // Fungsi untuk navigasi manual
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -400,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 400,
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

                {loading && <p className="text-center text-gray-600">Loading articles...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>}
                {!loading && !error && articles.length === 0 && (
                    <p className="text-center text-gray-600">No published articles found.</p>
                )}

                {!loading && !error && articles.length > 0 && (
                    <div className="relative">
                        <div
                            ref={scrollContainerRef}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="flex overflow-x-auto pb-6 custom-scrollbar"
                            style={{ scrollBehavior: 'auto' }}
                        >
                            {/* Render artikel dua kali untuk efek looping mulus */}
                            {articles.map((article) => (
                                <ArticleCard key={article.objectId} article={article} />
                            ))}
                            {articles.map((article) => (
                                <ArticleCard key={`loop-${article.objectId}`} article={article} />
                            ))}
                        </div>

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
                )}

                <div className="text-center mt-12">
                    <a href="/articles" className="inline-flex items-center text-orange-400 font-semibold text-lg hover:text-orange-600 transition-colors">
                        see more
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Pastikan styling ini berada di file CSS global Anda, misal globals.css */}
            {/* <style jsx global>{`
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
            `}</style> */}
        </section>
    );
};

export default Article;