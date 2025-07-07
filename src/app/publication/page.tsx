import { Suspense } from 'react';
import PublicationContent from '@/components/PublicationContentWrapper';

export default function PublicationPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div
                className="relative h-64 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
                style={{
                    backgroundImage: "url('/image/buka-simpanan.jpg')",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1
                    // Kelas CSS untuk animasi fade-in-up (didefinisikan di globals.css)
                    className="relative z-10 text-4xl sm:text-5xl font-bold text-center drop-shadow-lg
                                opacity-0 transform translate-y-12 transition-all duration-800 ease-out animate-fade-in-up"
                >
                    Our Publications & Reports
                </h1>
            </div>
            <Suspense fallback={
                <div className="flex justify-center items-center py-20 px-6 sm:px-10">
                    <p>Loading publication content...</p>
                </div>
            }>
                <PublicationContent />
            </Suspense>
        </div>
    );
}