"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
        isScrolled
          ? "bg-[var(--color-bg-primary)]/90 backdrop-blur-lg border-b border-[var(--color-hairline)] shadow-md" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 font-bold tracking-tight text-xl font-sans transition-colors text-[var(--color-text-primary)] hover:text-[var(--color-accent-cyan)]">
          <svg 
            viewBox="0 0 100 100" 
            width="28" 
            height="28" 
            className="text-[var(--color-accent-cyan)] animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]"
          >
            <path 
              fill="currentColor" 
              stroke="black" 
              strokeWidth="3" 
              fillRule="evenodd"
              d="M 95.0 50.0 L 94.0 59.4 L 83.8 59.1 L 81.2 65.9 L 89.0 72.5 L 83.4 80.1 L 74.7 74.7 L 69.1 79.4 L 72.5 89.0 L 63.9 92.8 L 59.1 83.8 L 51.8 85.0 L 50.0 95.0 L 40.6 94.0 L 40.9 83.8 L 34.1 81.2 L 27.5 89.0 L 19.9 83.4 L 25.3 74.7 L 20.6 69.1 L 11.0 72.5 L 7.2 63.9 L 16.2 59.1 L 15.0 51.8 L 5.0 50.0 L 6.0 40.6 L 16.2 40.9 L 18.8 34.1 L 11.0 27.5 L 16.6 19.9 L 25.3 25.3 L 30.9 20.6 L 27.5 11.0 L 36.1 7.2 L 40.9 16.2 L 48.2 15.0 L 50.0 5.0 L 59.4 6.0 L 59.1 16.2 L 65.9 18.8 L 72.5 11.0 L 80.1 16.6 L 74.7 25.3 L 79.4 30.9 L 89.0 27.5 L 92.8 36.1 L 83.8 40.9 L 85.0 48.2 Z M 65 50 A 15 15 0 1 0 35 50 A 15 15 0 1 0 65 50 Z" 
            />
          </svg>
          RN
        </Link>

        <nav className={cn("hidden md:flex items-center gap-8 text-xs tracking-[0.08em] uppercase font-mono font-bold transition-colors text-[var(--color-text-muted)]")}>
          {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group pb-1 transition-colors rounded-sm hover:text-[var(--color-accent-cyan)]"
            >
              <span className="relative z-10">{item}</span>
              {/* PCB Trace Line */}
              <span className="absolute bottom-0 left-0 h-[2px] bg-[var(--color-accent-cyan)] w-0 group-hover:w-full transition-all duration-300 ease-out" />
              {/* PCB Via / Signal Point */}
              <span className="absolute -bottom-[2px] left-0 w-[6px] h-[6px] rounded-full border-[1.5px] border-[var(--color-accent-cyan)] bg-[var(--color-bg-primary)] opacity-0 group-hover:opacity-100 group-hover:left-full -translate-x-1/2 transition-all duration-300 ease-out drop-shadow-[0_0_6px_rgba(0,229,255,1)]" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className={cn(
              "hidden md:flex relative px-5 py-2 rounded-sm overflow-hidden text-sm font-bold border-2 transition-colors border-[var(--color-hairline)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)]"
            )}
          >
            <span className="relative flex items-center gap-2 transition-colors">
              Get in Touch
            </span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[var(--color-text-primary)] p-2 hover:text-[var(--color-accent-cyan)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-[var(--color-bg-primary)]/95 backdrop-blur-lg border-b border-[var(--color-hairline)] shadow-lg flex flex-col px-6 py-4 gap-6 font-mono font-bold text-sm tracking-widest uppercase text-[var(--color-text-primary)]"
        >
          {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[var(--color-accent-cyan)] transition-colors"
            >
              {item}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
