'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import styles from './HeroSection.module.css';
import { CyberButton } from '@/components/ui';
import { FloatingOrbs } from '@/components/animations';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate title
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1500,
        easing: 'easeOutExpo',
        delay: 500,
      });
    }

    // Animate subtitle
    if (subtitleRef.current) {
      anime({
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1500,
        easing: 'easeOutExpo',
        delay: 1000,
      });
    }

    // Animate CTA
    if (ctaRef.current) {
      anime({
        targets: ctaRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1500,
        easing: 'easeOutExpo',
        delay: 1500,
      });
    }

    // Glitch effect on title
    const glitchInterval = setInterval(() => {
      if (titleRef.current) {
        anime({
          targets: titleRef.current,
          translateX: [
            { value: -2, duration: 50 },
            { value: 2, duration: 50 },
            { value: -2, duration: 50 },
            { value: 0, duration: 50 },
          ],
          easing: 'linear',
        });
      }
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section className={styles.hero}>
      <FloatingOrbs />
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          <span className="gradient-text">KIAN KHATIBI</span>
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Software Engineer | Creative Technologist | Digital Innovator
        </p>
        <div ref={ctaRef} className={styles.cta}>
          <CyberButton href="#experience">Explore My Journey</CyberButton>
        </div>
      </div>

      {/* Animated lines */}
      <div className={styles.lines}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </section>
  );
}

