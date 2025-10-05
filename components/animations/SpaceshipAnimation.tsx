'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function SpaceshipAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Spaceship object (smaller on mobile)
    const scale = isMobile ? 0.7 : 1;
    const spaceship = {
      x: -100,
      y: window.innerHeight / 2,
      width: 60 * scale,
      height: 30 * scale,
      rotation: 0,
      scale: scale,
    };

    // Draw spaceship (optimized - reduced shadow blur, scaled for mobile)
    const drawSpaceship = () => {
      ctx.save();
      ctx.translate(spaceship.x, spaceship.y);
      ctx.rotate(spaceship.rotation);
      ctx.scale(spaceship.scale, spaceship.scale);

      // Main body
      ctx.fillStyle = '#00f0ff';
      ctx.shadowBlur = isMobile ? 5 : 10;
      ctx.shadowColor = '#00f0ff';
      ctx.beginPath();
      ctx.moveTo(30, 0);
      ctx.lineTo(-30, -15);
      ctx.lineTo(-20, 0);
      ctx.lineTo(-30, 15);
      ctx.closePath();
      ctx.fill();

      // Cockpit
      ctx.fillStyle = '#b537f2';
      ctx.shadowBlur = isMobile ? 4 : 8;
      ctx.shadowColor = '#b537f2';
      ctx.beginPath();
      ctx.arc(15, 0, 8, 0, Math.PI * 2);
      ctx.fill();

      // Engine glow
      ctx.fillStyle = '#ff006e';
      ctx.shadowColor = '#ff006e';
      ctx.shadowBlur = isMobile ? 8 : 15;
      ctx.beginPath();
      ctx.arc(-30, 0, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Animate spaceship entry (adjusted for mobile)
    anime({
      targets: spaceship,
      x: isMobile ? window.innerWidth / 2 : window.innerWidth / 3,
      y: isMobile ? window.innerHeight / 4 : window.innerHeight / 3,
      rotation: Math.PI / 8,
      duration: 3000,
      easing: 'easeOutExpo',
    });

    // Floating animation (adjusted for mobile)
    const floatDistance = isMobile ? 15 : 20;
    anime({
      targets: spaceship,
      y: (isMobile ? window.innerHeight / 4 : window.innerHeight / 3) + floatDistance,
      direction: 'alternate',
      loop: true,
      duration: 2000,
      easing: 'easeInOutSine',
      delay: 3000,
    });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSpaceship();
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

