'use client';

import dynamic from 'next/dynamic';

const AreasMap = dynamic(() => import('@/components/AreasMap'), { ssr: false });

export default function AreasMapClient() {
  return <AreasMap />;
}
