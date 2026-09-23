'use client';

import dynamic from 'next/dynamic';
import { useMediaQuery } from './useMediaQuery';
import styles from './Wallpaper.module.css';

const FaultyTerminal = dynamic(() => import('@/components/effects/FaultyTerminal'), { ssr: false });

/** Phones and tablets: small viewport or touch-first input. */
const COMPACT_QUERY = '(max-width: 1024px), (pointer: coarse)';
const DESKTOP_CURVATURE = 0.5;

const GRID_MULTIPLIER: [number, number] = [2, 1];

/** Animated WebGL terminal background with a dimming overlay. */
export function Wallpaper() {
  const isCompact = useMediaQuery(COMPACT_QUERY);

  return (
    <div className={styles.wallpaper} aria-hidden="true">
      {/* Wait for the media query so the WebGL context is not created twice. */}
      {isCompact !== null && (
        <FaultyTerminal
          scale={2}
          gridMul={GRID_MULTIPLIER}
          digitSize={1}
          timeScale={0.3}
          scanlineIntensity={1.1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={isCompact ? 0 : DESKTOP_CURVATURE}
          tint="#a7ef9e"
          mouseReact
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={0.4}
        />
      )}
      <div className={styles.overlay} />
    </div>
  );
}
