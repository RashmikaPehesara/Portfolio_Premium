"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import clientData from "@/data/clientData";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const staticLinks = [
  { name: "Overview", href: "#overview" },
  { name: "Education", href: "#education" },
  { name: "Certificates", href: "#certificates" },
];

if (clientData.showProjectsSection) {
  staticLinks.push({ name: "Projects", href: "#projects" });
}

if (clientData.showBlogsSection) {
  staticLinks.push({ name: "Blogs", href: "#blogs" });
}

if (clientData.showAchievements) {
  staticLinks.push({ name: "Achievements", href: "#achievements" });
}

if (clientData.showGallery) {
  staticLinks.push({ name: "Gallery", href: "#gallery" });
}

staticLinks.push({ name: "Contact", href: "#contact" });

const navLinks = staticLinks;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-white/50 dark:border-gray-800/50",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            {clientData.name.split(" ")[0]}
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-medium transition-all duration-300 px-4 py-2 rounded-lg text-base",
                    isActive 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm" 
                      : "text-gray-600 dark:text-gray-300 md:hover:text-blue-500 md:dark:hover:text-blue-400 md:hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.6)] bg-transparent"
                  )}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Actions (Theme Toggle & Mobile Menu) */}
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/97 dark:bg-gray-900/97 backdrop-blur-md shadow-xl py-4 px-6 flex flex-col space-y-2 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300"
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "font-medium transition-colors px-4 py-3 rounded-lg text-lg",
                    isActive 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
