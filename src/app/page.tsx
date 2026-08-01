"use client";

import Navbar from "@/components/Navbar";
import CanvasSequence from "@/components/CanvasSequence";
import StorySections from "@/components/StorySections";

import { Settings } from "lucide-react";

export default function Home() {
  return (
    <main className="relative bg-[var(--color-bg-primary)] min-h-screen text-[var(--color-text-muted)]">
      <Navbar />
      
      <div className="relative h-[400vh] w-full">
        <CanvasSequence />
        <StorySections />
      </div>
    </main>
  );
}
