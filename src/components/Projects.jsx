"use client";

import { motion } from "framer-motion";
import clientData from "@/data/clientData";
import { ExternalLink, Code } from "lucide-react";

export default function Projects() {
  if (!clientData.showProjectsSection || !clientData.projects || clientData.projects.length === 0) return null;

  return (
    <section id="projects" className="py-20 px-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl border-y border-white/50 dark:border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-base font-medium text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2">My Work</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300">Featured Projects</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md flex flex-col group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 border border-gray-50 dark:border-gray-700 h-full"
            >
              {/* Image Thumbnail */}
              <div className="relative overflow-hidden aspect-video bg-gray-100 dark:bg-gray-900">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              {/* Card Content Core */}
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  {project.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm flex-grow transition-colors duration-300">
                  {project.description}
                </p>
                
                {/* Tech Stack Map */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full border border-blue-100 dark:border-gray-600 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions Bottom Bar */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto transition-colors duration-300">
  <a 
    href={project.demoLink} 
    target="_blank" 
    rel="noreferrer"
    className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap min-w-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
  >
    <ExternalLink size={16} className="shrink-0" />
    <span className="truncate">View Demo</span>
  </a>
                  
                  {project.showCode && project.codeLink && (
  <a 
    href={project.codeLink} 
    target="_blank" 
    rel="noreferrer"
    className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap min-w-0 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
  >
    <Code size={16} className="shrink-0" />
    <span className="truncate">View Code</span>
  </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
