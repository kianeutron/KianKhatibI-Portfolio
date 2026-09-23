import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import styles from './XpButton.module.css';

export type XpButtonVariant = 'dialog' | 'icon' | 'key';

interface VariantProps {
  variant?: XpButtonVariant;
}

type XpButtonProps = VariantProps & ButtonHTMLAttributes<HTMLButtonElement>;
type XpLinkButtonProps = VariantProps & AnchorHTMLAttributes<HTMLAnchorElement>;

/** Bevelled classic-desktop button. */
export function XpButton({ variant = 'dialog', className, type = 'button', ...rest }: XpButtonProps) {
  return <button className={cx(styles.button, styles[variant], className)} type={type} {...rest} />;
}

/** Anchor that looks like an `XpButton`. */
export function XpLinkButton({ variant = 'dialog', className, ...rest }: XpLinkButtonProps) {
  return <a className={cx(styles.button, styles[variant], className)} {...rest} />;
}
