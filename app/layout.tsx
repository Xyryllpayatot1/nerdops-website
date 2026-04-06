import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';
import Providers from './providers';

export const metadata = {
  title: {
    default: 'ZERO NERDS — Speak With Nerds Instantly. 24/7/365 IT Support',
    template: '%s | ZERO NERDS',
  },
  description:
    'ZERO NERDS delivers managed IT services, cybersecurity, cloud hosting, and 24/7 help desk support. Speak with nerds instantly.',
  keywords: ['managed IT', 'IT support', 'cybersecurity', 'cloud hosting', 'help desk', '24/7 IT support', 'Portland IT support', 'Oregon IT services'],
  authors: [{ name: 'ZERO NERDS' }],
  creator: 'ZERO NERDS',
  publisher: 'ZERO NERDS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zeronerds.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zeronerds.com',
    siteName: 'ZERO NERDS',
    title: 'ZERO NERDS — Speak With Nerds Instantly. 24/7/365 IT Support',
    description: 'ZERO NERDS delivers managed IT services, cybersecurity, cloud hosting, and 24/7 help desk support. Speak with nerds instantly.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ZERO NERDS - IT Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZERO NERDS — Speak With Nerds Instantly',
    description: 'Managed IT services, cybersecurity, cloud hosting, and 24/7 help desk support.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
