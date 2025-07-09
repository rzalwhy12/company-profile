// src/app/about/mission-statement/page.tsx
'use client'; // Ini tetap Client Component karena AboutUsClientPage menggunakannya

import AboutUsClientPage from '@/components/AboutUsClientPage';

// Kita tidak menggunakan 'params' di sini karena ini adalah halaman statis.
// 'id' langsung ditetapkan secara manual sesuai dengan nama folder.
const CURRENT_PAGE_ID = 'mission-statement';

export default function MissionStatementPage() {
    // Kita meneruskan ID yang sudah ditentukan ke komponen Client
    return <AboutUsClientPage initialId={CURRENT_PAGE_ID} />;
}

// generateStaticParams TIDAK diperlukan lagi di sini,
// karena halaman ini sudah statis berdasarkan nama file/folder.