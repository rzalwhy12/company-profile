'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Calculator from '@/components/Calculator';
import Promote from '@/components/Promote';
import Article from '@/components/Article';


export default function Home() {
  return (
    <main>
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
      <About />
      <Promote />
      <Article />
      <div id='Calculator'>
      <Calculator />
      </div>
    </div>
    </main>
  );
}