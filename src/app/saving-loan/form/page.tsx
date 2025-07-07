
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SavingLoanPage() {

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Hero Section */}
            <section className="relative text-white py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden" style={{
                backgroundImage: "url('/image/bg-1.png')",
                backgroundPosition: "center",
                backgroundSize: "1800px auto",
                backgroundAttachment: "fixed"
            }}>
                <div className="animated-shape absolute bg-white/10 rounded-full"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full"></div>
                <div className="absolute inset-0 bg-blue-950 opacity-60 backdrop-blur-sm z-20"></div>
                <div className="relative max-w-6xl mx-auto px-6 sm:px-8 text-center z-30">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20 drop-shadow-lg">
                        Best <span className="text-orange-200">Financial</span> Solutions
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto text-white/90 drop-shadow">
                        Realize your financial dreams with modern and trusted banking services
                    </p>
                </div>
            </section>

            {/* Main Content */}

            <section
                className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 text-white overflow-hidden"
                style={{
                    backgroundImage: "url('/image/1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="absolute inset-0 bg-blue-950 opacity-70 z-10"></div>
                <div className="relative max-w-5xl mx-auto text-center z-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
                        Ready to Start Your <span className="text-orange-300">Financial</span> Journey?
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto text-white/90">
                        Contact us now for a free consultation and find the best financial solutions
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                        <Link
                            href="https://wa.me/6282142991064"
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" className="bg-white text-blue-700 hover:bg-yellow-200 shadow-md border border-blue-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl">
                                Free Consultation
                            </Button>
                        </Link>

                        <Link href="/saving-loan?tab=financing-product" passHref>
                            <Button size="lg" className="bg-white/20 text-white hover:bg-white/30 border border-white/30 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl">
                                Credit Simulation
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}