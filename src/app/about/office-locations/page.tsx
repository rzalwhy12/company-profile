// src/app/about/office-locations/page.tsx
'use client';

import AboutUsClientPage from '@/components/AboutUsClientPage';

const CURRENT_PAGE_ID = 'office-locations'; // Ubah sesuai ID

export default function OfficeLocationsPage() {
    return <AboutUsClientPage initialId={CURRENT_PAGE_ID} />;
}