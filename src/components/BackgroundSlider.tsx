// src/components/BackgroundSlider.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

const backgroundMedia = [
    { type: 'video', src: '/videos/company-profile.mp4', alt: 'Company Profile Video' },
    { type: 'image', src: '/image/test1.png', alt: 'Test Image 1' },
    { type: 'image', src: '/image/test2.png', alt: 'Test Image 2' },
    { type: 'image', src: '/image/rjt2-scaled.jpg', alt: 'RJT Scale' },
];

const slideDuration = 8000;

const BackgroundSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let slideTimer: NodeJS.Timeout;

        if (videoRef.current && backgroundMedia[currentSlide].type === 'video') {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(error =>
                console.error("Background video auto-play failed (on slide change):", error)
            );
        }

        slideTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % backgroundMedia.length);
        }, slideDuration);

        return () => {
            clearInterval(slideTimer);
        };
    }, [currentSlide]);

    useEffect(() => {
        const mediaItem = backgroundMedia[currentSlide];
        if (mediaItem.type === 'video' && videoRef.current) {
            videoRef.current.play().catch(error =>
                console.error("Background video auto-play failed:", error)
            );
        } else if (mediaItem.type === 'image' && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [currentSlide]);

    return (
        <>
            {backgroundMedia.map((item, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                    // HAPUS transform translateY (parallax effect)
                    style={{}} // optional: bisa dihapus sekalian
                >
                    {item.type === 'image' ? (
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("${item.src}")`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                            }}
                        />
                    ) : (
                        <video
                            ref={index === currentSlide ? videoRef : null}
                            className="absolute inset-0 w-full h-full object-cover"
                            src={item.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            aria-label={item.alt}
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-purple-900/30" />
                </div>
            ))}
        </>
    );
};

export default BackgroundSlider;
