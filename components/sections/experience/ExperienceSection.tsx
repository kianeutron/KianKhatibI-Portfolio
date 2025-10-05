'use client';

import { ScrollAnimation, ShootingStars } from '@/components/animations';
import { experiences } from '@/constants';
import styles from './ExperienceSection.module.css';

export default function ExperienceSection() {
  return (
    <section id="experience" className={styles.experience}>
      <ShootingStars />
      <div className={styles.container}>
        <ScrollAnimation animationType="fadeIn">
          <h2 className={styles.sectionTitle}>
            <span className="gradient-text">EXPERIENCE</span>
          </h2>
        </ScrollAnimation>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <ScrollAnimation
              key={index}
              animationType={index % 2 === 0 ? 'slideLeft' : 'slideRight'}
              delay={index * 200}
            >
              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <div className={styles.markerDot}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.card}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.jobTitle}>{exp.title}</h3>
                      <span className={styles.company}>{exp.company}</span>
                      <span className={styles.period}>{exp.period}</span>
                    </div>
                    <p className={styles.description}>{exp.description}</p>
                    <div className={styles.technologies}>
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className={styles.tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

