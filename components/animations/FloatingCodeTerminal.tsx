'use client';

import { useEffect, useRef } from 'react';
import styles from './FloatingCodeTerminal.module.css';

const codeSnippets = [
  { lang: 'TS', code: 'const success = true;', color: '#00f0ff' },
  { lang: 'JS', code: 'function build() {...}', color: '#b537f2' },
  { lang: 'CSS', code: '.animate { ... }', color: '#ff006e' },
  { lang: 'HTML', code: '<component />', color: '#3a86ff' },
  { lang: 'SQL', code: 'SELECT * FROM...', color: '#00f0ff' },
  { lang: 'API', code: 'GET /api/data', color: '#b537f2' },
  { lang: 'GIT', code: 'git commit -m', color: '#ff006e' },
  { lang: 'NPM', code: 'npm install', color: '#3a86ff' },
];

export default function FloatingCodeTerminal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating code blocks
    codeSnippets.forEach((snippet, index) => {
      const block = document.createElement('div');
      block.className = styles.codeBlock;
      block.style.setProperty('--delay', `${index * 0.5}s`);
      block.style.setProperty('--duration', `${15 + Math.random() * 10}s`);
      block.style.setProperty('--color', snippet.color);
      
      const lang = document.createElement('div');
      lang.className = styles.lang;
      lang.textContent = snippet.lang;
      
      const code = document.createElement('div');
      code.className = styles.code;
      code.textContent = snippet.code;
      
      block.appendChild(lang);
      block.appendChild(code);
      container.appendChild(block);
    });

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.container}></div>;
}

