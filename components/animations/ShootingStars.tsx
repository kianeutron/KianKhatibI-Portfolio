'use client';

import { useEffect, useRef } from 'react';
import { isMobile } from '@/utils/performance';

interface Star {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
}

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = isMobile();

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create a new star
    const createStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: -50,
      length: mobile ? 30 + Math.random() * 40 : 50 + Math.random() * 80,
      speed: mobile ? 2 + Math.random() * 3 : 3 + Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.4,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3, // Roughly 45 degrees
    });

    // Initialize with fewer stars
    starsRef.current = [];

    let lastStarTime = 0;
    const starInterval = mobile ? 2000 : 1500; // Time between stars

    // Animation loop
    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new star periodically
      if (currentTime - lastStarTime > starInterval) {
        if (starsRef.current.length < (mobile ? 2 : 3)) {
          starsRef.current.push(createStar());
          lastStarTime = currentTime;
        }
      }

      // Update and draw stars
      starsRef.current = starsRef.current.filter((star) => {
        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Remove if off screen
        if (star.y > canvas.height + 50 || star.x > canvas.width + 50) {
          return false;
        }

        // Draw star trail
        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = mobile ? 1.5 : 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        ctx.stroke();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

