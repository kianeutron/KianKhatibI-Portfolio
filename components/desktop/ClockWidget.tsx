'use client';

import type { CSSProperties } from 'react';
import { useNow } from './useNow';
import styles from './ClockWidget.module.css';

type AngleStyle = CSSProperties & { '--angle': string };

const TICKS = Array.from({ length: 12 }, (_, index) => index);
const DATE_FORMAT = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

const angle = (degrees: number): AngleStyle => ({ '--angle': `${degrees}deg` });

/** Analog clock and date desktop widget. */
export function ClockWidget() {
  const now = useNow(1000);
  const hours = now ? (now.getHours() % 12) * 30 + now.getMinutes() * 0.5 : 0;
  const minutes = now ? now.getMinutes() * 6 : 0;
  const seconds = now ? now.getSeconds() * 6 : 0;

  return (
    <aside className={styles.widgets} aria-label="Desktop widgets">
      <section className={styles.clock} aria-label="Local analog clock">
        <div className={styles.title}>DATE / TIME</div>
        <div className={styles.face} aria-hidden="true">
          {TICKS.map((tick) => (
            <span key={tick} className={styles.tick} style={angle(tick * 30)} />
          ))}
          <span className={styles.hourHand} style={angle(hours)} />
          <span className={styles.minuteHand} style={angle(minutes)} />
          <span className={styles.secondHand} style={angle(seconds)} />
          <span className={styles.pin} />
        </div>
        <time className={styles.date} dateTime={now?.toISOString()}>
          {now ? DATE_FORMAT.format(now) : 'Loading...'}
        </time>
      </section>
    </aside>
  );
}
