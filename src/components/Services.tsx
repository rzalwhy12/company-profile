'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<1 | 2 | null>(null);

  const cardVariants: Variants = {
    initial: { opacity: 1, scale: 1, filter: 'blur(0px)', zIndex: 0, y: 0 },
    hovered: { scale: 1.05, y: -10, zIndex: 0 },
    blurred: { filter: 'blur(4px)', opacity: 0.7, scale: 0.98, y: 10 },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-white flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 font-[system-ui] pb-36 sm:pb-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="text-center max-w-3xl mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 leading-tight">
          Find Your Banking Solution
        </h1>
        <p className="mt-6 text-lg text-gray-700">
          Bank BPR Sumber Dana Anda has various financial products designed to suit your needs. Start your steps to realize your dreams with fast and easy loans and safe and profitable savings from 
          <span className="font-semibold text-blue-800"> BPR Sumber Dana Anda</span>.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl w-full">
        {/* Card 1 */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate={hoveredCard === 1 ? 'hovered' : hoveredCard === 2 ? 'blurred' : 'initial'}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          className="flex flex-col md:flex-row-reverse bg-white rounded-xl shadow-md overflow-hidden w-full transition-all duration-300"
        >
          <div className="md:w-1/2 h-[280px]">
            <motion.img
              src="/image/ajukan-pinjaman.jpg"
              alt="Ajukan Pinjaman"
              className="w-full h-full object-cover"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center p-6 text-center md:text-left">
            <h2 className="text-3xl font-bold text-orange-600 leading-snug">
              Apply for a Loan <br /> Fast & Easy
            </h2>
            <a
              href="/saving-loan?tab=financing-product"
              className="mt-4 text-lg text-orange-600 font-semibold inline-flex items-center gap-2 hover:text-orange-800 transition-colors"
            >
              Look here
              <span className="w-6 h-6 flex items-center justify-center rounded-full border border-orange-600">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate={hoveredCard === 2 ? 'hovered' : hoveredCard === 1 ? 'blurred' : 'initial'}
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden w-full transition-all duration-300"
        >
          <div className="md:w-1/2 h-[280px]">
            <motion.img
              src="/image/buka-simpanan.jpg"
              alt="Buka Simpanan"
              className="w-full h-full object-cover"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center p-6 text-center md:text-left">
            <h2 className="text-3xl font-bold text-blue-900 leading-snug">
              Open Savings <br /> Safe & Profitable
            </h2>
            <a
              href="/saving-loan?tab=saving-product"
              className="mt-4 text-lg text-blue-900 font-semibold inline-flex items-center gap-2 hover:text-blue-800 transition-colors"
            >
              Look here
              <span className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-900">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
