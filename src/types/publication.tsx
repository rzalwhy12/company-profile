// src/types/publication.ts atau src/utils/publicationTypes.ts

export type DocumentType = 'pdf' | 'excel' | 'word';

export interface Document {
    name: string;
    year: string;
    link: string;
    type: DocumentType;
}

export type PublicationSection = 'financial-report' | 'annual-report' | 'idic-lps' | 'information' | 'report';

export interface PublicationContentItem {
    title: string;
    content?: React.ReactNode;
    documents?: Document[];
}

export interface BreadcrumbItem {
    label: string;
    href: string;
}

// Helper function to get the correct icon based on document type
export const getFileIcon = (type: DocumentType) => {
    switch (type) {
        case 'pdf':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 9V3.5L18.5 9H13z" />
                    <path d="M16 16.5c-.28 0-.5.22-.5.5s.22.5.5.5h1c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1zM16 19.5c-.28 0-.5.22-.5.5s.22.5.5.5h1c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1zM10 16.5c-.28 0-.5.22-.5.5s.22.5.5.5h1c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1zM10 19.5c-.28 0-.5.22-.5.5s.22.5.5.5h1c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1zM13 16.5c-.28 0-.5.22-.5.5s.22.5.5.5h1c-.28 0-.5.22-.5.5s.22.5.5.5h-1zM13 19.5c-.28 0-.5.22-.5.5s.22.5.5.5h1c-.28 0-.5.22-.5.5s.22.5.5.5h-1z" />
                </svg>
            );
        case 'excel':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 9V3.5L18.5 9H13z" />
                    <path d="M11 15h2v2h-2v-2zM11 12h2v2h-2v-2zM15 15h2v2h-2v-2zM15 12h2v2h-2v-2zM7 12h2v2H7v-2zM7 15h2v2H7v-2z" />
                </svg>
            );
        case 'word':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 9V3.5L18.5 9H13z" />
                    <path d="M12 17c1.38 0 2.5-1.12 2.5-2.5S13.38 12 12 12s-2.5 1.12-2.5 2.5.94 2.5 2.5 2.5zM12 15.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
            );
        default:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 9H6.5c-1.38 0-2.5 1.12-2.5 2.5V17h1v-5.5c0-.83.67-1.5 1.5-1.5H13V9zm0 0h5V3h-5v6zm0-4.5h3.5v3.5H13V4.5z" />
                </svg>
            );
    }
};