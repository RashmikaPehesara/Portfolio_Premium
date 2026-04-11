"use client";

import { motion } from "framer-motion";
import clientData from "@/data/clientData";
import { Download, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Overview() {
  const iconMap = {
    github: FaGithub,
    linkedin: FaLinkedin,
    instagram: FaInstagram,
    facebook: FaFacebook,
  };

  return (
    <section id="overview" className="min-h-screen flex items-center justify-center pt-32 pb-24 px-6 bg-transparent relative z-10 w-full">
      {/* Top Fade Overlay connecting Navbar */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center w-full text-center">
        
        {/* Centered Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8 relative z-20"
        >
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-gray-200 dark:bg-gray-900 transition-colors duration-300 ring-4 ring-blue-400/40">
            <img 
              src="https://i.pravatar.cc/300"  //Profile Picture URL
              alt={clientData.name}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center w-full z-20 relative"
        >
          <h2 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-3 tracking-[0.2em] uppercase">Hello, I'm</h2>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 leading-tight transition-colors duration-300">
            {clientData.name}
          </h1>
          <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-4 transition-colors duration-300">
            {clientData.tagline}
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed transition-colors duration-300 mx-auto">
            {clientData.about}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12 w-full max-w-lg">
            {clientData.showDownloadCV && (
              <a 
                href={clientData.cvLink} 
                download
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold md:hover:scale-105 md:hover:shadow-lg transition-all duration-300 w-auto shadow-md"
              >
                <Download size={20} />
                Download CV
              </a>
            )}
            
            {clientData.contact.phone && (
              <a 
                href={`https://wa.me/${clientData.contact.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold md:hover:scale-105 md:hover:shadow-lg hover:bg-green-700 transition-all duration-300 w-auto shadow-md"
              >
                <MessageCircle size={20} />
                WhatsApp Me
              </a>
            )}
          </div>

          {/* Glowing Enhanced Social Icons */}
          <div className="flex items-center justify-center gap-5">
            {Object.entries(clientData.socialLinks).map(([platform, url]) => {
              if (!url) return null;
              const Icon = iconMap[platform];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-14 h-14 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300 border border-gray-200 dark:border-gray-700 shadow-sm"
                  aria-label={platform}
                >
                  {Icon && <Icon size={24} />}
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
