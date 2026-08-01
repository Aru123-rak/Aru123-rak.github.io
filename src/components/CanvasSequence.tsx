"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 240;
const START_FRAME = 1;

function padLeft(num: number, size: number) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  const { scrollYProgress } = useScroll();
  
  // Playback forwards: start at START_FRAME and go up to FRAME_COUNT
  const frameIndex = useTransform(scrollYProgress, [0, 1], [START_FRAME, FRAME_COUNT]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Preload images
  useEffect(() => {
    // 1. Load the first frame immediately for fast initial paint
    const firstImg = new Image();
    firstImg.src = `/frames/ezgif-frame-${padLeft(START_FRAME, 3)}.jpg`;
    imagesRef.current[START_FRAME] = firstImg;

    // 2. Load the rest sequentially in the background so it doesn't freeze the browser
    let currentFrameToLoad = START_FRAME + 1;
    
    const loadNextBatch = () => {
      // Load 10 frames at a time to be gentle on the network
      for (let i = 0; i < 10 && currentFrameToLoad <= FRAME_COUNT; i++) {
        const img = new Image();
        // Set decoding to async to prevent main thread blocking
        img.decoding = 'async';
        img.src = `/frames/ezgif-frame-${padLeft(currentFrameToLoad, 3)}.jpg`;
        imagesRef.current[currentFrameToLoad] = img;
        currentFrameToLoad++;
      }
      
      if (currentFrameToLoad <= FRAME_COUNT) {
        // Schedule next batch when the browser has idle time
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadNextBatch);
        } else {
          setTimeout(loadNextBatch, 50);
        }
      }
    };
    
    // Start background loading after a tiny delay so the rest of the page can finish rendering
    setTimeout(loadNextBatch, 500);
    
  }, []);

  const [coverStyle, setCoverStyle] = useState({ width: 0, height: 0, left: 0, top: 0 });

  const renderFrame = (index: number) => {
    if (!canvasRef.current || !imagesRef.current[index]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = imagesRef.current[index];
    if (!img.complete) {
      img.onload = () => drawImage(ctx, canvas, img);
      return;
    }
    drawImage(ctx, canvas, img);
  };

  const drawImage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const resizeCanvas = () => {
      const img = imagesRef.current[START_FRAME];
      
      if (canvasRef.current && img && img.complete) {
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        
        const canvasRatio = winW / winH;
        const imgRatio = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (canvasRatio > imgRatio) {
          drawWidth = winW;
          drawHeight = img.height * (drawWidth / img.width);
          offsetX = 0;
          offsetY = (winH - drawHeight) / 2;
        } else {
          drawHeight = winH;
          drawWidth = img.width * (drawHeight / img.height);
          offsetX = (winW - drawWidth) / 2;
          offsetY = 0;
        }
        
        setCoverStyle({ width: drawWidth, height: drawHeight, left: offsetX, top: offsetY });
        
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = drawWidth * dpr;
        canvasRef.current.height = drawHeight * dpr;
        
        renderFrame(reduceMotion ? FRAME_COUNT : Math.round(frameIndex.get()));
      } else if (img && !img.complete) {
        img.addEventListener('load', resizeCanvas);
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    setTimeout(resizeCanvas, 100);
    
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [reduceMotion, frameIndex]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (reduceMotion) return;
    const index = Math.round(latest);
    if (index >= START_FRAME && index <= FRAME_COUNT) {
      renderFrame(index);
    }
  });

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black z-0">
      <div style={{ position: 'absolute', width: coverStyle.width || '100vw', height: coverStyle.height || '100vh', left: coverStyle.left, top: coverStyle.top }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        
        {/* Blueprint gear precisely glued to the video frame */}
        <div 
          className="absolute z-[60] pointer-events-none drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]"
          style={{ bottom: '12.5%', right: '7%' }}
        >
          <svg 
            viewBox="0 0 100 100" 
            width="56" 
            height="56" 
            className="text-[var(--color-accent-cyan)] animate-[spin_8s_linear_infinite] opacity-90"
          >
            <path 
              fill="currentColor" 
              stroke="black" 
              strokeWidth="3" 
              fillRule="evenodd"
              d="M 95.0 50.0 L 94.0 59.4 L 83.8 59.1 L 81.2 65.9 L 89.0 72.5 L 83.4 80.1 L 74.7 74.7 L 69.1 79.4 L 72.5 89.0 L 63.9 92.8 L 59.1 83.8 L 51.8 85.0 L 50.0 95.0 L 40.6 94.0 L 40.9 83.8 L 34.1 81.2 L 27.5 89.0 L 19.9 83.4 L 25.3 74.7 L 20.6 69.1 L 11.0 72.5 L 7.2 63.9 L 16.2 59.1 L 15.0 51.8 L 5.0 50.0 L 6.0 40.6 L 16.2 40.9 L 18.8 34.1 L 11.0 27.5 L 16.6 19.9 L 25.3 25.3 L 30.9 20.6 L 27.5 11.0 L 36.1 7.2 L 40.9 16.2 L 48.2 15.0 L 50.0 5.0 L 59.4 6.0 L 59.1 16.2 L 65.9 18.8 L 72.5 11.0 L 80.1 16.6 L 74.7 25.3 L 79.4 30.9 L 89.0 27.5 L 92.8 36.1 L 83.8 40.9 L 85.0 48.2 Z M 65 50 A 15 15 0 1 0 35 50 A 15 15 0 1 0 65 50 Z" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
