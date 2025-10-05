'use client';

import { useEffect, useState, useRef } from 'react';
import anime from 'animejs';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate loading text
    if (textRef.current) {
      anime({
        targets: textRef.current,
        opacity: [0, 1, 0],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine',
      });
    }

    // Hide loading screen after 2 seconds (reduced for faster load)
    const timer = setTimeout(() => {
      if (loaderRef.current) {
        anime({
          targets: loaderRef.current,
          opacity: [1, 0],
          duration: 800,
          easing: 'easeOutExpo',
          complete: () => {
            setIsLoading(false);
          },
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div ref={loaderRef} className={styles.loadingScreen}>
      <div className={styles.content}>
        <div className={styles.spinner}>
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
        </div>
        <div ref={textRef} className={styles.text}>
          <span className="gradient-text">INITIALIZING...</span>
        </div>
      </div>
    </div>
  );
}

