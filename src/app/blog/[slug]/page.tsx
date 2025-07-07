

import { Button } from "@/components/ui/button";
import { fetchArticleBySlug, fetchAllArticles, Article } from "@/lib/api";
import Link from "next/link";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom'; // JSDOM hanya dibutuhkan di lingkungan Node.js (server)
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { FormattedDate } from "@/components/FormattedDate";


interface ArticleDetailPageProps {
    params: {
        slug: string;
    };
}

export default async function ArticleDetailPage({
    params, // Dapatkan seluruh objek params
}: ArticleDetailPageProps) { // Gunakan interface yang kita definisikan
    const slug = params.slug; // Akses slug langsung dari params

    console.log("Server Component - Fetching article for slug:", slug); // Log untuk debugging

    let article: Article | null = null;
    let errorMessage: string | null = null;

    try {
        if (!slug) {
            errorMessage = "Slug artikel tidak ditemukan di URL.";
        } else {
            // Panggil fungsi fetchArticleBySlug dari lib/api
            article = await fetchArticleBySlug(slug);

            if (!article) {
                errorMessage = `Artikel dengan slug "${slug}" tidak ditemukan.`;
            }
        }
    } catch (error) {
        console.error("Error fetching article in ArticleDetailPage:", error);
        errorMessage =
            error instanceof Error
                ? `Gagal memuat artikel: ${error.message}`
                : "Gagal memuat artikel. Silakan coba lagi.";
    }

    // Tampilkan pesan error atau tombol kembali jika artikel tidak ditemukan atau ada error
    if (errorMessage || !article) {
        return (
            <div className="min-h-screen container mx-auto py-10 text-center text-gray-700">
                <p className="text-lg font-medium">{errorMessage}</p>
                <Link href="/blog">
                    <Button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors">
                        Kembali ke Blog
                    </Button>
                </Link>
            </div>
        );
    }

    // =========================================================
    // SANITASI KONTEN HTML
    // =========================================================
    // Penting untuk membersihkan konten HTML dari XSS (Cross-Site Scripting)
    // JSDOM dan DOMPurify digunakan di sisi server.
    let cleanContent = article.content;
    try {
        // Buat instance JSDOM hanya untuk DOMPurify
        const dom = new JSDOM('<!DOCTYPE html>');
        // Inisialisasi DOMPurify dengan window dari JSDOM
        const purify = DOMPurify(dom.window);
        // Sanitasi konten, izinkan profil HTML penuh
        cleanContent = purify.sanitize(article.content, {
            USE_PROFILES: { html: true }, // Izinkan tag HTML umum
            // Tambahkan opsi lain jika diperlukan, misal: ALLOW_DATA_ATTR: false
        });
    } catch (e) {
        console.warn("Sanitasi konten artikel gagal. Menggunakan konten asli (POTENSI BAHAYA XSS).", e);
        // Fallback ke konten asli jika sanitasi gagal (hati-hati dengan XSS)
        cleanContent = article.content;
    }

    // =========================================================
    // RENDERING HALAMAN DETAIL ARTIKEL
    // =========================================================
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            {/* Judul Artikel */}
            <h1 className="text-4xl font-extrabold text-blue-900 mb-6 leading-tight">
                {article.title || "Judul Tidak Tersedia"}
            </h1>

            {/* Tanggal Publikasi */}
            {/* Asumsi 'created' adalah number (Unix timestamp) dari Backendless */}
            <p className="text-gray-600 text-sm mb-6">
                Dipublikasikan pada: <FormattedDate dateString={String(article.created)} />
            </p>

            {/* Gambar Thumbnail */}
            <ImageWithFallback
                src={article.thumbnail || ""} // Berikan string kosong jika null untuk ImageWithFallback
                alt={article.title || "Gambar Artikel"}
                className="w-full h-auto rounded-lg mb-8 object-cover max-h-96 shadow-lg"
                width={800} // Tambahkan width dan height untuk optimasi gambar Next.js
                height={450}
            />

            {/* Konten Artikel */}
            {/* Gunakan dangerouslySetInnerHTML untuk menampilkan HTML yang telah disanitasi */}
            <div
                className="text-gray-800 leading-relaxed prose prose-blue max-w-none break-words" // break-words untuk menghindari overflow teks panjang
                dangerouslySetInnerHTML={{ __html: cleanContent }}
            />

            {/* Tombol Kembali ke Blog */}
            <Link href="/blog">
                <Button className="mt-10 px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition-colors">
                    Kembali ke Blog
                </Button>
            </Link>
        </div>
    );
}

// =========================================================
// GENERATE STATIC PARAMS (UNTUK SSG/ISR)
// =========================================================
// Next.js akan memanggil fungsi ini saat build time untuk mengetahui semua `slug`
// yang harus digenerate sebagai halaman HTML statis.
export async function generateStaticParams() {
    console.log("Generating static params for blog posts...");
    try {
        // Panggil fungsi API Anda untuk mendapatkan daftar artikel (cukup slugnya saja)
        const articles = await fetchAllArticles(); // Asumsi ini mengembalikan { slug: string }[]

        if (!articles || articles.length === 0) {
            console.warn("No articles found to generate static params. Returning empty array.");
            return [];
        }

        const params = articles.map((article) => ({
            slug: article.slug,
        }));
        console.log(`Generated ${params.length} static params.`);
        return params;
    } catch (error) {
        console.error("Failed to generate static params for blog posts:", error);
        return [];
    }
}

