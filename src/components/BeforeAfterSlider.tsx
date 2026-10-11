"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import ResponsiveImage from "@/components/ResponsiveImage";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  isConcept?: boolean;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before state of the space",
  afterAlt = "Image comparison, second image",
  beforeLabel = "Original State",
  afterLabel = "Transformed Space",
  isConcept = false,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    setSliderPos(percent);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isConcept && (
        <div className="mb-2 text-center">
          <span className="inline-block text-[11px] font-medium uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded">
            Interactive Concept Demonstration — Real project before/after pairs will be added as documented
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        role="slider"
        aria-label="Image comparison slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden select-none cursor-ew-resize rounded shadow-md border border-brand-warm-grey focus:outline-none focus:ring-2 focus:ring-brand-copper"
      >
        {/* "After" Image (Full background) */}
        <div className="absolute inset-0 w-full h-full">
          <ResponsiveImage
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute top-4 right-4 bg-brand-navy/90 text-white text-[11px] font-montserrat uppercase tracking-wider px-3 py-1 rounded backdrop-blur-sm pointer-events-none">
            {afterLabel}
          </div>
        </div>

        {/* "Before" Image (Clipped overlay) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current?.clientWidth || "100%" }}>
            <ResponsiveImage
              src={beforeImage}
              alt={beforeAlt}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="absolute top-4 left-4 bg-brand-charcoal/90 text-white text-[11px] font-montserrat uppercase tracking-wider px-3 py-1 rounded backdrop-blur-sm pointer-events-none">
            {beforeLabel}
          </div>
        </div>

        {/* Divider Bar */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Circular handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-brand-navy shadow-md border border-brand-copper flex items-center justify-center">
            <svg
              className="w-4 h-4 text-brand-navy"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                transform="rotate(90 12 12)"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-2 text-center text-xs text-gray-500">
        Drag slider or use Left / Right arrow keys to compare details
      </div>
    </div>
  );
}
