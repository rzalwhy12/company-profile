import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from 'react';
import StoreProvider from "./StoreProvider";
import { ToastContainer, toast } from 'react-toastify';



const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SDA - Solusi Perbankan Modern & Terpercaya',
  description: 'Layanan perbankan digital terdepan dengan teknologi modern untuk kebutuhan finansial Anda',
};

export default function RootLayout({

  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
<StoreProvider>
        <body className={inter.className}>
          <Suspense fallback={<div>Loading navigation...</div>}>
            <ToastContainer />
            <Navbar />
          </Suspense>
          <main className="min-h-screen pb-[72px]">
            {children}
          </main>
          <Footer />
        </body>
</StoreProvider>
    </html>
  );
}