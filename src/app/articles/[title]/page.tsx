import { apiCall } from "@/helper/apiCall";
import * as React from "react";

interface IArticleDetailPageProps {
    params:Promise <{ title: string }>;
}

interface ArticleDetail {
    title: string;
}

const getDetail = async (title: string): Promise<ArticleDetail | undefined> => {
    try {
        const res = await apiCall.get(
            `/articles?where=%60title%60%20%3D%20'${title}'`
        );
        console.log(res.data[0]);
        return res.data[0] as ArticleDetail; 
    } catch (error) {
        console.log(error);
        return undefined; 
    }
};

const ArticleDetailPage = async ({params}:IArticleDetailPageProps) => {
    const { title } = await params;
    const detailData = await getDetail(title);

    if (!detailData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-gray-600">Article not found or an error occurred.</p>
            </div>
        );
    }

    const article = detailData as any;

    const formatTimestampToDate = (timestamp: number | string | undefined): string => {
        if (!timestamp) {
            return "N/A";
        }

        const numTimestamp = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;

        if (isNaN(numTimestamp)) {
            return "Invalid Date";
        }

        const date = new Date(numTimestamp);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };


    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-12">
            <div className="w-full bg-white shadow-lg rounded-lg px-8 py-8 md:px-16 lg:px-24">
                <div className="text-center mb-10">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Design</p>
                    <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                        {article.title}
                    </h1>
                </div>

                <div className="flex justify-center items-center space-x-8 text-gray-600 text-sm mb-12">
                    <div>
                        <p className="font-semibold">DATE</p>
                        <p>{formatTimestampToDate(article.created)}</p>
                    </div>
                    <div>
                        <p className="font-semibold">AUTHOR</p>
                        <p>Risal Ganteng</p>
                    </div>
                    <div>
                        <p className="font-semibold">READ</p>
                        <p>{article.readTime || "N/A"}</p>
                    </div>
                </div>
                <section id="content" className="mt-10 md:mx-31">
                    <div className="w-full rounded-4xl h-50 md:w-[75vw] md:h-[30vh] xl:h-[70vh] shadow-lg relative overflow-hidden">
                        {article.thumbnail && (
                            <img className="w-fit"
                                src={`https://picsum.photos/id/${Math.floor(Math.random() * 30
                                )}/1500/1000`}
                                alt={article.title || "Article Thumbnail"}
                            />
                        )}
                    </div>
                </section>
                <div className="flex justify-center mt-10">
                    {article.content ? (
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    ) : (
                        <p>No content available for this article.</p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default ArticleDetailPage;