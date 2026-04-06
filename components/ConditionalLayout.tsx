'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isFunnel = pathname === '/get-started';
  return (
    <>
      {!isFunnel && <Navbar />}
      <main>{children}</main>
      {!isFunnel && <Footer />}
    </>
  );
}
