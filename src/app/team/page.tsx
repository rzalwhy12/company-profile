"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Users,
    Building2,
    Award,
    Mail,
    Linkedin,
    Star,
    Shield,
    TrendingUp
} from 'lucide-react';

interface Executive {
    id: string;
    name: string;
    position: string;
    category: 'director' | 'commissioner';
    image: string;
    bio: string;
    experience: string;
    education: string;
    achievements: string[];
    email: string;
    phone: string;
    linkedin: string;
}

const executives: Executive[] = [
    {
        id: '1',
        name: 'Dr. Sari Dewi Andini',
        position: 'President Director',
        category: 'director',
        image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
        bio: 'Pemimpin visioner dengan pengalaman 25 tahun di industri perbankan Indonesia.',
        experience: '25+ tahun di industri perbankan',
        education: 'Doktor Ekonomi, Universitas Indonesia',
        achievements: ['Banking Excellence Award 2023', 'Women in Finance Leadership 2022', 'Digital Banking Innovation 2021'],
        email: 'sari.dewi@sda-bank.com',
        phone: '+62 21 5555 1001',
        linkedin: 'https://linkedin.com/in/saridewi'
    },
    {
        id: '2',
        name: 'Budi Santoso',
        position: 'Finance Director',
        category: 'director',
        image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
        bio: 'Ahli keuangan dengan keahlian dalam manajemen risiko dan strategi investasi.',
        experience: '20+ tahun di bidang keuangan',
        education: 'Master of Finance, London School of Economics',
        achievements: ['CFO of the Year 2022', 'Risk Management Excellence 2021', 'Financial Strategy Leadership 2020'],
        email: 'budi.santoso@sda-bank.com',
        phone: '+62 21 5555 1002',
        linkedin: 'https://linkedin.com/in/budisantoso'
    },
    {
        id: '3',
        name: 'Maya Putri',
        position: 'Operations Director',
        category: 'director',
        image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
        bio: 'Spesialis operasional dengan fokus pada efisiensi dan inovasi teknologi perbankan.',
        experience: '18+ tahun di operasional bank',
        education: 'Master of Business Administration, INSEAD',
        achievements: ['Operations Excellence Award 2023', 'Digital Transformation Leader 2022', 'Process Innovation 2021'],
        email: 'maya.putri@sda-bank.com',
        phone: '+62 21 5555 1003',
        linkedin: 'https://linkedin.com/in/mayaputri'
    },
    {
        id: '4',
        name: 'Prof. Dr. Ahmad Rahman',
        position: 'Chairman of Commissioners',
        category: 'commissioner',
        image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
        bio: 'Akademisi dan praktisi senior dengan pengalaman luas dalam tata kelola korporat.',
        experience: '30+ tahun di akademisi dan industri',
        education: 'Profesor Ekonomi, Universitas Gadjah Mada',
        achievements: ['Corporate Governance Excellence 2023', 'Academic Leadership Award 2022', 'Banking Industry Recognition 2021'],
        email: 'ahmad.rahman@sda-bank.com',
        phone: '+62 21 5555 2001',
        linkedin: 'https://linkedin.com/in/ahmadrahman'
    },
    {
        id: '5',
        name: 'Indira Sari',
        position: 'Independent Commissioner',
        category: 'commissioner',
        image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
        bio: 'Pakar hukum korporat dengan spesialisasi dalam compliance dan regulatory affairs.',
        experience: '22+ tahun di bidang hukum korporat',
        education: 'Master of Laws, Harvard Law School',
        achievements: ['Legal Excellence Award 2023', 'Compliance Leadership 2022', 'Corporate Law Recognition 2021'],
        email: 'indira.sari@sda-bank.com',
        phone: '+62 21 5555 2002',
        linkedin: 'https://linkedin.com/in/indirasari'
    },
    {
        id: '6',
        name: 'Ravi Sharma',
        position: 'Commissioner',
        category: 'commissioner',
        image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
        bio: 'Veteran industri dengan pengalaman internasional dalam pengembangan bisnis.',
        experience: '28+ tahun di industri keuangan global',
        education: 'MBA, Wharton School',
        achievements: ['International Business Leader 2023', 'Strategic Development Award 2022', 'Global Finance Recognition 2021'],
        email: 'ravi.sharma@sda-bank.com',
        phone: '+62 21 5555 2003',
        linkedin: 'https://linkedin.com/in/ravisharma'
    }
];

export default function LeadershipPage() {
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'director' | 'commissioner'>('all');

    const filteredExecutives = executives.filter(exec =>
        selectedCategory === 'all' || exec.category === selectedCategory
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            {/* Hero Section */}
            <section
                className="relative py-20 overflow-hidden text-white" // Tambahkan text-white di sini
                style={{
                    backgroundImage: "url('/image/bg-1.png')", // Gambar background
                    backgroundPosition: "center",
                    backgroundSize: "1800px auto", // Ukuran background
                    backgroundAttachment: "fixed" // Efek parallax
                }}
            >
                {/* Animated Shapes dari saving-loan */}
                <div className="animated-shape absolute bg-white/10 rounded-full top-1/4 left-1/4 w-32 h-32 animate-pulse-slow"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full bottom-1/3 right-1/3 w-48 h-48 animate-pulse-slow delay-1000"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full top-1/2 left-1/2 w-24 h-24 animate-pulse-slow delay-500"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full bottom-1/4 left-1/2 w-40 h-40 animate-pulse-slow delay-1500"></div>
                <div className="animated-shape absolute bg-white/10 rounded-full top-1/3 right-1/4 w-36 h-36 animate-pulse-slow delay-2000"></div>

                {/* Overlay dari saving-loan */}
                <div className="absolute inset-0 bg-blue-950 opacity-60 backdrop-blur-sm z-20"></div>

                <div className="relative max-w-7xl mt-40 mx-auto px-4 sm:px-6 lg:px-8 text-center z-30"> {/* Tambahkan z-30 */}
                    <div className="max-w-4xl mx-auto ">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"> {/* Tambahkan drop-shadow-lg */}
                            Kepemimpinan
                            <span className="block text-amber-300">Yang Visioner</span>
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                            Direksi dan Komisaris Bank SDA berkomitmen untuk memimpin transformasi digital
                            dan sustainable banking untuk masa depan yang lebih baik.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                <Shield className="w-5 h-5 text-amber-300" />
                                <span className="text-white font-medium">Tata Kelola Terpercaya</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                <TrendingUp className="w-5 h-5 text-amber-300" />
                                <span className="text-white font-medium">Inovasi Berkelanjutan</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                <Award className="w-5 h-5 text-amber-300" />
                                <span className="text-white font-medium">Prestasi Terdepan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Tim Kepemimpinan</h2>
                            <p className="text-gray-600">Profil lengkap direksi dan komisaris Bank SDA</p>
                        </div>
                        <div className="flex space-x-2 mt-4 md:mt-0">
                            <Button
                                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                                onClick={() => setSelectedCategory('all')}
                                className="flex items-center space-x-2"
                            >
                                <Users className="w-4 h-4" />
                                <span>Semua</span>
                            </Button>
                            <Button
                                variant={selectedCategory === 'director' ? 'default' : 'outline'}
                                onClick={() => setSelectedCategory('director')}
                                className="flex items-center space-x-2"
                            >
                                <Building2 className="w-4 h-4" />
                                <span>Direksi</span>
                            </Button>
                            <Button
                                variant={selectedCategory === 'commissioner' ? 'default' : 'outline'}
                                onClick={() => setSelectedCategory('commissioner')}
                                className="flex items-center space-x-2"
                            >
                                <Shield className="w-4 h-4" />
                                <span>Komisaris</span>
                            </Button>
                        </div>
                    </div>

                    {/* Leadership Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredExecutives.map((executive) => (
                            <Card key={executive.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md">
                                <div className="relative">
                                    <img
                                        src={executive.image}
                                        alt={executive.name}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <Badge
                                            variant={executive.category === 'director' ? 'default' : 'secondary'}
                                            className="bg-white/90 text-gray-800 hover:bg-white"
                                        >
                                            {executive.category === 'director' ? 'Direksi' : 'Komisaris'}
                                        </Badge>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{executive.name}</h3>
                                    <p className="text-blue-600 font-medium mb-3">{executive.position}</p>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{executive.bio}</p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Award className="w-4 h-4 mr-2" />
                                            {executive.experience}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Star className="w-4 h-4 mr-2" />
                                            {executive.education}
                                        </div>
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {executive.achievements.slice(0, 2).map((achievement, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {achievement}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex space-x-2">
                                        <Button size="sm" variant="outline" className="flex-1">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Email
                                        </Button>
                                        <Button size="sm" variant="outline" className="flex-1">
                                            <Linkedin className="w-4 h-4 mr-2" />
                                            LinkedIn
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-amber-300 mb-2">150+</div>
                            <p className="text-blue-100">Tahun Pengalaman Gabungan</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-amber-300 mb-2">25+</div>
                            <p className="text-blue-100">Penghargaan Industri</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-amber-300 mb-2">50+</div>
                            <p className="text-blue-100">Inovasi Produk</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-amber-300 mb-2">99%</div>
                            <p className="text-blue-100">Kepuasan Nasabah</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}