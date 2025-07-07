'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown, CreditCard, ArrowRight, Phone, MapPin, PlayCircle, X } from 'lucide-react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdownProgress, setCountdownProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const backgroundMedia = [
    { type: 'video', src: '/videos/company-profile.mp4', alt: 'Company Profile Video' },
    { type: 'image', src: 'image/test1.png', alt: 'Test Image 1' },
    { type: 'image', src: 'image/test2.png', alt: 'Test Image 2' },
    { type: 'image', src: 'image/rjt2-scaled.jpg', alt: 'RJT Scale' },
  ];

  const slideDuration = 8000;
  const updateInterval = 100;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle auto-slide and progress bar
  // **MODIFIED:** Added isModalOpen to dependencies and conditional logic for timers
  useEffect(() => {
    let slideTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    if (!isModalOpen) { // Only run timers if modal is not open
      setCountdownProgress(0); // Reset progress when slide changes or modal closes

      // Pause background video if changing from video slide (only if not already paused by modal)
      if (videoRef.current && backgroundMedia[currentSlide].type === 'video') {
        videoRef.current.currentTime = 0; // Reset video to start
        videoRef.current.play().catch(error => console.error("Background video auto-play failed (on slide change):", error));
      }

      slideTimer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % backgroundMedia.length);
        setCountdownProgress(0); // Reset for the new slide
      }, slideDuration);

      progressTimer = setInterval(() => {
        setCountdownProgress((prev) => {
          const newProgress = prev + (updateInterval / slideDuration) * 100;
          return newProgress > 100 ? 0 : newProgress;
        });
      }, updateInterval);
    }

    return () => {
      clearInterval(slideTimer);
      clearInterval(progressTimer);
    };
  }, [currentSlide, backgroundMedia.length, slideDuration, updateInterval, isModalOpen]); // Add isModalOpen here

  // Effect to play background video when it becomes active (and modal is not open)
  // This useEffect ensures the video plays when its slide becomes active,
  // even if it was paused by the modal closing.
  useEffect(() => {
    const mediaItem = backgroundMedia[currentSlide];
    if (mediaItem.type === 'video' && videoRef.current && !isModalOpen) {
      videoRef.current.play().catch(error => console.error("Background video auto-play failed:", error));
    } else if (mediaItem.type === 'image' && videoRef.current) {
        // Pause and reset video if we switch to an image slide
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }
  }, [currentSlide, backgroundMedia, isModalOpen]);

  // Function to open the video modal
  const openVideoModal = useCallback(() => {
    setIsModalOpen(true);
    if (videoRef.current) {
      videoRef.current.pause(); // Pause background video when modal opens
    }
  }, []);

  // Function to close the video modal
  const closeVideoModal = useCallback(() => {
    setIsModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0; 
    }
  }, []);

  // Effect to play modal video when it becomes visible
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.play().catch(error => console.error("Modal video auto-play failed:", error));
    }
  }, [isModalOpen]);

  const floatingButtons = [
    {
      id: 'location',
      icon: MapPin,
      label: 'Lokasi & Kontak',
      tooltip: 'Tulungagung, Indonesia',
      link: 'https://maps.app.goo.gl/AJViXjmLpmXBsNr5A'
    },
    {
      id: 'call',
      icon: Phone,
      label: 'Call',
      tooltip: 'rzalcorp05@gmail.com',
      link: 'tel:+6282142991064'
    },
    {
      id: 'kredit',
      icon: CreditCard,
      label: 'Kredit & Tabungan',
      tooltip: 'Info Kredit & Tabungan',
      link: '#'
    },
  ];

  // Determine button content and action dynamically
  const currentMediaItem = backgroundMedia[currentSlide];
  const isVideoSlide = currentMediaItem.type === 'video';
  const buttonText = isVideoSlide ? 'Lihat Video Profile Kami' : 'Know More';
  const buttonAction = isVideoSlide ? openVideoModal : () => {/* navigate to default link */ };

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">

      {/* Desktop Hero Section */}
      <div className="relative flex-grow items-center justify-center min-h-[50vh] md:min-h-screen z-0 hidden md:flex">
        {backgroundMedia.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
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
                // Use index === currentSlide to ensure ref only attaches to the active background video
                ref={index === currentSlide ? videoRef : null}
                className="absolute inset-0 w-full h-full object-cover"
                src={item.src}
                autoPlay // Keep autoPlay for background
                loop // Keep loop for background
                muted // Keep muted for background
                playsInline
                preload="auto"
                aria-label={item.alt}
              >
                Your browser does not support the video tag.
              </video>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-purple-900/30" />
          </div>
        ))}

        {/* Desktop Text Content */}
        <div className="absolute bottom-30 left-6 z-30
                        md:max-w-sm md:px-4 md:py-4 md:buttom-50
                        lg:bottom-40 lg:left-10 lg:max-w-lg lg:px-5 lg:py-5
                        xl:bottom-28 xl:left-14 xl:max-w-lg xl:px-6 xl:py-6
                        text-left text-white ">
          <h2 className="text-4xl text-shadow-gray-900 text-white md:text-2xl lg:text-3xl xl:text-4xl xl:text-shadow-cyan-950 font-bold mb-2 tracking-wide leading-tight">
            BPR <br />SUMBER DANA ANDA
            <span className="block text-lg md:text-base lg:text-lg xl:text-xl text-white mt-1 font-light tracking-normal">
              Trusted Choice For You
            </span>
          </h2>
          <div className="w-1/3 h-0.5 bg-yellow-400 mb-4"></div>
          <p className="text-sm md:text-sm lg:text-base xl:text-base max-w-xs font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
          </p>
          {isVideoSlide ? (
            <button
              onClick={buttonAction} // Call openVideoModal
              className="mt-8 bg-transparent border border-white/50 text-white px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/20 hover:border-white inline-flex items-center space-x-2"
            >
              <PlayCircle className="h-5 w-5 mr-1" />
              <span>{buttonText}</span>
            </button>
          ) : (
            <a
              href="#" // Default link for "Know More"
              className="mt-8 bg-transparent border border-white/50 text-white px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/20 hover:border-white inline-flex items-center space-x-2"
            >
              <span>{buttonText}</span>
              <ArrowRight className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          )}
        </div>

        {/* Desktop Progress Bar Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-white hidden md:block md:bottom-16 lg:bottom-28 w-2/3 max-w-2xl">
          <div className="flex justify-between space-x-2 w-full">
            {backgroundMedia.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1.5 bg-gray-500/50 rounded-full overflow-hidden cursor-pointer"
                onClick={() => setCurrentSlide(index)}
              >
                {index === currentSlide ? (
                  <div
                    className="h-full bg-blue-600/50 transition-all duration-100 ease-linear"
                    style={{ width: `${countdownProgress}%` }}
                  />
                ) : (
                  <div
                    className={`h-full ${index < currentSlide ? 'bg-blue-600/50' : 'bg-gray-400'}`}
                    style={{ width: '100%' }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs mt-2 text-white/80 font-semibold">
            <span>BPR</span>
            <span>...</span>
            <span>SDA Tulungagung</span>
            <span>Trusted Choice For You</span>
          </div>
        </div>
      </div>

      {/* Mobile Hero Section */}
      <div className="block md:hidden pt-4 px-4">
        {/* Mobile Slider Image/Video with Rounded Style */}
        <div className="mt-30 relative w-full h-70 rounded-xl overflow-hidden mb-6 shadow-lg">
          {backgroundMedia.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
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
              {/* Overlay for mobile slider */}
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>

        {/* Mobile Progress Bar Indicators */}
        <div className="flex justify-between space-x-2 mb-6 w-full">
          {backgroundMedia.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1.5 bg-gray-500/50 rounded-full overflow-hidden cursor-pointer"
              onClick={() => setCurrentSlide(index)}
            >
              {index === currentSlide ? (
                <div
                  className="h-full bg-blue-900 transition-all duration-100 ease-linear"
                  style={{ width: `${countdownProgress}%` }}
                />
              ) : (
                <div
                  className={`h-full ${index < currentSlide ? 'bg-blue-900' : 'bg-gray-400'}`}
                  style={{ width: '100%' }}
                />
              )}
            </div>
          ))}
        </div>
        {/* Mobile Content */}
        <div className="text-center px-4 py-6">
          <h2 className="gradient-text text-3xl xs:text-4xl sm:text-5xl font-bold mb-3 tracking-wide leading-tight">
            BPR SUMBER DANA ANDA
            <span className="block text-xl xs:text-2xl sm:text-3xl text-orange-500 mt-2 font-light tracking-normal">Trusted Choice For You</span>
          </h2>
          <div className="w-1/3 h-0.5 bg-yellow-400 mb-6 mx-auto"></div>
          <p className="text-base xs:text-lg sm:text-xl max-w-xs mx-auto text-gray-600 mb-6 font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
          </p>
          {isVideoSlide ? (
            <button
              onClick={buttonAction} // Call openVideoModal
              className="bg-transparent border border-purple-950 text-gray-700 px-7 py-3 rounded-md text-base font-semibold transition-all duration-300 hover:bg-orange-300/30 hover:border-gray-500 inline-flex items-center space-x-2"
            >
              <PlayCircle className="h-5 w-5 mr-1" />
              <span>{buttonText}</span>
            </button>
          ) : (
            <a
              href="#"
              className="bg-transparent border border-purple-950 text-gray-700 px-7 py-3 rounded-md text-base font-semibold transition-all duration-300 hover:bg-orange-300/30 hover:border-gray-500 inline-flex items-center space-x-2"
            >
              <span>{buttonText}</span>
              <ArrowRight className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          )}
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-4 right-0 z-50 hidden md:flex flex-col items-end space-y-2 pr-2">
        {floatingButtons.map((button) => (
          <a
            key={button.id}
            href={button.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center
                        bg-gray-700 text-white
                        p-3 rounded-full shadow-lg
                        transition-all duration-300 ease-in-out
                        group hover:bg-gray-800 hover:pr-4"
          >
            <button.icon className="h-5 w-5 md:h-6 md:w-6" />
            <span className="absolute right-full mr-2 w-max px-2 py-1 bg-black/70 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {button.tooltip}
            </span>
          </a>
        ))}
      </div>

      {/* Scroll Down Icon */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-40 md:bottom-4">
        <ChevronDown className="h-5 w-5 text-white animate-bounce md:h-6 md:w-6" />
      </div>

      {/* Video Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]">
          <div className="relative w-full h-full max-w-screen-xl max-h-screen-xl p-4">
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 bg-gray-800 rounded-full"
              aria-label="Close video"
            >
              <X className="h-6 w-6" />
            </button>
            <video
              ref={modalVideoRef}
              src={currentMediaItem.src}
              className="w-full h-full object-contain"
              controls
              autoPlay
              // Hapus 'muted' di sini atau set ke false agar suara keluar di modal
              // muted={false} // Contoh explicit unmute
              playsInline
              loop={false}
              onEnded={closeVideoModal}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;