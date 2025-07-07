'use client';

interface FormattedDateProps {
    dateString: string | undefined; 
}

export function FormattedDate({ dateString }: FormattedDateProps) {
    if (!dateString) {
        return <span>Tanggal Tidak Diketahui</span>;
    }
    return <span>{new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>;
}