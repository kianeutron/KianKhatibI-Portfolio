import { buildTranscript } from '@/lib/caseStudyTranscript';
import type { CaseStudy } from '@/types';
import { cx } from '@/lib/cx';
import { CaseStudyDiagram } from './CaseStudyDiagram';
import styles from './CaseStudyConsole.module.css';

/** `window` fills its host; `page` fills the viewport. */
export type CaseStudyLayout = 'window' | 'page';

interface CaseStudyConsoleProps {
  study: CaseStudy;
  layout?: CaseStudyLayout | undefined;
}

export function CaseStudyConsole({ study, layout = 'window' }: CaseStudyConsoleProps) {
  return (
    <section className={cx(styles.console, styles[layout])} aria-label="Case study terminal">
      <div className={styles.transcript}>
        {buildTranscript(study).map((line, index) =>
          line.kind === 'visual' ? (
            <CaseStudyDiagram key={`visual-${line.visual}`} variant={line.visual} />
          ) : (
            <div className={cx(styles.line, styles[line.kind])} key={`${index}-${line.text}`}>
              {line.text}
            </div>
          ),
        )}
      </div>
    </section>
  );
}
