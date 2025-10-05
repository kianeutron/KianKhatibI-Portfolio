import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kian Khatibi - Portfolio',
  description: 'Personal portfolio showcasing my experience and skills as a Software Engineer specializing in React, Angular, and full-stack development',
  keywords: ['Kian Khatibi', 'Software Engineer', 'React', 'Angular', 'Full Stack Developer', 'Web Developer'],
  authors: [{ name: 'Kian Khatibi' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

