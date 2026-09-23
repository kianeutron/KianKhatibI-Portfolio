import { BlinkingCursor } from '@/components/ui/BlinkingCursor';
import styles from './CommandPromptApp.module.css';

export function CommandPromptApp() {
  return (
    <div className={styles.prompt}>
      <p>Microsoft(R) Windows 98</p>
      <p>(C) Copyright Kian Khatibi.</p>
      <br />
      <p>C:\Users\Kian\Desktop&gt; dir</p>
      <p>CASE-STUDIES EXPERIENCE.LOG SKILLS.SYS CONTACT.EXE</p>
      <p>
        C:\Users\Kian\Desktop&gt; <BlinkingCursor />
      </p>
    </div>
  );
}
