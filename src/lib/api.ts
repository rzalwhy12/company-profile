
const BASE_URL = `https://focusedburst-us.backendless.app/api/data/articles`; 

// =========================================================
// INTERFACES (DEFINISI TIPE DATA ARTIKEL)
// =========================================================

export interface Article {
    objectId: string;  
    title: string;
    content: string;
    thumbnail: string | null; 
    categoryy?: string; 
    publish: boolean; 
    slug: string; 
    created: number; 
    updated?: number; 
    __typename?: string; 
}


export type ArticlePayload = Omit<Article, 'objectId' | 'created' | 'updated' | '__typename'>;


function getHeaders() {
    return {
        "Content-Type": "application/json",
    };
}

// Fungsi untuk mendapatkan semua artikel
export async function fetchArticles(): Promise<Article[]> {
    try {
        const response = await fetch(BASE_URL, {
            headers: getHeaders(), 
            next: {
                revalidate: 60 
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText} - ${errorData.message || ''}`);
        }

        const data: Article[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error in fetchArticles:", error);
        throw error;
    }
}

// Fungsi untuk mendapatkan semua artikel (sering digunakan untuk generateStaticParams)
export async function fetchAllArticles(): Promise<Pick<Article, 'slug' | 'objectId'>[]> {
    try {
        const response = await fetch(`${BASE_URL}?property=slug%2CobjectId`, { // Hanya ambil slug dan objectId
            headers: getHeaders(), // Menggunakan helper function untuk headers
            cache: 'force-cache', // Cache hasil ini secara agresif
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch all articles for static params: ${response.status} ${response.statusText} - ${errorData.message || ''}`);
        }

        const data: Pick<Article, 'slug' | 'objectId'>[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error in fetchAllArticles:", error);
        throw error;
    }
}


// Fungsi untuk mendapatkan artikel berdasarkan slug
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const encodedSlug = encodeURIComponent(slug);
        const url = `${BASE_URL}?where=slug%3D'${encodedSlug}'`; //

        console.log("Server - Fetching from URL:", url);

        const response = await fetch(url, {
            headers: getHeaders(), // Menggunakan helper function untuk headers
            next: {
                revalidate: 60 // Revalidate data setiap 60 detik (SSR)
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch article by slug: ${response.status} ${response.statusText} - ${errorData.message || ''}`);
        }

        const data: Article[] = await response.json();
        console.log("Server - API Response (articles):", data);

        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error("Error in fetchArticleBySlug:", error);
        return null;
    }
}


// Fungsi untuk membuat artikel baru
export async function createArticle(articleData: ArticlePayload): Promise<Article> {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: getHeaders(), // Menggunakan helper function untuk headers
            body: JSON.stringify(articleData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create article: ${response.status} ${response.statusText} - ${errorData.message || ''}`);
        }

        const newArticle: Article = await response.json();
        return newArticle;
    } catch (error) {
        console.error("Error in createArticle:", error);
        throw error;
    }
}

// Fungsi untuk mengupdate artikel yang sudah ada
export async function updateArticle(objectId: string, articleData: Partial<ArticlePayload>): Promise<Article> {
    try {
        const response = await fetch(`${BASE_URL}/${objectId}`, {
            method: "PUT",
            headers: getHeaders(), // Menggunakan helper function untuk headers
            body: JSON.stringify(articleData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update article: ${response.status} ${response.statusText} - ${errorData.message || ''}`);
        }

        const updatedArticle: Article = await response.json();
        return updatedArticle;
    } catch (error) {
        console.error("Error in updateArticle:", error);
        throw error;
    }
}

// Fungsi untuk menghapus artikel
export async function deleteArticle(objectId: string): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/${objectId}`, {
            method: "DELETE",
            headers: getHeaders(), // Menggunakan helper function untuk headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete article: ${response.status} ${response.statusText} - ${errorData.message || ''}`);
        }
    } catch (error) {
        console.error("Error in deleteArticle:", error);
        throw error;
    }
}