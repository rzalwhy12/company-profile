// src/app/about/customer-complaints/page.tsx
'use client';

import AboutUsClientPage from '@/components/AboutUsClientPage';

const CURRENT_PAGE_ID = 'customer-complaints'; // Ubah sesuai ID

export default function CustomerComplaintsPage() {
    return <AboutUsClientPage initialId={CURRENT_PAGE_ID} />;
}