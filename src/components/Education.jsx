"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clientData from "@/data/clientData";
import { GraduationCap } from "lucide-react";

// Subcomponent maps internal track bounds independently to offload performance safely
const EducationCard = ({ item, index }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    // Only map if viewing on desktop cleanly (no reliable native event bounds on mobile hover safely)
    if(window.innerWidth <= 768) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => window.innerWidth > 768 && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white/40 dark:bg-gray-800/80 p-8 rounded-xl shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col relative overflow-hidden group hover:-translate-y-1 md:hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] backdrop-blur-md"
    >
      {/* Interior Magnetic Glow Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.15), transparent 40%)`
        }}
      />
      
      {/* Decorative Background Icon */}
      <div className="absolute -right-6 -bottom-6 opacity-[0.03] dark:opacity-[0.05] md:group-hover:opacity-[0.06] transition-opacity duration-300 text-gray-900 dark:text-white pointer-events-none">
        <GraduationCap size={150} />
      </div>

      <div className="relative z-10 flex-1 pointer-events-none">
        <div className="flex items-start justify-between mb-4">
          <h4 className="text-3xl font-semibold mb-2 text-gray-900 dark:text-white leading-tight transition-colors duration-300">{item.degree}</h4>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full shadow-sm">
            {item.year}
          </span>
          <h5 className="text-base font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">{item.school}</h5>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base transition-colors duration-300">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function Education() {
  if (!clientData.education || clientData.education.length === 0) return null;

  return (
    <section id="education" className="py-20 px-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl border-y border-white/50 dark:border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-base font-medium text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2">My Journey</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300">Education & Experience</h3>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
          {clientData.education.map((item, index) => (
             <EducationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
