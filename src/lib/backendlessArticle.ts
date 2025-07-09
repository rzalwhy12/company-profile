const BACKENDLESS_URL = 'https://focusedburst-us.backendless.app/api/data/articles';

export interface BackendlessArticle {
    objectId?: string;
    author: string;
    categoryy: string;
    content: string;
    publish: boolean;
    slug: string;
    thumbnail: string;
    title: string;
    created?: string;
    updated?: string;
}

export class BackendlessService {
    public static async request(endpoint: string, options: RequestInit = {}) {
        const url = endpoint.startsWith('http') ? endpoint : `${BACKENDLESS_URL}${endpoint}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        return response.json();
    }
    static formatDate(isoDateString: string): string {
        const date = new Date(isoDateString);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        // Contoh: '05 Jul 2024'
        return date.toLocaleDateString('en-GB', options).replace(/\s/g, ' ').replace('.', '');
    }
    // Get all articles
    static async getArticles(): Promise<BackendlessArticle[]> {
        try {
            const articles = await this.request('');
            return Array.isArray(articles) ? articles : [];
        } catch (error) {
            console.error('Error fetching articles:', error);
            return [];
        }
    }

    // Get published articles only
    static async getPublishedArticles(): Promise<BackendlessArticle[]> {
        try {
            const articles = await this.request('?where=publish%3Dtrue');
            return Array.isArray(articles) ? articles : [];
        } catch (error) {
            console.error('Error fetching published articles:', error);
            return [];
        }
    }

    // Get article by ID
    static async getArticleById(id: string): Promise<BackendlessArticle | null> {
        try {
            return await this.request(`/${id}`);
        } catch (error) {
            console.error('Error fetching article:', error);
            return null;
        }
    }

    // Get article by slug
    static async getArticleBySlug(slug: string): Promise<BackendlessArticle | null> {
        try {
            const articles = await this.request(`?where=slug%3D'${encodeURIComponent(slug)}'`);
            return Array.isArray(articles) && articles.length > 0 ? articles[0] : null;
        } catch (error) {
            console.error('Error fetching article by slug:', error);
            return null;
        }
    }

    // Create new article
    static async createArticle(article: Omit<BackendlessArticle, 'objectId' | 'created' | 'updated'>): Promise<BackendlessArticle> {
        return this.request('', {
            method: 'POST',
            body: JSON.stringify(article),
        });
    }

    // Update article
    static async updateArticle(id: string, article: Partial<BackendlessArticle>): Promise<BackendlessArticle> {
        return this.request(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(article),
        });
    }

    // Delete article
    static async deleteArticle(id: string): Promise<void> {
        await this.request(`/${id}`, {
            method: 'DELETE',
        });
    }

    // Search articles
    static async searchArticles(query: string): Promise<BackendlessArticle[]> {
        try {
            const searchQuery = `title%20LIKE%20'%25${encodeURIComponent(query)}%25'%20OR%20content%20LIKE%20'%25${encodeURIComponent(query)}%25'`;
            const articles = await this.request(`?where=${searchQuery}`);
            return Array.isArray(articles) ? articles : [];
        } catch (error) {
            console.error('Error searching articles:', error);
            return [];
        }
    }

    // Get articles by category
    static async getArticlesByCategory(category: string): Promise<BackendlessArticle[]> {
        try {
            const articles = await this.request(`?where=categoryy%3D'${encodeURIComponent(category)}'`);
            return Array.isArray(articles) ? articles : [];
        } catch (error) {
            console.error('Error fetching articles by category:', error);
            return [];
        }
    }

    // Generate slug from title
    static generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
}