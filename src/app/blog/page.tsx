'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Shield, Coins, CreditCard, Building, Users, Star } from 'lucide-react';
import { Article } from '@/types/blog'; // Pastikan path ini benar
import { BackendlessService } from '@/lib/backendlessArticle'; // Pastikan path ini benar
import { toast } from 'sonner';
import Link from 'next/link'; // Import Link dari next/link

const categories = [
    { name: "Technology", icon: TrendingUp, count: 24 },
    { name: "Security", icon: Shield, count: 18 },
    { name: "Cryptocurrency", icon: Coins, count: 15 },
    { name: "Payments", icon: CreditCard, count: 21 },
    { name: "Regulation", icon: Building, count: 12 },
    { name: "Customer Experience", icon: Users, count: 19 }
];

// Helper function to convert Backendless article to display format
const convertToDisplayFormat = (article: any): Article => {
    return {
        ...article,
        id: article.objectId,
        category: article.categoryy,
        image: article.thumbnail || 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800',
        excerpt: article.content ? article.content.substring(0, 150) + '...' : '',
        readTime: Math.ceil((article.content?.length || 0) / 200) + ' min read',
        // Pastikan format tanggal sesuai kebutuhan Anda.
        // BackendlessService.formatDate() akan lebih baik jika Anda memindahkannya ke sini atau menggunakannya secara langsung.
        date: article.created ? new Date(article.created).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        tags: article.categoryy ? [article.categoryy] : [],
        featured: article.publish || false
    };
};

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Article[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [loading, setLoading] = useState(true);

    // Load articles from Backendless
    useEffect(() => {
        const loadArticles = async () => {
            try {
                setLoading(true);
                const backendlessArticles = await BackendlessService.getPublishedArticles();
                const convertedArticles = backendlessArticles.map(convertToDisplayFormat);
                setArticles(convertedArticles);
                setFilteredPosts(convertedArticles);
            } catch (error) {
                console.error('Error loading articles:', error);
                toast.error('Failed to load articles');
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    // Filter articles based on search and category
    useEffect(() => {
        const filtered = articles.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === '' || post.categoryy === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        setFilteredPosts(filtered);
    }, [searchTerm, selectedCategory, articles]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative text-white pb-30 py-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=1600)' }}>
                <div className="absolute inset-0 bg-blue-900/70"></div>
                <div className="relative container mt-40 pb-20 mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <h2 className="text-5xl font-bold mb-6">
                            Discover the Future of <span className="text-amber-400">Banking</span>
                        </h2>
                        <p className="text-xl mb-8 text-blue-100">
                            Stay ahead with the latest insights, trends, and innovations in the banking industry
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                                <a href="https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/294/2025/01/07/Timothy-3551369361.jpg" target="_blank" rel="noopener noreferrer">
                                    Subscribe
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative mb-8">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 py-3 text-lg"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center">
                            <Button
                                variant={selectedCategory === '' ? 'default' : 'outline'}
                                onClick={() => setSelectedCategory('')}
                                className="mb-2"
                            >
                                All Categories
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category.name}
                                    variant={selectedCategory === category.name ? 'default' : 'outline'}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className="mb-2"
                                >
                                    <category.icon className="h-4 w-4 mr-2" />
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Articles */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold mb-12 text-center">Featured Articles</h3>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="animate-pulse">
                                    <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                                    <CardHeader>
                                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                        <div className="h-10 bg-gray-200 rounded"></div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No articles found</p>
                            <p className="text-gray-400">Try adjusting your search or category filter</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => (
                                <Card key={post.objectId || post.id} className={`card-hover animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                                        <img
                                            src={post.thumbnail || 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800'}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge variant="secondary" className="bg-blue-600 text-white">
                                                {post.categoryy}
                                            </Badge>
                                        </div>
                                        {post.featured && (
                                            <div className="absolute top-4 right-4">
                                                <Star className="h-5 w-5 text-amber-400 fill-current" />
                                            </div>
                                        )}
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl line-clamp-2 hover:text-blue-600 transition-colors">
                                            <Link href={`/articles/${post.slug || post.id}`} className="hover:underline">
                                                {post.title}
                                            </Link>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3">
                                            {post.excerpt || post.content?.substring(0, 150) + '...'}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <span>{post.author}</span>
                                            <span>{post.readTime || '5 min read'}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {(post.tags || [post.categoryy]).filter(Boolean).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        {/* Ubah Button menjadi Link */}
                                        <Link href={`/articles/${post.slug || post.id}`} passHref>
                                            <Button asChild className="w-full bg-gray-200 hover:bg-gray-300">
                                                <a>Read More</a>
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>


            {/* Newsletter Section */}
            <section className="py-16 gradient-banking text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
                        <p className="text-blue-100 mb-8">
                            Get the latest banking insights delivered to your inbox weekly
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white text-gray-900"
                            />

                            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                                <a href="https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/294/2025/01/07/Timothy-3551369361.jpg" target="_blank" rel="noopener noreferrer">
                                    Subscribe
                                </a>
                            </Button>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}