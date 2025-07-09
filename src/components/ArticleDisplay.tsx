// src/components/ArticleDisplay.tsx
// Hapus 'use client'; karena ini akan menjadi Server Component

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, CalendarDays, User, Tag } from 'lucide-react';
import { BackendlessArticle, BackendlessService } from '@/lib/backendlessArticle'; // Sesuaikan path

interface ArticleDisplayProps {
    article: BackendlessArticle; // Menerima artikel sebagai props
}

// Ini sekarang adalah Server Component
export default function ArticleDisplay({ article }: ArticleDisplayProps) {
    return (
        <div className="bg-gray-50 min-h-screen py-10 md:py-16">
            <div className="container mx-auto px-4">
                <article className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden animate-fade-in-up">
                    {/* Tombol kembali ke daftar artikel */}
                    <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-100">
                        <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                            <ChevronLeft className="w-5 h-5 mr-1" /> Kembali ke Daftar Artikel
                        </Link>
                    </div>

                    {/* Thumbnail Artikel */}
                    {article.thumbnail && (
                        <div className="relative w-full h-64 md:h-96 overflow-hidden">
                            <Image
                                src={article.thumbnail}
                                alt={article.title || 'Article Image'}
                                // layout="fill" // layout="fill" adalah default di Next.js 13+ Image jika parent punya posisi relatif
                                fill // Gunakan prop 'fill'
                                objectFit="cover"
                                quality={90}
                                className="transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    )}

                    {/* Konten Artikel */}
                    <div className="p-6 md:p-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight">
                            {article.title || 'Untitled Article'}
                        </h1>

                        <div className="text-gray-600 text-sm md:text-base mb-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                            {article.author && (
                                <span className="flex items-center">
                                    <User className="w-4 h-4 mr-1.5 text-gray-500" />
                                    By <span className="font-semibold ml-1">{article.author}</span>
                                </span>
                            )}
                            {article.created && (
                                <span className="flex items-center">
                                    <CalendarDays className="w-4 h-4 mr-1.5 text-gray-500" />
                                    On <span className="font-semibold ml-1">{BackendlessService.formatDate(article.created)}</span>
                                </span>
                            )}
                            {article.categoryy && (
                                <span className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                    <Tag className="w-3.5 h-3.5 mr-1" />
                                    {article.categoryy}
                                </span>
                            )}
                        </div>

                        <div
                            className="prose prose-lg md:prose-xl max-w-none text-gray-800 leading-relaxed break-words"
                            dangerouslySetInnerHTML={{ __html: article.content || 'No content available.' }}
                        />
                    </div>
                </article>
            </div>

            {/* Hapus blok <style jsx global> karena tidak berfungsi di Server Component */}
            {/* Pastikan CSS untuk .animate-fade-in-up ada di file globals.css Anda */}
        </div>
    );
}