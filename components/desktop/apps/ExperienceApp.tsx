import { experiences } from '@/constants';
import { AppPanel } from '@/components/ui/AppPanel';
import styles from './ExperienceApp.module.css';

export function ExperienceApp() {
  const recordCount = String(experiences.length).padStart(2, '0');

  return (
    <AppPanel title="EXPERIENCE.LOG" meta={`${recordCount} RECORDS`}>
      {experiences.map((experience) => (
        <article className={styles.row} key={`${experience.company}-${experience.title}`}>
          <strong>{experience.title}</strong>
          <span>
            {experience.company} {'//'} {experience.period}
          </span>
          <p>{experience.description}</p>
          {experience.highlights && (
            <ul className={styles.highlights}>
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
          <small>{experience.technologies.join(' / ')}</small>
        </article>
      ))}
    </AppPanel>
  );
}
