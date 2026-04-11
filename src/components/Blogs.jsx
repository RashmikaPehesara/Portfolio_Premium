"use client";

import { motion } from "framer-motion";
import clientData from "@/data/clientData";
import { Clock, Tag } from "lucide-react";

export default function Blogs() {
  if (!clientData.showBlogsSection || !clientData.blogs || clientData.blogs.length === 0) return null;

  return (
    <section id="blogs" className="py-20 px-6 bg-gradient-to-b from-transparent to-white/60 dark:to-gray-900/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-base font-medium text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2">My Thoughts</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300">Latest Articles</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientData.blogs.map((blog, index) => (
            <motion.a
              key={blog.id}
              href={blog.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md group flex flex-col hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 border border-gray-50 dark:border-gray-700 h-full cursor-pointer"
            >
              {/* Cover Image Core */}
              <div className="relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-gray-900">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-sm font-bold text-gray-800 dark:text-gray-200 rounded-full shadow-sm transition-colors duration-300">
                    <Tag size={14} className="text-blue-500" />
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 transition-colors duration-300">
                  <span>{blog.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <span className="flex items-center gap-1"><Clock size={12} /> {blog.readingTime}</span>
                </div>

                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {blog.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-grow transition-colors duration-300">
                  {blog.description}
                </p>
                
                {/* Read anchor hook text */}
                <span className="inline-flex font-bold text-sm text-blue-600 dark:text-blue-400 md:group-hover:translate-x-1 transition-transform duration-300 mt-auto">
                  Read Article →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
