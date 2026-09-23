import { contactInfo, contactLinks } from '@/constants';
import { AppPanel } from '@/components/ui/AppPanel';
import { ContactIcon } from '@/components/ui/ContactIcon';
import { XpLinkButton } from '@/components/ui/XpButton';
import styles from './ContactApp.module.css';

const isExternal = (href: string) => href.startsWith('http');

export function ContactApp() {
  return (
    <AppPanel title="OUTLOOK EXPRESS" meta="COMMUNICATIONS">
      <p>Let&apos;s collaborate on something useful.</p>
      <div className={styles.list}>
        {contactLinks.map((link) => (
          <a
            key={link.label}
            className={styles.link}
            href={link.href}
            target={isExternal(link.href) ? '_blank' : undefined}
            rel={isExternal(link.href) ? 'noopener noreferrer' : undefined}
          >
            <span className={styles.icon}>
              <ContactIcon iconKey={link.iconKey} />
            </span>
            <strong>{link.label}</strong>
            <small>{link.display}</small>
          </a>
        ))}
      </div>
      <XpLinkButton className={styles.newMessage} href={`mailto:${contactInfo.email}`}>
        New Message
      </XpLinkButton>
    </AppPanel>
  );
}
