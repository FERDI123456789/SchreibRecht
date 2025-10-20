"use client";

import { Settings, Trophy, BookOpen, Pen, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect, useCallback } from "react";

// Debounce helper
function useDebounce(callback: Function, delay: number) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  return useCallback(
    (...args: any[]) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay],
  );
}

interface FloatingNavProps {
  activeMode: "schreib" | "lesen";
  onModeChange: (mode: "schreib" | "lesen") => void;
}

export function FloatingNav({ activeMode, onModeChange }: FloatingNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastPosition, setLastPosition] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [hoverStyle, setHoverStyle] = useState({});
  const debouncedSetHoveredIndex = useDebounce(setHoveredIndex, 10);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const el = itemRefs.current[hoveredIndex];
      const container = containerRef.current;
      if (el && container) {
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const left = rect.left - containerRect.left;
        const width = rect.width;

        // Only update lastPosition if it's a new position
        if (
          !lastPosition ||
          lastPosition.left !== left ||
          lastPosition.width !== width
        ) {
          setLastPosition({ left, width });
        }

        setHoverStyle({
          left: `${left}px`,
          width: `${width}px`,
          opacity: 1,
          transition: "all 200ms ease",
        });
      }
    } else if (lastPosition) {
      // Keep the last position but fade out
      setHoverStyle({
        left: `${lastPosition.left}px`,
        width: `${lastPosition.width}px`,
        opacity: 0,
        transition: "opacity 200ms ease",
      });
    }
  }, [hoveredIndex, lastPosition]);

  return (
    <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
      <div className="relative flex items-center gap-4" ref={containerRef}>
        {/* Hover Highlight */}
        <div
          className="pointer-events-none absolute z-10 h-[70px] rounded-2xl bg-black/10 backdrop-blur-md transition-all duration-300"
          style={hoverStyle}
        />

        {/* Mode Toggle */}
        <div className="relative flex h-[70px] items-center rounded-2xl border border-gray-100 bg-white shadow-lg">
          {/* Schreib */}
          <button
            ref={(el) => (itemRefs.current[1] = el)}
            onMouseEnter={() => debouncedSetHoveredIndex(1)}
            onMouseLeave={() => debouncedSetHoveredIndex(null)}
            onClick={() => onModeChange("schreib")}
            className={cn(
              "relative z-10 h-[70px] rounded-2xl p-6 font-semibold transition-all",
              activeMode === "schreib" ? "bg-secondary/20" : "text-black",
            )}
          >
            <Pen className="h-5 w-5" />
          </button>
          {/* Lesen */}
          <button
            ref={(el) => (itemRefs.current[2] = el)}
            onMouseEnter={() => debouncedSetHoveredIndex(2)}
            onMouseLeave={() => debouncedSetHoveredIndex(null)}
            onClick={() => onModeChange("lesen")}
            className={cn(
              "relative z-10 h-[70px] rounded-2xl p-6 font-semibold transition-all",
              activeMode === "lesen" ? "bg-primary/20" : "text-black",
            )}
          >
            <BookOpen className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="relative flex h-[70px] items-center rounded-2xl border border-gray-100 bg-white shadow-lg">
          {/* Edit */}
          <button
            ref={(el) => (itemRefs.current[3] = el)}
            onMouseEnter={() => debouncedSetHoveredIndex(3)}
            onMouseLeave={() => debouncedSetHoveredIndex(null)}
            className="relative z-10 rounded-full p-6 text-black"
          >
            <Settings />
          </button>
          {/* Edit */}
          <button
            ref={(el) => (itemRefs.current[4] = el)}
            onMouseEnter={() => debouncedSetHoveredIndex(4)}
            onMouseLeave={() => debouncedSetHoveredIndex(null)}
            className="relative z-10 rounded-full p-6 text-black"
          >
            <ShoppingCart />
          </button>

          {/* Trophy */}
          <button
            ref={(el) => (itemRefs.current[5] = el)}
            onMouseEnter={() => debouncedSetHoveredIndex(5)}
            onMouseLeave={() => debouncedSetHoveredIndex(null)}
            className="relative z-10 rounded-full p-6 text-black"
          >
            <Trophy className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
