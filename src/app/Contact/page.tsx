'use client';

import { useState } from 'react';
import { MessageCircle, Phone, MapPin, Mail, Send, Building2, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
// import Image from 'next/image'; // Tidak digunakan di sini, bisa dihapus jika tidak ada Image dari next/image di JSX
import BackgroundSlider from '@/components/BackgroundSlider';
import FloatingParticles from '@/components/FloatingParticles';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactSection() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const branches = [
        {
            name: "Kantor Pusat",
            type: "main",
            address: "Jl. Tulunagagung",
            phone: "+62 821 4299 1064",
            whatsapp: "6282142991064",
            hours: "08:00 - 17:00 WIB"
        },
        {
            name: "Cabang Bandung",
            type: "branch",
            address: "Jl. Tulungagung",
            phone: "+62 821 4299 1064",
            whatsapp: "6282142991064",
            hours: "08:00 - 16:00 WIB"
        },
        {
            name: "Cabang Talun",
            type: "branch",
            address: "Jl. Blitar",
            phone: "+62 821 4299 1064",
            whatsapp: "6282142991064",
            hours: "08:00 - 16:00 WIB"
        },
        {
            name: "Cabang Rejotangan",
            type: "branch",
            address: "Jl. Tulungagung",
            phone: "+62 821 4299 1064",
            whatsapp: "6282142991064",
            hours: "08:00 - 16:00 WIB"
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, subject, message } = formData;
        const emailBody = `Nama: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0APesan:%0D%0A${message}`;
        const mailtoLink = `mailto:rzalcorp05@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
        window.location.href = mailtoLink;
    };

    const handleWhatsAppClick = (number: string, branchName: string) => {
        const message = `Halo! Saya ingin bertanya mengenai layanan perbankan di ${branchName}.`;
        const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="min-h-screen relative overflow-hidden text-gray-800">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <BackgroundSlider />
                <FloatingParticles />
            </div>


            {/* Ambient Light Effects - z-index di atas orbs tapi di bawah main content */}
            <div className="absolute inset-0 pointer-events-none z-25">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-400/80 to-transparent"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full w-px bg-gradient-to-b from-transparent via-blue-400/80 to-transparent"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-px bg-gradient-to-b from-transparent via-purple-400/80 to-transparent"></div>
            </div>
            <div className="absolute inset-0 bg-gray-950/50" />

            {/* Main Content - Ini adalah lapisan paling depan yang berisi semua konten kontak, z-index tertinggi */}
            <div className="relative z-30 container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
                {/* Header Section */}
                <div className="text-center mt-6 mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6 text-white">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
                        Hubungi <span className="text-yellow-400">Kami</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed"> {/* Sesuaikan warna teks */}
                        Siap melayani Anda 24/7 dengan teknologi perbankan terdepan dan pelayanan terpercaya
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-7xl mx-auto">
                    {/* Contact Methods */}
                    <div className="space-y-6 sm:space-y-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2 sm:gap-3"> {/* Ubah warna teks ke putih */}
                            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" /> {/* Sesuaikan warna ikon */}
                            Kontak WhatsApp
                        </h2>

                        <div className="grid gap-4 sm:gap-6">
                            {branches.map((branch, index) => (
                                <Card key={index} className="group bg-white/5 border border-white/10 shadow-md backdrop-blur-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"> {/* Sesuaikan background dan border card */}
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                {branch.type === 'main' ? (
                                                    <Building2 className="w-5 h-5 sm:w-6 text-yellow-400" />
                                                ) : (
                                                    <Users className="w-5 h-5 sm:w-6 text-blue-400" />
                                                )}
                                                <h3 className="text-lg sm:text-xl font-semibold text-white">{branch.name}</h3> {/* Ubah warna teks ke putih */}
                                                {branch.type === 'main' && (
                                                    <span className="bg-yellow-100/20 text-yellow-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold backdrop-blur-sm"> {/* Sesuaikan background dan teks badge */}
                                                        PUSAT
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-4 sm:mb-6">
                                            <div className="flex items-center gap-2 text-gray-300"> {/* Sesuaikan warna teks */}
                                                <MapPin className="w-4 h-4 text-blue-400" /> {/* Sesuaikan warna ikon */}
                                                <span className="text-sm sm:text-base">{branch.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300"> {/* Sesuaikan warna teks */}
                                                <Phone className="w-4 h-4 text-blue-400" /> {/* Sesuaikan warna ikon */}
                                                <span className="text-sm sm:text-base">{branch.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300"> {/* Sesuaikan warna teks */}
                                                <Clock className="w-4 h-4 text-blue-400" /> {/* Sesuaikan warna ikon */}
                                                <span className="text-sm sm:text-base">{branch.hours}</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => handleWhatsAppClick(branch.whatsapp, branch.name)}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 rounded-md transition-colors duration-300"
                                        >
                                            <MessageCircle className="w-4 h-4 sm:w-5 mr-2" />
                                            Chat di WhatsApp
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-6 sm:space-y-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2 sm:gap-3"> {/* Ubah warna teks ke putih */}
                            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" /> {/* Sesuaikan warna ikon */}
                            Kirim Email
                        </h2>

                        <Card className="bg-white/5 border border-white/10 shadow-md backdrop-blur-xl hover:shadow-lg transition-all duration-300"> {/* Sesuaikan background dan border card */}
                            <CardContent className="p-6 sm:p-8">
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-gray-200"> {/* Sesuaikan warna teks */}
                                                Nama Lengkap
                                            </label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 transition-colors duration-300" // Sesuaikan background, border, dan teks input
                                                placeholder="Masukkan nama lengkap"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-200"> {/* Sesuaikan warna teks */}
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 transition-colors duration-300" // Sesuaikan background, border, dan teks input
                                                placeholder="nama@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-gray-200"> {/* Sesuaikan warna teks */}
                                            Subjek
                                        </label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 transition-colors duration-300" // Sesuaikan background, border, dan teks input
                                            placeholder="Subjek pesan Anda"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-gray-200"> {/* Sesuaikan warna teks */}
                                            Pesan
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 transition-colors duration-300 resize-y" // Sesuaikan background, border, dan teks input
                                            placeholder="Tulis pesan Anda di sini..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        <Send className="w-4 h-4 sm:w-5 mr-2" />
                                        Kirim Email
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Additional Contact Info */}
                        <Card className="bg-blue-50/10 border border-blue-200/20 shadow-sm backdrop-blur-md"> {/* Sesuaikan background dan border card */}
                            <CardContent className="p-4 sm:p-6 text-center">
                                <h3 className="text-lg font-semibold text-blue-200 mb-2">Layanan Pelanggan 24/7</h3> {/* Sesuaikan warna teks */}
                                <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4"> {/* Sesuaikan warna teks */}
                                    Tim customer service kami siap membantu Anda kapan saja
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm text-blue-300 font-medium"> {/* Sesuaikan warna teks */}
                                    <span className="flex items-center gap-1">📞 123456</span>
                                    <span className="flex items-center gap-1">📧 sda.com</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}