"use client";

import { useEffect, useRef } from "react";

// Deliberately restrained: very low opacity, slow fall speed, sparse
// columns. This is atmosphere, not a UI element — it must never compete
// with foreground content or draw the eye during reading.
const CHARS = "01アカサタナ";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops = new Array(columns).fill(0).map(() => Math.random() * -100);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -100);
    };
    window.addEventListener("resize", onResize);

    let frame = 0;
    let raf: number;
    const draw = () => {
      frame++;
      if (frame % 2 === 0) {
        ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = "rgba(255, 0, 60, 0.06)";
          const dropValue = drops[i];
          if (dropValue !== undefined) {
            ctx.fillText(char, i * fontSize, dropValue * fontSize);
            if (dropValue * fontSize > height && Math.random() > 0.98) {
              drops[i] = 0;
            } else {
              drops[i] = dropValue + 0.5;
            }
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
    />
  );
}
