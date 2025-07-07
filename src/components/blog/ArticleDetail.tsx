import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Article } from '@/lib/api';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

export function ArticleDetail({ article, onBack }: ArticleDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Blog
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-700 hover:bg-blue-600">
              {article.categoryy}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center space-x-6 text-blue-100">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(article.created || '').toLocaleDateString('id-ID')}
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Admin
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="relative">
              <img
                src={article.thumbnail || 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400'}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>
            
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {article.content}
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    Artikel ini telah dibaca dan diverifikasi oleh tim editorial kami.
                  </p>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Bagikan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}