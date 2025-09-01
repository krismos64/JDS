"use client";

import dynamic from 'next/dynamic';

const AudioPlayer = dynamic(() => import('./AudioPlayer'), { ssr: false });

export default function ClientWrapper() {
  return <AudioPlayer />;
}