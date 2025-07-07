// components/ArticleCard.tsx
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Article } from '@/lib/api'; // Menggunakan tipe Article dari lib/api

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  // Tambahkan console.log di sini untuk memverifikasi data 'article'
  // Ini sangat membantu debugging jika ada masalah data yang masuk
  // console.log("Rendering ArticleCard:", article); 

  // Pastikan objek article tidak null atau undefined
  // Ini adalah guard pertama jika ada artikel yang tidak valid masuk ke komponen
  if (!article) {
    console.warn("ArticleCard received an undefined or null article prop. Skipping render.");
    return null; // Atau Anda bisa mengembalikan UI placeholder/error di sini
  }

  // Definisikan URL gambar fallback secara terpusat untuk kemudahan
  const defaultImageUrl = 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400';

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          // Sumber gambar: gunakan article.thumbnail jika ada, jika tidak gunakan defaultImageUrl
          src={article.thumbnail || defaultImageUrl}
          // Alt text: gunakan article.title jika ada, jika tidak gunakan fallback
          alt={article.title || 'Gambar Artikel'} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          // Penanganan kesalahan saat gambar tidak bisa dimuat
          onError={(e) => {
            const target = e.currentTarget;
            // Jika src saat ini BUKAN default image URL (berarti ini thumbnail asli yang gagal),
            // maka ganti ke default image URL. Ini mencegah looping tanpa henti jika defaultImageUrl juga gagal.
            if (target.src !== defaultImageUrl) {
              target.src = defaultImageUrl;
              target.alt = 'Gambar Artikel Tidak Tersedia'; // Alt text untuk gambar fallback
              console.warn(`Failed to load image for "${article.title}". Using fallback image.`);
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-4 left-4 bg-blue-900 hover:bg-blue-800">
          {article.categoryy || 'Kategori Tidak Diketahui'} {/* Fallback untuk categoryy */}
        </Badge>
      </div>
      
      <CardHeader className="p-6">
        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-blue-800 transition-colors">
          {article.title || 'Judul Artikel Tidak Tersedia'} {/* Fallback untuk title */}
        </h3>
        <p className="text-gray-600 line-clamp-3 mt-2">
          {/* Pastikan article.content ada sebelum memanggil substring */}
          {article.content ? article.content.substring(0, 150) + '...' : 'Tidak ada konten artikel yang tersedia.'} 
        </p>
      </CardHeader>
      
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {/* Pastikan article.created ada sebelum memformat tanggal */}
            {article.created ? new Date(article.created).toLocaleDateString('id-ID') : 'Tanggal Tidak Diketahui'}
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            Admin
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
          className="text-blue-800 hover:text-blue-900 hover:bg-blue-50 group-hover:translate-x-1 transition-transform"
        >
          Baca Selengkapnya
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}