'use client';

import { useEffect, useRef } from 'react';
import { isMobile } from '@/utils/performance';

interface Orb {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

export default function FloatingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = isMobile();
    const orbCount = mobile ? 3 : 5;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize orbs
    const colors = ['#00f0ff', '#b537f2', '#ff006e'];
    orbsRef.current = Array.from({ length: orbCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: mobile ? 40 + Math.random() * 40 : 60 + Math.random() * 60,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.1 + Math.random() * 0.1,
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbsRef.current.forEach((orb) => {
        // Update position
        orb.x += orb.speedX;
        orb.y += orb.speedY;

        // Bounce off edges
        if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) orb.speedX *= -1;
        if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) orb.speedY *= -1;

        // Draw orb with gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color + Math.floor(orb.opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, orb.color + '00');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

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

