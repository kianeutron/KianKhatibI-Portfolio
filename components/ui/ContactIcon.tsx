import type { ContactIconKey } from '@/types';
import styles from './ContactIcon.module.css';

const svgProps = {
  className: styles.icon,
  viewBox: '0 0 32 32',
  'aria-hidden': true,
  focusable: false,
} as const;

/** Small pixel-style brand icons for the contact list. */
export function ContactIcon({ iconKey }: { iconKey: ContactIconKey }) {
  switch (iconKey) {
    case 'github':
      return (
        <svg {...svgProps}>
          <path className={styles.shadow} d="M8 26h16v3H8z" />
          <path
            className={styles.dark}
            d="M10.3 10.1 8.9 5.8l4.6 1.6a12 12 0 0 1 5 0l4.6-1.6-1.4 4.3c1.1 1.3 1.7 2.9 1.7 4.7 0 4.9-3.2 7.7-8 7.7s-8-2.8-8-7.7c0-1.8.6-3.4 1.7-4.7Z"
          />
          <path className={styles.highlight} d="M11 11.2c1.2-.9 2.9-1.4 5-1.4s3.8.5 5 1.4" />
          <path className={styles.face} d="M12.7 16.3h1.9v2h-1.9zm4.7 0h1.9v2h-1.9z" />
          <path className={styles.dark} d="M12.3 23.1c.5-1.4 1.8-2.3 3.7-2.3s3.2.9 3.7 2.3v2.6h-7.4Z" />
          <path
            className={styles.dark}
            d="M12.9 23.7c-2.3.5-4.3-.2-5-1.9-.4-.9-.1-1.8.7-2.1.8-.3 1.4.1 1.8.9.4.9 1.3 1.2 2.6.9"
          />
        </svg>
      );

    case 'linkedin':
      return (
        <svg {...svgProps}>
          <rect className={styles.shadow} x="6" y="7" width="22" height="22" rx="2" />
          <rect className={styles.blue} x="4" y="4" width="22" height="22" rx="2" />
          <path className={styles.highlight} d="M6 6h18v3H6z" />
          <circle className={styles.white} cx="9.4" cy="11.3" r="2.2" />
          <path
            className={styles.white}
            d="M7.2 14.7h4.4v8.1H7.2zm6.3 0h4.2v1.1c.7-.9 1.7-1.4 3-1.4 2.6 0 4.1 1.7 4.1 4.7v3.7h-4.4v-3.4c0-1.1-.5-1.7-1.4-1.7s-1.4.6-1.4 1.7v3.4h-4.1z"
          />
        </svg>
      );

    case 'email':
      return (
        <svg {...svgProps}>
          <path className={styles.shadow} d="M5 10h22v17H5z" />
          <path className={styles.envelope} d="M4 8h22v17H4z" />
          <path className={styles.stroke} d="M5 9.4 15 17l10-7.6" />
          <path className={styles.stroke} d="m5 24 7.8-8M25 24l-7.8-8" />
          <path className={styles.highlight} d="M6 10h18v3H6z" />
          <path className={styles.stamp} d="M20.5 16h3v3h-3z" />
        </svg>
      );
  }
}
