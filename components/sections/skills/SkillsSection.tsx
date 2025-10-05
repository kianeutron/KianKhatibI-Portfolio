'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs';
import { ScrollAnimation, PulsingGrid } from '@/components/animations';
import { skills, additionalTechnologies } from '@/constants';
import styles from './SkillsSection.module.css';

export default function SkillsSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const skillBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (inView) {
      skillBarsRef.current.forEach((bar, index) => {
        if (bar) {
          anime({
            targets: bar,
            width: `${skills[index].level}%`,
            duration: 1500,
            delay: index * 100,
            easing: 'easeOutExpo',
          });
        }
      });
    }
  }, [inView]);

  return (
    <section id="skills" className={styles.skills} ref={ref}>
      <PulsingGrid />
      <div className={styles.container}>
        <ScrollAnimation animationType="fadeIn">
          <h2 className={styles.sectionTitle}>
            <span className="gradient-text">SKILLS & EXPERTISE</span>
          </h2>
        </ScrollAnimation>

        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <ScrollAnimation
              key={index}
              animationType="scale"
              delay={index * 50}
            >
              <div className={styles.skillCard}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillCategory}>{skill.category}</span>
                </div>
                <div className={styles.skillBarContainer}>
                  <div
                    ref={(el) => {
                      if (el) {
                        skillBarsRef.current[index] = el;
                      }
                    }}
                    className={styles.skillBar}
                    style={{ width: '0%' }}
                  >
                    <span className={styles.skillLevel}>{skill.level}%</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animationType="fadeIn" delay={800}>
          <div className={styles.additionalSkills}>
            <h3 className={styles.additionalTitle}>Additional Technologies</h3>
            <div className={styles.techTags}>
              {additionalTechnologies.map((tech, index) => (
                <span key={index} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

