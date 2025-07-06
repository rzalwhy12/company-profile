'use client';

import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    complaint: string;
}

const CustomerComplaintForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        complaint: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitMethod, setSubmitMethod] = useState<'email' | 'whatsapp' | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const generateEmailBody = (data: FormData) => {
        return `
        Complaint Details:
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Subject: ${data.subject}

        Complaint:
        ${data.complaint}
        `;
    };

    const generateWhatsAppBody = (data: FormData) => {
        const message = `
        *Customer Complaint Form*
        Nama: ${data.name}
        Email: ${data.email}
        Telepon: ${data.phone}
        Subjek: ${data.subject}
        Keluhan: ${data.complaint}
        `;
        return encodeURIComponent(message);
    };

    const handleSubmit = (method: 'email' | 'whatsapp') => {
        setIsSubmitted(true);
        setSubmitMethod(method);

        const { name, email, phone, subject, complaint } = formData;

        if (!name || !email || !phone || !subject || !complaint) {
            alert('Mohon lengkapi semua kolom form.');
            setIsSubmitted(false);
            return;
        }

        if (method === 'email') {
            const recipient = 'rzalcorp05@gmail.com';
            const emailSubject = encodeURIComponent(`Customer Complaint: ${subject}`);
            const emailBody = encodeURIComponent(generateEmailBody(formData));
            window.location.href = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
        } else if (method === 'whatsapp') {
            const whatsappNumber = '+6282142991064';
            const whatsappBody = generateWhatsAppBody(formData);
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappBody}`, '_blank');
        }
    };

    return (
        <div className="w-full max-w-2xl p-6 sm:p-8 lg:p-10 bg-white bg-opacity-40 backdrop-blur-lg rounded-3xl border border-gray-200 shadow-2xl">
            {isSubmitted && (submitMethod === 'email' || submitMethod === 'whatsapp') ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Terima Kasih!</strong>
                    <span className="block sm:inline ml-2">Form Anda akan dibuka di aplikasi {submitMethod === 'email' ? 'email' : 'WhatsApp'} Anda. Mohon kirimkan pesan untuk menyelesaikan.</span>
                </div>
            ) : null}

            <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">Nama Lengkap:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
                        placeholder="Masukkan nama lengkap"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
                        placeholder="Masukkan email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-2">Nomor Telepon:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
                        placeholder="Masukkan nomor telepon"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-800 mb-2">Subjek Keluhan:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
                        placeholder="Masukkan subjek keluhan"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="complaint" className="block text-sm font-medium text-gray-800 mb-2">Detail Keluhan:</label>
                    <textarea
                        id="complaint"
                        name="complaint"
                        value={formData.complaint}
                        onChange={handleChange}
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
                        placeholder="Tuliskan keluhan Anda..."
                        required
                    ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => handleSubmit('email')}
                        className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 text-sm"
                    >
                        <Mail className="w-5 h-5 mr-2" /> Kirim via Email
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSubmit('whatsapp')}
                        className="flex-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 text-sm"
                    >
                        <Send className="w-5 h-5 mr-2" /> Kirim via WhatsApp
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomerComplaintForm;
