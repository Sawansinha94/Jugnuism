import { useEffect, useRef } from "react";
import { Firefly, FloatingHeart } from "../types";

interface FirefliesBackgroundProps {
  unlocked?: boolean;
}

export default function FirefliesBackground({ unlocked = false }: FirefliesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize fireflies
    const fireflyCount = Math.min(60, Math.floor((width * height) / 25000));
    const fireflies: Firefly[] = [];

    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        size: Math.random() * 2.5 + 1.2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.4,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        angle: Math.random() * Math.PI * 2,
        orbitRadius: Math.random() * 20 + 5,
      });
    }

    // Initialize hearts
    const hearts: FloatingHeart[] = [];
    let lastHeartTime = 0;

    // Helper to draw a cute small heart
    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number
    ) => {
      context.save();
      context.globalAlpha = alpha;
      context.fillStyle = "#ec4899"; // Tailwind pink-500
      context.beginPath();
      // Draw heart using curves
      context.moveTo(x, y + size / 4);
      context.quadraticCurveTo(x, y, x + size / 2, y);
      context.quadraticCurveTo(x + size, y, x + size, y + size / 3);
      context.quadraticCurveTo(x + size, y + (size * 2) / 3, x + size / 2, y + size);
      context.quadraticCurveTo(x, y + (size * 2) / 3, x, y + size / 3);
      context.quadraticCurveTo(x, y, x, y + size / 4);
      context.closePath();
      context.fill();
      context.restore();
    };

    // Main animation loop
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Create a soft, deep midnight-indigo vignette background
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.2,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      gradient.addColorStop(0, "#0f172a"); // Immersive UI dark slate-blue base
      gradient.addColorStop(1, "#020617"); // Immersive UI deep dark borders
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw glowing stars/dust
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      for (let i = 0; i < 30; i++) {
        const starX = (Math.sin(i * 1234.5) * 0.5 + 0.5) * width;
        const starY = (Math.cos(i * 5678.9) * 0.5 + 0.5) * height;
        const starSize = (Math.sin(time * 0.001 + i) * 0.5 + 0.5) * 1 + 0.5;
        ctx.fillRect(starX, starY, starSize, starSize);
      }

      // 2. Spawn floating hearts from random bottom locations or unlocked centers
      const heartInterval = unlocked ? 400 : 1500; // More active love once unlocked!
      if (time - lastHeartTime > heartInterval && hearts.length < 25) {
        lastHeartTime = time;
        hearts.push({
          id: Math.random(),
          x: Math.random() * width,
          y: height + 20,
          size: Math.random() * 8 + 6,
          speedY: -(Math.random() * 0.6 + 0.4),
          alpha: Math.random() * 0.5 + 0.3,
          fadeSpeed: 0.002,
          wiggleSpeed: 0.002 + Math.random() * 0.003,
          wiggleAmount: Math.random() * 1.5 + 0.5,
          wiggleOffset: Math.random() * 100,
        });
      }

      // Update and draw hearts
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.y += h.speedY;
        // Wiggle side-to-side
        h.x += Math.sin(time * h.wiggleSpeed + h.wiggleOffset) * h.wiggleAmount * 0.2;
        h.alpha -= h.fadeSpeed;

        if (h.alpha <= 0 || h.y < -30) {
          hearts.splice(i, 1);
        } else {
          drawHeart(ctx, h.x, h.y, h.size, h.alpha);
        }
      }

      // 3. Update and draw fireflies
      fireflies.forEach((f) => {
        // Slow natural physics moving around
        f.angle += f.pulseSpeed * 0.1;
        f.x += f.speedX + Math.sin(f.angle) * 0.15;
        f.y += f.speedY + Math.cos(f.angle) * 0.15;

        // Boundary wrap
        if (f.x < -20) f.x = width + 20;
        if (f.x > width + 20) f.x = -20;
        if (f.y < -20) f.y = height + 20;
        if (f.y > height + 20) f.y = -20;

        // Pulse alpha
        f.alpha = Math.sin(time * f.pulseSpeed) * 0.35 + 0.65;

        // Draw firefly glowing aura
        const glowRadius = f.size * (f.alpha * 4 + 2);
        const flyGradient = ctx.createRadialGradient(
          f.x,
          f.y,
          0,
          f.x,
          f.y,
          glowRadius
        );
        // Magical golden glowing bug aura (matching KichiKichi bugs emission)
        flyGradient.addColorStop(0, `rgba(253, 224, 71, ${f.alpha})`); // tailwind yellow-300
        flyGradient.addColorStop(0.3, `rgba(234, 179, 8, ${f.alpha * 0.4})`); // tailwind yellow-500
        flyGradient.addColorStop(1, "rgba(253, 224, 71, 0)");

        ctx.fillStyle = flyGradient;
        ctx.beginPath();
        ctx.arc(f.x, f.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw firefly insect center core
        ctx.fillStyle = `rgba(254, 240, 138, ${Math.min(1, f.alpha + 0.2)})`; // bright yellow-100 core
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [unlocked]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      id="fireflies-sky-canvas"
    />
  );
}
