"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clientData from "@/data/clientData";
import { Award, X } from "lucide-react";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  // Manage body scroll locking when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCert]);

  if (!clientData.certificates || clientData.certificates.length === 0) return null;

  return (
    <>
      <section id="certificates" className="py-20 px-6 bg-gradient-to-b from-transparent to-white/60 dark:to-gray-900/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-base font-medium text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2">My Achievements</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300">Certificates & Awards</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientData.certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedCert(cert)}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md cursor-pointer group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 border border-gray-50 dark:border-gray-700"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-gray-900">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                   <p className="text-white font-medium">Click to view details</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 leading-tight flex-1 transition-colors duration-300">
                    {cert.title}
                  </h4>
                  <Award className="text-blue-500 dark:text-blue-400 shrink-0 mt-1" size={24} />
                </div>
                <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-700 pt-4 transition-colors duration-300">
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">{cert.issuer}</span>
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Refined Text Modal Popup */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-[90%] max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              
              <div className="mt-2 pr-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      {selectedCert.title}
                    </h4>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-500 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-gray-800/80 p-3 rounded-lg w-fit">
                  <span>{selectedCert.issuer}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>{selectedCert.date}</span>
                </div>

                <div className="space-y-4">
                  <h5 className="text-lg font-bold text-gray-800 dark:text-gray-200">About the Certification</h5>
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
