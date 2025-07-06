// src/app/saving-loan/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    PiggyBank,
    Calculator,
    Building,
    ShoppingCart,
    CheckCircle,
    ArrowRight,
    HomeIcon,
    ChevronDown
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SavingLoanPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const dropdownItems = [
        { id: 'saving-product', label: 'Savings & Deposits', icon: PiggyBank },
        { id: 'financing-product', label: 'Credits & Loans', icon: Calculator },
    ];


    const initialTab = searchParams.get('tab') || 'saving-product';

    const initialLabel = dropdownItems.find(item => item.id === initialTab)?.label || 'Savings & Deposits';

    const [activeTab, setActiveTab] = useState(initialTab);
    const [selectedDropdownLabel, setSelectedDropdownLabel] = useState(initialLabel);

    const glassMorphismClass = "bg-white/20 backdrop-blur-md border border-black/30 shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl";

    const handleDropdownSelect = (id: string, label: string) => {
        setActiveTab(id);
        setSelectedDropdownLabel(label);
        // Tetap gunakan router.replace di sini agar URL berubah sesuai tab yang dipilih
        router.replace(`/saving-loan?tab=${id}`, { scroll: false });
    };

    // Effect to synchronize state if URL changes externally (e.g., navigation from navbar)
    useEffect(() => {
        const tabFromUrl = searchParams.get('tab');
        if (tabFromUrl) {
            const foundItem = dropdownItems.find(item => item.id === tabFromUrl);
            if (foundItem && foundItem.id !== activeTab) {
                setActiveTab(foundItem.id);
                setSelectedDropdownLabel(foundItem.label);
            }
        } else if (activeTab !== 'saving-product') {
            // Jika tidak ada parameter 'tab' di URL, dan activeTab saat ini bukan 'saving-product',
            // maka setel state internal ke 'saving-product'.
            // URL tidak akan dimanipulasi di sini, hanya state internal yang disinkronkan.
            setActiveTab('saving-product');
            setSelectedDropdownLabel('Savings & Deposits');
            // router.push('/saving-loan', { scroll: false }); // DIKOMENTARI/DIHAPUS SESUAI PERMINTAAN
        }
    }, [searchParams, activeTab, dropdownItems, router]);

    // Find the appropriate icon for the button
    const CurrentIcon = dropdownItems.find(item => item.id === activeTab)?.icon || PiggyBank;

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Inject CSS for animations */}
            <style jsx>{`
                @keyframes floatUpFadeOut {
                    0% {
                        transform: translateY(0) scale(0.8);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-200px) scale(1.2);
                        opacity: 0;
                    }
                }

                .animated-shape {
                    animation: floatUpFadeOut 15s infinite ease-in-out;
                    pointer-events: none;
                    z-index: 1;
                }

                .animated-shape:nth-child(1) { animation-delay: 0s; left: 10%; top: 20%; width: 80px; height: 80px; }
                .animated-shape:nth-child(2) { animation-delay: 3s; left: 60%; top: 10%; width: 120px; height: 120px; }
                .animated-shape:nth-child(3) { animation-delay: 6s; left: 30%; top: 50%; width: 100px; height: 100px; }
                .animated-shape:nth-child(4) { animation-delay: 9s; left: 80%; top: 40%; width: 90px; height: 90px; }
                .animated-shape:nth-child(5) { animation-delay: 12s; left: 45%; top: 5%; width: 70px; height: 70px; }
            `}</style>

            {/* Hero Section */}
            <section className="relative text-white py-20 sm:py-32 md:py-40 overflow-hidden" style={{
                backgroundImage: "url('/image/bg-1.png')",
                backgroundPosition: "center",
                backgroundSize:"1800px auto",
                backgroundAttachment: "fixed"
            }}>
                <div className="animated-shape absolute bg-white/10 rounded-full"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full"></div>
                <div className="absolute inset-0 bg-blue-950 opacity-80 backdrop-blur-sm z-20"></div>
                <div className="relative max-w-6xl mx-auto px-4 text-center z-30">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 mt-12 sm:mt-16 md:mt-20 drop-shadow-lg">
                        Best <span className="text-orange-200">Financial</span> Solutions
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto text-white/90 drop-shadow">
                        Realize your financial dreams with modern and trusted banking services
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 sm:py-16 md:py-20 px-4">
                <div className="max-w-7xl mx-auto ">
                    {/* Dropdown Menu Container */}
                    <div className="flex justify-center mb-20 mt-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="lg"
                                    className={`px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-white text-blue-700 shadow-md border border-blue-200 hover:bg-gray-100 ${glassMorphismClass}`}
                                >
                                    <CurrentIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    {selectedDropdownLabel}
                                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 ml-2 -mr-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={`w-48 sm:w-56 ${glassMorphismClass} p-2 text-gray-700`}>
                                {dropdownItems.map((item) => (
                                    <DropdownMenuItem
                                        key={item.id}
                                        onClick={() => handleDropdownSelect(item.id, item.label)}
                                        className="flex items-center p-2 cursor-pointer hover:bg-blue-50 rounded-md transition-colors duration-200 text-sm sm:text-base"
                                    >
                                        <item.icon className="w-4 h-4 mr-2" />
                                        {item.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {activeTab === 'saving-product' ? (
                        <div>
                            <div className="text-center mb-10 sm:mb-16">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                                    <span className="text-blue-700">Savings</span> Products
                                </h2>
                                <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
                                    Start investing in your future with our best savings and deposit products
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                                {/* Regular Savings */}
                                <Card className={`${glassMorphismClass}`}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
                                                <PiggyBank className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                                            </div>
                                            <Badge className="bg-blue-100 text-blue-700 font-semibold text-sm sm:text-base px-2 sm:px-3 py-1">2.5% p.a</Badge>
                                        </div>
                                        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Regular Savings</CardTitle>
                                        <CardDescription className="text-sm sm:text-base text-gray-600">
                                            Savings account with competitive interest rates and 24/7 access
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3 sm:space-y-4">
                                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                                            <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                                                <span className="font-semibold">Minimum Deposit</span>
                                                <span className="text-blue-700 font-bold">Rp 100,000</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>2.5% interest per annum</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>Free administration fees for 6 months</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>Free ATM access nationwide</span>
                                            </div>
                                        </div>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                            Open Account
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Term Savings */}
                                <Card className={`${glassMorphismClass}`}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 sm:p-3 bg-orange-50 rounded-lg">
                                                <PiggyBank className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
                                            </div>
                                            <Badge className="bg-orange-100 text-orange-700 font-semibold text-sm sm:text-base px-2 sm:px-3 py-1">3.5% p.a</Badge>
                                        </div>
                                        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Term Savings</CardTitle>
                                        <CardDescription className="text-sm sm:text-base text-gray-600">
                                            Savings with fixed interest and flexible terms
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3 sm:space-y-4">
                                        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
                                            <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                                                <span className="font-semibold">Minimum Deposit</span>
                                                <span className="text-orange-600 font-bold">Rp 500,000</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                                                <span>3.5% interest per annum</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                                                <span>Flexible terms: 1-5 years</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                                                <span>Free life insurance</span>
                                            </div>
                                        </div>
                                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                            Open Account
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Time Deposit */}
                                <Card className={`${glassMorphismClass}`}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
                                                <PiggyBank className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                                            </div>
                                            <Badge className="bg-blue-100 text-blue-700 font-semibold text-sm sm:text-base px-2 sm:px-3 py-1">4.5% p.a</Badge>
                                        </div>
                                        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Time Deposit</CardTitle>
                                        <CardDescription className="text-sm sm:text-base text-gray-600">
                                            Secure investment with attractive returns and minimal risk
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3 sm:space-y-4">
                                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                                            <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                                                <span className="font-semibold">Minimum Deposit</span>
                                                <span className="text-blue-700 font-bold">Rp 10,000,000</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>4.5% interest per annum</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>Tenors: 1, 3, 6, 12 months</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>Guaranteed by LPS</span>
                                            </div>
                                        </div>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                            Open Deposit
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="text-center mb-10 sm:mb-16">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                                    <span className="text-orange-600">Financing</span> Products
                                </h2>
                                <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
                                    Realize your business plans and personal needs with flexible credit
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                                {/* Working Capital Credit */}
                                <Card className={`${glassMorphismClass}`}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
                                                <Building className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                                            </div>
                                            <Badge className="bg-blue-100 text-blue-700 font-semibold text-sm sm:text-base px-2 sm:px-3 py-1">8% p.a</Badge>
                                        </div>
                                        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Working Capital Credit</CardTitle>
                                        <CardDescription className="text-sm sm:text-base text-gray-600">
                                            Financing solutions for business capital and expansion needs
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3 sm:space-y-4">
                                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                                            <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                                                <span className="font-semibold">Maximum Ceiling</span>
                                                <span className="text-blue-700 font-bold">Rp 5 Billion</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>Interest starting from 8% per annum</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>Tenor up to 5 years</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>3 working days processing</span>
                                            </div>
                                        </div>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                            Apply for Credit
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Consumer Credit */}
                                <Card className={`${glassMorphismClass}`}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 sm:p-3 bg-orange-50 rounded-lg">
                                                <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
                                            </div>
                                            <Badge className="bg-orange-100 text-orange-700 font-semibold text-sm sm:text-base px-2 sm:px-3 py-1">10% p.a</Badge>
                                        </div>
                                        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Consumer Credit</CardTitle>
                                        <CardDescription className="text-sm sm:text-base text-gray-600">
                                            Loans for personal and family consumption needs
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3 sm:space-y-4">
                                        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
                                            <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                                                <span className="font-semibold">Maximum Ceiling</span>
                                                <span className="text-orange-600 font-bold">Rp 500 Million</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                                                <span>Interest starting from 10% per annum</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                                                <span>Tenor up to 7 years</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                                                <span>Unsecured up to Rp 100 Million</span>
                                            </div>
                                        </div>
                                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                            Apply for Credit
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Investment Credit */}
                                <Card className={`${glassMorphismClass}`}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
                                                <HomeIcon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                                            </div>
                                            <Badge className="bg-blue-100 text-blue-700 font-semibold text-sm sm:text-base px-2 sm:px-3 py-1">9% p.a</Badge>
                                        </div>
                                        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Investment Credit</CardTitle>
                                        <CardDescription className="text-sm sm:text-base text-gray-600">
                                            Financing for long-term investments and asset development
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3 sm:space-y-4">
                                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                                            <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                                                <span className="font-semibold">Maximum Ceiling</span>
                                                <span className="text-blue-700 font-bold">Rp 10 Billion</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>Interest starting from 9% per annum</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>Tenor up to 15 years</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                                <span>Grace period available</span>
                                            </div>
                                        </div>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                            Apply for Credit
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="relative py-12 sm:py-16 md:py-20 px-4 text-white overflow-hidden"
                style={{
                    backgroundImage: "url('/image/1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="absolute inset-0 bg-blue-950 opacity-70 z-10"></div>
                <div className="relative max-w-5xl mx-auto text-center z-20">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
                        Ready to Start Your <span className="text-orange-300">Financial</span> Journey?
                    </h2>
                    <p className="text-base sm:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto text-white/90">
                        Contact us now for a free consultation and find the best financial solutions
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                        <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 shadow-md border border-blue-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
                            Free Consultation
                        </Button>
                        <Button size="lg" className="bg-transparent border-2 border-blue-100 text-white hover:bg-white/10 hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-md">
                            Credit Simulation
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}