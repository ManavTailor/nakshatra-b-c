"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-square overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 cursor-zoom-in group",
        className
      )}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: isZoomed ? 0 : 1 }}
      />
      
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              backgroundSize: "250%",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none group-hover:border-[#06b6d4]/30 transition-colors duration-300" />
    </div>
  );
}
