"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import CanvasSequence from "@/components/CanvasSequence";
import StorySections from "@/components/StorySections";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  return (
    <main className="relative bg-[var(--color-bg-primary)] min-h-screen text-[var(--color-text-muted)]">
      
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#f8fafc] flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-6">
              <Settings className="w-12 h-12 md:w-16 md:h-16 text-slate-800 animate-[spin_4s_linear_infinite]" />
              <h1 className="text-slate-800 font-heading text-lg md:text-xl tracking-[0.3em] uppercase animate-pulse">
                Loading {progress}%
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      <div className="relative h-[400vh] w-full">
        <CanvasSequence 
          onProgress={(p) => setProgress(p)} 
          onComplete={() => setIsLoading(false)} 
        />
        <StorySections />
      </div>
    </main>
  );
}
