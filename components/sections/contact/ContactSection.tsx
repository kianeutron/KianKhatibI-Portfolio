'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { ScrollAnimation, NeonWaves } from '@/components/animations';
import { CyberButton } from '@/components/ui';
import { contactInfo, contactLinks } from '@/constants';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      // Rotating circle animation
      anime({
        targets: circleRef.current,
        rotate: 360,
        duration: 20000,
        easing: 'linear',
        loop: true,
      });
    }
  }, []);

  return (
    <section id="contact" className={styles.contact}>
      <NeonWaves />
      <div className={styles.container}>
        <ScrollAnimation animationType="fadeIn">
          <h2 className={styles.sectionTitle}>
            <span className="gradient-text">GET IN TOUCH</span>
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animationType="scale" delay={200}>
          <div className={styles.content}>
            <div className={styles.circleContainer}>
              <div ref={circleRef} className={styles.rotatingCircle}>
                <div className={styles.circleLine}></div>
                <div className={styles.circleLine}></div>
                <div className={styles.circleLine}></div>
              </div>
            </div>

            <div className={styles.contactInfo}>
              <p className={styles.description}>
                Let's collaborate on something amazing! Whether you have a project in mind
                or just want to connect, I'd love to hear from you.
              </p>

              <div className={styles.links}>
                {contactLinks.map((link, index) => (
                  <ScrollAnimation key={link.label} animationType="slideUp" delay={400 + index * 100}>
                    <a
                      href={link.href}
                      className={styles.contactLink}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <span className={styles.icon}>{link.icon}</span>
                      <span>{link.display}</span>
                    </a>
                  </ScrollAnimation>
                ))}
              </div>

              <ScrollAnimation animationType="fadeIn" delay={800}>
                <div className={styles.cta}>
                  <CyberButton href={`mailto:${contactInfo.email}`}>
                    Send Message
                  </CyberButton>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animationType="fadeIn" delay={1000}>
          <div className={styles.footer}>
            <p>© 2024 Kian Khatibi. Built with Next.js & Anime.js</p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

