'use client';

import { useEffect, useRef } from 'react';
import { isMobile } from '@/utils/performance';

export default function NeonWaves() {
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

    const waveCount = mobile ? 2 : 3;
    const colors = ['#00f0ff', '#b537f2', '#ff006e'];

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.01;

      // Draw multiple waves
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        ctx.strokeStyle = colors[w % colors.length];
        ctx.lineWidth = mobile ? 1 : 1.5;
        ctx.globalAlpha = 0.15 + w * 0.05;

        const amplitude = mobile ? 30 : 50;
        const frequency = 0.01 + w * 0.003;
        const offset = w * Math.PI * 0.5;
        const yOffset = canvas.height * (0.3 + w * 0.2);

        for (let x = 0; x < canvas.width; x++) {
          const y = yOffset + Math.sin(x * frequency + timeRef.current + offset) * amplitude;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1;
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

