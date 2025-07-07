import { Plus, BarChart3, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardHeaderProps {
  onCreateArticle: () => void;
  totalArticles: number;
  publishedArticles: number;
}

export function DashboardHeader({ onCreateArticle, totalArticles, publishedArticles }: DashboardHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard Blog</h1>
            <p className="text-blue-100">Kelola konten blog perbankan Anda</p>
          </div>
          
          <Button
            onClick={onCreateArticle}
            className="bg-white text-blue-900 hover:bg-gray-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Buat Artikel Baru
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
              <FileText className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalArticles}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Artikel Dipublish</CardTitle>
              <BarChart3 className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedArticles}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalArticles - publishedArticles}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}