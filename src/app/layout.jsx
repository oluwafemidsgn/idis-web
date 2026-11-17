import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  metadataBase: new URL('https://idis-web-three.vercel.app'),
  title: { default: 'IDIS Digital — Expert Digital Marketing Services', template: '%s — IDIS Digital' },
  description:
    'IDIS Digital combines strategic thinking, creative execution and digital expertise to help businesses grow.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
