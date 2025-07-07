// components/ImageWithFallback.tsx
'use client'; // Tandai sebagai Client Component

import { useState } from 'react';

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    className?: string;
    defaultSrc?: string; // Prop opsional untuk fallback default
}

const DEFAULT_FALLBACK_IMAGE = 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400';

export function ImageWithFallback({ src, alt, className, defaultSrc = DEFAULT_FALLBACK_IMAGE }: ImageWithFallbackProps) {
    const [imageSrc, setImageSrc] = useState(src || defaultSrc); // Set state awal dari src atau default
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError && imageSrc !== defaultSrc) { // Hanya ganti jika belum error dan bukan sudah default
            setImageSrc(defaultSrc);
            setHasError(true); // Tandai sudah error untuk mencegah loop
            console.warn(`Failed to load image: ${src}. Using fallback: ${defaultSrc}.`);
        }
    };

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            loading="lazy"
            onError={handleError} // Event handler di Client Component
        />
    );
}