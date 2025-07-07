// src/app/blog/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { ArticleGrid } from '@/components/blog/ArticleGrid';
import { ArticleDetail } from '@/components/blog/ArticleDetail';
import { fetchArticles, Article } from '@/lib/api';

export default function BlogPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadArticles();
    }, []);

    useEffect(() => {
        filterArticles();
    }, [articles, searchTerm, selectedCategory]);

    const loadArticles = async () => {
        setLoading(true);
        try {
            const data = await fetchArticles();
            const publishedArticles = data.filter(article => article.publish);
            setArticles(publishedArticles);

            // Extract unique categories, filtering out null/undefined/empty strings
            const uniqueCategories = [...new Set(
                publishedArticles
                    .map(article => article.categoryy)
                    .filter((category): category is string => typeof category === 'string' && category.trim() !== '') // Filter non-string, null, undefined, atau string kosong
            )];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Failed to load articles for blog:", error);
            // Anda bisa menambahkan state error di sini untuk menampilkan pesan ke pengguna
        } finally {
            setLoading(false);
        }
    };

    const filterArticles = () => {
        let filtered = articles;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter(article => article.categoryy === selectedCategory);
        }

        setFilteredArticles(filtered);
    };

    const handleArticleClick = (article: Article) => {
        setSelectedArticle(article);
    };

    const handleBackToGrid = () => {
        setSelectedArticle(null);
    };

    if (selectedArticle) {
        return <ArticleDetail article={selectedArticle} onBack={handleBackToGrid} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <BlogHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
            />

            {loading ? (
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center">
                        <p className="text-gray-500 text-lg">Memuat artikel...</p>
                    </div>
                </div>
            ) : (
                <ArticleGrid
                    articles={filteredArticles}
                    onArticleClick={handleArticleClick}
                />
            )}
        </div>
    );
}