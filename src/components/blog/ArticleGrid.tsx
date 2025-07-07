// components/ArticleGrid.tsx
// Pastikan nama file ini adalah ArticleGrid.tsx (atau sesuai dengan konvensi penamaan Anda)

import { ArticleCard } from './ArticleCard'; // Pastikan path ini benar relatif terhadap ArticleGrid.tsx
                                        // Contoh: jika ArticleGrid di components/ dan ArticleCard di components/,
                                        // maka './ArticleCard' itu benar.
                                        // Jika ArticleCard di components/ui/, mungkin '../ui/ArticleCard'
                                        // atau '@/components/ui/ArticleCard' jika Anda menggunakan alias path.
import { Article } from '@/lib/api'; // Menggunakan tipe Article dari lib/api

interface ArticleGridProps {
  articles: Article[]; // Ini adalah array artikel yang akan ditampilkan
  onArticleClick: (article: Article) => void;
}

export function ArticleGrid({ articles, onArticleClick }: ArticleGridProps) {
  // Tambahkan console.log di sini untuk memverifikasi data 'articles' yang diterima oleh grid
  console.log("ArticleGrid: Articles received:", articles);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Melakukan map pada array 'articles' untuk merender setiap ArticleCard */}
        {articles.map((article) => {
          // Tambahkan console.log untuk setiap artikel yang sedang di-map
          // console.log("ArticleGrid: Mapping article with objectId:", article?.objectId, "and title:", article?.title);

          // PENTING: Tambahkan pengecekan null/undefined pada 'article'
          // Meskipun seharusnya sudah divalidasi di sumber data, ini adalah guard tambahan.
          if (!article || !article.objectId) {
            console.warn("ArticleGrid: Skipping invalid article:", article);
            return null; // Jangan render jika artikel tidak valid atau tidak punya objectId
          }

          return (
            <ArticleCard
              key={article.objectId} // `key` harus unik. objectId adalah pilihan terbaik.
              article={article}     // Meneruskan objek artikel tunggal ke ArticleCard
              onClick={() => onArticleClick(article)}
            />
          );
        })}
      </div>
      
      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada artikel yang ditemukan.</p>
        </div>
      )}
    </div>
  );
}