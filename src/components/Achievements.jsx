"use client";

import { motion } from "framer-motion";
import clientData from "@/data/clientData";
import { Trophy, Calendar } from "lucide-react";

export default function Achievements() {
  if (!clientData.showAchievements || !clientData.achievements || clientData.achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-20 px-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl border-y border-white/50 dark:border-gray-800/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-base font-medium text-purple-600 dark:text-purple-400 tracking-wider uppercase mb-2">Milestones</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300">Key Achievements</h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {clientData.achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-row group"
            >
              {/* Image Thumbnail - Fixed width rectangle */}
              {achievement.image && (
                <div className="shrink-0 w-[120px] md:w-[160px] relative overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              )}
              
              {/* Card Content Core */}
              <div className="p-5 md:p-6 flex flex-col justify-center relative flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    {achievement.title}
                  </h4>
                  <Trophy size={18} className="text-purple-500 dark:text-purple-400 shrink-0 ml-3 hidden sm:block" />
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm flex-grow transition-colors duration-300 line-clamp-2 md:line-clamp-3">
                  {achievement.description}
                </p>

                {/* Badge area */}
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-md uppercase tracking-wide border border-purple-100 dark:border-purple-500/20 transition-colors duration-300">
                    <Calendar size={14} />
                    {achievement.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
