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
  keywords: ['managed IT', 'IT support', 'cybersecurity', 'cloud hosting', 'help desk', '24/7 IT support'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
