'use client';

import { useEffect, useRef } from 'react';
import { isMobile } from '@/utils/performance';

export default function PulsingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);

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

    const gridSize = mobile ? 60 : 80;
    const dotRadius = mobile ? 1 : 1.5;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.02;

      // Draw pulsing grid dots
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Calculate distance from center for wave effect
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
          
          // Create pulsing effect based on distance and time
          const pulse = Math.sin(distance * 0.01 - timeRef.current) * 0.5 + 0.5;
          const opacity = 0.1 + pulse * 0.2;

          // Color gradient based on position
          const hue = (distance * 0.1 + timeRef.current * 20) % 360;
          
          ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

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

