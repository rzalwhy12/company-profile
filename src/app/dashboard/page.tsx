'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    BarChart3,
    Users,
    FileText,
    TrendingUp,
    Search,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { Article, BlogStats } from '@/types/blog';
import { BackendlessService, BackendlessArticle } from '@/lib/backendlessArticle';


const categories = ["Technology", "Security", "Regulation", "Payments", "Innovation", "Customer Experience"];

// Helper function to convert Backendless article to display format
const convertToDisplayFormat = (article: BackendlessArticle): Article => {
    return {
        ...article,
        id: article.objectId,
        categoryy: article.categoryy,
        thumbnail: article.thumbnail || 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800',
        excerpt: article.content ? article.content.substring(0, 150) + '...' : '',
        readTime: Math.ceil((article.content?.length || 0) / 200) + ' min read',
        date: article.created ? new Date(article.created).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        tags: article.categoryy ? [article.categoryy] : [],
        featured: article.publish || false
    };
};
export default function Dashboard() {
    const [posts, setPosts] = useState<Article[]>([]);
    const [editingPost, setEditingPost] = useState<Article | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [newPost, setNewPost] = useState<Omit<BackendlessArticle, 'objectId' | 'created' | 'updated'>>({
        title: '',
        content: '',
        author: '',
        categoryy: '',
        slug: '',
        thumbnail: '',
        publish: false
    });

    // Load articles from Backendless
    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        try {
            setLoading(true);
            const backendlessArticles = await BackendlessService.getArticles();
            const convertedArticles = backendlessArticles.map(convertToDisplayFormat);
            setPosts(convertedArticles);
        } catch (error) {
            console.error('Error loading articles:', error);
            toast.error('Failed to load articles');
        } finally {
            setLoading(false);
        }
    };

    const stats: BlogStats = {
        totalPosts: posts.length,
        totalViews: 15420,
        totalAuthors: 8,
        totalCategories: categories.length
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.categoryy === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSubmitting(true);

            // Generate slug if not provided
            const slug = newPost.slug || BackendlessService.generateSlug(newPost.title);
            const articleData = { ...newPost, slug };

            if (editingPost && editingPost.objectId) {
                // Update existing post
                await BackendlessService.updateArticle(editingPost.objectId, articleData);
                toast.success('Article updated successfully!');
            } else {
                // Create new post
                await BackendlessService.createArticle(articleData);
                toast.success('Article created successfully!');
            }

            await loadArticles();
            resetForm();
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error saving article:', error);
            toast.error('Failed to save article');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (post: Article) => {
        setEditingPost(post);
        setNewPost({
            title: post.title,
            content: post.content,
            author: post.author,
            categoryy: post.categoryy,
            slug: post.slug,
            thumbnail: post.thumbnail,
            publish: post.publish
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (post: Article) => {
        if (!post.objectId) return;

        try {
            await BackendlessService.deleteArticle(post.objectId);
            await loadArticles();
            toast.success('Article deleted successfully!');
        } catch (error) {
            console.error('Error deleting article:', error);
            toast.error('Failed to delete article');
        }
    };

    const resetForm = () => {
        setEditingPost(null);
        setNewPost({
            title: '',
            content: '',
            author: '',
            categoryy: '',
            slug: '',
            thumbnail: '',
            publish: false
        });
    };

    // Auto-generate slug when title changes
    const handleTitleChange = (title: string) => {
        const slug = BackendlessService.generateSlug(title);
        setNewPost({ ...newPost, title, slug });
    };

    const handleLogout = () => {
        localStorage.removeItem("tkn");
        window.location.href = "/sign-in";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="text-white sticky top-0 z-50 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=1600)' }}>
                <div className="absolute inset-0 bg-blue-900/70"></div>
                <div className="relative container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BarChart3 className="h-8 w-8" />
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/blog" target="_blank" rel="noopener noreferrer">
                                <Button variant="secondary" className="bg-amber-500 hover:bg-amber-600 text-white">
                                    View Blog
                                </Button>
                            </Link>
                            <Button 
                                onClick={handleLogout}
                                variant="ghost" 
                                className="text-white hover:bg-white/10"
                            >
                                Log Out
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="card-hover">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalPosts}</div>
                            <p className="text-xs text-muted-foreground">
                                +2 from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="card-hover">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                +15% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="card-hover">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Authors</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalAuthors}</div>
                            <p className="text-xs text-muted-foreground">
                                +1 from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="card-hover">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Categories</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalCategories}</div>
                            <p className="text-xs text-muted-foreground">
                                Active categories
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Actions and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map(category => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2" />
                                New Post
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingPost ? 'Edit Post' : 'Create New Post'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={newPost.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        required
                                        disabled={submitting}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        value={newPost.slug}
                                        onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })}
                                        required
                                        disabled={submitting}
                                        placeholder="article-url-slug"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                        rows={6}
                                        required
                                        disabled={submitting}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="author">Author</Label>
                                        <Input
                                            id="author"
                                            value={newPost.author}
                                            onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                                            required
                                            disabled={submitting}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="thumbnail">Thumbnail URL</Label>
                                        <Input
                                            id="thumbnail"
                                            value={newPost.thumbnail}
                                            onChange={(e) => setNewPost({ ...newPost, thumbnail: e.target.value })}
                                            placeholder="https://example.com/image.jpg"
                                            disabled={submitting}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={newPost.categoryy}
                                        onValueChange={(value) => setNewPost({ ...newPost, categoryy: value })}
                                        disabled={submitting}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(category => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="publish"
                                        checked={newPost.publish}
                                        onCheckedChange={(checked) => setNewPost({ ...newPost, publish: checked })}
                                        disabled={submitting}
                                    />
                                    <Label htmlFor="publish">Publish Article</Label>
                                </div>
                                <div className="flex gap-2">
                                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                                        {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                        {editingPost ? 'Update Article' : 'Create Article'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsDialogOpen(false)}
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Posts Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Blog Posts</CardTitle>
                        <CardDescription>
                            Manage your blog posts and content
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <span className="ml-2">Loading articles...</span>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPosts.map((post) => (
                                        <TableRow key={post.objectId}>
                                            <TableCell className="font-medium max-w-xs">
                                                <div className="truncate">{post.title}</div>
                                            </TableCell>
                                            <TableCell>{post.author}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{post.categoryy}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={post.publish ? "default" : "secondary"}>
                                                    {post.publish ? "Published" : "Draft"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {post.created ? new Date(post.created).toLocaleDateString() : 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEdit(post)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(post)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}