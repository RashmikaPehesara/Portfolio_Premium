"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if on a mobile/touch device by window bounds initially
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mouseMoveHandler = (e) => {
      // Throttle bounds slightly natively or rely on Framer
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Outer subtle lagging ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-indigo-400/50 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
      {/* Inner fast tracking dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_rgba(99,102,241,0.8)]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.1 }}
      />
    </>
  );
}
