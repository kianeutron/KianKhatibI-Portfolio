'use client';

import { useRef } from 'react';
import anime from 'animejs';
import styles from './CyberButton.module.css';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export default function CyberButton({ children, onClick, href }: CyberButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        scale: 1.05,
        duration: 300,
        easing: 'easeOutExpo',
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        scale: 1,
        duration: 300,
        easing: 'easeOutExpo',
      });
    }
  };

  const handleClick = () => {
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        scale: [1, 0.95, 1],
        duration: 400,
        easing: 'easeOutExpo',
      });
    }
    if (onClick) onClick();
  };

  const commonProps = {
    ref: buttonRef as any,
    className: styles.cyberButton,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
  };

  if (href) {
    return (
      <a {...commonProps} href={href}>
        <span className={styles.buttonContent}>{children}</span>
        <span className={styles.buttonGlow}></span>
      </a>
    );
  }

  return (
    <button {...commonProps}>
      <span className={styles.buttonContent}>{children}</span>
      <span className={styles.buttonGlow}></span>
    </button>
  );
}

