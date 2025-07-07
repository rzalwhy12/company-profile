// src/components/PublicationContentWrapper.tsx
'use client';

// --- PASTIKAN SEMUA INI ADA DAN LENGKAP ---
import React, { useState, useEffect, useRef } from 'react'; // <--- PASTIKAN ADA useState, useEffect, useRef
import { useSearchParams, useRouter } from 'next/navigation'; // <--- PASTIKAN ADA useSearchParams, useRouter
import { Button } from '@/components/ui/button'; // <--- PASTIKAN ADA Button
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // <--- PASTIKAN ADA CSSTransition, TransitionGroup

// Import komponen PublicationDocumentCard
import PublicationDocumentCard from './PublicationDocumentCard';

// Import tipe dan fungsi dari file utilitas
import {
    Document,
    PublicationSection,
    PublicationContentItem,
    BreadcrumbItem,
} from '@/types/publication'; // Sesuaikan path jika berbeda

// Content for each publication section (biarkan tetap di sini)
const publicationContent: Record<PublicationSection, PublicationContentItem> = {
    // ... data publicationContent Anda ...
    'financial-report': {
        title: 'Financial Report',
        content: (
            <p>Here you can find our latest financial reports detailing our performance and stability.</p>
        ),
        documents: [
            { name: 'Q4 2024 Financial Report', year: '2024', link: '/reports/financial/q4-2024.pdf', type: 'pdf' },
            { name: 'Q3 2024 Financial Report', year: '2024', link: '/reports/financial/q3-2024.pdf', type: 'pdf' },
            { name: 'Q2 2024 Financial Report', year: '2024', link: '/reports/financial/q2-2024.pdf', type: 'pdf' },
            { name: 'Q1 2024 Financial Report', year: '2024', link: '/reports/financial/q1-2024.pdf', type: 'pdf' },
            { name: 'Full Year 2023 Financial Statement', year: '2023', link: '/reports/financial/fy-2023-statement.pdf', type: 'pdf' },
            { name: 'Full Year 2023 Financial Overview', year: '2023', link: '/reports/financial/fy-2023-overview.xlsx', type: 'excel' },
        ],
    },
    'annual-report': {
        title: 'Annual Report',
        content: (
            <p>Our annual reports provide a comprehensive overview of our operations, financial results, and strategic initiatives.</p>
        ),
        documents: [
            { name: 'Annual Report 2023', year: '2023', link: '/reports/annual/annual-report-2023.pdf', type: 'pdf' },
            { name: 'Annual Report 2022', year: '2022', link: '/reports/annual/annual-report-2022.pdf', type: 'pdf' },
            { name: 'Annual Report 2021', year: '2021', link: '/reports/annual/annual-report-2021.pdf', type: 'pdf' },
        ],
    },
    'idic-lps': {
        title: 'IDIC / LPS Information',
        content: (
            <div className="space-y-4">
                <p>The Indonesia Deposit Insurance Corporation (LPS) ensures the safety of your deposits. Learn more about the protection provided.</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Deposit Guarantee Program Details</li>
                    <li>FAQs about LPS Coverage</li>
                    <li><a href="https://www.lps.go.id" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Official IDIC/LPS Website</a></li>
                </ul>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    <p className="font-semibold">Important Notice:</p>
                    <p>All customer deposits are guaranteed by the Indonesia Deposit Insurance Corporation (LPS) up to the maximum limit specified by law.</p>
                </div>
            </div>
        ),
    },
    'information': {
        title: 'General Information',
        content: (
            <div className="space-y-4">
                <p>This section provides various general information related to our banking services, terms and conditions, and regulatory compliance.</p>
                <p>Stay informed about important notices and updates regarding our operations and policies.</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Terms and Conditions for Savings Accounts</li>
                    <li>Loan Product Information (General)</li>
                    <li>Data Privacy Policy</li>
                    <li>Customer Service Contact Directory</li>
                    <li><a href="/documents/general/terms-of-service.pdf" className="text-blue-600 hover:underline" download>Download Full Terms of Service (PDF)</a></li>
                </ul>
            </div>
        ),
    },
    'report': { // Default content for 'Report' if no sub-item is selected
        title: 'Reports Overview',
        content: (
            <div className="space-y-4">
                <p>Please select a specific report from the sub-menu on the left, such as Financial Report or Annual Report, to view detailed information.</p>
                <p>Our commitment to transparency is reflected in the comprehensive reports we publish regularly, providing insights into our performance and governance.</p>
            </div>
        ),
    },
};

const PublicationContent: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const nodeRef = useRef(null);
    const submenuRef = useRef(null);

    const [activeSection, setActiveSection] = useState<PublicationSection>('financial-report');
    const [isReportExpanded, setIsReportExpanded] = useState(false);

    useEffect(() => {
        const section = searchParams.get('section') as PublicationSection;
        if (section && publicationContent[section]) {
            setActiveSection(section);
            if (section === 'financial-report' || section === 'annual-report') {
                setIsReportExpanded(true);
            }
        } else {
            if (typeof window !== 'undefined' && !searchParams.get('section')) {
                 router.replace('/publication?section=financial-report');
            }
        }
    }, [searchParams, router]);

    const handleSectionClick = (section: PublicationSection) => {
        setActiveSection(section);
        router.push(`/publication?section=${section}`);
        if (section === 'report') {
            setIsReportExpanded(!isReportExpanded);
        } else if (section === 'financial-report' || section === 'annual-report') {
            setIsReportExpanded(true);
        } else {
            setIsReportExpanded(false);
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'HOME', href: '/' },
        { label: 'Publication', href: '/publication' },
        (activeSection !== 'report' && publicationContent[activeSection]) ? {
            label: publicationContent[activeSection].title,
            href: `/publication?section=${activeSection}`
        } : null
    ].filter(Boolean) as BreadcrumbItem[];

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-8 px-6 sm:px-10 gap-8">
            {/* Breadcrumbs */}
            <div className="bg-white py-4 px-6 sm:px-10 border-b border-gray-200 w-full lg:hidden">
                <nav className="text-sm text-gray-500">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <a href={crumb.href} className="hover:underline text-blue-600">
                                {crumb.label}
                            </a>
                            {index < breadcrumbs.length - 1 && (
                                <span className="mx-2">/</span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            </div>

            {/* Left Section: Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0 bg-white rounded-lg shadow-md p-4 h-fit lg:sticky lg:top-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Publications</h3>
                <nav className="space-y-1">
                    {/* Report Section - with dropdown */}
                    <div>
                        <Button
                            variant="ghost"
                            className={`w-full justify-between text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                                (activeSection === 'report' || activeSection === 'financial-report' || activeSection === 'annual-report')
                                    ? 'bg-blue-50 text-blue-700 font-semibold'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                            onClick={() => handleSectionClick('report')}
                        >
                            Report
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 transform transition-transform duration-200 ${isReportExpanded ? 'rotate-90' : 'rotate-0'}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </Button>
                        {/* Pastikan menggunakan ref yang berbeda untuk submenu */}
                        <CSSTransition
                            in={isReportExpanded}
                            timeout={200}
                            classNames="submenu-transition"
                            unmountOnExit
                            nodeRef={submenuRef}
                        >
                            <div ref={submenuRef} className="pl-4 mt-1 space-y-1 overflow-hidden">
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start text-left text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                                        activeSection === 'financial-report' ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                                    }`}
                                    onClick={() => handleSectionClick('financial-report')}
                                >
                                    Financial Report
                                </Button>
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start text-left text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                                        activeSection === 'annual-report' ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                                    }`}
                                    onClick={() => handleSectionClick('annual-report')}
                                >
                                    Annual Report
                                </Button>
                            </div>
                        </CSSTransition>
                    </div>

                    {/* Other Sections */}
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                            activeSection === 'idic-lps' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        onClick={() => handleSectionClick('idic-lps')}
                    >
                        IDIC / LPS
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                            activeSection === 'information' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        onClick={() => handleSectionClick('information')}
                    >
                        Information
                    </Button>
                </nav>
            </aside>

            {/* Right Section: Main Content */}
            <main className="flex-1 bg-white rounded-lg shadow-md p-6 lg:p-8 min-h-[60vh]">
                <TransitionGroup component={null}>
                    <CSSTransition
                        key={activeSection}
                        timeout={300}
                        classNames="fade-and-slide"
                        nodeRef={nodeRef}
                    >
                        <div ref={nodeRef}>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
                                {publicationContent[activeSection]?.title || 'Select a Publication'}
                            </h1>

                            {publicationContent[activeSection]?.documents ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <TransitionGroup component={null}>
                                        {publicationContent[activeSection].documents?.map((doc: Document, docIndex: number) => (
                                            <PublicationDocumentCard
                                                key={docIndex}
                                                doc={doc}
                                                delay={docIndex * 50}
                                            />
                                        ))}
                                    </TransitionGroup>
                                </div>
                            ) : (
                                <div className="prose prose-lg text-gray-700">
                                    {publicationContent[activeSection]?.content}
                                </div>
                            )}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </main>
        </div>
    );
};

export default PublicationContent; // Ekspor komponen React Anda