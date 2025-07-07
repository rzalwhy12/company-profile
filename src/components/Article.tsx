// src/components/Article.tsx
'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
// Pastikan path ke lib/api Anda benar
import { fetchArticles, Article as BackendlessArticle } from '@/lib/api'; 
import Link from 'next/link';

interface DisplayArticleItem {
    id: string; // Ini adalah objectId dari Backendless
    image: string; // <-- Ubah ini menjadi string SAJA, karena kita akan menyediakan fallback
    title: string;
    description: string;
    date: string;
    slug: string;
}

// --- Komponen Card Artikel ---
const ArticleCard: React.FC<{ article: DisplayArticleItem }> = ({ article }) => {
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    // Default image jika article.image kosong atau tidak valid
    const defaultImage = 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400';

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex-none w-[320px] md:w-[360px] lg:w-[380px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 mx-3"
        >
            <div className="relative w-full h-48 overflow-hidden">
                <img
                    src={article.image || defaultImage} // Gunakan defaultImage jika article.image kosong
                    alt={article.title}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== defaultImage) { // Hanya ganti jika belum fallback
                            target.src = defaultImage;
                            target.alt = 'Image not available';
                        }
                    }}
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2 truncate">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.description}</p>
                <div className="flex justify-between items-center text-gray-500 text-xs">
                    <span>{article.date}</span>
                    <Link href={`/blog/${article.slug}`} className="text-blue-700 hover:text-blue-900 flex items-center group">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

// --- Komponen Utama Artikel ---
const Article: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollSpeed = useRef(0);
    const animationFrameId = useRef<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [articles, setArticles] = useState<DisplayArticleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from API
    useEffect(() => {
        const getArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedArticles: BackendlessArticle[] = await fetchArticles();
                const mappedArticles: DisplayArticleItem[] = fetchedArticles
                    .filter(article => article.publish) // Filter hanya artikel yang dipublikasikan
                    .map(article => ({
                        id: article.objectId, // objectId harus string, dan diasumsikan selalu ada dari Backendless
                        image: article.thumbnail || 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400', // <-- SOLUSI: Pastikan selalu string
                        title: article.title,
                        description: article.content, // Konten mungkin perlu dipendekkan atau dibersihkan
                        slug: article.slug, // Pastikan slug ada di BackendlessArticle
                        date: article.created
                            ? new Date(article.created).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                            : 'Unknown Date',
                    }));
                setArticles(mappedArticles);
            } catch (err) {
                console.error("Failed to fetch articles:", err);
                setError("Failed to load articles. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        getArticles();
    }, []);

    // Auto-scroll logic (akan menggulir hingga akhir dan berhenti)
    const autoScroll = useCallback(() => {
        if (scrollContainerRef.current && !isHovered && scrollSpeed.current > 0) {
            const currentScroll = scrollContainerRef.current.scrollLeft;
            const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

            if (currentScroll < maxScroll) {
                scrollContainerRef.current.scrollLeft += scrollSpeed.current;
                animationFrameId.current = requestAnimationFrame(autoScroll);
            } else {
                if (animationFrameId.current) {
                    cancelAnimationFrame(animationFrameId.current);
                    animationFrameId.current = null;
                }
            }
        }
    }, [isHovered]);

    useEffect(() => {
        if (articles.length > 0 && scrollSpeed.current > 0) {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            animationFrameId.current = requestAnimationFrame(autoScroll);
        }

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        };
    }, [autoScroll, articles.length]);

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

                {loading ? (
                    <div className="text-center py-10 text-gray-600">Loading articles...</div>
                ) : error ? (
                    <div className="text-center py-10 text-red-600">{error}</div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-10 text-gray-600">No articles found.</div>
                ) : (
                    <div className="relative">
                        <div
                            ref={scrollContainerRef}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="flex overflow-x-auto pb-6 custom-scrollbar"
                            style={{ scrollBehavior: 'auto' }}
                        >
                            {articles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>

                        {/* Navigation Arrows */}
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

                {/* Lihat Selengkapnya Link */}
                <div className="text-center mt-12">
                    <Link href="/blog" className="inline-flex items-center text-orange-400 font-semibold text-lg hover:text-orange-600 transition-colors">
                        see more
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Article;