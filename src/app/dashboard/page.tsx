// src/app/dashboard/page.tsx
'use client'; // Pastikan ini adalah Client Component

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArticleForm } from '@/components/dashboard/ArticleForm';
import { ArticleTable } from '@/components/dashboard/ArticleTable';
// Import hanya Article dan fungsi API dari '@/lib/api'
import { Article, fetchArticles, createArticle, updateArticle, deleteArticle } from '@/lib/api';

// Asumsi ada komponen ArticleDetail jika Anda menggunakannya
// import { ArticleDetail } from '@/components/dashboard/ArticleDetail';

type View = 'table' | 'form' | 'detail';

export default function DashboardPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [currentView, setCurrentView] = useState<View>('table');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null); // State untuk artikel yang sedang diedit/dilihat

    // Effect untuk memuat artikel saat komponen dimuat
    useEffect(() => {
        const loadArticles = async () => {
            setLoading(true);
            try {
                const fetchedArticles = await fetchArticles();
                setArticles(fetchedArticles);
            } catch (error) {
                console.error("Failed to load articles:", error);
                alert("Gagal memuat daftar artikel.");
            } finally {
                setLoading(false);
            }
        };
        loadArticles();
    }, []);

    // Handler untuk menyimpan artikel (create atau update)
    // *** PERBAIKAN UTAMA DI SINI ***
    // Tipe parameter 'articleData' harus sama persis dengan yang diharapkan oleh ArticleForm
    const handleSaveArticle = async (articleData: Article | Omit<Article, 'objectId' | 'created' | 'updated' >) => {
        setSubmitting(true);
        try {
            // Kita cek keberadaan 'objectId' untuk menentukan apakah ini update atau create
            if ('objectId' in articleData && articleData.objectId) {
                // INI ADALAH UPDATE ARTIKEL YANG SUDAH ADA
                // updateArticle di api.ts menerima objectId dan Partial<Article>.
                // Kita perlu ekstrak objectId, dan sisanya akan menjadi payload update.
                // Lakukan type assertion ke Article karena kita tahu objectId-nya ada
                const { objectId, ...payloadForUpdate } = articleData as Article;

                const updatedArticle = await updateArticle(objectId, payloadForUpdate);
                setArticles(prevArticles =>
                    prevArticles.map(art =>
                        art.objectId === updatedArticle.objectId ? updatedArticle : art
                    )
                );
                alert('Artikel berhasil diperbarui!');
            } else {
                // INI ADALAH BUAT ARTIKEL BARU
                // createArticle di api.ts menerima Omit<Article, ...>
                // Lakukan type assertion ke Omit<Article, ...> karena kita tahu objectId-nya tidak ada
                const newArticle = await createArticle(articleData as Omit<Article, 'objectId' | 'created' | 'updated' | '__typename'>);
                setArticles(prevArticles => [...prevArticles, newArticle]);
                alert('Artikel berhasil ditambahkan!');
            }
            setCurrentView('table'); // Kembali ke tampilan tabel setelah menyimpan
            setSelectedArticle(null); // Reset artikel yang dipilih
        } catch (error) {
            console.error("Error saving article:", error);
            alert(`Gagal menyimpan artikel: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setSubmitting(false);
        }
    };

    // Handler untuk mengedit artikel
    const handleEditArticle = (article: Article) => {
        setSelectedArticle(article);
        setCurrentView('form'); // Pindah ke tampilan form
    };

    // Handler untuk menghapus artikel
    const handleDeleteArticle = async (objectId: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
            return;
        }
        setLoading(true); // Tampilkan loading saat proses hapus
        try {
            await deleteArticle(objectId);
            setArticles(prevArticles => prevArticles.filter(article => article.objectId !== objectId));
            alert('Artikel berhasil dihapus!');
        } catch (error) {
            console.error("Error deleting article:", error);
            alert(`Gagal menghapus artikel: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false); // Sembunyikan loading
        }
    };

    // Handler untuk kembali dari form/detail ke tabel
    const handleBack = () => {
        setCurrentView('table');
        setSelectedArticle(null);
    };

    // Handler untuk menambahkan artikel baru
    const handleAddArticle = () => {
        setSelectedArticle(null); // Pastikan tidak ada artikel yang dipilih (mode tambah baru)
        setCurrentView('form'); // Pindah ke tampilan form
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Artikel</h1>

            {/* Tombol "Tambah Artikel" hanya di tampilan tabel */}
            {currentView === 'table' && (
                <div className="mb-6 flex justify-end">
                    <Button
                        onClick={handleAddArticle}
                        className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Tambah Artikel Baru
                    </Button>
                </div>
            )}

            {/* Render komponen berdasarkan currentView */}
            {currentView === 'table' && (
                <ArticleTable
                    articles={articles}
                    loading={loading}
                    onEdit={handleEditArticle}
                    onDelete={handleDeleteArticle}
                />
            )}

            {currentView === 'form' && (
                <ArticleForm
                    article={selectedArticle}
                    onSave={handleSaveArticle} // Baris ini sekarang seharusnya tidak error
                    onCancel={handleBack}
                    isLoading={submitting}
                />
            )}

            {/* Jika Anda memiliki komponen ArticleDetail: */}
            {/* {currentView === 'detail' && selectedArticle && (
                <ArticleDetail
                    article={selectedArticle}
                    onBack={handleBack}
                />
            )} */}
        </div>
    );
}