"use client";

import { useState } from 'react';
import { MessageCircle, Phone, MapPin, Mail, Send, Building2, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

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
        <div className="min-h-screen bg-white text-gray-800 relative overflow-hidden">
            <div className="relative w-full overflow-hidden pt-[calc(100%*2/50)] hidden md:block">
                <Image
                    src="/image/12.jpg"
                    alt="Deskripsi Foto Anda"
                    width={7000}
                    height={400000}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            {/* Gradients also get a higher z-index on mobile if needed to cover content */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl animate-pulse z-auto md:z-auto"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl animate-pulse z-auto md:z-auto"></div>
            <div className="relative container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
                {/* Header Section */}
                <div className="text-center mt-6 mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
                    <div className="inline-flex items-center gap-2 sm:gap-3 bg-blue-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-blue-200 shadow-sm">
                        <span className="text-blue-800 font-medium text-sm sm:text-base">BPR Sumber Dana Anda</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                        Hubungi <span className="text-blue-600">Kami</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Siap melayani Anda 24/7 dengan teknologi perbankan terdepan dan pelayanan terpercaya
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-7xl mx-auto">
                    {/* Contact Methods */}
                    <div className="space-y-6 sm:space-y-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2 sm:gap-3">
                            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                            Kontak WhatsApp
                        </h2>

                        <div className="grid gap-4 sm:gap-6">
                            {branches.map((branch, index) => (
                                <Card key={index} className="group bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                {branch.type === 'main' ? (
                                                    <Building2 className="w-5 h-5 sm:w-6 text-yellow-600" />
                                                ) : (
                                                    <Users className="w-5 h-5 sm:w-6 text-blue-600" />
                                                )}
                                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{branch.name}</h3>
                                                {branch.type === 'main' && (
                                                    <span className="bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold">
                                                        PUSAT
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-4 sm:mb-6">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <MapPin className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm sm:text-base">{branch.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm sm:text-base">{branch.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Clock className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm sm:text-base">{branch.hours}</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => handleWhatsAppClick(branch.whatsapp, branch.name)}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 sm:py-3 rounded-md transition-colors duration-300"
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
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2 sm:gap-3">
                            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                            Kirim Email
                        </h2>

                        <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6 sm:p-8">
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                                Nama Lengkap
                                            </label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 transition-colors duration-300"
                                                placeholder="Masukkan nama lengkap"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 transition-colors duration-300"
                                                placeholder="nama@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                                            Subjek
                                        </label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 transition-colors duration-300"
                                            placeholder="Subjek pesan Anda"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                                            Pesan
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5} // Adjusted rows for better responsiveness on smaller screens
                                            className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 transition-colors duration-300 resize-y" // Allow vertical resize
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
                        <Card className="bg-blue-50 border border-blue-200 shadow-sm">
                            <CardContent className="p-4 sm:p-6 text-center">
                                <h3 className="text-lg font-semibold text-blue-800 mb-2">Layanan Pelanggan 24/7</h3>
                                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                                    Tim customer service kami siap membantu Anda kapan saja
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm text-blue-700 font-medium">
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