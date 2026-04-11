"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none opacity-60 dark:opacity-40">
      {/* Top Left Blue Blob */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 50, 20, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl"
      />
      
      {/* Bottom Right Pink Blob */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -30, -50, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-pink-500/10 dark:bg-pink-600/15 blur-3xl"
      />

      {/* Center Purple ambient pulse */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-3xl"
      />
    </div>
  );
}
