'use client';

import { useEffect, useState, useRef } from 'react';
import anime from 'animejs';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      anime({
        targets: navRef.current,
        translateY: [-100, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 2000,
      });
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}
      style={{ opacity: 0 }}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className="gradient-text">KK</span>
        </div>

        <ul className={styles.menu}>
          <li>
            <button onClick={() => scrollToSection('hero')} className={styles.navLink}>
              Home
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('experience')} className={styles.navLink}>
              Experience
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('skills')} className={styles.navLink}>
              Skills
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('contact')} className={styles.navLink}>
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

