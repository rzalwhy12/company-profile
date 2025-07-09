'use client';

import { useState } from 'react';
import Link from 'next/link'; // Import Link component for client-side navigation
import {
  Phone, Mail, MapPin,
  Facebook, Twitter, Instagram, Linkedin,
  ChevronDown, MessageCircle
} from 'lucide-react';

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  // --- UPDATED: Footer links to match assumed navbar structure with correct paths ---
  const footerLinks = {
    'Produk & Layanan': [
      { name: 'Tabungan', href: '/saving-loan?tab=saving-product' },
      { name: 'Deposito', href: '/saving-loan?tab=saving-product' },
      { name: 'Pinjaman', href: '/saving-loan?tab=financing-product' },
      { name: 'Investasi', href: '/saving-loan?tab=saving-product' },
      { name: 'Asuransi', href: '/saving-loan?tab=financing-product' }
    ],
    'Bantuan': [
      { name: 'Pusat Bantuan', href: '/about/customer-complaints' },
      { name: 'FAQ', href: '/about/customer-complaints' },
      { name: 'Hubungi Kami', href: '/about/customer-complaints' },
      { name: 'Laporkan Error', href: '/about/customer-complaints' },
      { name: 'Syarat & Ketentuan', href: '/about/customer-complaints' },
      { name: 'Kebijakan Privasi', href: '/about/customer-complaints' }
    ],
    'Tentang Kami': [
      { name: 'Profil Perusahaan', href: '/about/mission-statement' },
      { name: 'Visi & Misi', href: '/about/mission-statement' },
      { name: 'Lokasi cabang', href: '/about/office-locations' },
      { name: 'Karir', href: '/about/careers' },
      { name: 'Berita', href: '/blog' },
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white mt-[-73px] relative z-0">
      {/* Main Content - add padding bottom to prevent sticky footer overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-[72px]">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">BPR Sumber Dana Anda</span>
            </div>
            <p className="text-gray-300 mb-6">
              Modern banking solutions with leading technology to meet your financial needs.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">082142991064</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">rzalcorp05@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Tulungagung, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Footer Links for Desktop */}
          <div className="hidden sm:grid sm:col-span-3 lg:col-span-3 grid-cols-1 sm:grid-cols-3 gap-6 order-1 lg:order-2">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <ul className="space-y-2">
                  {links.map((linkItem) => ( // Changed 'link' to 'linkItem' to avoid conflict with Link component
                    <li key={linkItem.name}>
                      <Link href={linkItem.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                        {linkItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Accordion for Mobile */}
          <div className="sm:hidden col-span-full order-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="mb-4">
                <button
                  className="w-full flex justify-between items-center font-semibold text-left"
                  onClick={() => setOpenSection(openSection === title ? null : title)}
                >
                  {title}
                  <ChevronDown className={`w-4 h-4 transition ${openSection === title ? 'rotate-180' : ''}`} />
                </button>
                <ul className={`pl-4 mt-2 space-y-1 text-sm transition-all duration-300 ease-in-out ${openSection === title ? 'max-h-40' : 'max-h-0 overflow-hidden'}`}>
                  {links.map((linkItem) => ( // Changed 'link' to 'linkItem'
                    <li key={linkItem.name}>
                      <Link href={linkItem.href} className="text-gray-400 hover:text-blue-400 transition">
                        {linkItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 SDA. All rights reserved.
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer (Mobile Shortcut) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0B1F3A] text-white flex justify-between md:hidden z-50 shadow-inner border-t border-white/10">
        <a
          href="tel:082142991064"
          className="flex-1 flex flex-col items-center justify-center py-2 text-xs hover:bg-blue-700/20 transition border-r border-white/10"
        >
          <Phone className="w-5 h-5 mb-1" />
          Call
        </a>
        <a
          href="mailto:rzalcorp05@gmail.com"
          className="flex-1 flex flex-col items-center justify-center py-2 text-xs hover:bg-blue-700/20 transition border-r border-white/10"
        >
          <Mail className="w-5 h-5 mb-1" />
          Email
        </a>
        <a
          href="https://wa.me/6282142991064"
          className="flex-1 flex flex-col items-center justify-center py-2 text-xs hover:bg-blue-700/20 transition"
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          Chat
        </a>
      </div>
    </footer>
  );
};

export default Footer;