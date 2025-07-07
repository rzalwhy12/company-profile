// src/components/dashboard/ArticleForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '@/lib/api';

interface ArticleFormProps {
  article: Article | null; // <--- Pastikan ini Article | null
  onSave: (articleData: Article) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export function ArticleForm({ article, onSave, onCancel, isLoading }: ArticleFormProps) {
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    content: '',
    thumbnail: '',
    categoryy: '',
    publish: false,
    slug: ''
  });

  useEffect(() => {
    if (article) {
      setFormData({
        objectId: article.objectId,
        title: article.title,
        content: article.content,
        thumbnail: article.thumbnail || '',
        categoryy: article.categoryy || '',
        publish: article.publish,
        slug: article.slug || ''
      });
    } else {
      setFormData({
        title: '',
        content: '',
        thumbnail: '',
        categoryy: '',
        publish: false,
        slug: ''
      });
    }
  }, [article]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.slug) {
        alert("Judul, konten, dan slug tidak boleh kosong.");
        return;
    }
    await onSave(formData as Article);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{article ? 'Edit Artikel' : 'Tambah Artikel Baru'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Judul</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700 text-sm font-bold mb-2">Slug (URL Friendly)</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Contoh: artikel-ini-sangat-bagus</p>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Konten</label>
          <textarea
            id="content"
            name="content"
            value={formData.content || ''}
            onChange={handleChange}
            rows={10}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">URL Thumbnail</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryy" className="block text-gray-700 text-sm font-bold mb-2">Kategori</label>
          <input
            type="text"
            id="categoryy"
            name="categoryy"
            value={formData.categoryy || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="publish"
            name="publish"
            checked={formData.publish || false}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <label htmlFor="publish" className="text-gray-700 text-sm font-bold">Publikasikan</label>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 transition-colors"
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Artikel'}
          </button>
        </div>
      </form>
    </div>
  );
}