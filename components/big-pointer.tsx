"use client";

import { useEffect, useRef } from "react";

export function BigPointer() {
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div
      ref={pointerRef}
      className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2"
    >
      <svg
        viewBox="0 0 24 24"
        width="64"
        height="64"
        className="drop-shadow-md text-primary"
        style={{ transform: "rotateX(25deg) rotateY(-20deg)" }}
      >
        <path
          d="M3 2L3 22L8 17L12 23L14 22L10 15L21 15L3 2Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
