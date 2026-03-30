import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'NerdOps IT — Near Zero Downtime. Your Team of Nerds 24/7/365',
    template: '%s | NerdOps IT',
  },
  description:
    'NerdOps delivers managed IT services, cybersecurity, cloud hosting, and 24/7 help desk support. Near zero downtime guaranteed.',
  keywords: ['managed IT', 'IT support', 'cybersecurity', 'cloud hosting', 'help desk', '24/7 IT support'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
