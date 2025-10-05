'use client';

import { useEffect, ReactNode, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs';

interface ScrollAnimationProps {
  children: ReactNode;
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
}

export default function ScrollAnimation({
  children,
  animationType = 'fadeIn',
  delay = 0,
  duration = 1000,
}: ScrollAnimationProps) {
  const { ref, inView, entry } = useInView({
    threshold: 0.1, // Reduced threshold for earlier trigger
    triggerOnce: true,
    rootMargin: '50px', // Start animation slightly before element is visible
  });

  useEffect(() => {
    if (inView && entry?.target) {
      const animations: { [key: string]: any } = {
        fadeIn: {
          opacity: [0, 1],
          translateY: [30, 0],
        },
        slideUp: {
          opacity: [0, 1],
          translateY: [100, 0],
        },
        slideLeft: {
          opacity: [0, 1],
          translateX: [100, 0],
        },
        slideRight: {
          opacity: [0, 1],
          translateX: [-100, 0],
        },
        scale: {
          opacity: [0, 1],
          scale: [0.5, 1],
        },
        rotate: {
          opacity: [0, 1],
          rotate: [180, 0],
        },
      };

      anime({
        targets: entry.target,
        ...animations[animationType],
        duration,
        delay,
        easing: 'easeOutExpo',
      });
    }
  }, [inView, entry, animationType, delay, duration]);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

