"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import clientData from "@/data/clientData";
import { Folder, X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import Image from "next/image";

export default function Gallery() {
  const [activeFolder, setActiveFolder] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const scrollRef = useRef(null);
  const mobileScrollRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check right away on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openFolder = (folder) => {
    setActiveFolder(folder);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setActiveFolder(null);
  };

  const nextImage = useCallback(() => {
    if (!activeFolder) return;
    setCurrentImageIndex((prev) => (prev + 1) % activeFolder.images.length);
  }, [activeFolder]);

  const prevImage = useCallback(() => {
    if (!activeFolder) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? activeFolder.images.length - 1 : prev - 1
    );
  }, [activeFolder]);

  // Handle body scroll locking when modal is open
  useEffect(() => {
    if (activeFolder) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeFolder]);

  // Auto-scroll effect: 10 seconds, DOES NOT depend on index
  useEffect(() => {
    if (!activeFolder || isMobile) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % activeFolder.images.length);
    }, 10000);

    // Cleans up on unmount or when modal closes
    return () => clearInterval(interval);
  }, [activeFolder, isMobile]);

  // Keyboard navigation for Desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeFolder) return;
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFolder, nextImage, prevImage]);

  // Folder carousel scrolling logic (Desktop)
  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  // Mobile Folder navigation logic
  const mobileScrollLeft = () => {
    if (mobileScrollRef.current) mobileScrollRef.current.scrollBy({ left: -window.innerWidth * 0.8, behavior: "smooth" });
  };

  const mobileScrollRight = () => {
    if (mobileScrollRef.current) mobileScrollRef.current.scrollBy({ left: window.innerWidth * 0.8, behavior: "smooth" });
  };

  // 1. Force Download Fetch + Blob
  const handleDownload = async (e) => {
    if (e) e.stopPropagation();
    try {
      const url = activeFolder.images[currentImageIndex];
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `image-${currentImageIndex}.jpg`;
      
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // 2. Drag Logic
  const handleSwipe = (info) => {
    if (!activeFolder) return;
    const offset = info.offset.x;

    if (offset < -80) {
      // swipe left → NEXT
      setCurrentImageIndex((prev) => (prev + 1) % activeFolder.images.length);
    } 
    else if (offset > 80) {
      // swipe right → PREVIOUS
      setCurrentImageIndex((prev) => (prev - 1 + activeFolder.images.length) % activeFolder.images.length);
    }
  };

  if (!clientData.showGallery || !clientData.gallery || clientData.gallery.length === 0) return null;

  const lightboxContent = (
    <AnimatePresence>
      {activeFolder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-0 m-0"
          style={{ 
            background: "rgba(0, 0, 0, 0.95)", 
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-[10000]">
            <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">{activeFolder.folder}</h3>
            <button 
              onClick={closeGallery}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur focus:outline-none shadow-lg"
            >
              <X size={24} />
            </button>
          </div>

          {/* Swipe Container and Centered Image */}
          <motion.div 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, info) => handleSwipe(info)}
            className="flex-grow w-full flex items-center justify-center overflow-hidden mb-24 mt-20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.25 }}
                className="relative flex items-center justify-center w-full max-w-[95vw] h-full"
              >
                <Image
                  src={activeFolder.images[currentImageIndex]}
                  alt={`${activeFolder.folder} image ${currentImageIndex + 1}`}
                  fill
                  loading={currentImageIndex === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  className="object-contain select-none pointer-events-none"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Controls (Desktop Only) */}
          {!isMobile && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur focus:outline-none shadow-xl z-[10000]"
              >
                <ChevronLeft size={32} />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur focus:outline-none shadow-xl z-[10000]"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Footer Items (Centered Below Image) */}
          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center gap-4 z-[10000]">
            <button
              onClick={handleDownload}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg flex items-center gap-2"
            >
              <Download size={16} /> Download
            </button>
            
            <div className="bg-black/50 backdrop-blur-md text-white font-medium px-5 py-2 rounded-full text-sm shadow-xl flex items-center justify-center">
              {currentImageIndex + 1} / {activeFolder.images.length}
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section id="gallery" className="py-20 px-6 bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-12">
          <h2 className="text-base font-medium text-pink-600 dark:text-pink-400 tracking-wider uppercase mb-2">Memories</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300">Photo Gallery</h3>
        </div>

        {/* --- DESKTOP FOLDER CAROUSEL --- */}
        <div className="relative w-full hidden md:flex items-center justify-center mt-4">
          <button 
            onClick={scrollLeft} 
            className="absolute lg:left-[-40px] md:left-2 z-20 p-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-xl hover:scale-110 transition-transform"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div 
            ref={scrollRef} 
            className="flex overflow-x-auto gap-6 scroll-smooth py-4 w-[888px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {clientData.gallery.map((folder) => (
              <motion.div
                key={folder.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                onClick={() => openFolder(folder)}
                className="cursor-pointer flex flex-col items-center shrink-0 min-w-[280px] max-w-[280px]"
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800 mb-4 transition-all duration-300 group">
                  <Image 
                    src={folder.coverImage}
                    alt={folder.folder}
                    fill
                    sizes="280px"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Folder className="text-gray-400 dark:text-gray-500" size={20} />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white transition-colors group-hover:text-pink-500">
                    {folder.folder}
                  </h4>
                </div>
                <span className="text-sm text-gray-500">{folder.images.length} Photos</span>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={scrollRight} 
            className="absolute lg:right-[-40px] md:right-2 z-20 p-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-xl hover:scale-110 transition-transform"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* --- MOBILE FOLDER CAROUSEL --- */}
        <div className="relative w-[80vw] mx-auto flex md:hidden items-center justify-center mt-4">
          <button 
            onClick={mobileScrollLeft} 
            className="absolute left-[-30px] z-20 p-2 bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-white rounded-full shadow-md opacity-50 shrink-0 focus:outline-none"
            aria-label="Previous Folder"
          >
            <ChevronLeft size={20} />
          </button>

          <div 
            ref={mobileScrollRef}
            className="flex overflow-x-auto w-full gap-4 scroll-smooth snap-x snap-mandatory pt-2 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {clientData.gallery.map((folder) => (
              <div 
                key={folder.id} 
                className="w-full shrink-0 flex flex-col items-center cursor-pointer snap-center"
                onClick={() => openFolder(folder)}
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800 mb-3 group">
                  <Image 
                    src={folder.coverImage}
                    alt={folder.folder}
                    fill
                    sizes="80vw"
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Folder className="text-gray-400 dark:text-gray-500" size={18} />
                  <h4 className="text-base font-bold text-gray-900 dark:text-white shadow-sm">
                    {folder.folder}
                  </h4>
                </div>
                <span className="text-xs text-gray-500">{folder.images.length} Photos</span>
              </div>
            ))}
          </div>

          <button 
            onClick={mobileScrollRight} 
            className="absolute right-[-30px] z-20 p-2 bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-white rounded-full shadow-md opacity-50 shrink-0 focus:outline-none"
            aria-label="Next Folder"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>

      {mounted && typeof document !== "undefined" && createPortal(lightboxContent, document.body)}
    </section>
  );
}
