'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';

// Konfigurasi ikon default
const DefaultIcon = L.icon({
    iconUrl: '/image/icon/map.png',
    shadowUrl: '/image/icon/shadow.png',
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Data kantor cabang
const branches = [
    {
        id: '0001',
        name: 'BANK SDA PUSAT',
        type: 'KP',
        address: 'Jl. Pahlawan No.1, Tulungagung',
        services: ['All Service'],
        coords: { lat: -8.05433857019885 ,lng: 111.90797017636545 },
        detailLink: '/cabang/0384',
        googleMapsLink: 'https://maps.app.goo.gl/n5FgAoFxfQqMobkG8',
    },
    {
        id: '0002',
        name: 'BANK SDA CABANG BANDUNG',
        type: 'KCP',
        address: 'Contong, Bandung, Kec. Bandung, Tulungagung',
        services: ['All Service '],
        coords: { lat: -8.173189941116375, lng: 111.7849914607189 },
        detailLink: '/cabang/5078',
        googleMapsLink: 'https://maps.app.goo.gl/QNNZFYaDEzNX8R9Y8',
    },
    {
        id: '0003',
        name: 'BANK SDA CABANG REJOTANGAN',
        type: 'KCP',
        address: 'Jl. Raya Blitar - Tulungagung No.7A, Rejotangan, Tulungagung',
        services: ['All Service'],
        coords: { lat: -8.121328487059559, lng: 112.08187318746982 },
        detailLink: '/cabang/0088',
        googleMapsLink: 'https://maps.app.goo.gl/JoLRiMQdn6bYsFai9',
    },
    {
        id: '0004',
        name: 'BANK SDA CABANG TALUN',
        type: 'KCP',
        address: 'Jl. Raya Blitar-Wlingi No.10,Kec. Talun, Blitar',
        services: ['All Service'],
        coords: { lat: -8.089380209288624, lng: 112.29350050604766 },
        detailLink: '/cabang/5550',
        googleMapsLink: 'https://maps.app.goo.gl/swMZGceauPyqRHXs6',
    },
    {
        id: '1001',
        name: 'KANTOR KAS KAUMAN',
        type: 'KCP KAS',
        address: 'Jl. Kawi No.67, Tulungagung',
        services: ['Tabungan', 'Transaksi', 'Pinjaman Konsumer'],
        coords: { lat: -8.049815022564092, lng: 111.87093729575398 },
        detailLink: '/cabang/6000',
        googleMapsLink: 'https://maps.app.goo.gl/c5jrLrFQowpE2oocA',
    },
    {
        id: '1002',
        name: 'KANTOR KAS NGANTRU',
        type: 'KCP KAS',
        address: 'Pinggirsari, Tulungagung ',
        services: ['Tabungan', 'Transaksi', 'Pinjaman Konsumer'],
        coords: { lat: -8.031468775211566, lng: 111.94601510184941 },
        detailLink: '/cabang/7000',
        googleMapsLink: 'https://maps.app.goo.gl/3yjJMPip7aPJ2N4f9',
    },
    {
        id: '1003',
        name: 'KANTOR KAS CAMPURDARAT',
        type: 'KCP KAS',
        address: 'Jl. Kanigoro, Campurjanggrang, Tulungagung',
        services: ['Tabungan', 'Transaksi', 'Pinjaman Konsumer'],
        coords: { lat: -8.163484753444639, lng: 111.85510011035373 },
        detailLink: '/cabang/7000',
        googleMapsLink: 'https://maps.app.goo.gl/rU7eb9vbqorSc2sC8',
    },
    {
        id: '1004',
        name: 'KANTOR KAS PUCANGLABAN',
        type: 'KCP KAS',
        address: 'Sumberdadap, Tulungagung  ',
        services: ['Tabungan', 'Transaksi', 'Pinjaman Konsumer'],
        coords: { lat: -8.20508519089776, lng: 112.02098372883563 },
        detailLink: '/cabang/7000',
        googleMapsLink: 'http://maps.google.com/?q=-8.20508519089776,112.02098372883563',
    },
    {
        id: '1005',
        name: 'KANTOR KAS KALIDAWIR',
        type: 'KCP KAS',
        address: 'Bandil, Tanjung, Kalidawir, Tulungagung ',
        services: ['Tabungan', 'Transaksi', 'Pinjaman Konsumer'],
        coords: { lat: -8.14740445309811, lng: 111.96292743917708 },
        detailLink: '/cabang/7000',
        googleMapsLink: 'https://maps.app.goo.gl/79qFND1Xr1HLgQQc6',
    },
    {
        id: '1006',
        name: 'KANTOR KAS KANIGORO',
        type: 'KCP KAS',
        address: 'Jl. Manukwari, Kanigoro, Blitar',
        services: ['Tabungan', 'Transaksi', 'Pinjaman Konsumer'],
        coords: { lat: -8.135172213615094, lng: 112.22096077075786 },
        detailLink: '/cabang/7000',
        googleMapsLink: 'https://maps.app.goo.gl/KwRQNAeXQukHfwDL9',
    },
];

// Komponen untuk recenter map saat cabang diklik
const RecenterMap = ({ coords }: { coords: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        if (coords[0] !== 0 && coords[1] !== 0) {
            map.setView(coords, 15);
        }
    }, [coords, map]);
    return null;
};

// Komponen untuk memaksa Leaflet hitung ulang ukuran
const InvalidateMapSize = ({ deps = [] }: { deps?: readonly unknown[] }) => { // Perubahan di sini: any[] menjadi readonly unknown[]
    const map = useMap();
    useEffect(() => {
        // Penundaan kecil untuk memastikan peta sudah dirender sepenuhnya
        // sebelum memaksa perhitungan ulang ukuran.
        setTimeout(() => {
            map.invalidateSize();
        }, 250);
    }, deps); // Dependensi yang akan memicu efek ini
    return null;
};

const BranchLocatorLeaflet = () => {
    const [selectedBranch, setSelectedBranch] = useState<typeof branches[number] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const branchesPerPage = 2;
    const indexOfLast = currentPage * branchesPerPage;
    const indexOfFirst = indexOfLast - branchesPerPage;
    const currentBranches = branches.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(branches.length / branchesPerPage);

const [defaultCenter, setDefaultCenter] = useState<[number, number]>([-7.260792, 112.748659]);

useEffect(() => {
    setDefaultCenter([-7.260792, 112.748659]); 
}, []);

    // Effect untuk memilih cabang pertama saat komponen dimuat atau daftar cabang berubah
    useEffect(() => {
        if (!selectedBranch && branches.length > 0) {
            setSelectedBranch(branches[0]);
        }
    }, [selectedBranch, branches]); 

    return (
        <div className="bg-gradient-to-br from-blue-50 to-white w-full h-[50vh] flex flex-col lg:flex-row px-2 py-2 sm:px-4 sm:py-4 lg:px-8 lg:py-4 text-gray-800">
            <div className="flex-grow flex flex-col lg:flex-row gap-4 h-full">
                <div className="flex flex-col flex-grow h-full lg:grid lg:grid-cols-3 lg:gap-4">
                    {/* Select Cabang (Mobile Only) */}
                    <div className="block lg:hidden relative w-full h-[60px] mb-2"> 
                        <select
                            value={selectedBranch?.id || ''}
                            onChange={(e) => {
                                const branch = branches.find(b => b.id === e.target.value);
                                if (branch) setSelectedBranch(branch);
                            }}
                            className="w-full h-full p-2 rounded-md shadow border bg-white/80 backdrop-blur-md text-sm"
                        >
                            <option value="">Pilih Cabang</option>
                            {branches.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                    {branch.id} | {branch.type} | {branch.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* List Cabang (Desktop Only - hidden di mobile/tablet) */}
                    <div className="hidden lg:col-span-1 lg:flex flex-col h-full overflow-hidden">
                        <div className="space-y-2.5 overflow-y-auto flex-grow min-h-0 max-h-[calc(100%-60px)] lg:max-h-full">
                            {currentBranches.map((branch) => (
                                <div
                                    key={branch.id}
                                    className="flex-shrink-0 p-2.5 rounded-md shadow-lg border bg-white/40 backdrop-blur-md hover:border-blue-400 cursor-pointer transition-all duration-200"
                                    onClick={() => setSelectedBranch(branch)}
                                >
                                    <h2 className="text-sm sm:text-base font-semibold">{branch.id} | {branch.type} | {branch.name}</h2>
                                    <p className="text-xs sm:text-sm text-gray-700">{branch.address}</p>
                                    <ul className="text-xs sm:text-sm list-disc list-inside mt-1 space-y-0.5">
                                        {branch.services.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                    <div className="text-xs sm:text-sm mt-1.5 space-y-0.5">
                                        <a href={branch.googleMapsLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-blue-600 flex items-center">
                                            Lihat di Google Maps <ExternalLink className="w-3 h-3 ml-1" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination (Desktop Only) */}
                        <div className="mt-2 flex justify-center flex-shrink-0">
                            <nav className="inline-flex rounded-md shadow bg-white/40 backdrop-blur-sm border border-white/30">
                                <button
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                    disabled={currentPage === 1}
                                    className="px-2 py-1 text-sm rounded-l-md border-r border-white/30 disabled:opacity-50 hover:bg-blue-300 transition-colors"
                                    aria-label="Previous page"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 text-sm border-r border-white/30 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-white/50 text-gray-700'} transition-colors`}
                                        aria-label={`Page ${i + 1}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-2 py-1 text-sm rounded-r-md disabled:opacity-50 hover:bg-blue-300 transition-colors"
                                    aria-label="Next page"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Peta */}
                    {/* Menambahkan z-index pada div peta itu sendiri agar berada di "belakang" elemen lain jika ada tumpang tindih tak terduga */}
                    <div className="rounded-lg shadow-lg border border-blue-400 overflow-hidden w-full lg:col-span-2 h-[calc(100%-68px)] relative z-0">
                        <MapContainer
                            center={selectedBranch ? [selectedBranch.coords.lat, selectedBranch.coords.lng] : defaultCenter}
                            zoom={selectedBranch ? 15 : 13}
                            scrollWheelZoom
                            className="h-full w-full"
                        >
                            <InvalidateMapSize deps={[selectedBranch]} />
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {branches.map((branch) => (
                                <Marker
                                    key={branch.id}
                                    position={[branch.coords.lat, branch.coords.lng]}
                                    eventHandlers={{ click: () => setSelectedBranch(branch) }}
                                >
                                    <Popup>
                                        <div className="text-gray-900">
                                            <h3 className="font-bold text-sm mb-0.5">{branch.name}</h3>
                                            <p className="text-xs mb-1">{branch.address}</p>
                                            <a href={branch.googleMapsLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs flex items-center">
                                                Lihat di Google Maps <ExternalLink className="ml-0.5 w-3 h-3" />
                                            </a>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                            {selectedBranch && (
                                <RecenterMap coords={[selectedBranch.coords.lat, selectedBranch.coords.lng]} />
                            )}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BranchLocatorLeaflet;