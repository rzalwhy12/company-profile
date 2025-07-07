// src/components/dashboard/ArticleTable.tsx
'use client';

import React from 'react';
import { Article } from '@/lib/api'; // Impor Article interface

interface ArticleTableProps {
    articles: Article[];
    loading: boolean; // <-- TAMBAHKAN INI
    onEdit: (article: Article) => void;
    onDelete: (id: string) => Promise<void>;

}

export function ArticleTable({ articles, loading, onEdit, onDelete }: ArticleTableProps) {
    if (loading) {
        return <div className="text-center py-10 text-gray-600">Memuat artikel...</div>;
    }

    if (articles.length === 0) {
        return <div className="text-center py-10 text-gray-600">Belum ada artikel.</div>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {articles.map((article) => (
                        <tr key={article.objectId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {article.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {article.slug}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.publish ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {article.publish ? 'Published' : 'Draft'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {/* Format tanggal jika 'created' adalah timestamp */}
                                {new Date(article.created).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => onEdit(article)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        if (article.objectId) {
                                            onDelete(article.objectId);
                                        } else {
                                            console.error("Attempted to delete article with missing objectId:", article);
                                            alert("Gagal menghapus: ID artikel tidak ditemukan.");
                                        }
                                    }}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}