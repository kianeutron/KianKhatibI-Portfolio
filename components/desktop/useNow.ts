'use client';

import { useEffect, useState } from 'react';

/** Current time, refreshed every `intervalMs`; `null` until mounted so SSR and hydration agree. */
export function useNow(intervalMs: number): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);

  return now;
}
