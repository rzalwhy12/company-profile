'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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

// Hapus interface SavingLoanContentProps karena tidak ada props yang diterima lagi
// interface SavingLoanContentProps {
//   initialTab: string;
// }

// Hapus props { initialTab } dari sini
export default function SavingLoanContent() { // <--- TIDAK ADA PROPS LAGI
    const router = useRouter();
    const searchParams = useSearchParams();

    const dropdownItems = useMemo(() => [
        { id: 'saving-product', label: 'Savings & Deposits', icon: PiggyBank },
        { id: 'financing-product', label: 'Credits & Loans', icon: Calculator },
    ], []);

    // Inisialisasi state activeTab langsung dari URL.
    // Gunakan fungsi untuk inisialisasi lazy agar hanya dieksekusi sekali.
    const [activeTab, setActiveTab] = useState(() => {
        const tabFromUrl = searchParams.get('tab');
        const found = dropdownItems.find(item => item.id === tabFromUrl);
        return found ? found.id : 'saving-product'; // Default ke 'saving-product'
    });

    const [selectedDropdownLabel, setSelectedDropdownLabel] = useState(() => {
        const tabFromUrl = searchParams.get('tab');
        const found = dropdownItems.find(item => item.id === tabFromUrl);
        return found ? found.label : 'Savings & Deposits'; // Default ke 'Savings & Deposits'
    });

    const glassMorphismClass = "bg-white/20 backdrop-blur-md border border-black/30 shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl";

    const handleDropdownSelect = (id: string, label: string) => {
        setActiveTab(id);
        setSelectedDropdownLabel(label);
        router.push(`/saving-loan?tab=${id}`, { scroll: false });
    };

    // Efek ini akan menjaga state activeTab dan label tetap sinkron dengan URL
    useEffect(() => {
        const tabFromUrl = searchParams.get('tab');
        // Hanya update jika tab dari URL berbeda dengan activeTab saat ini
        if (tabFromUrl && tabFromUrl !== activeTab) {
            const foundItem = dropdownItems.find(item => item.id === tabFromUrl);
            if (foundItem) {
                setActiveTab(foundItem.id);
                setSelectedDropdownLabel(foundItem.label);
            }
        } else if (!tabFromUrl && activeTab !== 'saving-product') {
            // Jika tidak ada 'tab' di URL dan activeTab bukan 'saving-product',
            // maka set default ke 'saving-product' dan perbarui URL
            setActiveTab('saving-product');
            setSelectedDropdownLabel('Savings & Deposits');
            router.replace('/saving-loan?tab=saving-product', { scroll: false }); // Gunakan router.replace untuk menghindari duplikasi history
        }
    }, [searchParams, activeTab, dropdownItems, router]); // Tambahkan router ke dependency array

    const CurrentIcon = dropdownItems.find(item => item.id === activeTab)?.icon || PiggyBank;

    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Dropdown Menu Container */}
                <div className="flex justify-center mb-12 sm:mb-16 mt-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="lg"
                                className={`px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl bg-white text-blue-700 shadow-md border border-blue-200 hover:bg-gray-100 ${glassMorphismClass}`}
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
                                    className="flex items-center p-2 cursor-pointer hover:bg-blue-50 rounded-md transition-colors duration-200 text-sm sm:text-base md:text-lg"
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
                        <div className="text-center mb-10 sm:mb-14 md:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                                <span className="text-blue-700">Savings</span> Products
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                                Start investing in your future with our best savings and deposit products
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
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
                                    <Link href="/saving-loan/form" passHref>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                        Open Account
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                    </Button>
                                    </Link>
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
                                    <Link href="/saving-loan/form" passHref>
                                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                        Open Account
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                    </Button>
                                    </Link>
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
                                    <Link href="/saving-loan/form" passHref>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                        Open Deposit
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                    </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-center mb-10 sm:mb-14 md:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                                <span className="text-orange-600">Financing</span> Products
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                                Realize your business plans and personal needs with flexible credit
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
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
                                    <Link href="/saving-loan/form" passHref>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                        Apply for Credit
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                    </Button>
                                    </Link>
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
                                    <Link href="/saving-loan/form" passHref>
                                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                        Apply for Credit
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                    </Button>
                                    </Link>
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
                                    <Link href="/saving-loan/form" passHref>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md text-base sm:text-lg py-2 sm:py-3">
                                        Apply for Credit
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                    </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}