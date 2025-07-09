import { BackendlessArticle } from '@/lib/backendlessArticle';

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
    image: string;
    featured?: boolean;
}

export interface Article extends BackendlessArticle {
    id?: string;
    excerpt?: string;
    readTime?: string;
    tags?: string[];
    date?: string;
    featured?: boolean;
}

export interface BlogCategory {
    id: number;
    name: string;
    description: string;
    icon: string;
    count: number;
}

export interface BlogStats {
    totalPosts: number;
    totalViews: number;
    totalAuthors: number;
    totalCategories: number;
}