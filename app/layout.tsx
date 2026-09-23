import type { Metadata, Viewport } from 'next';
import { VT323 } from 'next/font/google';
import './globals.css';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
});

export const metadata: Metadata = {
  title: 'Kian Khatibi - Portfolio',
  description:
    'Personal portfolio showcasing my experience and skills as a Software Engineer specializing in React, Angular, and full-stack development',
  keywords: ['Kian Khatibi', 'Software Engineer', 'React', 'Angular', 'Full Stack Developer', 'Web Developer'],
  authors: [{ name: 'Kian Khatibi' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={vt323.variable}>
      <body>{children}</body>
    </html>
  );
}
