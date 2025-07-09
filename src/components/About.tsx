import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function About() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {

      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    

    handleResize();


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.0 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideInLeftVariants: Variants = {
    hidden: { opacity: 0, x: -50, transition: { duration: 0.0 } },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
  };

  return (
    <section className="relative
                        py-12 px-4
                        sm:py-16 sm:px-6
                        md:py-20 md:px-8
                        lg:py-32 lg:px-20
                        overflow-hidden flex items-center justify-start text-white
                        min-h-[60vh]
                        md:min-h-[70vh]
                        lg:min-h-[80vh]
                        ">
      {/* Background Image with Fixed/Scroll Attachment */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("/image/bb.webp")',
          // Menggunakan 'isMobile' di sini:
          // backgroundAttachment akan 'scroll' jika isMobile true (layar kecil),
          // dan 'fixed' jika isMobile false (layar besar).
          backgroundAttachment: isMobile ? 'scroll' : 'fixed', 
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-0 w-full max-w-4xl mx-auto
                      px-4
                      sm:px-6
                      text-left">
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-widest mb-2"
        >
          About BPR Sumber Dana Anda
        </motion.p>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
        >
          About Us
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-8"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dolorum incidunt ullam iure at provident blanditiis facere ea, quidem quos molestias consequatur corporis officiis sapiente corrupti eum accusamus esse rerum.
        </motion.p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-4
                        items-center sm:items-start">
          <motion.a
            initial="hidden"
            animate="visible"
            variants={slideInLeftVariants}
            href="/about/mission-statement"
            className="flex items-center justify-center
                        w-full sm:w-auto
                        px-6 py-3
                        border border-white/50 text-white rounded-md
                        text-sm sm:text-base font-medium transition-all duration-300
                        hover:bg-white/20 hover:border-white whitespace-nowrap"
          >
            More
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </motion.a>
          <motion.a
            initial="hidden"
            animate="visible"
            variants={slideInLeftVariants}
            transition={{ delay: 0.4 }}
            href="/team"
            className="flex items-center justify-center
                        w-full sm:w-auto
                        px-6 py-3
                        border border-gray-400 text-gray-300 rounded-md
                        text-sm sm:text-base font-medium transition-all duration-300
                        hover:bg-gray-400/50 hover:border-gray-300 hover:text-white whitespace-nowrap"
          >
            Board of Commissioners & Directors
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}